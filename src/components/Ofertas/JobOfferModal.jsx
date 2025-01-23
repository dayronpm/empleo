import React, { useState } from 'react';
import { provincesAndMunicipalities } from '../Perfil/data'; // Import the provinces and municipalities data

const API_URL = 'http://localhost:3001'; // Cambia esto si tu servidor está en otra URL

const JobOfferModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        titulo: '',
        provincia: '',
        municipio: '',
        descripcion: '',
        requerimientos: '',
        beneficios: '',
        salario: '',
        proceso_aplicacion: '',
        categoria: '',
        nivel_experiencia: '',
        tipo: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/addoferta`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    id: localStorage.getItem('id'), // Include the user ID
                }),
            });
            if (!response.ok) {
                throw new Error('Error al agregar la oferta de trabajo');
            }
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Agregar Nueva Oferta de Trabajo</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="titulo" placeholder="Título" onChange={handleChange} required className="border p-2 rounded mb-2 w-full" />
                    
                    <select name="provincia" onChange={handleChange} required className="border p-2 rounded mb-2 w-full">
                        <option value="">Selecciona una provincia</option>
                        {Object.keys(provincesAndMunicipalities).map((provincia) => (
                            <option key={provincia} value={provincia}>{provincia}</option>
                        ))}
                    </select>

                    <select name="municipio" onChange={handleChange} required className="border p-2 rounded mb-2 w-full">
                        <option value="">Selecciona un municipio</option>
                        {formData.provincia && provincesAndMunicipalities[formData.provincia].map((municipio) => (
                            <option key={municipio} value={municipio}>{municipio}</option>
                        ))}
                    </select>

                    <textarea name="descripcion" placeholder="Descripción" onChange={handleChange} required className="border p-2 rounded mb-2 w-full"></textarea>
                    <input type="text" name="requerimientos" placeholder="Requerimientos" onChange={handleChange} required className="border p-2 rounded mb-2 w-full" />
                    <input type="text" name="beneficios" placeholder="Beneficios" onChange={handleChange} required className="border p-2 rounded mb-2 w-full" />
                    <input type="number" name="salario" placeholder="Salario" onChange={handleChange} required className="border p-2 rounded mb-2 w-full" />
                    <input type="text" name="proceso_aplicacion" placeholder="Proceso de Aplicación" onChange={handleChange} required className="border p-2 rounded mb-2 w-full" />

                    <select name="categoria" onChange={handleChange} required className="border p-2 rounded mb-2 w-full">
                        <option value="">Selecciona una categoría</option>
                        <option value="Medio tiempo">Medio tiempo</option>
                        <option value="Tiempo completo">Tiempo completo</option>
                        <option value="Freelance">Freelance</option>
                    </select>

                    <select name="nivel_experiencia" onChange={handleChange} required className="border p-2 rounded mb-2 w-full">
                        <option value="">Selecciona un nivel de experiencia</option>
                        <option value="Junior">Junior</option>
                        <option value="Medio">Medio</option>
                        <option value="Senior">Senior</option>
                    </select>

                    <select name="tipo" onChange={handleChange} required className="border p-2 rounded mb-2 w-full">
                        <option value="">Selecciona un tipo</option>
                        <option value="Estatal">Estatal</option>
                        <option value="No estatal">No estatal</option>
                    </select>

                    <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">Agregar Oferta</button>
                </form>
                <button onClick={onClose} className="mt-2 text-red-500">Cerrar</button>
            </div>
        </div>
    );
};

export default JobOfferModal;
