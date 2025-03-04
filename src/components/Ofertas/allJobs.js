import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3001'; // Change this if your server is at a different URL

const useAllJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [locationData, setLocationData] = useState({ provincias: [], municipios: {} });

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch(`${API_URL}/getalloferta`);
                const data = await response.json();
                setJobs(data);
                console.log("Fetched job data:", data);

                // Extraer provincias y municipios únicos
                const provinciasSet = new Set();
                const municipiosPorProvincia = {};

                data.forEach(job => {
                    const provincia = job.provincia;
                    const municipio = job.municipio;

                    // Agregar provincia al Set
                    provinciasSet.add(provincia);

                    // Agregar municipio a su provincia correspondiente
                    if (!municipiosPorProvincia[provincia]) {
                        municipiosPorProvincia[provincia] = new Set();
                    }
                    municipiosPorProvincia[provincia].add(municipio);
                });

                // Convertir Sets a Arrays
                const provinciasArray = Array.from(provinciasSet).sort();
                const municipiosObj = {};
                
                Object.keys(municipiosPorProvincia).forEach(provincia => {
                    municipiosObj[provincia] = Array.from(municipiosPorProvincia[provincia]).sort();
                });

                setLocationData({
                    provincias: provinciasArray,
                    municipios: municipiosObj
                });
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchJobs();
    }, []);

    return { jobs, locationData }; // Return the dictionary along with jobs
};

export default useAllJobs;
