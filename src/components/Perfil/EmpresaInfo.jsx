import React, { useState } from 'react';
import useEmpresaInfoLogic from './useEmpresaInfoLogic';
import JobList from '../Ofertas/JobList';
import CourseList from '../Cursos/CourseList';
import GenericModal from '../generics/GenericModal';
import { deleteAccountModalConfig, deleteJobModalConfig, addEditJobModalConfig, courseModalConfig, deleteCourseModalConfig, changePasswordModalConfig, editEmpresaInfoModalConfig } from '../helpers/ModalConfigurations';
import NotificationPopup from '../generics/NotificationPopup';
import Header from './Header';
import { BsPencilSquare, BsShieldLock } from "react-icons/bs";
import { FaFileExport } from "react-icons/fa";

const EmpresaInfo = () => {
    const {
        empresa,
        jobOffers,
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
        editedProvince,
        setEditedProvince,
        editedMunicipality,
        setEditedMunicipality,
        editedType,
        setEditedType,
        editedDescription,
        setEditedDescription,
        handleSubmit,
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
    } = useEmpresaInfoLogic();

    // Estados para los nuevos modales
    const [isEditInfoModalOpen, setIsEditInfoModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    // Función para regresar a la página anterior
    const goBack = () => {
        window.history.back();
    };

    // Si no hay datos de la empresa, mostrar un mensaje de carga
    if (!empresa) {
        return <p>Cargando información de la empresa...</p>;
    }

    // Preparar datos para el modal de edición
    const empresaData = {
        nombre: editedName,
        provincia: editedProvince,
        municipio: editedMunicipality,
        tipo: editedType,
        descripcion: editedDescription
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            {/* Encabezado */}
            <Header />
            
            {/* Contenido principal */}
            <div className="container mx-auto p-6">
                {/* Información de la empresa */}
                <div className="bg-[#e0e8f0] p-6 rounded-lg shadow-md mb-6">
                    {/* Título */}
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Información de la empresa</h2>

                    {/* Contenido principal */}
                    <div className="flex flex-wrap gap-8">
                        {/* Campos de información de la empresa */}
                        <div className="flex items-center gap-2">
                            <strong className="text-gray-700">Nombre:</strong>
                            <span>{editedName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <strong className="text-gray-700">Provincia:</strong>
                            <span>{editedProvince}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <strong className="text-gray-700">Municipio:</strong>
                            <span>{editedMunicipality}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <strong className="text-gray-700">Tipo:</strong>
                            <span>{editedType}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <strong className="text-gray-700">Descripción:</strong>
                            <span>{editedDescription}</span>
                        </div>
                        
                        
                    </div>
                    <div className="flex items-center gap-8 mt-4">
                    {/* Botón para editar información de la empresa */}
                    <button
                            onClick={() => setIsEditInfoModalOpen(true)}
                            className="flex items-center gap-1 text-red-500 hover:underline"
                        >
                            <BsPencilSquare size={16} /> Editar información
                        </button>

                        {/* Botón para cambiar contraseña */}
                        <button
                            onClick={() => setIsPasswordModalOpen(true)}
                            className="flex items-center gap-1 text-blue-500 hover:underline"
                        >
                            <BsShieldLock size={16} /> Cambiar contraseña
                        </button>
                        </div>
                </div>

                {/* Ofertas de trabajo */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-bold mb-4">Ofertas de Trabajo</h2>
                    <button
                        onClick={() => setIsAddJobModalOpen(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition-colors"
                    >
                        Agregar Oferta
                    </button>
                    <JobList
                        jobs={jobOffers}
                        onEdit={(job) => {
                            setSelectedJob(job);
                            setIsAddJobModalOpen(true);
                        }}
                        onDelete={(job) => {
                            setSelectedJobForDeletion(job);
                            setIsDeleteJobModalOpen(true);
                        }}
                        showDeleteButton={true}
                    />
                </div>

                {/* Cursos */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-bold mb-4">Cursos</h2>
                    <button
                        onClick={handleOpenCourseModal}
                        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600 transition-colors"
                    >
                        Agregar Curso
                    </button>
                    <CourseList
                        courses={courses}
                        onEdit={(course) => {
                            setSelectedCourse(course);
                            setCourseModalOpen(true);
                        }}
                        onDelete={(course) => {
                            setSelectedCourseForDeletion(course);
                            setIsDeleteCourseModalOpen(true);
                        }}
                        showDeleteButton={true}
                    />
                </div>

                {/* Botón Cerrar */}
                <button
                    onClick={goBack}
                    className="fixed bottom-4 right-4 bg-red-500 hover:bg-red-600 transition-colors text-white px-6 py-3 rounded-full shadow-md"
                >
                    Cerrar
                </button>

                {/* Botón de exportación */}
                <div className="absolute top-4 right-4">
                    <button className="bg-blue-500 hover:bg-blue-600 transition-colors text-white p-3 rounded-full shadow-md">
                        <FaFileExport size={20} />
                    </button>
                </div>
            </div>

            {/* Modal para editar información de la empresa */}
            <GenericModal
                isOpen={isEditInfoModalOpen}
                onClose={() => setIsEditInfoModalOpen(false)}
                title={editEmpresaInfoModalConfig.title}
                formContent={editEmpresaInfoModalConfig.formContent}
                actions={editEmpresaInfoModalConfig.actions}
                initialValues={{
                    nombre: editedName,
                    provincia: editedProvince,
                    municipio: editedMunicipality,
                    tipo: editedType,
                    descripcion: editedDescription
                }}
                customStyles={editEmpresaInfoModalConfig.customStyles}
                onSubmit={(data) => {
                    // Actualizar los estados locales con los nuevos valores
                    setEditedName(data.nombre);
                    setEditedProvince(data.provincia);
                    setEditedMunicipality(data.municipio);
                    setEditedType(data.tipo);
                    setEditedDescription(data.descripcion);
                    
                    // Enviar los datos al servidor
                    fetch('http://localhost:3001/updateempresa', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id: localStorage.getItem('id'),
                            nombre: data.nombre,
                            tipo: data.tipo,
                            descripcion: data.descripcion,
                            provincia: data.provincia,
                            municipio: data.municipio,
                        }),
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error al actualizar la información');
                        }
                        return response.text();
                    })
                    .then(() => {
                        // Cerrar el modal
                        setIsEditInfoModalOpen(false);
                        // Mostrar notificación de éxito
                        setIsNotificationOpen(true);
                        setNotificationMessage('Información actualizada exitosamente');
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        // Mostrar notificación de error
                        setIsNotificationOpen(true);
                        setNotificationMessage(error.message || 'Error al actualizar la información');
                    });
                }}
            />

            {/* Modal para cambiar contraseña */}
            <GenericModal
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
                title={changePasswordModalConfig.title}
                formContent={changePasswordModalConfig.formContent}
                actions={changePasswordModalConfig.actions}
                initialValues={{}}
                customStyles={changePasswordModalConfig.customStyles}
                onSubmit={(formData) => {
                    // Verificar que las contraseñas coincidan
                    if (formData.newPassword !== formData.confirmPassword) {
                        setIsNotificationOpen(true);
                        setNotificationMessage('Error: Las contraseñas no coinciden');
                        return;
                    }
                    
                    // Enviar solicitud al servidor
                    fetch('http://localhost:3001/updatepassword', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id: localStorage.getItem('id'),
                            currentPassword: formData.currentPassword,
                            newPassword: formData.newPassword
                        }),
                    })
                    .then(response => {
                        if (!response.ok) {
                            // Verificar si el error es por contraseña incorrecta
                            return response.text().then(text => {
                                if (text.includes('incorrecta')) {
                                    throw new Error('Error: La contraseña actual es incorrecta');
                                } else {
                                    throw new Error('Error al cambiar la contraseña');
                                }
                            });
                        }
                        return response.text();
                    })
                    .then(() => {
                        // Cerrar el modal
                        setIsPasswordModalOpen(false);
                        // Mostrar notificación de éxito
                        setIsNotificationOpen(true);
                        setNotificationMessage('Contraseña cambiada exitosamente');
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        // Mostrar notificación de error
                        setIsNotificationOpen(true);
                        setNotificationMessage(error.message || 'Error al cambiar la contraseña');
                    });
                }}
            />

            {/* Otros modales existentes */}
            <GenericModal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onSubmit={(data) => handleDeleteAccount(data.password)}
                {...deleteAccountModalConfig}
            />

            {/* Modal para editar/agregar ofertas de trabajo */}
            <GenericModal
                isOpen={isAddJobModalOpen}
                onClose={() => {
                    setIsAddJobModalOpen(false);
                    setSelectedJob(null);
                }}
                onSubmit={(data) => selectedJob ? handleEditJob(data) : handleAddJob(data)}
                {...addEditJobModalConfig(selectedJob)}
            />

            {/* Modal para eliminar ofertas de trabajo */}
            <GenericModal
                isOpen={isDeleteJobModalOpen}
                onClose={() => {
                    setIsDeleteJobModalOpen(false);
                    setSelectedJobForDeletion(null);
                }}
                onSubmit={handleConfirmDeleteJob}
                {...deleteJobModalConfig(selectedJobForDeletion)}
            />

            {/* Modal para editar/agregar cursos */}
            <GenericModal
                isOpen={isCourseModalOpen}
                onClose={() => {
                    handleCloseCourseModal();
                    setSelectedCourse(null);
                }}
                onSubmit={(data) => selectedCourse ? handleEditCourse(data) : handleAddCourse(data)}
                {...courseModalConfig(selectedCourse)}
            />

            {/* Modal para eliminar cursos */}
            <GenericModal
                isOpen={isDeleteCourseModalOpen}
                onClose={() => {
                    setIsDeleteCourseModalOpen(false);
                    setSelectedCourseForDeletion(null);
                }}
                onSubmit={handleConfirmDeleteCourse}
                {...deleteCourseModalConfig(selectedCourseForDeletion)}
            />

            {/* Notificación */}
            <NotificationPopup
                isOpen={isNotificationOpen}
                message={notificationMessage}
                onClose={() => setIsNotificationOpen(false)}
                type={notificationMessage.includes('Error') ? 'error' : 'success'}
            />
        </div>
    );
};

export default EmpresaInfo;