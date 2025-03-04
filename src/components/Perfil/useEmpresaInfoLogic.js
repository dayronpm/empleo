import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3001';

const useEmpresaInfoLogic = () => {
    const navigate = useNavigate(); 
    const id = localStorage.getItem('id');

    // Estados principales
    const [empresa, setEmpresa] = useState(null);
    const [jobOffers, setJobOffers] = useState([]); 
    const [courses, setCourses] = useState([]); 

    // Estados de edición de información
    const [editedName, setEditedName] = useState(''); 
    const [editedProvince, setEditedProvince] = useState(''); 
    const [editedMunicipality, setEditedMunicipality] = useState(''); 
    const [editedType, setEditedType] = useState(''); 
    const [editedDescription, setEditedDescription] = useState(''); 

    // Estados de modales
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); 
    const [isCourseModalOpen, setCourseModalOpen] = useState(false);
    const [isDeleteJobModalOpen, setIsDeleteJobModalOpen] = useState(false);
    const [isAddJobModalOpen, setIsAddJobModalOpen] = useState(false);
    const [isDeleteCourseModalOpen, setIsDeleteCourseModalOpen] = useState(false);
    const [isEditInfoModalOpen, setIsEditInfoModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    // Estados de selección
    const [selectedJob, setSelectedJob] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedJobForDeletion, setSelectedJobForDeletion] = useState(null);
    const [selectedCourseForDeletion, setSelectedCourseForDeletion] = useState(null);

    // Estados de notificación
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");

    // Cargar datos iniciales
    useEffect(() => {
        fetchEmpresaData();
    }, []);

    // Sincronizar campos editables con datos de la empresa
    useEffect(() => {
        if (empresa) {
            setEditedName(empresa.nombre || '');
            setEditedProvince(empresa.provincia || '');
            setEditedMunicipality(empresa.municipio || '');
            setEditedType(empresa.tipo || '');
            setEditedDescription(empresa.descripcion || '');
        }
    }, [empresa]);

    // Funciones de carga de datos
    const fetchEmpresaData = async () => {
        try {
            // Cargar datos de la empresa
            const empresaResponse = await fetch(`${API_URL}/api/empresas/${id}`);
            if (!empresaResponse.ok) throw new Error('Error al cargar la información de la empresa');
            const empresaData = await empresaResponse.json();
            setEmpresa(empresaData);

            // Cargar ofertas de trabajo usando la nueva ruta RESTful
            const offersResponse = await fetch(`${API_URL}/api/empresas/${id}/ofertas`);
            if (!offersResponse.ok) throw new Error('Error al cargar las ofertas de trabajo');
            const offersData = await offersResponse.json();
            setJobOffers(offersData.ofertas);

            // Cargar cursos usando la nueva ruta RESTful
            const coursesResponse = await fetch(`${API_URL}/api/empresas/${id}/cursos`);
            if (!coursesResponse.ok) throw new Error('Error al cargar los cursos');
            const coursesData = await coursesResponse.json();
            setCourses(coursesData.cursos);
        } catch (error) {
            console.error('Error al cargar datos:', error);
            setNotificationMessage('Error al cargar los datos');
            setIsNotificationOpen(true);
        }
    };

    // Handlers para trabajos
    const handleAddJob = async (data) => {
        try {
            const response = await fetch(`${API_URL}/addoferta`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, id }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al agregar la oferta');
            }

            setNotificationMessage('Oferta agregada exitosamente');
            setIsNotificationOpen(true);
            await fetchEmpresaData();
            setIsAddJobModalOpen(false);
        } catch (error) {
            console.error('Error:', error);
            setNotificationMessage(error.message);
            setIsNotificationOpen(true);
        }
    };

    const handleEditJob = async (data) => {
        try {
            const response = await fetch(`${API_URL}/api/ofertas/${selectedJob.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al editar la oferta');
            }

            setNotificationMessage('Oferta actualizada exitosamente');
            setIsNotificationOpen(true);
            await fetchEmpresaData();
            setIsAddJobModalOpen(false);
            setSelectedJob(null);
        } catch (error) {
            console.error('Error:', error);
            setNotificationMessage(error.message);
            setIsNotificationOpen(true);
        }
    };

    const handleConfirmDeleteJob = async () => {
        try {
            const response = await fetch(`${API_URL}/deleteoferta`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: selectedJobForDeletion.id }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al eliminar la oferta');
            }

            setNotificationMessage('Oferta eliminada exitosamente');
            setIsNotificationOpen(true);
            await fetchEmpresaData();
            setIsDeleteJobModalOpen(false);
            setSelectedJobForDeletion(null);
        } catch (error) {
            console.error('Error:', error);
            setNotificationMessage(error.message);
            setIsNotificationOpen(true);
        }
    };

    // Handlers para cursos
    const handleOpenCourseModal = () => setCourseModalOpen(true);
    const handleCloseCourseModal = () => setCourseModalOpen(false);

    const handleAddCourse = async (data) => {
        try {
            const response = await fetch(`${API_URL}/addcourse`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, id_master: id }),
            });

            const responseData = await response.json();

            if (!response.ok) {
                if (responseData.details) {
                    // Si hay detalles de validación, mostrarlos
                    const errorMessages = Object.values(responseData.details)
                        .filter(msg => msg !== null)
                        .join('\n');
                    throw new Error(errorMessages);
                }
                throw new Error(responseData.error || 'Error al agregar el curso');
            }

            setNotificationMessage('Curso agregado exitosamente');
            setIsNotificationOpen(true);
            await fetchEmpresaData();
            handleCloseCourseModal();
        } catch (error) {
            console.error('Error:', error);
            setNotificationMessage(error.message);
            setIsNotificationOpen(true);
        }
    };

    const handleEditCourse = async (data) => {
        try {
            const response = await fetch(`${API_URL}/editcourse`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, id: selectedCourse.id }),
            });

            const responseData = await response.json();

            if (!response.ok) {
                if (responseData.details) {
                    const errorMessages = Object.values(responseData.details)
                        .filter(msg => msg !== null)
                        .join('\n');
                    throw new Error(errorMessages);
                }
                throw new Error(responseData.error || 'Error al editar el curso');
            }

            setNotificationMessage('Curso actualizado exitosamente');
            setIsNotificationOpen(true);
            await fetchEmpresaData();
            setCourseModalOpen(false);
            setSelectedCourse(null);
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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: selectedCourseForDeletion.id }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al eliminar el curso');
            }

            setNotificationMessage('Curso eliminado exitosamente');
            setIsNotificationOpen(true);
            await fetchEmpresaData();
            setIsDeleteCourseModalOpen(false);
            setSelectedCourseForDeletion(null);
        } catch (error) {
            console.error('Error:', error);
            setNotificationMessage(error.message);
            setIsNotificationOpen(true);
        }
    };

    // Handler para eliminar cuenta
    const handleDeleteAccount = async (password) => {
        try {
            const response = await fetch(`${API_URL}/api/usuarios/${id}`, {
                method: 'DELETE',
                headers: {
                    'x-password': password
                }
            });
            
            if (response.ok) {
                setNotificationMessage("Cuenta eliminada con éxito.");
                setIsNotificationOpen(true);
                localStorage.clear();
                navigate('/');
            } else {
                const data = await response.json();
                setNotificationMessage(data.error || "Error al eliminar la cuenta");
                setIsNotificationOpen(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setNotificationMessage("Error al eliminar la cuenta.");
            setIsNotificationOpen(true);
        }
    };

    // Handlers para información de la empresa
    const handleUpdateEmpresa = async (data) => {
        try {
            const response = await fetch(`${API_URL}/api/empresas/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombreCompleto: data.nombre,
                    tipo: data.tipo,
                    descripcion: data.descripcion,
                    provincia: data.provincia,
                    municipio: data.municipio
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al actualizar la información');
            }

            const responseData = await response.json();
            
            // Actualizar el estado local con los datos devueltos
            setEmpresa(responseData.empresa);
            
            setIsEditInfoModalOpen(false);
            setIsNotificationOpen(true);
            setNotificationMessage('Información actualizada exitosamente');
        } catch (error) {
            console.error('Error:', error);
            setIsNotificationOpen(true);
            setNotificationMessage(error.message || 'Error al actualizar la información');
        }
    };

    const handleUpdatePassword = async (formData) => {
        if (formData.newPassword !== formData.confirmPassword) {
            setIsNotificationOpen(true);
            setNotificationMessage('Error: Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/updatepassword`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id,
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword
                }),
            });

            if (!response.ok) {
                const text = await response.text();
                if (text.includes('incorrecta')) {
                    throw new Error('Error: La contraseña actual es incorrecta');
                }
                throw new Error('Error al cambiar la contraseña');
            }

            setIsPasswordModalOpen(false);
            setIsNotificationOpen(true);
            setNotificationMessage('Contraseña cambiada exitosamente');
        } catch (error) {
            console.error('Error:', error);
            setIsNotificationOpen(true);
            setNotificationMessage(error.message || 'Error al cambiar la contraseña');
        }
    };

    return {
        // Datos principales
        empresa,
        jobOffers,
        courses,

        // Estados de edición
        editedName,
        setEditedName,
        editedProvince,
        setEditedProvince,
        editedMunicipality,
        setEditedMunicipality,
        editedType,
        setEditedType,
        editedDescription,
        setEditedDescription,

        // Estados de modales
        isDeleteModalOpen,
        setDeleteModalOpen,
        isCourseModalOpen,
        setCourseModalOpen,
        isDeleteJobModalOpen,
        setIsDeleteJobModalOpen,
        isAddJobModalOpen,
        setIsAddJobModalOpen,
        isDeleteCourseModalOpen,
        setIsDeleteCourseModalOpen,
        isEditInfoModalOpen,
        setIsEditInfoModalOpen,
        isPasswordModalOpen,
        setIsPasswordModalOpen,

        // Estados de selección
        selectedJob,
        setSelectedJob,
        selectedCourse,
        setSelectedCourse,
        selectedJobForDeletion,
        setSelectedJobForDeletion,
        selectedCourseForDeletion,
        setSelectedCourseForDeletion,

        // Estados de notificación
        isNotificationOpen,
        notificationMessage,
        setIsNotificationOpen,

        // Handlers
        handleOpenCourseModal,
        handleCloseCourseModal,
        handleAddJob,
        handleEditJob,
        handleConfirmDeleteJob,
        handleAddCourse,
        handleEditCourse,
        handleConfirmDeleteCourse,
        handleDeleteAccount,
        handleUpdateEmpresa,
        handleUpdatePassword,
    };
};

export default useEmpresaInfoLogic;
