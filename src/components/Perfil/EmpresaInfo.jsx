import React from 'react';
import { useState } from 'react';
import useEmpresaInfoLogic from './useEmpresaInfoLogic';
import JobOfferModal from '../Ofertas/JobOfferModal';
import JobList from '../Ofertas/JobList';
import { provincesAndMunicipalities } from './data';
import DeleteAccountModal from './DeleteAccountModal';
import EditableField from './EditableField'; // Import the EditableField component
import CourseModal from '../Cursos/CourseModal'; // Import CourseModal
import CourseList from '../Cursos/CourseList'; // Import CourseList

const EmpresaInfo = () => {
    const {
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
        handleDeleteAccount,
        isDeleteModalOpen,
        setDeleteModalOpen,
        isCourseModalOpen, // Import course modal state
        handleOpenCourseModal, // Import course modal open function
        handleCloseCourseModal, // Import course modal close function
        handleAddCourse,
        courseData,
        courses,
        selectedJob,
        handleJobSelect // Import handleAddCourse function
    } = useEmpresaInfoLogic();

    if (!empresa) {
        return <p>Cargando información de la empresa...</p>;
    }

    return (
        <div className="empresa-info bg-white p-6 border border-gray-300 rounded-lg mt-4 shadow-lg hover:shadow-xl transition-shadow duration-200">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                <EditableField 
                    label="Nombre"
                    value={editedName}
                    isEditing={isEditingName}
                    onEditToggle={() => setEditingName(!isEditingName)}
                    onSave={() => { setEditingName(false); handleSubmit(localStorage.getItem('id'), 'http://localhost:3001'); }}
                    onChange={(e) => setEditedName(e.target.value)}
                />
                <EditableField 
                    label="Dirección"
                    value={editedMunicipality}
                    isEditing={isEditingAddress}
                    onEditToggle={() => setEditingAddress(!isEditingAddress)}
                    onSave={() => { setEditingAddress(false); handleSubmit(localStorage.getItem('id'), 'http://localhost:3001'); }}
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
                    onSave={() => { setEditingType(false); handleSubmit(localStorage.getItem('id'), 'http://localhost:3001'); }}
                    onChange={(e) => setEditedType(e.target.value)}
                    options={["Estatal", "No estatal"]}
                />
            </div>
            <EditableField 
                label="Descripción"
                value={editedDescription}
                isEditing={isEditingDescription}
                onEditToggle={() => setEditingDescription(!isEditingDescription)}
                onSave={() => { setEditingDescription(false); handleSubmit(localStorage.getItem('id'), 'http://localhost:3001'); }}
                onChange={(e) => setEditedDescription(e.target.value)}
            />
            <h3 className="text-xl font-semibold mt-4">Ofertas de Trabajo</h3>
            <button onClick={handleOpenModal} className="mt-4 mb-4 bg-blue-500 text-white p-2 rounded">Agregar Oferta de Trabajo</button>
            <JobOfferModal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                selectedJob={selectedJob} // Pasa la oferta seleccionada al modal
            />
            <JobList jobs={jobOffers} onJobSelect={handleJobSelect} /> {/* Pasa la función de selección */}
            <h3 className="text-xl font-semibold mt-4">Cursos</h3>
            <button onClick={handleOpenCourseModal} className="mt-4 mb-4 bg-green-500 text-white p-2 rounded">Agregar Curso</button>
            <CourseModal isOpen={isCourseModalOpen} onClose={handleCloseCourseModal} />
            <CourseList courses={courses} />
            <button onClick={() => setDeleteModalOpen(true)} className="mt-4 bg-red-500 text-white p-2 rounded"> 
                Eliminar Cuenta
            </button>
            <DeleteAccountModal 
                isOpen={isDeleteModalOpen} 
                onClose={() => setDeleteModalOpen(false)} 
                onDelete={handleDeleteAccount} 
            />
        </div>
    );
};

export default EmpresaInfo;