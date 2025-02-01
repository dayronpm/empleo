import React, { useState, useEffect } from 'react'; // Importa useEffect
import { provincesAndMunicipalities } from '../Perfil/data'; // Import the provinces and municipalities data

const API_URL = 'http://localhost:3001'; // Cambia esto si tu servidor está en otra URL

const JobOfferModal = ({ isOpen, onClose, selectedJob }) => {
    // Estado para almacenar los datos del formulario
    const [formData, setFormData] = useState({
        titulo: '',
        provincia: '',
        municipio: '',
        descripcion: '',
        requerimientos: '',
        beneficios: '',
        salario: '',
        proceso_aplicacion: '',
        categoria: '',
        nivel_experiencia: '',
        tipo: ''
    });

    // Actualiza formData cuando selectedJob cambia
    useEffect(() => {
        if (selectedJob) {
            setFormData({
                titulo: selectedJob.titulo || '',
                provincia: selectedJob.provincia || '',
                municipio: selectedJob.municipio || '',
                descripcion: selectedJob.descripcion || '',
                requerimientos: selectedJob.requerimientos || '',
                beneficios: selectedJob.beneficios || '',
                salario: selectedJob.salario || '',
                proceso_aplicacion: selectedJob.aplicacion || '',
                categoria: selectedJob.categoria || '',
                nivel_experiencia: selectedJob.experiencia || '',
                tipo: selectedJob.tipo || ''
            });
        } else {
            // Si no hay selectedJob, resetea el formulario
            setFormData({
                titulo: '',
                provincia: '',
                municipio: '',
                descripcion: '',
                requerimientos: '',
                beneficios: '',
                salario: '',
                proceso_aplicacion: '',
                categoria: '',
                nivel_experiencia: '',
                tipo: ''
            });
        }
    }, [selectedJob]); // Dependencia: se ejecuta cuando selectedJob cambia

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = selectedJob ? `${API_URL}/editoferta` : `${API_URL}/addoferta`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    id: selectedJob ? selectedJob.id : localStorage.getItem('id'), // Incluye el ID si se está editando
                }),
            });
            if (!response.ok) {
                throw new Error('Error al guardar la oferta de trabajo');
            }
            window.location.reload();
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    if (!isOpen) return null;

    // Cambia el texto del botón según si se está editando o creando:
    const submitButtonText = selectedJob ? 'Guardar Cambios' : 'Agregar Oferta';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">{selectedJob ? 'Editar Oferta de Trabajo' : 'Agregar Nueva Oferta de Trabajo'}</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="titulo" 
                        placeholder="Título" 
                        value={formData.titulo} 
                        onChange={handleChange} 
                        required 
                        className="border p-2 rounded mb-2 w-full" 
                    />
                    
                    <select 
                        name="provincia" 
                        value={formData.provincia} 
                        onChange={handleChange} 
                        required 
                        className="border p-2 rounded mb-2 w-full"
                    >
                        <option value="">Selecciona una provincia</option>
                        {Object.keys(provincesAndMunicipalities).map((provincia) => (
                            <option key={provincia} value={provincia}>{provincia}</option>
                        ))}
                    </select>
                    <select 
                        name="municipio" 
                        value={formData.municipio} 
                        onChange={handleChange} 
                        required 
                        className="border p-2 rounded mb-2 w-full"
                    >
                        <option value="">Selecciona un municipio</option>
                        {formData.provincia && provincesAndMunicipalities[formData.provincia].map((municipio) => (
                            <option key={municipio} value={municipio}>{municipio}</option>
                        ))}
                    </select>
                    <textarea 
                        name="descripcion" 
                        placeholder="Descripción" 
                        value={formData.descripcion} 
                        onChange={handleChange} 
                        required 
                        className="border p-2 rounded mb-2 w-full"
                    ></textarea>
                    <input 
                        type="text" 
                        name="requerimientos" 
                        placeholder="Requerimientos" 
                        value={formData.requerimientos} 
                        onChange={handleChange} 
                        required 
                        className="border p-2 rounded mb-2 w-full" 
                    />
                    <input 
                        type="text" 
                        name="beneficios" 
                        placeholder="Beneficios" 
                        value={formData.beneficios} 
                        onChange={handleChange} 
                        required 
                        className="border p-2 rounded mb-2 w-full" 
                    />
                    <input 
                        type="number" 
                        name="salario" 
                        placeholder="Salario" 
                        value={formData.salario} 
                        onChange={handleChange} 
                        required 
                        className="border p-2 rounded mb-2 w-full" 
                    />
                    <input 
                        type="text" 
                        name="proceso_aplicacion" 
                        placeholder="Proceso de Aplicación" 
                        value={formData.proceso_aplicacion} 
                        onChange={handleChange} 
                        required 
                        className="border p-2 rounded mb-2 w-full" 
                    />
                    <select 
                        name="categoria" 
                        value={formData.categoria} 
                        onChange={handleChange} 
                        required 
                        className="border p-2 rounded mb-2 w-full"
                    >
                        <option value="">Selecciona una categoría</option>
                        <option value="Medio tiempo">Medio tiempo</option>
                        <option value="Tiempo completo">Tiempo completo</option>
                        <option value="Freelance">Freelance</option>
                    </select>
                    <select 
                        name="nivel_experiencia" 
                        value={formData.nivel_experiencia} 
                        onChange={handleChange} 
                        required 
                        className="border p-2 rounded mb-2 w-full"
                    >
                        <option value="">Selecciona un nivel de experiencia</option>
                        <option value="Junior">Junior</option>
                        <option value="Medio">Medio</option>
                        <option value="Senior">Senior</option>
                    </select>
                    <select 
                        name="tipo" 
                        value={formData.tipo} 
                        onChange={handleChange} 
                        required 
                        className="border p-2 rounded mb-2 w-full"
                    >
                        <option value="">Selecciona un tipo</option>
                        <option value="Estatal">Estatal</option>
                        <option value="No estatal">No estatal</option>
                    </select>
                    <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">{submitButtonText}</button>
                </form>
                <button onClick={onClose} className="mt-2 text-red-500">Cerrar</button>
            </div>
        </div>
    );
};

export default JobOfferModal;