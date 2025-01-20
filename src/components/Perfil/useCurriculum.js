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
       setSearchTermLanguage
   };
};

export default useCurriculum;
