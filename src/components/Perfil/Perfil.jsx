import React, { useState } from 'react';
import { technicalSkillsList, softSkillsList, provincesAndMunicipalities, languagesList } from './data'; // Importar datos
import DatosPersonales from './DatosPersonales'; // Importar el componente de datos personales
import ExperienciaLaboral from './ExperienciaLaboral'; // Importar el componente de experiencia laboral
import FormacionAcademica from './FormacionAcademica'; // Importar el componente de formación académica
import Habilidades from './Habilidades'; // Importar el componente de habilidades
import Idiomas from './Idiomas'; // Importar el componente de idiomas
import Certificaciones from './Certificaciones'; // Importar el componente de certificaciones

const Perfil = () => {
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

   return (
       <div className="max-w-3xl mx-auto p-5">
           <h1 className="text-2xl font-bold mb-4">Generador de Currículum Vitae</h1>

           {/* Datos Personales */}
           <DatosPersonales formData={formData} handleChange={handleChange} provincesAndMunicipalities={provincesAndMunicipalities} />

           {/* Experiencia Laboral */}
           <ExperienciaLaboral experience={formData.experience} handleExperienceChange={handleExperienceChange} removeExperience={removeExperience} addExperience={addExperience} />

           {/* Formación Académica */}
           <FormacionAcademica education={formData.education} handleEducationChange={handleEducationChange} removeEducation={removeEducation} addEducation={addEducation}/>

           {/* Habilidades Técnicas */}
           <Habilidades skillsList={technicalSkillsList} selectedSkills={formData.technicalSkills} handleSkillChange={(skill) => handleSkillChange(skill,'technical')} searchTerm={searchTermTechnical} setSearchTerm={setSearchTermTechnical} title={"Habilidades Técnicas"} />

           {/* Habilidades Blandas */}
           <Habilidades skillsList={softSkillsList} selectedSkills={formData.softSkills} handleSkillChange={(skill) => handleSkillChange(skill,'soft')} searchTerm={searchTermSoft} setSearchTerm={setSearchTermSoft} title={"Habilidades Blandas"} />

           {/* Idiomas */}
           <Idiomas languagesList={languagesList} formData={formData} addLanguage={addLanguage} removeLanguage={removeLanguage} searchTermLanguage={searchTermLanguage} setSearchTermLanguage={setSearchTermLanguage}/>

           {/* Certificaciones */}
           <Certificaciones formData={formData} handleChange={handleChange}/>
       </div>
   );
};

export default Perfil;
