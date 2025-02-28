import React, { useState, useEffect } from 'react';

const CompanySearchField = ({ onSelect, register, setValue, errors }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [companies, setCompanies] = useState([]);
    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            const response = await fetch('http://localhost:3001/getallempresas');
            const data = await response.json();
            setCompanies(data);
        } catch (error) {
            console.error('Error al cargar empresas:', error);
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setShowDropdown(true);

        const filtered = companies.filter(company => 
            company.nombre.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredCompanies(filtered);
    };

    const handleSelectCompany = (company) => {
        setSearchTerm(company.nombre);
        setValue('id_empresa', company.id);
        setShowDropdown(false);
        if (onSelect) onSelect(company);
    };

    return (
        <div className="relative mb-4">
            <label className="block text-sm font-medium text-gray-700">Empresa</label>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Buscar empresa..."
                className={`w-full p-2 border rounded ${errors?.id_empresa ? 'border-red-500' : ''}`}
            />
            <input
                type="hidden"
                {...register('id_empresa', {
                    required: "Debe seleccionar una empresa"
                })}
            />
            {errors?.id_empresa && (
                <p className="text-red-500 text-sm mt-1">{errors.id_empresa.message}</p>
            )}
            
            {showDropdown && searchTerm && (
                <div className="absolute z-10 w-full bg-white border rounded-b mt-1 max-h-60 overflow-y-auto">
                    {filteredCompanies.length > 0 ? (
                        filteredCompanies.map(company => (
                            <div
                                key={company.id}
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleSelectCompany(company)}
                            >
                                {company.nombre}
                            </div>
                        ))
                    ) : (
                        <div className="p-2 text-gray-500">No se encontraron empresas</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CompanySearchField; 