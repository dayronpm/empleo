import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import { notifySuccess, notifyError } from '../components/ToastNotification';
import { FaPlus, FaTrash } from 'react-icons/fa';
import GenericModal from '../../generics/GenericModal';
import { courseModalConfig, deleteCourseModalConfig } from '../../helpers/ModalConfigurations';
import InfoModal from '../components/table/InfoModal';
import SearchBar from './SearchBar';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMultiDeleteMode, setIsMultiDeleteMode] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [selectedCourseForInfo, setSelectedCourseForInfo] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:3001/getallcourses');
      const coursesData = await response.json();
      setCourses(coursesData);
      setFilteredCourses(coursesData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error al cargar cursos:', error);
      notifyError('Error al cargar los cursos');
      setIsLoading(false);
    }
  };

  const handleAddCourse = async (courseData) => {
    try {
      const response = await fetch('http://localhost:3001/addcourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...courseData,
          id_master: courseData.id_empresa
        }),
      });

      if (response.ok) {
        notifySuccess('Curso agregado exitosamente');
        fetchCourses();
        setIsAddModalOpen(false);
      } else {
        const data = await response.json();
        notifyError(data.error || 'Error al agregar el curso');
      }
    } catch (error) {
      console.error('Error:', error);
      notifyError('Error al agregar el curso');
    }
  };

  const handleEditCourse = async (courseData) => {
    try {
      const response = await fetch('http://localhost:3001/editcourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...courseData,
          id: selectedCourse.id
        }),
      });

      if (response.ok) {
        notifySuccess('Curso actualizado exitosamente');
        fetchCourses();
        setIsEditModalOpen(false);
        setSelectedCourse(null);
      } else {
        const data = await response.json();
        notifyError(data.error || 'Error al actualizar el curso');
      }
    } catch (error) {
      console.error('Error:', error);
      notifyError('Error al actualizar el curso');
    }
  };

  const handleDeleteCourses = async (ids) => {
    try {
      const deletePromises = ids.map(id =>
        fetch('http://localhost:3001/deletecourse', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id })
        }).then(response => {
          if (!response.ok) throw new Error('Error al eliminar el curso');
          return response;
        })
      );

      await Promise.all(deletePromises);
      notifySuccess('Cursos eliminados exitosamente');
      fetchCourses();
      setIsMultiDeleteMode(false);
    } catch (error) {
      console.error('Error:', error);
      notifyError('Error al eliminar los cursos');
    }
  };

  const infoFields = [
    { label: 'Título', key: 'titulo' },
    { label: 'Descripción', key: 'descripcion', type: 'textarea' },
    { label: 'Nivel', key: 'nivel' },
    { label: 'Requisitos', key: 'requisitos', type: 'textarea' },
    { label: 'Modalidad', key: 'modalidad' },
    { label: 'Dirección', key: 'direccion' },
    { label: 'Precio', key: 'precio' },
    { label: 'Descripción Completa', key: 'descripcionCompleta', type: 'textarea' }
  ];

  const headers = ['Título', 'Nivel', 'Modalidad', 'Precio'];

  const actions = {
    onEdit: (course) => {
      setSelectedCourse(course);
      setIsEditModalOpen(true);
    },
    onDeleteMultiple: handleDeleteCourses,
    onAdd: () => setIsAddModalOpen(true),
    onInfo: (course) => {
      setSelectedCourseForInfo(course);
      setIsInfoModalOpen(true);
    }
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Cursos</h2>
        <div className="flex space-x-4">
          <SearchBar
            data={courses}
            setSearchResults={setFilteredCourses}
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
        data={filteredCourses.map(course => ({
          id: course.id,
          visibleData: {
            titulo: course.titulo,
            nivel: course.nivel,
            modalidad: course.modalidad,
            precio: course.precio
          },
          ...course
        }))}
        actions={actions}
        isMultiDeleteMode={isMultiDeleteMode}
      />

      {/* Modal de Agregar */}
      <GenericModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setSelectedCourse(null);
        }}
        onSubmit={handleAddCourse}
        {...courseModalConfig(null, true)}
      />

      {/* Modal de Editar */}
      <GenericModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedCourse(null);
        }}
        onSubmit={handleEditCourse}
        {...courseModalConfig(selectedCourse)}
      />

      {/* Modal de Información */}
      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={() => {
          setIsInfoModalOpen(false);
          setSelectedCourseForInfo(null);
        }}
        data={selectedCourseForInfo}
        fields={infoFields}
      />
    </div>
  );
};

export default Courses;