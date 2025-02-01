import React from 'react';

const CourseList = ({ courses }) => {
    return (
        <div>

            <ul>
                {courses.map(course => (
                    <li key={course.id} className="border p-4 mb-2">
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
