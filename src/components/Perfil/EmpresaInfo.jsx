import React from 'react';

// Importamos el custom hook que maneja la lógica de la empresa
import useEmpresaInfoLogic from './useEmpresaInfoLogic';

// Componentes relacionados con ofertas de trabajo
import JobOfferModal from '../Ofertas/JobOfferModal';
import JobList from '../Ofertas/JobList';

// Modal de confirmación para eliminar ofertas de trabajo
import ConfirmDeleteModal from './ConfirmDeleteModal'; 

// Datos de provincias y municipios utilizados en los campos editables
import { provincesAndMunicipalities } from './data';

// Modal para eliminar la cuenta de la empresa
import DeleteAccountModal from './DeleteAccountModal';

// Componente para campos editables (nombre, dirección, etc.)
import EditableField from './EditableField'; 

// Componentes relacionados con cursos
import CourseModal from '../Cursos/CourseModal'; 
import CourseList from '../Cursos/CourseList'; 

const EmpresaInfo = () => {
    // Desestructuramos todas las propiedades del custom hook
    const {
        empresa, // Información de la empresa
        jobOffers, // Lista de ofertas de trabajo
        isModalOpen, setModalOpen, // Estado y función para abrir/cerrar modal de ofertas
        isEditingName, setEditingName, // Estado y función para editar el nombre de la empresa
        isEditingAddress, setEditingAddress, // Estado y función para editar la dirección
        isEditingType, setEditingType, // Estado y función para editar el tipo de empresa
        isEditingDescription, setEditingDescription, // Estado y función para editar la descripción
        editedName, setEditedName, // Valor y función para actualizar el nombre editado
        editedAddress, setEditedAddress, // Valor y función para actualizar la dirección editada
        editedProvince, setEditedProvince, // Valor y función para seleccionar provincia
        editedMunicipality, setEditedMunicipality, // Valor y función para seleccionar municipio
        editedType, setEditedType, // Valor y función para seleccionar el tipo de empresa
        editedDescription, setEditedDescription, // Valor y función para actualizar la descripción editada
        handleOpenModal, handleCloseModal, // Funciones para abrir/cerrar modales
        handleSubmit, // Función para enviar cambios al servidor
        handleDeleteAccount, // Función para eliminar la cuenta de la empresa
        isDeleteModalOpen, setDeleteModalOpen, // Estado y función para abrir/cerrar modal de eliminación de cuenta
        deleteJob, // Función para eliminar una oferta de trabajo
        isCourseModalOpen, handleOpenCourseModal, handleCloseCourseModal, // Estados y funciones para manejar el modal de cursos
        handleAddCourse, // Función para agregar un curso
        courses, // Lista de cursos
        selectedJob, handleJobSelect, // Oferta seleccionada y función para seleccionar oferta
        selectedCourse, setSelectedCourse, handleCourseSelect, // Curso seleccionado y funciones para manejarlo
        handleEditCourse, // Función para editar un curso
        deleteCourse, // Función para eliminar un curso
        isDeleteJobModalOpen, setIsDeleteJobModalOpen, // Estado y función para abrir/cerrar modal de eliminación de oferta
        selectedJobForDeletion, setSelectedJobForDeletion, // Oferta seleccionada para eliminación
        handleDeleteJob, handleConfirmDeleteJob, // Funciones para eliminar una oferta de trabajo
        handleDeleteCourse // Función para eliminar un curso
    } = useEmpresaInfoLogic();

    // Si no hay información de la empresa, mostramos un mensaje de carga
    if (!empresa) {
        return <p>Cargando información de la empresa...</p>;
    }

    return (
        <div className="empresa-info bg-white p-6 border border-gray-300 rounded-lg mt-4 shadow-lg hover:shadow-xl transition-shadow duration-200">
            {/* Sección de información editable de la empresa */}
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                {/* Campo editable para el nombre de la empresa */}
                <EditableField 
                    label="Nombre"
                    value={editedName}
                    isEditing={isEditingName}
                    onEditToggle={() => setEditingName(!isEditingName)}
                    onSave={() => { setEditingName(false); handleSubmit(localStorage.getItem('id'), 'http://localhost:3001'); }}
                    onChange={(e) => setEditedName(e.target.value)}
                />
                {/* Campo editable para la dirección de la empresa */}
                <EditableField 
                    label="Dirección"
                    value={editedMunicipality}
                    isEditing={isEditingAddress}
                    onEditToggle={() => setEditingAddress(!isEditingAddress)}
                    onSave={() => { setEditingAddress(false); handleSubmit(localStorage.getItem('id'), 'http://localhost:3001'); }}
                    onChange={(e) => setEditedMunicipality(e.target.value)}
                    provinces={Object.keys(provincesAndMunicipalities)} // Provincias disponibles
                    municipalities={provincesAndMunicipalities[editedProvince] || []} // Municipios basados en la provincia seleccionada
                    selectedProvince={editedProvince}
                    onProvinceChange={(e) => {
                        setEditedProvince(e.target.value);
                        setEditedMunicipality(''); // Reiniciamos el municipio cuando cambia la provincia
                    }}
                />
                {/* Campo editable para el tipo de empresa */}
                <EditableField 
                    label="Tipo"
                    value={editedType}
                    isEditing={isEditingType}
                    onEditToggle={() => {
                        setEditingType(true);
                        setEditedType(empresa.type || "Estatal"); // Inicializamos con el valor actual o predeterminado
                    }}
                    onSave={() => { 
                        setEditingType(false); 
                        handleSubmit(localStorage.getItem('id'), 'http://localhost:3001'); 
                    }}
                    onChange={(e) => setEditedType(e.target.value)}
                    options={["Estatal", "No estatal"]} // Opciones disponibles para el tipo de empresa
                />
            </div>
            {/* Campo editable para la descripción de la empresa */}
            <EditableField 
                label="Descripción"
                value={editedDescription}
                isEditing={isEditingDescription}
                onEditToggle={() => setEditingDescription(!isEditingDescription)}
                onSave={() => { setEditingDescription(false); handleSubmit(localStorage.getItem('id'), 'http://localhost:3001'); }}
                onChange={(e) => setEditedDescription(e.target.value)}
            />

            {/* Sección de ofertas de trabajo */}
            <h3 className="text-xl font-semibold mt-4">Ofertas de Trabajo</h3>
            {/* Botón para abrir el modal de creación de ofertas */}
            <button onClick={handleOpenModal} className="mt-4 mb-4 bg-blue-500 text-white p-2 rounded">Agregar Oferta de Trabajo</button>
            {/* Modal para crear/editar ofertas de trabajo */}
            <JobOfferModal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                selectedJob={selectedJob} 
            />
            {/* Lista de ofertas de trabajo */}
            <JobList 
                jobs={jobOffers} 
                onJobSelect={handleJobSelect} 
                onDeleteJob={handleDeleteJob} 
                showDeleteButton={true} // Habilita el botón de eliminación
            />
            {/* Modal de confirmación para eliminar una oferta */}
            <ConfirmDeleteModal 
                isOpen={isDeleteJobModalOpen} 
                job={selectedJobForDeletion} 
                onClose={() => setIsDeleteJobModalOpen(false)} 
                onConfirm={handleConfirmDeleteJob} 
            />

            {/* Sección de cursos */}
            <h3 className="text-xl font-semibold mt-4">Cursos</h3>
            {/* Botón para abrir el modal de creación de cursos */}
            <button onClick={handleOpenCourseModal} className="mt-4 mb-4 bg-green-500 text-white p-2 rounded">Agregar Curso</button>
            {/* Modal para crear/editar cursos */}
            <CourseModal 
                isOpen={isCourseModalOpen} 
                onClose={handleCloseCourseModal} 
                course={selectedCourse}
            />
            {/* Lista de cursos */}
            <CourseList 
                courses={courses} 
                onCourseSelect={handleCourseSelect} 
                onDeleteCourse={handleDeleteCourse} 
                showDeleteButton={true} // Habilita el botón de eliminación
                showMoreInfo={false} // Oculta la opción "Más información"
            />

            {/* Botón para eliminar la cuenta de la empresa */}
            <button onClick={() => setDeleteModalOpen(true)} className="mt-4 bg-red-500 text-white p-2 rounded">Eliminar Cuenta</button>
            {/* Modal de confirmación para eliminar la cuenta */}
            <DeleteAccountModal 
                isOpen={isDeleteModalOpen} 
                onClose={() => setDeleteModalOpen(false)} 
                onDelete={handleDeleteAccount} 
            />
        </div>
    );
};

export default EmpresaInfo;