import React from 'react';

const DatosPersonales = ({ formData, handleChange, provincesAndMunicipalities }) => {
    return (
        <div className="mb-4">

            {/* Selección de Provincia y Municipio */}
            <div className="mb-4">
                <label className="block mb-1">Provincia</label>
                <select 
                    name="province" 
                    value={formData.province} 
                    onChange={handleChange} 
                    className="w-full p-2 border border-gray-300 rounded"
                >
                    <option value="">Seleccione una provincia</option>
                    {Object.keys(provincesAndMunicipalities).map((province) => (
                        <option key={province} value={province}>{province}</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block mb-1">Municipio</label>
                <select 
                    name="municipality" 
                    value={formData.municipality} 
                    onChange={handleChange} 
                    className="w-full p-2 border border-gray-300 rounded"
                    disabled={!formData.province}
                >
                    <option value="">Seleccione un municipio</option>
                    {provincesAndMunicipalities[formData.province]?.map((municipality) => (
                        <option key={municipality} value={municipality}>{municipality}</option>
                    ))}
                </select>
            </div>

            {/* Teléfono */}
            <div className="mb-4">
                <label className="block mb-1">Teléfono</label>
                <input 
                    type="text" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    className="w-full p-2 border border-gray-300 rounded" 
                />
            </div>

            {/* Correo Electrónico */}
            <div className="mb-4">
                <label className="block mb-1">Correo Electrónico</label>
                <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    className="w-full p-2 border border-gray-300 rounded" 
                />
            </div>

            {/* Perfil Profesional */}
            <div className="mb-4">
                <label className="block mb-1">Perfil Profesional</label>
                <textarea 
                    name="profile" 
                    value={formData.profile} 
                    onChange={handleChange} 
                    className="w-full p-2 border border-gray-300 rounded" 
                />
            </div>
        </div>
    );
};

export default DatosPersonales;
