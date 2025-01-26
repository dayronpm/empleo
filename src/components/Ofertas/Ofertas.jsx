import React, { useState, useEffect } from 'react';
import useAllJobs from './allJobs';
import Pagination from './Pagination';
import JobDetails from './JobDetails';
import JobList from './JobList';
import SearchBar from './SearchBar'; // Componente de búsqueda importado
import Filters from './Filters'; // Componente de filtros importado

const Ofertas = () => {
    const { jobs: allJobs, locationData } = useAllJobs(); // Use the custom hook to fetch jobs
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 7;
    const [selectedJob, setSelectedJob] = useState(null);
    const [filters, setFilters] = useState({}); // State to hold multiple filters

    useEffect(() => {
        setFilteredJobs(allJobs); // Update filteredJobs when allJobs is fetched
    }, [allJobs]);

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        const filtered = allJobs.filter(job =>
            job.titulo.toLowerCase().includes(query)
        );
        setFilteredJobs(filtered);
        setCurrentPage(1); // Reset to first page on search
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;

        // Update filters state
        const newFilters = {
            ...filters,
            [name]: value
        };
        setFilters(newFilters);

        // Filter jobs based on all active filters
        let filtered = allJobs;
        for (const key in newFilters) {
            if (newFilters[key]) {
                filtered = filtered.filter(job => job[key] === newFilters[key]);
            }
        }

        setFilteredJobs(filtered);
        setCurrentPage(1); // Reset to first page on filter change
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
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold text-blue-600 flex-grow">Ofertas de Empleo</h1>
                <div className="flex-shrink-0 w-1/3">
                    <SearchBar onSearch={handleSearch} />
                </div>
            </header>

            <div className="mb-4">
                <label htmlFor="sort" className="mr-2 text-gray-700">Filtrar por:</label>
                <Filters onFilterChange={handleFilterChange} locationData={locationData} /> {/* Uso del componente de filtros */}
            </div>

            {/* Ordenación */}
            <div className="mb-4">
                <label htmlFor="sort" className="mr-2 text-gray-700">Ordenar por:</label>
                <select id="sort" onChange={handleSort} className="border border-gray-300 rounded-lg p-2">
                    <option value="fecha">Fecha de Publicación</option>
                    <option value="salario">Salario</option>
                </select>
            </div>

            {/* Listado de Ofertas */}
            <JobList jobs={currentJobs} onJobSelect={setSelectedJob} />

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
