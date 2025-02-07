import React, { useState } from 'react';
import useAllJobs from '../Ofertas/allJobs';
import JobList from '../Ofertas/JobList';
import JobOfferModal from '../Ofertas/JobOfferModal';

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
        <div className="flex flex-col h-screen p-4 bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Administración</h1>
            <div className="flex space-x-4 mb-4">
                <button 
                    className={`p-2 rounded ${selectedTab === 'Users' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} transition duration-200`} 
                    onClick={() => handleTabChange('Users')}
                >
                    Users
                </button>
                <button 
                    className={`p-2 rounded ${selectedTab === 'Jobs' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} transition duration-200`} 
                    onClick={() => handleTabChange('Jobs')}
                >
                    Jobs
                </button>
                <button 
                    className={`p-2 rounded ${selectedTab === 'Courses' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} transition duration-200`} 
                    onClick={() => handleTabChange('Courses')}
                >
                    Courses
                </button>
            </div>
            <div className="flex-1">
                {selectedTab === 'Jobs' && (
                    <>
<button 
    className="bg-green-500 text-white p-2 rounded mb-4 hover:bg-green-600"
    onClick={() => setIsModalOpen(true)}
>
    Crear Nueva Oferta de Trabajo
</button>
<JobList 
    jobs={jobs} 
    onJobSelect={handleJobSelect} 
    onDeleteJob={handleDeleteJob}
    showDeleteButton={true}
/>

                        <JobOfferModal 
                            isOpen={isModalOpen} 
                            onClose={() => setIsModalOpen(false)} 
                            selectedJob={selectedJob} 
                        />
                    </>
                )}
                {selectedTab === 'Courses' && <div>Courses Content</div>}
                {selectedTab === 'Users' && <div>Users Content</div>}
            </div>
        </div>
    );
};

export default Administracion;
