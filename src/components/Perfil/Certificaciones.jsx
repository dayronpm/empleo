import React from 'react';

const Certificaciones = ({ formData, handleChange }) => {
    return (
        <div className="mb-4">
            <label className="block mb-2 text-lg font-bold">Certificaciones</label>
            <textarea 
                name='certifications' 
                value={formData.certifications} 
                onChange={handleChange} 
                className='w-full h-32 p-2 border border-gray-400 rounded focus:outline-none focus:border-blue-500'
                placeholder="Ingrese sus certificaciones aquí..."
            />
        </div>
    );
};

export default Certificaciones;
