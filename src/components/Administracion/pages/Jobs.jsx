import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import { notifySuccess, notifyError } from '../components/ToastNotification';
import { FaPlus, FaTrash } from 'react-icons/fa';
import GenericModal from '../../generics/GenericModal';
import { addEditJobModalConfig } from '../../helpers/ModalConfigurations';
import InfoModal from '../components/table/InfoModal';
import SearchBar from './SearchBar';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMultiDeleteMode, setIsMultiDeleteMode] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [selectedJobForInfo, setSelectedJobForInfo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);

  // Cargar ofertas al montar el componente
  useEffect(() => {
    fetchJobs();
  }, []);

  // Añadir efecto para filtrar trabajos
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredJobs(jobs);
      return;
    }

    const filtered = jobs.filter(job => 
      job.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.provincia.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.municipio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.tipo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [searchTerm, jobs]);

  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:3001/getalloferta');
      const jobsData = await response.json();

      const jobsWithCompanyNames = await Promise.all(
        jobsData.map(async (job) => {
          try {
            const companyResponse = await fetch('http://localhost:3001/empresa', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id: job.id_empresa })
            });
            const companyData = await companyResponse.json();
            return {
              ...job,
              empresa: companyData.nombre || 'Empresa no encontrada',
              aplicacion: job.aplicacion || '',
              experiencia: job.experiencia || ''
            };
          } catch (error) {
            console.error('Error al obtener empresa:', error);
            return {
              ...job,
              empresa: 'Error al cargar',
              aplicacion: job.aplicacion || '',
              experiencia: job.experiencia || ''
            };
          }
        })
      );

      setJobs(jobsWithCompanyNames);
      setFilteredJobs(jobsWithCompanyNames);
      setIsLoading(false);
    } catch (error) {
      console.error('Error al cargar ofertas:', error);
      notifyError('Error al cargar las ofertas');
      setIsLoading(false);
    }
  };

  const handleAddJob = async (jobData) => {
    try {
      const response = await fetch('http://localhost:3001/addoferta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...jobData,
          id: jobData.id_empresa
        }),
      });

      if (response.ok) {
        notifySuccess('Oferta agregada exitosamente');
        fetchJobs();
        setIsAddModalOpen(false);
      } else {
        const data = await response.json();
        notifyError(data.error || 'Error al agregar la oferta');
      }
    } catch (error) {
      console.error('Error:', error);
      notifyError('Error al agregar la oferta');
    }
  };

  const handleEditJob = async (jobData) => {
    try {
      const response = await fetch('http://localhost:3001/editoferta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...jobData,
          id: selectedJob.id
        }),
      });

      if (response.ok) {
        notifySuccess('Oferta actualizada exitosamente');
        fetchJobs();
        setIsEditModalOpen(false);
        setSelectedJob(null);
      } else {
        const data = await response.json();
        notifyError(data.error || 'Error al actualizar la oferta');
      }
    } catch (error) {
      console.error('Error:', error);
      notifyError('Error al actualizar la oferta');
    }
  };

  const handleDeleteJobs = async (ids) => {
    try {
      const deletePromises = ids.map(id =>
        fetch('http://localhost:3001/deleteoferta', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id })
        }).then(response => {
          if (!response.ok) throw new Error('Error al eliminar la oferta');
          return response;
        })
      );

      await Promise.all(deletePromises);
      notifySuccess('Ofertas eliminadas exitosamente');
      fetchJobs();
      setIsMultiDeleteMode(false);
    } catch (error) {
      console.error('Error:', error);
      notifyError('Error al eliminar las ofertas');
    }
  };

  const infoFields = [
    { label: 'Título', key: 'titulo' },
    { label: 'Empresa', key: 'empresa' },
    { label: 'Provincia', key: 'provincia' },
    { label: 'Municipio', key: 'municipio' },
    { label: 'Tipo', key: 'tipo' },
    { label: 'Descripción', key: 'descripcion', type: 'textarea' },
    { label: 'Requerimientos', key: 'requerimientos', type: 'textarea' },
    { label: 'Beneficios', key: 'beneficios', type: 'textarea' },
    { label: 'Proceso de Aplicación', key: 'aplicacion', type: 'textarea' },
    { label: 'Salario', key: 'salario' },
    { label: 'Categoría', key: 'categoria' },
    { label: 'Experiencia', key: 'experiencia' }
  ];

  const headers = ['Título', 'Empresa', 'Provincia', 'Municipio', 'Fecha', 'Tipo'];

  const actions = {
    onEdit: (job) => {
      setSelectedJob(job);
      setIsEditModalOpen(true);
    },
    onDeleteMultiple: handleDeleteJobs,
    onAdd: () => setIsAddModalOpen(true),
    onInfo: (job) => {
      setSelectedJobForInfo(job);
      setIsInfoModalOpen(true);
    }
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="h-full p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Ofertas de Empleo</h2>
        <div className="flex space-x-4">
        <SearchBar
          data={jobs}
          setSearchResults={setFilteredJobs}
        />

          <button
            className="flex items-center text-green-500 hover:text-green-700"
            onClick={actions.onAdd}
          >
            <FaPlus className="mr-2" /> Agregar
          </button>
          <button
            className={`flex items-center ${
              isMultiDeleteMode ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
            }`}
            onClick={() => setIsMultiDeleteMode(!isMultiDeleteMode)}
          >
            <FaTrash className="mr-2" /> Eliminar
          </button>
        </div>
      </div>

      <Table
        headers={headers}
        data={filteredJobs.map(job => ({
          id: job.id,
          visibleData: {
            titulo: job.titulo,
            empresa: job.empresa,
            provincia: job.provincia,
            municipio: job.municipio,
            fecha: new Date(job.fecha).toLocaleDateString(),
            tipo: job.tipo
          },
          titulo: job.titulo,
          empresa: job.empresa,
          provincia: job.provincia,
          municipio: job.municipio,
          tipo: job.tipo,
          descripcion: job.descripcion,
          requerimientos: job.requerimientos,
          beneficios: job.beneficios,
          aplicacion: job.aplicacion,
          salario: job.salario,
          categoria: job.categoria,
          experiencia: job.experiencia,
          id_empresa: job.id_empresa,
          fecha: job.fecha
        }))}
        actions={actions}
        isMultiDeleteMode={isMultiDeleteMode}
      />

      {/* Modal de Agregar */}
      <GenericModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setSelectedJob(null);
        }}
        onSubmit={selectedJob ? handleEditJob : handleAddJob}
        {...addEditJobModalConfig(selectedJob, true)}
      />

      {/* Modal de Editar */}
      <GenericModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedJob(null);
        }}
        onSubmit={handleEditJob}
        {...addEditJobModalConfig(selectedJob)}
      />

      {/* Modal de Información */}
      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={() => {
          setIsInfoModalOpen(false);
          setSelectedJobForInfo(null);
        }}
        data={selectedJobForInfo}
        fields={infoFields}
      />
    </div>
  );
};

export default Jobs;