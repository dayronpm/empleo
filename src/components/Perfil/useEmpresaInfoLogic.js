import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const API_URL = 'http://localhost:3001'; // Change this if your server is at a different URL

const useEmpresaInfoLogic = () => {
    // Hook para manejar la navegación entre rutas en la aplicación
    const navigate = useNavigate(); 

    // Estado para almacenar la información de la empresa. Inicialmente es null.
    const [empresa, setEmpresa] = useState(null);

    // Estado para almacenar las ofertas de trabajo asociadas a la empresa. Inicialmente es un array vacío.
    const [jobOffers, setJobOffers] = useState([]); 

    // Estado para almacenar los cursos asociados a la empresa. Inicialmente es un array vacío.
    const [courses, setCourses] = useState([]); 

    // Obtiene el ID del usuario almacenado en localStorage para identificar la empresa.
    const id = localStorage.getItem('id'); 

    // Estado para almacenar el curso seleccionado cuando se interactúa con él. Inicialmente es null.
    const [selectedCourse, setSelectedCourse] = useState(null); 

    // Estado para controlar la apertura/cierre del modal de confirmación de eliminación de una oferta de trabajo.
    const [isDeleteJobModalOpen, setIsDeleteJobModalOpen] = useState(false); 

    // Estado para almacenar la oferta de trabajo seleccionada para ser eliminada. Inicialmente es null.
    const [selectedJobForDeletion, setSelectedJobForDeletion] = useState(null); 

    // Estado para controlar la apertura/cierre de un modal genérico utilizado en varios casos.
    const [isModalOpen, setModalOpen] = useState(false); 

    // Estados para controlar si se está editando el nombre de la empresa.
    const [isEditingName, setEditingName] = useState(false); 

    // Estados para controlar si se está editando la dirección de la empresa.
    const [isEditingAddress, setEditingAddress] = useState(false); 

    // Estados para controlar si se está editando el tipo de la empresa.
    const [isEditingType, setEditingType] = useState(false); 

    // Estados para controlar si se está editando la descripción de la empresa.
    const [isEditingDescription, setEditingDescription] = useState(false); 

    // Estado para almacenar el nuevo nombre de la empresa durante la edición.
    const [editedName, setEditedName] = useState(''); 

    // Estado para almacenar la nueva dirección de la empresa durante la edición.
    const [editedAddress, setEditedAddress] = useState(''); 

    // Estado para almacenar la provincia de la empresa durante la edición.
    const [editedProvince, setEditedProvince] = useState(''); 

    // Estado para almacenar el municipio de la empresa durante la edición.
    const [editedMunicipality, setEditedMunicipality] = useState(''); 

    // Estado para almacenar el nuevo tipo de la empresa durante la edición.
    const [editedType, setEditedType] = useState(''); 

    // Estado para almacenar la nueva descripción de la empresa durante la edición.
    const [editedDescription, setEditedDescription] = useState(''); 

    // Estado para almacenar la oferta de trabajo seleccionada cuando se interactúa con ella.
    const [selectedJob, setSelectedJob] = useState(null); 

    // Estado para controlar la apertura/cierre del modal de eliminación de cuenta.
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); 

    // Estado para controlar la apertura/cierre del modal relacionado con los cursos.
    const [isCourseModalOpen, setCourseModalOpen] = useState(false);
    
    const [isDeleteCourseModalOpen, setIsDeleteCourseModalOpen] = useState(false); // Estado para controlar el modal de eliminación
    const [selectedCourseForDeletion, setSelectedCourseForDeletion] = useState(null); // Curso seleccionado para eliminar

    //Cargar datos de la empresa, incluidos trabajos y cursos
    const fetchEmpresaData = async () => {
        try {
            const response = await fetch(`${API_URL}/empresa`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }), // Send user ID in the body
            });
            if (!response.ok) {
                throw new Error('Error al cargar la información de la empresa');
            }
            const data = await response.json();
            setEmpresa(data);

            // Fetch job offers
            const offersResponse = await fetch(`${API_URL}/getoferta`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }), // Send user ID in the body
            });
            if (!offersResponse.ok) {
                throw new Error('Error al cargar las ofertas de trabajo');
            }
            const offersData = await offersResponse.json();
            setJobOffers(offersData); // Set job offers in state

            // Fetch courses
            const coursesResponse = await fetch(`${API_URL}/getcourses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }), // Send user ID in the body
            });
            if (!offersResponse.ok) {
                throw new Error('Error al cargar las ofertas de trabajo');
            }
            const courses = await coursesResponse.json();
            setCourses(courses); // Set courses in state
        } catch (error) {
            console.error(error);
        }
    };

    //Estado para las notificaciones
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");

    //Llamar a la función para cargar datos de la empresa
    useEffect(() => {
        fetchEmpresaData();
    }, []);

    //Función para volver a cargar los datos de la empresa 
    const reloadEmpresaInfo = () => {
        fetchEmpresaData(); // Call fetchEmpresaData to reload the data
    };

    // Funcion para abrir el modal de curso
    const handleOpenCourseModal = () => {
        setCourseModalOpen(true);
    };

    // Funcion para cerrar el cmodal de curso
    const handleCloseCourseModal = () => {
        setCourseModalOpen(false);
        setSelectedCourse(null); // Limpiar el curso seleccionado al cerrar el modal
    };

    //Sincronizar los campos editables del formulario con los datos actuales de la empresa cada vez que algo cambia
    useEffect(() => {
        if (empresa) {
            setEditedName(empresa.nombre || '');
            setEditedAddress(`${empresa.provincia || ''}, ${empresa.municipio || ''}`);
            setEditedProvince(empresa.provincia || '');
            setEditedMunicipality(empresa.municipio || '');
            setEditedType(empresa.tipo || '');
            setEditedDescription(empresa.descripcion || '');
        }
    }, [empresa]);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleSubmit = async (id, API_URL) => {
        try {
            const response = await fetch(`${API_URL}/updateempresa`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id,
                    nombre: editedName,
                    tipo: editedType,
                    descripcion: editedDescription,
                    provincia: editedProvince,
                    municipio: editedMunicipality,
                }),
            });

            if (!response.ok) {
                throw new Error('Error updating company information');
            }

            const result = await response.text();
            console.log(result); // Log the response from the server

            // Reload useEmpresaInfo to get updated data
            reloadEmpresaInfo(); // Ensure this function is available to get updated information

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleLogout = () => {
        localStorage.clear(); // Clear all items in localStorage
        navigate('/'); // Redirect to the landing page
    };

    const handleDeleteAccount = async (password) => {
        const id = localStorage.getItem('id'); // Get the user ID from local storage
        try {
            const response = await fetch(`${API_URL}/borrarusuario`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, password }), // Send the ID and password in the request body
            });
            if (response.ok) {
                setNotificationMessage("Cuenta eliminada con éxito.");
                setIsNotificationOpen(true);
              } else {
                setNotificationMessage("Error al eliminar la cuenta.");
                setIsNotificationOpen(true);
              }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al eliminar la cuenta.');
        }
    };

        const handleCourseSelect = (course) => {
            setSelectedCourse(course); // Guarda el curso seleccionado
            setCourseModalOpen(true); // Abre el modal
        };

        const handleEditCourse = async (data) => {
            try {
                const response = await fetch(`${API_URL}/editcourse`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...data,
                        id: selectedCourse.id
                    }),
                });
        
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Error al editar el curso');
                }
        
                setNotificationMessage('Curso actualizado exitosamente');
                setIsNotificationOpen(true);
                reloadEmpresaInfo();
                setCourseModalOpen(false);
                setSelectedCourse(null);
            } catch (error) {
                console.error('Error:', error);
                setNotificationMessage(error.message);
                setIsNotificationOpen(true);
            }
        };

        const deleteJob = async (jobId) => {
            try {
                const response = await fetch(`${API_URL}/deleteoferta`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: jobId }), // Enviar el ID de la oferta a eliminar
                });
                if (!response.ok) {
                    throw new Error('Error al eliminar la oferta de trabajo');
                }
                const result = await response.text();
                console.log(result); // Log the response from the server
                // Recargar los datos de la empresa después de eliminar la oferta
                reloadEmpresaInfo();
            } catch (error) {
                console.error('Error:', error);
                alert('No se pudo eliminar la oferta de trabajo.');
            }
        };

        const deleteCourse = async (courseId) => {
            try {
                const response = await fetch(`${API_URL}/deletecourse`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: courseId }), // Enviar el ID del curso a eliminar
                });
                if (!response.ok) {
                    throw new Error('Error al eliminar el curso');
                }
                const result = await response.text();
                console.log(result); // Log the response from the server
                reloadEmpresaInfo(); // Recargar los datos después de eliminar el curso
            } catch (error) {
                console.error('Error:', error);
                alert('No se pudo eliminar el curso.');
            }
        };

        // Función para abrir el modal de confirmación de eliminación
    const handleDeleteJob = (job) => {
        setSelectedJobForDeletion(job);
        setIsDeleteJobModalOpen(true);
    };

    // Función para confirmar la eliminación de una oferta
    const handleConfirmDeleteJob = async () => {
        try {
            const response = await fetch(`${API_URL}/deleteoferta`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: selectedJobForDeletion.id
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al eliminar la oferta');
            }

            setNotificationMessage('Oferta eliminada exitosamente');
            setIsNotificationOpen(true);
            reloadEmpresaInfo();
            setIsDeleteJobModalOpen(false);
            setSelectedJobForDeletion(null);
        } catch (error) {
            console.error('Error:', error);
            setNotificationMessage(error.message);
            setIsNotificationOpen(true);
        }
    };

    const handleDeleteCourse = (course) => {
        setSelectedCourseForDeletion(course); // Guarda el curso seleccionado
        setIsDeleteCourseModalOpen(true); // Abre el modal
      };

    const handleJobSelect = (job) => {
        setSelectedJob(job); // Guarda la oferta seleccionada
        setIsAddJobModalOpen(true); // Abre el modal para editar/agregar trabajo
    };

    // Estado para controlar si el modal de agregar/editar trabajo está abierto
    const [isAddJobModalOpen, setIsAddJobModalOpen] = useState(false);

    // Función para manejar la creación o edición de trabajos
    const handleAddJob = async (data) => {
        try {
            const response = await fetch(`${API_URL}/addoferta`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    id: id // ID de la empresa
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al agregar la oferta');
            }

            setNotificationMessage('Oferta agregada exitosamente');
            setIsNotificationOpen(true);
            reloadEmpresaInfo();
            setIsAddJobModalOpen(false);
        } catch (error) {
            console.error('Error:', error);
            setNotificationMessage(error.message);
            setIsNotificationOpen(true);
        }
    };

    // Función para manejar la edición de un trabajo
    const handleEditJob = async (data) => {
        try {
            const response = await fetch(`${API_URL}/editoferta`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    id: selectedJob.id
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al editar la oferta');
            }

            setNotificationMessage('Oferta actualizada exitosamente');
            setIsNotificationOpen(true);
            reloadEmpresaInfo();
            setIsAddJobModalOpen(false);
            setSelectedJob(null);
        } catch (error) {
            console.error('Error:', error);
            setNotificationMessage(error.message);
            setIsNotificationOpen(true);
        }
    };

    // Nueva función para manejar la creación de un curso
    const handleAddCourse = async (data) => {
        try {
            const response = await fetch(`${API_URL}/addcourse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    id_master: id // ID de la empresa
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al agregar el curso');
            }

            setNotificationMessage('Curso agregado exitosamente');
            setIsNotificationOpen(true);
            reloadEmpresaInfo();
            handleCloseCourseModal();
        } catch (error) {
            console.error('Error:', error);
            setNotificationMessage(error.message);
            setIsNotificationOpen(true);
        }
    };

    const handleConfirmDeleteCourse = async () => {
        try {
            const response = await fetch(`${API_URL}/deletecourse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: selectedCourseForDeletion.id
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al eliminar el curso');
            }

            setNotificationMessage('Curso eliminado exitosamente');
            setIsNotificationOpen(true);
            reloadEmpresaInfo();
            setIsDeleteCourseModalOpen(false);
            setSelectedCourseForDeletion(null);
        } catch (error) {
            console.error('Error:', error);
            setNotificationMessage(error.message);
            setIsNotificationOpen(true);
        }
    };

    return {
        empresa,
        jobOffers,
        isModalOpen,
        setModalOpen,
        isEditingName,
        setEditingName,
        isEditingAddress,
        setEditingAddress,
        isEditingType,
        setEditingType,
        isEditingDescription,
        setEditingDescription,
        editedName,
        setEditedName,
        editedAddress,
        setEditedAddress,
        editedProvince,
        setEditedProvince,
        editedMunicipality,
        setEditedMunicipality,
        editedType,
        setEditedType,
        editedDescription,
        setEditedDescription,
        handleOpenModal,
        handleCloseModal,
        handleSubmit,
        reloadEmpresaInfo,
        handleDeleteAccount,
        isDeleteModalOpen,
        setDeleteModalOpen,
        isCourseModalOpen,
        setCourseModalOpen,
        handleOpenCourseModal,
        handleCloseCourseModal,
        courses,
        selectedJob,
        setSelectedJob,
        selectedCourse,
        setSelectedCourse,
        isNotificationOpen,
        notificationMessage,
        setIsNotificationOpen,
        handleLogout,
        isDeleteJobModalOpen,
        setIsDeleteJobModalOpen,
        selectedJobForDeletion,
        setSelectedJobForDeletion,
        isAddJobModalOpen,
        setIsAddJobModalOpen,
        handleAddJob,
        handleEditJob,
        handleConfirmDeleteJob,
        handleAddCourse,
        handleEditCourse,
        isDeleteCourseModalOpen,
        setIsDeleteCourseModalOpen,
        selectedCourseForDeletion,
        setSelectedCourseForDeletion,
        handleConfirmDeleteCourse
    };
};

export default useEmpresaInfoLogic;
