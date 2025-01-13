//Modificar esto para que se cree el arreglo dinamicamente con las fechas según la página que se está cargando

const eventosData = [
    {
        name: "Concierto de Rock",
        descripcion: "Un emocionante concierto de rock en vivo.",
        date: new Date('2025-01-15'),
        direccion: "Av. del Rock, Ciudad Musical",
        contacto: "info@musical.com"
    },
    {
        name: "Feria de Artesanía",
        descripcion: "Feria con artesanías locales y actividades para niños.",
        date: new Date('2025-02-10'),
        direccion: "Plaza Central, Ciudad Artesanal",
        contacto: "contacto@artesania.com"
    },
    {
        name: "Maratón Anual",
        descripcion: "Participa en la maratón anual de la ciudad.",
        date: new Date('2025-03-05'),
        direccion: "Parque Deportivo, Ciudad Saludable",
        contacto: "maraton@ciudadsaludable.com"
    },
    {
        name: "Festival Gastronómico",
        descripcion: "Disfruta de la mejor comida local e internacional. Disfruta de la mejor comida local e internacional. Disfruta de la mejor comida local e internacional. Disfruta de la mejor comida local e internacional.",
        date: new Date('2025-04-20'),
        direccion: "Centro Culinario, Ciudad Gourmet",
        contacto: "info@gourmet.com"
    },
    {
        name: "Exposición de Arte Moderno",
        descripcion: "Una muestra de los mejores artistas contemporáneos.",
        date: new Date('2025-05-12'),
        direccion: "Museo de Arte Moderno, Ciudad Cultural",
        contacto: "info@museoarte.com"
    },
    {
        name: "Cine Bajo las Estrellas",
        descripcion: "Proyección de películas clásicas al aire libre.",
        date: new Date('2025-06-25'),
        direccion: "Parque Central, Ciudad Cine",
        contacto: "cine@ciudadcine.com"
    },
    {
        name: "Taller de Fotografía",
        descripcion: "Aprende técnicas fotográficas con expertos.",
        date: new Date('2025-07-15'),
        direccion: "Estudio Fotográfico, Ciudad Creativa",
        contacto: "taller@fotografia.com"
    },
    {
        name: "Conferencia sobre Tecnología",
        descripcion: "Charlas sobre las últimas tendencias tecnológicas.",
        date: new Date('2025-08-30'),
        direccion: "Auditorio Tecnológico, Ciudad Innovadora",
        contacto: "info@tecnologia.com"
    },
    {
        name: "Festival de Música Electrónica",
        descripcion: "Un fin de semana lleno de música electrónica.",
        date: new Date('2025-09-18'),
        direccion: "Playa Electrónica, Ciudad Playa",
        contacto: "info@musicaelectronica.com"
    },
    {
        name: "Día del Medio Ambiente",
        descripcion: "Actividades y talleres para cuidar el planeta.",
        date: new Date('2025-10-05'),
        direccion: "Parque Ecológico, Ciudad Verde",
        contacto: "medioambiente@ciudadverde.com"
    },
    {
        name: "Exposición de Ciencias Naturales",
        descripcion: "Descubre la biodiversidad y el medio ambiente.",
        date: new Date('2025-11-20'),
        direccion: "Centro Científico, Ciudad Ciencia",
        contacto: "info@cienciasnaturales.com"
    },
    {
        name: "Mercado Navideño",
        descripcion: "Compra regalos únicos en nuestro mercado navideño.",
        date: new Date('2025-12-15'),
        direccion: "Plaza Navideña, Ciudad Festiva",
        contacto: "navidad@ciudadfestiva.com"
    },
    {
        name: "Evento de prueba doble",
        descripcion: "Evento de prueba doble.",
        date: new Date('2025-12-15'),
        direccion: "La Habana",
        contacto: "prueba@concepto.com"
    },
    {
        name: "Concierto de Año Nuevo",
        descripcion: "Celebra el año nuevo con música en vivo.",
        date: new Date('2026-01-01'),
        direccion: "Auditorio Municipal, Ciudad Festiva",
        contacto: "concierto@ciudadfestiva.com"
    },
    {
        name: "Feria del Libro",
        descripcion: "Encuentra tus libros favoritos y conoce a autores.",
        date: new Date('2026-02-14'),
        direccion: "Centro Cultural, Ciudad Literaria",
        contacto: "feria@ciudadliteraria.com"
    },
    {
        name: "Torneo de Fútbol Infantil",
        descripcion: "Compite en el torneo infantil más emocionante.",
        date: new Date('2026-03-10'),
        direccion: "Estadio Infantil, Ciudad Deportiva",
        contacto: "torneo@ciudaddesportiva.com"
    },
    {
         name:"Festival Internacional de Cine", 
         descripcion:"Muestra de películas premiadas a nivel internacional.", 
         date:new Date('2026-04-22'), 
         direccion:"Cine Teatro, Ciudad Cinemática", 
         contacto:"festival@cineinternacional.com" 
     },
     {
         name:"Jornada de Salud", 
         descripcion:"Exámenes médicos gratuitos y talleres sobre salud.", 
         date:new Date('2026-05-30'), 
         direccion:"Centro Médico, Ciudad Saludable", 
         contacto:"salud@ciudadsaludable.com" 
     },
     {
         name:"Conferencia sobre Sostenibilidad", 
         descripcion:"Charlas sobre prácticas sostenibles en la vida diaria.", 
         date:new Date('2026-06-15'), 
         direccion:"Auditorio Verde, Ciudad Sostenible", 
         contacto:"sostenibilidad@ciudadsostenible.com" 
     },
     {
         name:"Festival del Chocolate", 
         descripcion:"Degustaciones y talleres sobre chocolate.", 
         date:new Date('2026-07-10'), 
         direccion:"Plaza del Chocolate, Ciudad Dulce", 
         contacto:"chocolate@ciudaddulce.com" 
     },
     {
         name:"Taller de Cocina Vegana", 
         descripcion:"Aprende a cocinar deliciosos platos veganos.", 
         date:new Date('2026-08-20'), 
         direccion:"Escuela Culinaria, Ciudad Gourmet", 
         contacto:"cocina@culinaria.com" 
     },
     {
         name:"Maratón Nocturno", 
         descripcion:"Corre bajo las estrellas en nuestra maratón nocturna.", 
         date:new Date('2026-09-25'), 
         direccion:"Parque Nocturno, Ciudad Saludable", 
         contacto:"maraton@nocturno.com" 
     },
     {
         name:"Feria Internacional de Tecnología", 
         descripcion:"Expositores y conferencias sobre tecnología avanzada.", 
         date:new Date('2026-10-15'), 
         direccion:"Centro Tecnológico, Ciudad Innovadora", 
         contacto:"feria@tecnologiaavanzada.com" 
     },
     {
         name:"Día del Patrimonio Cultural", 
         descripcion:"Actividades para celebrar nuestra cultura e historia.", 
         date:new Date('2026-11-10'), 
         direccion:"Museo Histórico, Ciudad Cultural", 
         contacto:"patrimonio@museohistorico.com" 
     },
     {
         name:"Mercado Navideño 2.0", 
         descripcion:"Regresa nuestro popular mercado navideño con más sorpresas.", 
         date:new Date('2026-12-20'), 
         direccion:"Plaza Navideña 2.0, Ciudad Festiva", 
         contacto:"navidad2.0@ciudadfestiva.com"  
     }
];

export default eventosData;