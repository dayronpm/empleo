import React, { useState } from 'react';

const Filters = ({ onFilterChange, locationData }) => {
    const [selectedProvince, setSelectedProvince] = useState('');
    const [municipalities, setMunicipalities] = useState([]);

    const handleProvinceChange = (event) => {
        const province = event.target.value;
        setSelectedProvince(province);
        setMunicipalities(locationData[province] || []);
        onFilterChange({ target: { name: 'municipio', value: '' } }); // Reset municipality filter
        onFilterChange({ target: { name: 'provincia', value: province } }); // Update province filter
    };

    return (
        <div className="flex space-x-4 mb-4 md:mb-0">

            {/* Filtro por categoria */}
            <select name="categoria" onChange={onFilterChange} className="border border-gray-300 rounded-lg p-2">
                <option value="">Categoría</option>
                <option value="Tiempo completo">Tiempo Completo</option>
                <option value="Medio tiempo">Medio Tiempo</option>
                <option value="Freelance">Freelance</option>
            </select>

            {/* Filtro por provincia */}
            <select name="provincia" onChange={handleProvinceChange} className="border border-gray-300 rounded-lg p-2">
                <option value="">Provincia</option>
                {Object.keys(locationData).map((province) => (
                    <option key={province} value={province}>{province}</option>
                ))}
            </select>

            {/* Filtro por municipio */}
            <select name="municipio" onChange={onFilterChange} className="border border-gray-300 rounded-lg p-2">
                <option value="">Municipio</option>
                {municipalities.map((municipio) => (
                    <option key={municipio} value={municipio}>{municipio}</option>
                ))}
            </select>

            {/* Filtro por experiencia */}
            <select name="experiencia" onChange={onFilterChange} className="border border-gray-300 rounded-lg p-2">
                <option value="">Nivel de Experiencia</option>
                <option value="Junior">Junior</option>
                <option value="Medio">Medio</option>
                <option value="Senior">Senior</option>
            </select>
        </div>
    );
};

export default Filters;
