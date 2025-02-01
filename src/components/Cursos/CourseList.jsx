import React from 'react';

const CourseList = ({ courses, onCourseSelect }) => {
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
                        <a href={course.direccion} target="_blank" rel="noopener noreferrer">Más Información</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseList;