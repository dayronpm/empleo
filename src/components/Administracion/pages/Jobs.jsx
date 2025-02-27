import React, { useState } from 'react';
import JobActions from './JobActions';
import JobTable from './JobTable';
import AddJobModal from './AddJobModal';
import EditJobModal from './EditJobModal'; // Nuevo componente para editar
import SearchBar from './SearchBar';

const Jobs = () => {
  const [jobs, setJobs] = useState([
    { id: 1, titulo: 'Desarrollador Frontend', empresa: 'Tech Solutions', ubicacion: 'Barcelona', fechaPublicacion: '2023-09-01' },
    // ... más ofertas ...
  ]);
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [isMultiDeleteMode, setIsMultiDeleteMode] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Estado para el modal de edición
  const [selectedJob, setSelectedJob] = useState(null); // Oferta seleccionada para editar

  // Función para agregar una nueva oferta de trabajo
  const handleAddJob = (newJob) => {
    const newId = jobs.length > 0 ? Math.max(...jobs.map((job) => job.id)) + 1 : 1;
    setJobs([...jobs, { id: newId, ...newJob }]);
    setFilteredJobs([...jobs, { id: newId, ...newJob }]);
  };

  // Función para editar una oferta de trabajo existente
  const handleEditJob = (updatedJob) => {
    setJobs(
      jobs.map((job) =>
        job.id === updatedJob.id ? { ...job, ...updatedJob } : job
      )
    );
    setFilteredJobs(
      filteredJobs.map((job) =>
        job.id === updatedJob.id ? { ...job, ...updatedJob } : job
      )
    );
  };

  return (
    <div className="p-4">
      {/* Título */}
      <h2 className="text-2xl font-bold mb-4">Ofertas de Empleo</h2>

      {/* Encabezado con Botones Agregar, Eliminar y Buscador */}
      <div className="flex justify-between items-center mb-4">
        <JobActions
          isMultiDeleteMode={isMultiDeleteMode}
          setIsMultiDeleteMode={setIsMultiDeleteMode}
          onAdd={() => setIsAddModalOpen(true)}
        />
        <SearchBar data={jobs} setSearchResults={setFilteredJobs} />
      </div>

      {/* Tabla */}
      <JobTable
        jobs={filteredJobs}
        isMultiDeleteMode={isMultiDeleteMode}
        onEdit={(job) => {
          setSelectedJob(job); // Guardar la oferta seleccionada
          setIsEditModalOpen(true); // Abrir el modal de edición
        }}
      />

      {/* Modal de Agregar Oferta de Trabajo */}
      <AddJobModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddJob}
      />

      {/* Modal de Editar Oferta de Trabajo */}
      <EditJobModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        job={selectedJob}
        onSave={handleEditJob}
      />
    </div>
  );
};

export default Jobs;