import React, { useState, useEffect } from 'react';
import useAllJobs from './allJobs';
import Pagination from './Pagination';
import JobDetails from './JobDetails';
import JobList from './JobList';
import GenericFilter from '../generics/GenericFilter';

const Ofertas = () => {
    const { jobs: allJobs, locationData } = useAllJobs();
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 7;
    const [selectedJob, setSelectedJob] = useState(null);
    const [filters, setFilters] = useState({});

    useEffect(() => {
        setFilteredJobs(allJobs);
    }, [allJobs]);

    // Configuración de los filtros
    const filterConfig = [
        {
            type: 'text',
            name: 'search',
            label: 'Buscar por título',
            placeholder: 'Buscar ofertas...'
        },
        {
            type: 'select',
            name: 'provincia',
            label: 'Provincia',
            options: locationData?.provincias?.map(prov => ({
                value: prov,
                label: prov
            })) || []
        },
        {
            type: 'select',
            name: 'municipio',
            label: 'Municipio',
            options: filters.provincia 
                ? locationData?.municipios[filters.provincia]?.map(mun => ({
                    value: mun,
                    label: mun
                })) || []
                : []
        },
        {
            type: 'select',
            name: 'categoria',
            label: 'Categoría',
            options: [
                { value: 'Tiempo completo', label: 'Tiempo completo' },
                { value: 'Medio tiempo', label: 'Medio tiempo' },
                { value: 'Freelance', label: 'Freelance' }
            ]
        },
        {
            type: 'select',
            name: 'experiencia',
            label: 'Experiencia',
            options: [
                { value: 'Junior', label: 'Junior' },
                { value: 'Medio', label: 'Medio' },
                { value: 'Senior', label: 'Senior' }
            ]
        },
        {
            type: 'number',
            name: 'salarioMinimo',
            label: 'Salario mínimo',
            placeholder: 'Ingrese salario mínimo'
        }
    ];

    const handleFilterChange = (name, value) => {
        const newFilters = { ...filters, [name]: value };
        
        // Si cambia la provincia, resetear el municipio
        if (name === 'provincia') {
            newFilters.municipio = '';
        }
        
        setFilters(newFilters);
        applyFilters(newFilters);
    };

    // Nueva función para restablecer filtros
    const handleResetFilters = () => {
        setFilters({});
        setFilteredJobs(allJobs);
        setCurrentPage(1);
    };

    // Función para aplicar los filtros
    const applyFilters = (newFilters) => {
        let filtered = allJobs;

        // Filtrar por búsqueda de texto
        if (newFilters.search) {
            filtered = filtered.filter(job =>
                job.titulo.toLowerCase().includes(newFilters.search.toLowerCase())
            );
        }

        // Aplicar otros filtros
        Object.entries(newFilters).forEach(([key, value]) => {
            if (value && key !== 'search') {
                if (key === 'salarioMinimo') {
                    filtered = filtered.filter(job => 
                        parseFloat(job.salario) >= parseFloat(value)
                    );
                } else {
                    filtered = filtered.filter(job => job[key] === value);
                }
            }
        });

        setFilteredJobs(filtered);
        setCurrentPage(1);
    };

    const handleSort = (event) => {
        const sortBy = event.target.value;
        let sortedJobs = [...filteredJobs];

        if (sortBy === 'fecha') {
            sortedJobs.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        } else if (sortBy === 'salario') {
            sortedJobs.sort((a, b) => b.salario - a.salario);
        }

        setFilteredJobs(sortedJobs);
    };

    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

    return (
        <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
            <header className="mb-6">
                <h1 className="text-4xl font-bold text-blue-600">Ofertas de Empleo</h1>
            </header>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="grid grid-cols-1 gap-4">
                    <GenericFilter
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        config={filterConfig}
                    />

                    <div className="flex flex-wrap items-center justify-between gap-4 mt-2 pt-4 border-t border-gray-200">
                        {/* Ordenación */}
                        <div className="flex items-center">
                            <label htmlFor="sort" className="text-sm font-medium text-gray-700 mr-2">
                                Ordenar por:
                            </label>
                            <select 
                                id="sort" 
                                onChange={handleSort} 
                                className="border border-gray-300 rounded-lg p-2 text-sm"
                            >
                                <option value="fecha">Fecha de Publicación</option>
                                <option value="salario">Salario</option>
                            </select>
                        </div>

                        <button
                            onClick={handleResetFilters}
                            className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors duration-200"
                        >
                            Restablecer filtros
                        </button>
                    </div>
                </div>
            </div>

            {/* Listado de Ofertas */}
            <JobList 
                jobs={currentJobs} 
                onJobSelect={setSelectedJob} 
                activeFilters={filters}
            />

            {/* Paginación */}
            <Pagination 
                currentPage={currentPage} 
                totalJobs={filteredJobs.length} 
                jobsPerPage={jobsPerPage} 
                onPageChange={setCurrentPage} 
            />

            {/* Pop-up para detalles del trabajo */}
            {selectedJob && (
                <JobDetails job={selectedJob} onClose={() => setSelectedJob(null)} />
            )}
        </div>
    );
};

export default Ofertas;
