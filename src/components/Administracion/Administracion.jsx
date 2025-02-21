import React, { useState } from 'react';
import useAllJobs from '../Ofertas/allJobs';

const Administracion = () => {
    const [selectedTab, setSelectedTab] = useState('');
    const [selectedJob, setSelectedJob] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { jobs } = useAllJobs(); // Fetch job data

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    const handleJobSelect = (job) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    const handleDeleteJob = (job) => {
        // Implement delete job logic here
        console.log('Delete job:', job);
    };

    return (
        <p>Hola mundo</p>
    );
};

export default Administracion;
