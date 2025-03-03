const express = require('express'); //Framework para servidor
const cors = require('cors'); //para manejar entradas y salidas
const mysql = require('mysql2'); //para manejar la base de datos
const bcrypt = require('bcrypt'); //encriptacion
const jwt = require('jsonwebtoken'); //tokens

const app = express();

// Configura CORS para permitir solicitudes desde localhost:5173
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174' ],  // Permite solo el origen del frontend
}));

app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'prueba'
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL.');
});

// Rutas para registro y login
app.post('/register', (req, res) => {
    console.log('Recibida petición de registro:', req.body);
    const { username, password, userType, name } = req.body;
    
    db.query('INSERT INTO usuarios (username, password, tipo, nombre) VALUES (?, ?, ?, ?)', 
        [username, password, userType, name], 
        (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ error: "Nombre de usuario ya en uso" });
                } else {
                    console.error('Error en el registro:', err);
                    return res.status(500).json({ error: "Error al registrar el usuario. Inténtalo de nuevo." });
                }
            }

            // Cambiar de res.send a res.json
            res.status(201).json({ 
                success: true,
                message: 'Usuario registrado exitosamente'
            });
        }
    );
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log('Consultando usuario:', username, 'con contraseña:', password);
    db.query('SELECT * FROM usuarios WHERE username = ? AND password = ?', [username, password], (err, results) => {
        if (err || results.length === 0) return res.status(401).send('Usuario o contraseña incorrectos.');
        
        const user = results[0];

        // Generar el token sin verificar el hash de la contraseña
        const token = jwt.sign({ id: user.id }, 'tu_clave_secreta', { expiresIn: '1h' });

        const id = user.id;
        //Sacar tipo de usuario
        const tipo = user.tipo;
        console.log(tipo);
        console.log(id);
        res.json({ token, tipo, id });
    });
});

// Nueva ruta para obtener información de la empresa
app.post('/empresa', (req, res) => {
    const { id } = req.body; // Obtener el ID del cuerpo de la solicitud
    db.query('SELECT * FROM empresa WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('Empresa no encontrada.');
        res.json(results[0]); // Retorna la primera empresa encontrada
    });
});

// Nueva ruta para eliminar empresa
app.post('/borrarusuario', (req, res) => {
    const { id, password } = req.body; // Obtener el ID y la contraseña del cuerpo de la solicitud

    // Primero, obtener la contraseña almacenada del usuario
    db.query('SELECT password FROM usuarios WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('Empresa no encontrada.');

        const storedPassword = results[0].password;

        console.log('Contraseña pasada:', password);
        console.log('Contraseña guardada:',storedPassword);

        // Comparar la contraseña proporcionada con la almacenada
        if (password !== storedPassword) {
            return res.status(401).send('Contraseña incorrecta.');
        }

        // Si la contraseña es correcta, proceder a eliminar la cuenta
        db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, results) => {
            if (err) return res.status(500).send(err);
            if (results.affectedRows === 0) return res.status(404).send('Empresa no encontrada.');
            res.status(204).send(); // No content response for successful deletion
        });
    });
});

// Nueva ruta para agregar una oferta de trabajo
app.post('/addoferta', (req, res) => {
    console.log(req.body);
    const { titulo, provincia, municipio , salario, descripcion, requerimientos, beneficios, aplicacion, categoria, experiencia, tipo } = req.body;
    const id_empresa = req.body.id; // ID de la empresa es el ID del usuario en sesión
    const fecha = new Date().toISOString().slice(0, 10); // Fecha actual

    const query = 'INSERT INTO ofertas (titulo, id_empresa, provincia, municipio, descripcion, fecha, requerimientos, beneficios, salario, aplicacion, categoria, experiencia, tipo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [titulo, id_empresa, provincia, municipio, descripcion, fecha, requerimientos, beneficios, salario, aplicacion, categoria, experiencia, tipo];
    console.log(values);
    db.query(query, values, (err) => {
        if (err) return res.status(500).send(err);
        res.status(201).send('Oferta de trabajo agregada.');
        if (res.status(201)) console.log('Todo bien') 
            else console.log('Todo mal');
    });
});

// Modificar la ruta para obtener todas las ofertas de trabajo 
app.get('/getalloferta', (req, res) => {
    // Modificar la consulta para incluir el nombre de la empresa
    const query = `
        SELECT ofertas.*, empresa.nombre as company 
        FROM ofertas 
        INNER JOIN empresa ON ofertas.id_empresa = empresa.id
    `;
    
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results); // Retorna todas las ofertas encontradas con el nombre de la empresa
    });
});

// También modificar la ruta para obtener ofertas de una empresa específica
app.post('/getoferta', (req, res) => {
    const { id } = req.body;
    const query = `
        SELECT ofertas.*, empresa.nombre as company 
        FROM ofertas 
        INNER JOIN empresa ON ofertas.id_empresa = empresa.id 
        WHERE ofertas.id_empresa = ?
    `;
    
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.post('/updateempresa', (req, res) => {
    console.log('Editando empresa con id:');
    console.log(req.body.id);
    const { nombre, tipo, descripcion, provincia, municipio } = req.body;
    const id = req.body.id;

    // Primero actualizamos la tabla empresa
    const queryEmpresa = 'UPDATE empresa SET nombre = ?, tipo = ?, descripcion = ?, provincia = ?, municipio = ? WHERE id = ?';
    
    db.query(queryEmpresa, [nombre, tipo, descripcion, provincia, municipio, id], (err) => {
        if (err) return res.status(500).send(err);
        
        // Si la actualización de la empresa fue exitosa, actualizamos la tabla usuarios
        const queryUsuarios = 'UPDATE usuarios SET nombre = ? WHERE id = ?';
        
        db.query(queryUsuarios, [nombre, id], (err) => {
            if (err) return res.status(500).send(err);
            res.status(200).send('Información de la empresa actualizada en ambas tablas.');
        });
    });
});

app.post('/editoferta', (req, res) => {
    const { id, titulo, provincia, municipio, descripcion, requerimientos, beneficios, salario, aplicacion, categoria, experiencia, tipo } = req.body;
    
    const query = 'UPDATE ofertas SET titulo = ?, provincia = ?, municipio = ?, descripcion = ?, requerimientos = ?, beneficios = ?, salario = ?, aplicacion = ?, categoria = ?, experiencia = ?, tipo = ? WHERE id = ?';
    const values = [titulo, provincia, municipio, descripcion, requerimientos, beneficios, salario, aplicacion, categoria, experiencia, tipo, id];

    db.query(query, values, (err) => {
        if (err) return res.status(500).send(err);
        res.status(200).send('Oferta de trabajo actualizada.');
    });
});

// Nueva ruta para obtener cursos de una empresa
app.post('/getcourses', (req, res) => {
    const { id } = req.body; // Obtener el ID de la empresa
    db.query('SELECT * FROM cursos WHERE id_master = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results); // Retorna todos los cursos encontrados
    });
});

// Nueva ruta para obtener todos los cursos
app.get('/getallcourses', (req, res) => {
    db.query('SELECT * FROM cursos',(err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results); // Retorna todos los cursos encontrados
    });
});

app.post('/addcourse', (req, res) => {
    console.log('Datos recibidos en /addcourse:', req.body);
    const { titulo, descripcion, nivel, requisitos, modalidad, direccion, precio, id_master } = req.body;
    const descripcionCompleta = req.body.descripcionCompleta || null;

    // Validar campos obligatorios
    if (!titulo || !descripcion || !nivel || !requisitos || !modalidad || !direccion || !precio || !id_master ) {
        return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes.' });
    }

    const query = `
        INSERT INTO cursos 
        (titulo, id_master, descripcion, nivel, requisitos, modalidad, descripcionCompleta, direccion, precio) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const values = [titulo, id_master, descripcion, nivel, requisitos, modalidad, descripcionCompleta, direccion, precio];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error al insertar el curso:', err);
            return res.status(500).json({ error: 'Error al agregar el curso.' });
        }

        // Respuesta exitosa en formato JSON
        console.log('Curso agregado correctamente:', result);
        res.status(201).json({ message: 'Curso agregado correctamente.' });
    });
});

// Ruta para editar una oferta de trabajo
app.post('/editoferta', (req, res) => {
    const { id, titulo, provincia, municipio, descripcion, requerimientos, beneficios, salario, aplicacion, categoria, experiencia, tipo } = req.body;
    
    const query = 'UPDATE ofertas SET titulo = ?, provincia = ?, municipio = ?, descripcion = ?, requerimientos = ?, beneficios = ?, salario = ?, aplicacion = ?, categoria = ?, experiencia = ?, tipo = ? WHERE id = ?';
    const values = [titulo, provincia, municipio, descripcion, requerimientos, beneficios, salario, aplicacion, categoria, experiencia, tipo, id];
    
    db.query(query, values, (err) => {
        if (err) return res.status(500).send(err);
        res.status(200).send('Oferta de trabajo actualizada.');
    });
});

// Nueva ruta para editar un curso existente
app.post('/editcourse', (req, res) => {
    const { id, titulo, descripcion, nivel, requisitos, modalidad, descripcionCompleta, direccion, precio } = req.body;

    // Validar que se haya proporcionado un ID y al menos un campo a actualizar
    if (!id) {
        return res.status(400).json({ error: 'El ID del curso es obligatorio.' });
    }

    // Construir la consulta dinámicamente basada en los campos proporcionados
    const updates = [];
    const values = [];

    if (titulo) {
        updates.push('titulo = ?');
        values.push(titulo);
    }
    if (descripcion) {
        updates.push('descripcion = ?');
        values.push(descripcion);
    }
    if (nivel) {
        updates.push('nivel = ?');
        values.push(nivel);
    }
    if (requisitos) {
        updates.push('requisitos = ?');
        values.push(requisitos);
    }
    if (modalidad) {
        updates.push('modalidad = ?');
        values.push(modalidad);
    }
    if (descripcionCompleta) {
        updates.push('descripcionCompleta = ?');
        values.push(descripcionCompleta);
    }
    if (direccion) {
        updates.push('direccion = ?');
        values.push(direccion);
    }
    if (precio) {
        updates.push('precio = ?');
        values.push(precio);
    }

    // Si no se proporcionaron campos para actualizar, devolver un error
    if (updates.length === 0) {
        return res.status(400).json({ error: 'No se proporcionaron campos para actualizar.' });
    }

    // Agregar el ID al final de los valores
    values.push(id);

    // Construir la consulta SQL
    const query = `UPDATE cursos SET ${updates.join(', ')} WHERE id = ?`;

    // Ejecutar la consulta
    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error al editar el curso:', err);
            return res.status(500).json({ error: 'Error al editar el curso.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Curso no encontrado.' });
        }
        res.status(200).json({ message: 'Curso actualizado correctamente.' });
    });
});

app.post('/deleteoferta', (req, res) => {
    const { id } = req.body; // Obtener el ID de la oferta
    db.query('DELETE FROM ofertas WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.affectedRows === 0) return res.status(404).send('Oferta no encontrada.');
        res.status(200).send('Oferta eliminada correctamente.');
    });
});

app.post('/deletecourse', (req, res) => {
    const { id } = req.body; // Obtener el ID del curso a eliminar
    db.query('DELETE FROM cursos WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.affectedRows === 0) return res.status(404).send('Curso no encontrado.');
        res.status(204).send(); // Respuesta sin contenido para indicar éxito
    });
});

// Nueva ruta para obtener información del usuario
app.post('/usuario', (req, res) => {
    const { id } = req.body; // Obtener el ID del cuerpo de la solicitud
    db.query('SELECT * FROM usuarios INNER JOIN personas ON usuarios.id = personas.id WHERE usuarios.id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('Usuario no encontrada.');
        res.json(results[0]); // Retorna el primer usuario encontrada
    });
});

// Nueva ruta para obtener información de las personas
app.get('/getallpersona', (req, res) => {
    db.query('SELECT * FROM usuarios INNER JOIN personas ON usuarios.id = personas.id', (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('Usuario no encontrada.');
        res.json(results); // Retorna todas las personas encontradas
        console.log(results);
    });
});

// Nueva ruta para obtener información de las personas
app.get('/getallempresas', (req, res) => {
    db.query('SELECT * FROM usuarios INNER JOIN empresa ON usuarios.id = empresa.id', (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('Usuario no encontrada.');
        res.json(results); // Retorna todas las empresas encontradas
    });
});

// Ruta para actualizar información del usuario
app.post('/updateusuario', (req, res) => {
    const { id, info } = req.body; // Datos a actualizar

    result = info.telefono.map(item => item.trim());
    info.telefono = JSON.stringify(result);

    // Actualizar la tabla 'personas'
    db.query(
        'UPDATE personas SET nombre = ?, provincia = ?, municipio = ?, telefono = ?, correo = ? WHERE id = ?',
        [info.nombre, info.provincia, info.municipio, info.telefono, info.correo, id],
        (err, results) => {
            if (err) return res.status(500).send(err);

            // Actualizar la tabla 'usuarios'
            db.query(
                'UPDATE usuarios SET nombre = ? WHERE id = ?',
                [info.nombre, id],
                (err, results) => {
                    if (err) return res.status(500).send(err);

                    // Verificar si se realizó la actualización
                    if (results.affectedRows === 0) {
                        return res.status(404).send('Usuario no encontrado.');
                    }

                    // Respuesta exitosa
                    res.send('Información del usuario actualizada correctamente.');
                }
            );
        }
    );
});

// Ruta para editar contraseña
app.post('/updatePassword', (req, res) => {
    const { id, newPassword } = req.body;
    console.log("Actualizando contraseña");
    console.log(id);
    console.log(newPassword);
    const query = 'UPDATE usuarios SET password = ? WHERE id = ?';
    const values = [newPassword, id];
    
    db.query(query, values, (err) => {
        if (err) return res.status(500).send(err);
        res.status(200).send('Contraseña actualizada.');
    });
});

// Nueva ruta para obtener todos los admin
app.get('/getalladmin', (req, res) => {
    db.query('SELECT * FROM admin',(err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results); // Retorna todos los admins encontrados
    });
});

// Ruta para insertar admin
app.post('/insertadmin', (req, res) => {
    console.log(req.body);
    const {username, password} = req.body;
    db.query('INSERT INTO admin (username, password) VALUES (?, ?)', [username, password], (err) => {
        if (err) return res.status(500).send(err);
        res.status(201).send('Usuario registrado.');
    });
});

//Ruta para borrar admin
app.post('/deleteadmin', (req, res) => {
    const { id } = req.body; // Obtener el ID del curso a eliminar
    db.query('DELETE FROM admin WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.affectedRows === 0) return res.status(404).send('Admin no encontrado.');
        res.status(204).send(); // Respuesta sin contenido para indicar éxito
    });
});

app.post('/update-curriculum', (req, res) => {
    const { id, campo, datos } = req.body;
  
    if (!id || !campo || !datos) {
        return res.status(400).json({ 
            error: 'Faltan parámetros obligatorios.' 
        });
    }
  
    // Validar que los datos estén en el formato correcto
    try {
        // Si los datos ya vienen como string, no es necesario convertirlos
        const datosString = typeof datos === 'string' ? datos : JSON.stringify(datos);
        
        const query = `UPDATE personas SET ${campo} = ? WHERE id = ?`;
        const values = [datosString, id];
    
        db.query(query, values, (err, results) => {
            if (err) {
                console.error('Error en la base de datos:', err);
                return res.status(500).json({ 
                    error: 'Error al actualizar el currículum' 
                });
            }
            
            if (results.affectedRows === 0) {
                return res.status(404).json({ 
                    error: 'Usuario no encontrado' 
                });
            }
            
            res.status(200).json({ 
                message: 'Currículum actualizado correctamente' 
            });
        });
    } catch (error) {
        console.error('Error al procesar los datos:', error);
        res.status(400).json({ 
            error: 'Formato de datos inválido' 
        });
    }
});

// ... existing code ...

// Ruta para obtener todas las empresas con conteo de cursos y ofertas
app.get('/getcompaniesinfo', (req, res) => {
    const query = `
        SELECT 
            u.id,
            u.username,
            u.password,
            u.nombre as nombre_completo,
            e.tipo,
            e.descripcion,
            e.provincia,
            e.municipio,
            COUNT(DISTINCT c.id) as total_cursos,
            COUNT(DISTINCT o.id) as total_ofertas
        FROM usuarios u
        LEFT JOIN empresa e ON u.id = e.id
        LEFT JOIN cursos c ON u.id = c.id_master
        LEFT JOIN ofertas o ON u.id = o.id_empresa
        WHERE u.tipo = 'empresa'
        GROUP BY u.id
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener información de empresas:', err);
            return res.status(500).json({ error: 'Error al obtener información de empresas' });
        }
        res.json(results);
    });
});

// Ruta para actualizar una empresa
app.put('/updatecompany/:id', (req, res) => {
    const { id } = req.params;
    const { nombreCompleto, nombreUsuario, contraseña, tipo, descripcion, provincia, municipio } = req.body;

    // Primero obtener los datos actuales
    db.query('SELECT u.username, u.password, u.nombre, e.tipo, e.descripcion, e.provincia, e.municipio FROM usuarios u LEFT JOIN empresa e ON u.id = e.id WHERE u.id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al obtener datos actuales:', err);
            return res.status(500).json({ error: "Error al actualizar la empresa" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "Empresa no encontrada" });
        }

        const currentData = results[0];
        
        // Usar los nuevos datos o mantener los actuales si no se proporcionan
        const updatedUsername = nombreUsuario || currentData.username;
        const updatedNombre = nombreCompleto || currentData.nombre;
        const updatedPassword = contraseña || currentData.password;
        const updatedTipo = tipo || currentData.tipo;
        const updatedDescripcion = descripcion || currentData.descripcion;
        const updatedProvincia = provincia || currentData.provincia;
        const updatedMunicipio = municipio || currentData.municipio;

        // Actualizar usuarios
        const userQuery = contraseña 
            ? 'UPDATE usuarios SET username = ?, password = ?, nombre = ? WHERE id = ?'
            : 'UPDATE usuarios SET username = ?, nombre = ? WHERE id = ?';
        
        const userValues = contraseña 
            ? [updatedUsername, updatedPassword, updatedNombre, id]
            : [updatedUsername, updatedNombre, id];

        db.query(userQuery, userValues, (err) => {
            if (err) {
                console.error('Error al actualizar usuario:', err);
                return res.status(500).json({ error: "Error al actualizar la empresa" });
            }

            // Actualizar empresa
            const companyQuery = 'UPDATE empresa SET nombre = ?, tipo = ?, descripcion = ?, provincia = ?, municipio = ? WHERE id = ?';
            db.query(companyQuery, [updatedNombre, updatedTipo, updatedDescripcion, updatedProvincia, updatedMunicipio, id], (err) => {
                if (err) {
                    console.error('Error al actualizar empresa:', err);
                    return res.status(500).json({ error: "Error al actualizar la empresa" });
                }
                res.json({ success: true, message: 'Empresa actualizada exitosamente' });
            });
        });
    });
});

// Ruta para verificar si una empresa existe
app.get('/checkcompany/:username', (req, res) => {
    const { username } = req.params;
    
    // Primero obtener el id del usuario
    db.query('SELECT id FROM usuarios WHERE username = ?', [username], (err, userResults) => {
        if (err) {
            console.error('Error al buscar usuario:', err);
            return res.status(500).json({ error: 'Error al verificar la empresa' });
        }
        
        if (userResults.length === 0) {
            return res.json({ exists: false });
        }

        const userId = userResults[0].id;
        
        // Verificar si existe en la tabla empresa
        db.query('SELECT id FROM empresa WHERE id = ?', [userId], (err, companyResults) => {
            if (err) {
                console.error('Error al verificar empresa:', err);
                return res.status(500).json({ error: 'Error al verificar la empresa' });
            }
            
            res.json({ 
                exists: companyResults.length > 0,
                id: userId // Devolvemos el id para usarlo en el update
            });
        });
    });
});

// ... existing code ...

// Ruta para login de administradores
app.post('/admin/login', (req, res) => {
    const { username, password } = req.body;
    
    db.query('SELECT * FROM admin WHERE username = ? AND password = ?', 
        [username, password], 
        (err, results) => {
            if (err) {
                console.error('Error en el login:', err);
                return res.status(500).json({ error: "Error en el servidor" });
            }
            
            if (results.length === 0) {
                return res.status(401).json({ error: "Credenciales inválidas" });
            }

            const admin = results[0];
            res.json({
                id: admin.id,
                username: admin.username,
                tipo: admin.tipo,
                token: generateToken(admin) // Necesitaremos implementar esta función
            });
        }
    );
});

// Ruta para obtener todos los administradores (solo para admin principal)
app.get('/admin/getall', authenticateAdmin, (req, res) => {
    if (req.admin.tipo !== 'principal') {
        return res.status(403).json({ error: "No autorizado" });
    }

    db.query('SELECT id, username, tipo FROM admin', (err, results) => {
        if (err) return res.status(500).json({ error: "Error al obtener administradores" });
        res.json(results);
    });
});

// Ruta para crear nuevo administrador
app.post('/admin/create', authenticateAdmin, (req, res) => {
    if (req.admin.tipo !== 'principal') {
        return res.status(403).json({ error: "No autorizado" });
    }

    const { username, password, tipo } = req.body;
    
    db.query('INSERT INTO admin (username, password, tipo) VALUES (?, ?, ?)',
        [username, password, tipo],
        (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ error: "Nombre de usuario ya existe" });
                }
                return res.status(500).json({ error: "Error al crear administrador" });
            }
            res.status(201).json({ message: "Administrador creado exitosamente" });
        }
    );
});

// Ruta para actualizar administrador
app.put('/admin/update/:id', authenticateAdmin, (req, res) => {
    if (req.admin.tipo !== 'principal') {
        return res.status(403).json({ error: "No autorizado" });
    }

    const { username, password, tipo } = req.body;
    const adminId = req.params.id;
    
    let query = 'UPDATE admin SET username = ?, tipo = ?';
    let params = [username, tipo];
    
    if (password) {
        query += ', password = ?';
        params.push(password);
    }
    
    query += ' WHERE id = ?';
    params.push(adminId);
    
    db.query(query, params, (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: "Nombre de usuario ya existe" });
            }
            return res.status(500).json({ error: "Error al actualizar administrador" });
        }
        res.json({ message: "Administrador actualizado exitosamente" });
    });
});

// Ruta para eliminar administrador
app.delete('/admin/delete/:id', authenticateAdmin, (req, res) => {
    if (req.admin.tipo !== 'principal') {
        return res.status(403).json({ error: "No autorizado" });
    }

    db.query('DELETE FROM admin WHERE id = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: "Error al eliminar administrador" });
        res.json({ message: "Administrador eliminado exitosamente" });
    });
});

// Middleware de autenticación
function authenticateAdmin(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: "Token no proporcionado" });
    }

    try {
        const decoded = jwt.verify(token, 'tu_secreto_jwt');
        req.admin = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: "Token inválido" });
    }
}

// Función para generar token JWT
function generateToken(admin) {
    return jwt.sign(
        { id: admin.id, username: admin.username, tipo: admin.tipo },
        'tu_secreto_jwt',
        { expiresIn: '24h' }
    );
}

app.listen(3001, () => {
    console.log('Servidor corriendo en http://localhost:3001');
});
