import React from 'react';
import useEmpresaInfoLogic from './useEmpresaInfoLogic';
import JobList from '../Ofertas/JobList';
import CourseList from '../Cursos/CourseList';
import GenericModal from '../generics/GenericModal';
import { 
    deleteAccountModalConfig, 
    deleteJobModalConfig, 
    addEditJobModalConfig, 
    courseModalConfig, 
    deleteCourseModalConfig, 
    changePasswordModalConfig, 
    editEmpresaInfoModalConfig 
} from '../helpers/ModalConfigurations';
import NotificationPopup from '../generics/NotificationPopup';
import Header from './Header';
import { BsPencilSquare, BsShieldLock } from "react-icons/bs";
import { FaFileExport } from "react-icons/fa";

const EmpresaInfo = () => {
    // Custom hook para la lógica de negocio
    const {
        empresa,
        jobOffers,
        editedName,
        editedProvince,
        editedMunicipality,
        editedType,
        editedDescription,
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
        handleConfirmDeleteCourse,
        isEditInfoModalOpen,
        setIsEditInfoModalOpen,
        isPasswordModalOpen,
        setIsPasswordModalOpen,
        handleUpdateEmpresa,
        handleUpdatePassword
    } = useEmpresaInfoLogic();

    // Función para regresar a la página anterior
    const goBack = () => window.history.back();

    // Si no hay datos de la empresa, mostrar mensaje de carga
    if (!empresa) return <p>Cargando información de la empresa...</p>;

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <Header />
            
            <div className="container mx-auto p-6">
                {/* Información de la empresa */}
                <div className="bg-[#e0e8f0] p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Información de la empresa</h2>
                    <div className="flex flex-wrap gap-8">
                        <InfoField label="Nombre" value={editedName} />
                        <InfoField label="Provincia" value={editedProvince} />
                        <InfoField label="Municipio" value={editedMunicipality} />
                        <InfoField label="Tipo" value={editedType} />
                        <InfoField label="Descripción" value={editedDescription} />
                    </div>
                    <div className="flex items-center gap-8 mt-4">
                        <ActionButton
                            onClick={() => setIsEditInfoModalOpen(true)}
                            icon={<BsPencilSquare size={16} />}
                            text="Editar información"
                            className="text-red-500"
                        />
                        <ActionButton
                            onClick={() => setIsPasswordModalOpen(true)}
                            icon={<BsShieldLock size={16} />}
                            text="Cambiar contraseña"
                            className="text-blue-500"
                        />
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

                {/* Botones flotantes */}
                <button
                    onClick={goBack}
                    className="fixed bottom-4 right-4 bg-red-500 hover:bg-red-600 transition-colors text-white px-6 py-3 rounded-full shadow-md"
                >
                    Cerrar
                </button>
                <div className="absolute top-4 right-4">
                    <button className="bg-blue-500 hover:bg-blue-600 transition-colors text-white p-3 rounded-full shadow-md">
                        <FaFileExport size={20} />
                    </button>
                </div>
            </div>

            {/* Modales */}
            <GenericModal
                isOpen={isEditInfoModalOpen}
                onClose={() => setIsEditInfoModalOpen(false)}
                onSubmit={handleUpdateEmpresa}
                {...editEmpresaInfoModalConfig}
                initialValues={{
                    nombre: empresa?.nombre || "",
                    provincia: empresa?.provincia || "",
                    municipio: empresa?.municipio || "",
                    tipo: empresa?.tipo || "",
                    descripcion: empresa?.descripcion || ""
                }}
            />

            <GenericModal
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
                onSubmit={handleUpdatePassword}
                {...changePasswordModalConfig}
            />

            <GenericModal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onSubmit={(data) => handleDeleteAccount(data.password)}
                {...deleteAccountModalConfig}
            />

            <GenericModal
                isOpen={isAddJobModalOpen}
                onClose={() => {
                    setIsAddJobModalOpen(false);
                    setSelectedJob(null);
                }}
                onSubmit={(data) => selectedJob ? handleEditJob(data) : handleAddJob(data)}
                {...addEditJobModalConfig(selectedJob)}
            />

            <GenericModal
                isOpen={isDeleteJobModalOpen}
                onClose={() => {
                    setIsDeleteJobModalOpen(false);
                    setSelectedJobForDeletion(null);
                }}
                onSubmit={handleConfirmDeleteJob}
                {...deleteJobModalConfig(selectedJobForDeletion)}
            />

            <GenericModal
                isOpen={isCourseModalOpen}
                onClose={() => {
                    handleCloseCourseModal();
                    setSelectedCourse(null);
                }}
                onSubmit={(data) => selectedCourse ? handleEditCourse(data) : handleAddCourse(data)}
                {...courseModalConfig(selectedCourse)}
            />

            <GenericModal
                isOpen={isDeleteCourseModalOpen}
                onClose={() => {
                    setIsDeleteCourseModalOpen(false);
                    setSelectedCourseForDeletion(null);
                }}
                onSubmit={handleConfirmDeleteCourse}
                {...deleteCourseModalConfig(selectedCourseForDeletion)}
            />

            <NotificationPopup
                isOpen={isNotificationOpen}
                message={notificationMessage}
                onClose={() => setIsNotificationOpen(false)}
                type={notificationMessage.includes('Error') ? 'error' : 'success'}
            />
        </div>
    );
};

// Componentes auxiliares
const InfoField = ({ label, value }) => (
    <div className="flex items-center gap-2">
        <strong className="text-gray-700">{label}:</strong>
        <span>{value}</span>
    </div>
);

const ActionButton = ({ onClick, icon, text, className }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-1 hover:underline ${className}`}
    >
        {icon} {text}
    </button>
);

export default EmpresaInfo;