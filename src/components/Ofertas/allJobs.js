import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3001'; // Change this if your server is at a different URL

const useAllJobs = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch(`${API_URL}/getalloferta`);
                const data = await response.json();
                setJobs(data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchJobs();
    }, []);

    return jobs;
};

export default useAllJobs;
