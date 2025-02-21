import React from 'react';

const CourseList = ({ courses, onCourseSelect, onDeleteCourse, showDeleteButton = false, showMoreInfo = false }) => {
    return (
        <div>
            <ul>
                {courses.map(course => (
                    <li 
                        key={course.id} 
                        className="border p-4 mb-2 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => onCourseSelect(course)} // Agregar onClick para seleccionar el curso
                    >
                        <h4 className="font-bold">{course.titulo}</h4>
                        <p>{course.descripcion}</p>
                        <p><strong>Nivel:</strong> {course.nivel}</p>
                        <p><strong>Modalidad:</strong> {course.modalidad}</p>
                        <p><strong>Precio:</strong> {course.precio}</p>

                        {/* Mostrar "Más información" solo si showMoreInfo es true */}
                        {showMoreInfo && (
                            <a href={course.direccion} target="_blank" rel="noopener noreferrer" className="block mt-2 text-blue-500 hover:underline">
                                Más Información
                            </a>
                        )}

                        {/* Mostrar el botón Eliminar solo si showDeleteButton es true */}
                        {showDeleteButton && (
                        <button
                            onClick={(e) => {
                            e.stopPropagation(); // Evita que el clic se propague al elemento padre
                            onDeleteCourse(course); // Llama a la función de eliminación
                            }}
                            className="mt-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Eliminar
                        </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseList;