import React from 'react';

const EditableField = ({ 
    label, 
    value, 
    isEditing, 
    onEditToggle, 
    onSave, 
    onChange, 
    provinces, 
    municipalities, 
    selectedProvince, 
    onProvinceChange,
    options // Agregamos esta propiedad para manejar las opciones del desplegable
}) => {
    return (
        <div className="flex items-center">
            {isEditing ? (
                <>
                    {label === "Dirección" ? (
                        <>
                            <label className="text-lg font-semibold">{label}:</label>
                            <select 
                                className="text-lg" 
                                value={selectedProvince} 
                                onChange={onProvinceChange} 
                            >
                                {provinces.map((province) => (
                                    <option key={province} value={province}>{province}</option>
                                ))}
                            </select>
                            <select 
                                className="text-lg ml-2" 
                                value={value} 
                                onChange={onChange} 
                            >
                                {municipalities.map((municipality) => (
                                    <option key={municipality} value={municipality}>{municipality}</option>
                                ))}
                            </select>
                        </>
                    ) : options ? (
                        // Si hay opciones, mostramos un desplegable
                        <>
                            <label className="text-lg font-semibold">{label}:</label>
                            <select 
                                className="text-lg ml-2" 
                                value={value} 
                                onChange={onChange}
                            >
                                {options.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </>
                    ) : (
                        // Si no hay opciones, mostramos un input normal
                        <>
                            <label className="text-lg font-semibold">{label}:</label>
                            <input 
                                className="text-lg ml-2" 
                                value={value} 
                                onChange={onChange} 
                            />
                        </>
                    )}
                    <button onClick={onSave} className="ml-2 bg-yellow-500 text-white p-1 rounded">
                        Guardar
                    </button>
                </>
            ) : (
                <>
                    {label === "Dirección" ? (
                        <p className="text-gray-800 mb-2">
                            <strong>{label}:</strong> {selectedProvince}, {value}
                        </p>
                    ) : (
                        <p className="text-gray-800 mb-2">
                            <strong>{label}:</strong> {value}
                        </p>
                    )}
                    <button onClick={onEditToggle} className="ml-2 bg-yellow-500 text-white p-1 rounded">
                        Editar
                    </button>
                </>
            )}
        </div>
    );
};

export default EditableField;