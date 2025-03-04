// useCurriculum.js
import { useState } from 'react';

const useCurriculum = () => {
    const [formData, setFormData] = useState({
        name: '',
        province: '',
        municipality: '',
        phone: '',
        email: '',
        profile: '',
        experience: [{ jobTitle: '', company: '', dates: '', responsibilities: '' }],
        education: [{ degree: '', institution: '', dates: '' }],
        technicalSkills: [],
        softSkills: [],
        languages: [],
        certifications: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
            ...(name === 'province' && { municipality: '' }) // Resetear municipio al cambiar provincia
        }));
    };

    const handleExperienceChange = (index, e) => {
        const { name, value } = e.target;
        const newExperience = [...formData.experience];
        newExperience[index][name] = value;
        setFormData({ ...formData, experience: newExperience });
    };

    const handleEducationChange = (index, e) => {
        const { name, value } = e.target;
        const newEducation = [...formData.education];
        newEducation[index][name] = value;
        setFormData({ ...formData, education: newEducation });
    };

    const removeExperience = (index) => {
        const newExperience = formData.experience.filter((_, i) => i !== index);
        setFormData({ ...formData, experience: newExperience });
    };

    const removeEducation = (index) => {
        const newEducation = formData.education.filter((_, i) => i !== index);
        setFormData({ ...formData, education: newEducation });
    };

    const addExperience = () => {
        setFormData({
            ...formData,
            experience: [...formData.experience, { jobTitle: '', company: '', dates: '', responsibilities: '' }],
        });
    };

    const addEducation = () => {
        setFormData({
            ...formData,
            education: [...formData.education, { degree: '', institution: '', dates: '' }],
        });
    };

    // Manejo de habilidades técnicas y blandas
    const handleSkillChange = (skill, type) => {
        const selectedSkills = type === 'technical' ? formData.technicalSkills : formData.softSkills;

        if (selectedSkills.includes(skill)) {
            setFormData({
                ...formData,
                [type === 'technical' ? 'technicalSkills' : 'softSkills']: selectedSkills.filter(s => s !== skill),
            });
        } else if (selectedSkills.length < 10) {
            setFormData({
                ...formData,
                [type === 'technical' ? 'technicalSkills' : 'softSkills']: [...selectedSkills, skill],
            });
        }
    };

    // Manejo de idiomas
    const addLanguage = (language, level) => {
        if (!formData.languages.some(langObj => langObj.language === language)) {
            setFormData({
                ...formData,
                languages: [...formData.languages, { language, level }],
            });
        }
    };

    const removeLanguage = (language) => {
        setFormData({
            ...formData,
            languages: formData.languages.filter(lang => lang.language !== language),
        });
    };

   // Filtrado de habilidades basado en entrada
   const [searchTermTechnical, setSearchTermTechnical] = useState('');
   const [searchTermSoft, setSearchTermSoft] = useState('');
   const [searchTermLanguage, setSearchTermLanguage] = useState('');

   const saveLanguages = async (languages) => {
        try {
            console.log('Guardando idiomas:', languages);
            const userId = localStorage.getItem('id');
            
            // Asegurarse de que los datos estén en el formato correcto
            const formattedData = {
                id: userId,
                campo: 'idiomas',
                datos: languages // languages ya viene formateado correctamente
            };

            console.log('Enviando datos:', formattedData); // Para debugging

            const response = await fetch('http://localhost:3001/update-curriculum', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedData)
            });

            if (!response.ok) {
                throw new Error('Error al guardar los idiomas');
            }

            return await response.json();
        } catch (error) {
            console.error('Error al guardar los idiomas:', error);
            throw error;
        }
    };

    const saveSkills = async (skills) => {
        try {
            console.log('Guardando habilidades:', skills);
            const userId = localStorage.getItem('id');
            
            const formattedData = {
                id: userId,
                campo: 'habilidades',
                datos: skills
            };
    
            console.log('Enviando datos:', formattedData);
    
            const response = await fetch('http://localhost:3001/update-curriculum', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedData)
            });
    
            if (!response.ok) {
                throw new Error('Error al guardar las habilidades');
            }
    
            return await response.json();
        } catch (error) {
            console.error('Error al guardar las habilidades:', error);
            throw error;
        }
    };

    const saveSummary = async (summary) => {
        try {
            console.log('Guardando resumen:', summary);
            const userId = localStorage.getItem('id');
            
            const formattedData = {
                id: userId,
                campo: 'resumen',
                datos: Array.isArray(summary) ? summary : [summary] // Asegurar que siempre sea un array
            };

            console.log('Enviando datos:', formattedData);

            const response = await fetch('http://localhost:3001/update-curriculum', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedData)
            });

            if (!response.ok) {
                throw new Error('Error al guardar el resumen');
            }

            return await response.json();
        } catch (error) {
            console.error('Error al guardar el resumen:', error);
            throw error;
        }
    };

    const saveExperience = async (experience) => {
        try {
            console.log('Guardando experiencia:', experience);
            const userId = localStorage.getItem('id');
            
            const formattedData = {
                id: userId,
                campo: 'experiencia',
                datos: experience.map(exp => ({
                    company: exp.company,
                    position: exp.position,
                    startDate: exp.startDate,
                    endDate: exp.endDate,
                    description: exp.description
                }))
            };

            console.log('Enviando datos:', formattedData);

            const response = await fetch('http://localhost:3001/update-curriculum', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedData)
            });

            if (!response.ok) {
                throw new Error('Error al guardar la experiencia');
            }

            return await response.json();
        } catch (error) {
            console.error('Error al guardar la experiencia:', error);
            throw error;
        }
    };

    const saveEducation = async (education) => {
        try {
            console.log('Guardando educación:', education);
            const userId = localStorage.getItem('id');
            
            const formattedData = {
                id: userId,
                campo: 'educacion',
                datos: education.map(edu => ({
                    institution: edu.institution,
                    degree: edu.degree,
                    startDate: edu.startDate,
                    endDate: edu.endDate,
                    details: edu.details
                }))
            };

            console.log('Enviando datos:', formattedData);

            const response = await fetch('http://localhost:3001/update-curriculum', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedData)
            });

            if (!response.ok) {
                throw new Error('Error al guardar la educación');
            }

            return await response.json();
        } catch (error) {
            console.error('Error al guardar la educación:', error);
            throw error;
        }
    };

    const saveCertifications = async (certifications) => {
        try {
            console.log('Guardando certificaciones:', certifications);
            const userId = localStorage.getItem('id');
            
            const formattedData = {
                id: userId,
                campo: 'certificaciones',
                datos: certifications.map(cert => ({
                    name: cert.name,
                    institution: cert.institution,
                    year: cert.year
                }))
            };

            console.log('Enviando datos:', formattedData);

            const response = await fetch('http://localhost:3001/update-curriculum', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedData)
            });

            if (!response.ok) {
                throw new Error('Error al guardar las certificaciones');
            }

            return await response.json();
        } catch (error) {
            console.error('Error al guardar las certificaciones:', error);
            throw error;
        }
    };

    const saveProjects = async (projects) => {
        try {
            console.log('Guardando proyectos:', projects);
            const userId = localStorage.getItem('id');
            
            const formattedData = {
                id: userId,
                campo: 'proyectos',
                datos: projects.map(proj => ({
                    name: proj.name,
                    startDate: proj.startDate,
                    endDate: proj.endDate,
                    description: proj.description
                }))
            };

            console.log('Enviando datos:', formattedData);

            const response = await fetch('http://localhost:3001/update-curriculum', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedData)
            });

            if (!response.ok) {
                throw new Error('Error al guardar los proyectos');
            }

            return await response.json();
        } catch (error) {
            console.error('Error al guardar los proyectos:', error);
            throw error;
        }
    };

   return {
       formData,
       handleChange,
       handleExperienceChange,
       handleEducationChange,
       removeExperience,
       removeEducation,
       addExperience,
       addEducation,
       handleSkillChange,
       addLanguage,
       removeLanguage,
       searchTermTechnical,
       setSearchTermTechnical,
       searchTermSoft,
       setSearchTermSoft,
       searchTermLanguage,
       setSearchTermLanguage,
       saveLanguages,
       saveSkills,
       saveSummary,
       saveExperience,
       saveEducation,
       saveCertifications,
       saveProjects,
   };
};

export default useCurriculum;
