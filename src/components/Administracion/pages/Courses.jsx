import React, { useState } from 'react';
import CourseActions from './CourseActions';
import CourseTable from './CourseTable';
import AddCourseModal from './AddCourseModal';
import EditCourseModal from './EditCourseModal'; // Nuevo componente para editar
import SearchBar from './SearchBar';

const Courses = () => {
  const [courses, setCourses] = useState([
    { id: 1, nombre: 'Introducción a Python', empresa: 'Tech Solutions', duracion: '4 semanas', fechaInicio: '2023-10-01' },
    // ... más cursos ...
  ]);
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [isMultiDeleteMode, setIsMultiDeleteMode] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Estado para el modal de edición
  const [selectedCourse, setSelectedCourse] = useState(null); // Curso seleccionado para editar

  // Función para agregar un nuevo curso
  const handleAddCourse = (newCourse) => {
    const newId = courses.length > 0 ? Math.max(...courses.map((c) => c.id)) + 1 : 1;
    setCourses([...courses, { id: newId, ...newCourse }]);
    setFilteredCourses([...courses, { id: newId, ...newCourse }]);
  };

  // Función para editar un curso existente
  const handleEditCourse = (updatedCourse) => {
    setCourses(
      courses.map((course) =>
        course.id === updatedCourse.id ? { ...course, ...updatedCourse } : course
      )
    );
    setFilteredCourses(
      filteredCourses.map((course) =>
        course.id === updatedCourse.id ? { ...course, ...updatedCourse } : course
      )
    );
  };

  return (
    <div className="p-4">
      {/* Título */}
      <h2 className="text-2xl font-bold mb-4">Cursos</h2>

      {/* Encabezado con Botones Agregar, Eliminar y Buscador */}
      <div className="flex justify-between items-center mb-4">
        <CourseActions
          isMultiDeleteMode={isMultiDeleteMode}
          setIsMultiDeleteMode={setIsMultiDeleteMode}
          onAdd={() => setIsAddModalOpen(true)}
        />
        <SearchBar data={courses} setSearchResults={setFilteredCourses} />
      </div>

      {/* Tabla */}
      <CourseTable
        courses={filteredCourses}
        isMultiDeleteMode={isMultiDeleteMode}
        onEdit={(course) => {
          setSelectedCourse(course); // Guardar el curso seleccionado
          setIsEditModalOpen(true); // Abrir el modal de edición
        }}
      />

      {/* Modal de Agregar Curso */}
      <AddCourseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddCourse}
      />

      {/* Modal de Editar Curso */}
      <EditCourseModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        course={selectedCourse}
        onSave={handleEditCourse}
      />
    </div>
  );
};

export default Courses;