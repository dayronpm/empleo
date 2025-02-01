import React, { useState, useEffect } from 'react';

const CourseModal = ({ isOpen, onClose, course }) => {
    const [courseData, setCourseData] = useState({
        titulo: '',
        descripcion: '',
        nivel: '',
        requisitos: '',
        modalidad: '',
        descripcionCompleta: '',
        direccion: '',
        precio: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (course) {
            setCourseData({
                titulo: course.titulo || '',
                descripcion: course.descripcion || '',
                nivel: course.nivel || '',
                requisitos: course.requisitos || '',
                modalidad: course.modalidad || '',
                descripcionCompleta: course.descripcionCompleta || '',
                direccion: course.direccion || '',
                precio: course.precio || '',
            });
        } else {
            setCourseData({
                titulo: '',
                descripcion: '',
                nivel: '',
                requisitos: '',
                modalidad: '',
                descripcionCompleta: '',
                direccion: '',
                precio: '',
            });
        }
    }, [course]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value });
    };

    const validateForm = () => {
        if (!courseData.nivel) {
            setErrorMessage('Debes seleccionar un nivel.');
            return false;
        }
        if (!courseData.modalidad) {
            setErrorMessage('Debes seleccionar una modalidad.');
            return false;
        }
        if (parseFloat(courseData.precio) <= 0) {
            setErrorMessage('El precio debe ser un número positivo.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const API_URL = 'http://localhost:3001';
            const id = localStorage.getItem('id');
            const endpoint = course ? '/editcourse' : '/addcourse';
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: course?.id || null,
                    ...courseData,
                    id_master: id,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al guardar el curso');
            }

            window.location.reload();
            onClose();
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-4 transition-transform duration-300 ease-in-out transform scale-100">
                <h2 className="text-xl font-bold text-center text-blue-600">
                    {course ? 'Editar Curso' : 'Agregar Nuevo Curso'}
                </h2>
                {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="titulo"
                        placeholder="Título"
                        value={courseData.titulo}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                        name="descripcion"
                        placeholder="Descripción"
                        value={courseData.descripcion}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        name="nivel"
                        value={courseData.nivel}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Selecciona un nivel</option>
                        <option value="Principiante">Principiante</option>
                        <option value="Intermedio">Intermedio</option>
                        <option value="Avanzado">Avanzado</option>
                    </select>
                    <input
                        type="text"
                        name="requisitos"
                        placeholder="Requisitos"
                        value={courseData.requisitos}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        name="modalidad"
                        value={courseData.modalidad}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Selecciona una modalidad</option>
                        <option value="Online">Online</option>
                        <option value="Presencial">Presencial</option>
                    </select>
                    <textarea
                        name="descripcionCompleta"
                        placeholder="Descripción Completa"
                        value={courseData.descripcionCompleta}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        name="direccion"
                        placeholder="Dirección"
                        value={courseData.direccion}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="number"
                        name="precio"
                        placeholder="Precio"
                        value={courseData.precio}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex justify-between space-x-4">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-300"
                        >
                            {course ? 'Guardar Cambios' : 'Agregar Curso'}
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full bg-red-500 text-white font-semibold py-2 rounded hover:bg-red-600 transition duration-300"
                        >
                            Cerrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CourseModal;