import React from 'react';
import { useState } from 'react';
import useEmpresaInfoLogic from './useEmpresaInfoLogic';
import JobList from '../Ofertas/JobList';
import { provincesAndMunicipalities } from './data';
import EditableField from './EditableField'; // Import the EditableField component
import CourseList from '../Cursos/CourseList'; // Import CourseList
import GenericModal from '../generics/GenericModal';
import { deleteAccountModalConfig, deleteJobModalConfig, addEditJobModalConfig, courseModalConfig, deleteCourseModalConfig } from '../helpers/ModalConfigurations';
import NotificationPopup from '../generics/NotificationPopup';

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
        isCourseModalOpen, // Import course modal state
        handleOpenCourseModal, // Import course modal open function
        handleCloseCourseModal, // Import course modal close function
        courses,
        selectedJob,
        selectedCourse, // Agregar el estado del curso seleccionado
        handleCourseSelect, // Agregar la función para seleccionar un curso
        isNotificationOpen,
        notificationMessage,
        setIsNotificationOpen,
        handleLogout,
        isDeleteJobModalOpen,
        setIsDeleteJobModalOpen,
        handleJobSelect,
        selectedJobForDeletion,
        isAddJobModalOpen,
        setIsAddJobModalOpen,
        handleDeleteJob,
        handleConfirmDeleteJob,
        handleAddJob,
        handleEditJob,
        handleDeleteCourse,
        handleEditCourse,
        handleAddCourse,
        setSelectedCourse,
        isDeleteCourseModalOpen,
        setIsDeleteCourseModalOpen,
        selectedCourseForDeletion,
        handleConfirmDeleteCourse,
        setSelectedJob
    } = useEmpresaInfoLogic();

    // Si no hay datos de la empresa, mostrar un mensaje de carga
    if (!empresa) {
        return <p>Cargando información de la empresa...</p>;
    }

    return (
        <div className="empresa-info bg-white p-6 border border-gray-300 rounded-lg mt-4 shadow-lg hover:shadow-xl transition-shadow duration-200">
            {/* Campos editables */}
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                <EditableField
                    label="Nombre"
                    value={editedName}
                    isEditing={isEditingName}
                    onEditToggle={() => setEditingName(!isEditingName)}
                    onSave={() => {
                        setEditingName(false);
                        handleSubmit(localStorage.getItem('id'), 'http://localhost:3001');
                    }}
                    onChange={(e) => setEditedName(e.target.value)}
                />
                <EditableField
                    label="Dirección"
                    value={editedMunicipality}
                    isEditing={isEditingAddress}
                    onEditToggle={() => setEditingAddress(!isEditingAddress)}
                    onSave={() => {
                        setEditingAddress(false);
                        handleSubmit(localStorage.getItem('id'), 'http://localhost:3001');
                    }}
                    onChange={(e) => setEditedMunicipality(e.target.value)}
                    provinces={Object.keys(provincesAndMunicipalities)}
                    municipalities={provincesAndMunicipalities[editedProvince] || []}
                    selectedProvince={editedProvince}
                    onProvinceChange={(e) => {
                        setEditedProvince(e.target.value);
                        setEditedMunicipality('');
                    }}
                />
                <EditableField
                    label="Tipo"
                    value={editedType}
                    isEditing={isEditingType}
                    onEditToggle={() => setEditingType(!isEditingType)}
                    onSave={() => {
                        setEditingType(false);
                        handleSubmit(localStorage.getItem('id'), 'http://localhost:3001');
                    }}
                    onChange={(e) => setEditedType(e.target.value)}
                    options={["Estatal", "No estatal"]}
                />
            </div>
            <EditableField
                label="Descripción"
                value={editedDescription}
                isEditing={isEditingDescription}
                onEditToggle={() => setEditingDescription(!isEditingDescription)}
                onSave={() => {
                    setEditingDescription(false);
                    handleSubmit(localStorage.getItem('id'), 'http://localhost:3001');
                }}
                onChange={(e) => setEditedDescription(e.target.value)}
            />

            {/* Sección de Ofertas de Trabajo */}
            <h3 className="text-xl font-semibold mt-4">Ofertas de Trabajo</h3>

            {/* Botón para abrir el modal de agregar trabajo */}
            <button onClick={() => setIsAddJobModalOpen(true)} className="bg-blue-500 text-white p-2 rounded">
                Agregar Oferta de Trabajo
            </button>

            <GenericModal
                isOpen={isAddJobModalOpen}
                onClose={() => {
                    setIsAddJobModalOpen(false);
                    setSelectedJob(null); // Limpiar el trabajo seleccionado al cerrar el modal
                }}
                onSubmit={selectedJob ? handleEditJob : handleAddJob} // Usa handleEditJob si hay un trabajo seleccionado
                {...addEditJobModalConfig(selectedJob)} // Configuración dinámica para agregar/editar
            />

            {/* Lista de trabajos */}
            <JobList
                jobs={jobOffers}
                onJobSelect={handleJobSelect}
                onDeleteJob={handleDeleteJob} // Pasar la función de eliminación
                showDeleteButton={true}
            />

            {/* Modal genérico para confirmar la eliminación de un trabajo */}
            <GenericModal
                isOpen={isDeleteJobModalOpen}
                onClose={() => setIsDeleteJobModalOpen(false)}
                onSubmit={handleConfirmDeleteJob}
                {...deleteJobModalConfig(selectedJobForDeletion)} // Configuración dinámica para confirmar eliminación
            />

            {/* Sección de Cursos */}
            <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Cursos</h2>

            {/* Botón para abrir el modal de agregar curso */}
            <button
            onClick={() => {
                setSelectedCourse(null); // Asegurarse de que no haya un curso seleccionado
                handleOpenCourseModal();
            }}
            className="bg-green-500 text-white p-2 rounded mb-4"
            >
            Agregar Curso
            </button>

            {/* Modal genérico para confirmar la eliminación de un curso */}
            <GenericModal
            isOpen={isDeleteCourseModalOpen}
            onClose={() => setIsDeleteCourseModalOpen(false)}
            {...deleteCourseModalConfig(selectedCourseForDeletion)}
            onSubmit={handleConfirmDeleteCourse}
            />

            {/* Lista de cursos */}
            <CourseList
            courses={courses}
            onCourseSelect={handleCourseSelect}
            onDeleteCourse={handleDeleteCourse} // Pasar la función de eliminación
            showDeleteButton={true}
            showMoreInfo={false}
            />
            </div>

            {/* MODIFICACIÓN: Reemplazamos CourseModal con GenericModal */}
            {/* Usamos la nueva configuración courseModalConfig */}
            <GenericModal
            isOpen={isCourseModalOpen}
            onClose={handleCloseCourseModal}
            {...courseModalConfig(selectedCourse)}
            onSubmit={async (data) => {
                if (selectedCourse) {
                // Si hay un curso seleccionado, editarlo
                await handleEditCourse(selectedCourse.id, data);
                } else {
                // Si no hay un curso seleccionado, agregar uno nuevo
                await handleAddCourse(data);
                }

                // Cerrar el modal después de guardar
                handleCloseCourseModal();
            }}
            />

            {/* Botón para eliminar cuenta */}
            <button onClick={() => setDeleteModalOpen(true)} className="mt-4 bg-red-500 text-white p-2 rounded">
                Eliminar Cuenta
            </button>

            {/* Modal genérico para eliminar cuenta */}
            <GenericModal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onSubmit={(data) => handleDeleteAccount(data.password)}
                {...deleteAccountModalConfig}
            />

            {/* Popup de notificación */}
            <NotificationPopup
                isOpen={isNotificationOpen}
                onClose={() => {
                    setIsNotificationOpen(false);
                    handleLogout(); // Llamar a handleLogout cuando el popup se cierre
                }}
                message={notificationMessage}
                type="success"
            />
        </div>
    );
};

export default EmpresaInfo;