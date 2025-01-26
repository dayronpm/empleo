import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3001'; // Change this if your server is at a different URL

const useAllJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [locationData, setLocationData] = useState({});

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch(`${API_URL}/getalloferta`);
                const data = await response.json();
                setJobs(data);
                console.log("Fetched job data:", data);

                // Create dictionary from job data
                const locationData = {};
                data.forEach(job => {
                    const province = job.provincia;
                    const municipality = job.municipio;

                    if (!locationData[province]) {
                        locationData[province] = [];
                    }
                    if (!locationData[province].includes(municipality)) {
                        locationData[province].push(municipality);
                    }
                });
                setLocationData(locationData);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchJobs();
    }, []);

    return { jobs, locationData }; // Return the dictionary along with jobs
};

export default useAllJobs;
