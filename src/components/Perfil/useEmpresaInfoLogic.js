import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const API_URL = 'http://localhost:3001'; // Change this if your server is at a different URL

const useEmpresaInfoLogic = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [empresa, setEmpresa] = useState(null);
    const [jobOffers, setJobOffers] = useState([]); // State for job offers
    const [courses, setCourses] = useState([]); // State for courses
    const courseData = '';
    const id = localStorage.getItem('id'); // Get the user ID
    const [selectedCourse, setSelectedCourse] = useState(null); // State for selected course

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
            setCourses(courses); // Set job offers in state
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchEmpresaData();
    }, []);

    const reloadEmpresaInfo = () => {
        fetchEmpresaData(); // Call fetchEmpresaData to reload the data
    };

    const [isModalOpen, setModalOpen] = useState(false);
    const [isEditingName, setEditingName] = useState(false);
    const [isEditingAddress, setEditingAddress] = useState(false);
    const [isEditingType, setEditingType] = useState(false);
    const [isEditingDescription, setEditingDescription] = useState(false);
    
    const [editedName, setEditedName] = useState('');
    const [editedAddress, setEditedAddress] = useState('');
    const [editedProvince, setEditedProvince] = useState('');
    const [editedMunicipality, setEditedMunicipality] = useState('');
    const [editedType, setEditedType] = useState('');
    const [editedDescription, setEditedDescription] = useState('');

    // State for delete modal
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    // State for Course Modal
    const [isCourseModalOpen, setCourseModalOpen] = useState(false);

    // Function to open Course Modal
    const handleOpenCourseModal = () => {
        setCourseModalOpen(true);
    };

    // Function to close Course Modal
    const handleCloseCourseModal = () => {
        setCourseModalOpen(false);
    };

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
            const response = await fetch(`${API_URL}/borrarempresa`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, password }), // Send the ID and password in the request body
            });
            if (response.ok) {
                alert('Cuenta eliminada con éxito.');
                handleLogout(); // Call the logout function
            } else {
                alert('Error al eliminar la cuenta.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al eliminar la cuenta.');
        }
    };

        // Nuevo estado para almacenar la oferta seleccionada
        const [selectedJob, setSelectedJob] = useState(null);

        // Función para manejar la selección de un trabajo
        const handleJobSelect = (job) => {
            setSelectedJob(job); // Guarda la oferta seleccionada
            setModalOpen(true); // Abre el modal
        };

        const handleCourseSelect = (course) => {
            setSelectedCourse(course); // Guarda el curso seleccionado
            setCourseModalOpen(true); // Abre el modal
        };

        const handleEditCourse = async (courseId, updatedData) => {
            try {
                const response = await fetch(`${API_URL}/editcourse`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: courseId, ...updatedData }),
                });
                if (!response.ok) throw new Error('Error al editar el curso');
                reloadEmpresaInfo(); // Refresca la lista de cursos
            } catch (error) {
                console.error('Error:', error);
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
        handleOpenCourseModal,
        handleCloseCourseModal,
        courses,
        courseData,
        selectedJob,
        handleJobSelect,
        selectedCourse, // Agregar el estado del curso seleccionado
        setSelectedCourse, // Agregar la función para actualizar el curso seleccionado
        handleCourseSelect, // Agregar la función para seleccionar un curso
        handleEditCourse, 
    };
};

export default useEmpresaInfoLogic;
