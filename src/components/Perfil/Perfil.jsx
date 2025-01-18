import React, { useState } from 'react';
import { technicalSkillsList, softSkillsList, provincesAndMunicipalities, languagesList } from './data'; // Importar datos

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
        languages: [], // Cambiado a un array para manejar múltiples idiomas
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

    // Manejo de habilidades
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
    
    // Estado para el idioma seleccionado y su nivel
    const [searchTermLanguage, setSearchTermLanguage] = useState('');
    
    return (
        <div className="max-w-3xl mx-auto p-5">
            <h1 className="text-2xl font-bold mb-4">Generador de Currículum Vitae</h1>
            
            {/* Datos Personales */}
            <div className="mb-4">
                <label className="block mb-1">Nombre Completo</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
            </div>

            {/* Selección de Provincia y Municipio */}
            <div className="mb-4">
                <label className="block mb-1">Provincia</label>
                <select 
                    name="province" 
                    value={formData.province} 
                    onChange={handleChange} 
                    className="w-full p-2 border border-gray-300 rounded"
                >
                    <option value="">Seleccione una provincia</option>
                    {Object.keys(provincesAndMunicipalities).map((province) => (
                        <option key={province} value={province}>{province}</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block mb-1">Municipio</label>
                <select 
                    name="municipality" 
                    value={formData.municipality} 
                    onChange={handleChange} 
                    className="w-full p-2 border border-gray-300 rounded"
                    disabled={!formData.province}
                >
                    <option value="">Seleccione un municipio</option>
                    {provincesAndMunicipalities[formData.province]?.map((municipality) => (
                        <option key={municipality} value={municipality}>{municipality}</option>
                    ))}
                </select>
            </div>

            {/* Teléfono */}
            <div className="mb-4">
                <label className="block mb-1">Teléfono</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
            </div>

            {/* Correo Electrónico */}
            <div className="mb-4">
                <label className="block mb-1">Correo Electrónico</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
            </div>

            {/* Perfil Profesional */}
            <div className="mb-4">
                <label className="block mb-1">Perfil Profesional</label>
                <textarea name="profile" value={formData.profile} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
            </div>

            {/* Experiencia Laboral */}
            <h2 className="text-xl font-bold mt-6 mb-2">Experiencia Laboral</h2>
            {formData.experience.map((exp, index) => (
                <div key={index} className="border p-4 mb-4 rounded">
                    <input type="text" name="jobTitle" placeholder="Cargo" value={exp.jobTitle} onChange={(e) => handleExperienceChange(index, e)} className="w-full p-[10px] border-[1px] border-[#d1d5db] rounded mb-[10px]" />
                    <input type="text" name="company" placeholder="Empresa" value={exp.company} onChange={(e) => handleExperienceChange(index, e)} className="w-full p-[10px] border-[1px] border-[#d1d5db] rounded mb-[10px]" />
                    <input type="text" name="dates" placeholder="Fechas (ejemplo: 2020 - 2021)" value={exp.dates} onChange={(e) => handleExperienceChange(index, e)} className="w-full p-[10px] border-[1px] border-[#d1d5db] rounded mb-[10px]" />
                    <textarea name="responsibilities" placeholder="Responsabilidades" value={exp.responsibilities} onChange={(e) => handleExperienceChange(index, e)} className="w-full p-[10px] border-[1px] border-[#d1d5db] rounded mb-[10px]" />
                    <button onClick={() => removeExperience(index)} className='bg-red-500 text-white px-[15px] py-[8px] rounded'>Eliminar Experiencia</button>
                </div>
            ))}
            
            <button onClick={addExperience} className='bg-blue-500 text-white px-[15px] py-[8px] rounded'>Agregar Experiencia</button>

            {/* Formación Académica */}
            <h2 className='text-xl font-bold mt-[20px] mb-[10px]'>Formación Académica</h2>
            {formData.education.map((edu, index) => (
                <div key={index} className='border p-[15px] mb-[15px] rounded'>
                    <input type='text' name='degree' placeholder='Título Obtenido' value={edu.degree} onChange={(e) => handleEducationChange(index, e)} className='w-full p-[10px] border-[1px] border-[#d1d5db] rounded mb-[10px]' />
                    <input type='text' name='institution' placeholder='Institución' value={edu.institution} onChange={(e) => handleEducationChange(index, e)} className='w-full p-[10px] border-[1px] border-[#d1d5db] rounded mb-[10px]' />
                    <input type='text' name='dates' placeholder='Fechas (ejemplo: 2018 - 2020)' value={edu.dates} onChange={(e) => handleEducationChange(index, e)} className='w-full p-[10px] border-[1px] border-[#d1d5db] rounded mb-[10px]' />
                    <button onClick={() => removeEducation(index)} className='bg-red-500 text-white px-[15px] py-[8px] rounded'>Eliminar Educación</button>
                </div>
            ))}
            
            <button onClick={addEducation} className='bg-blue-500 text-white px-[15px] py-[8px] rounded'>Agregar Educación</button>

           {/* Habilidades Técnicas */}
           <h2 className='text-xl font-bold mt-[20px] mb-[10px]'>Habilidades Técnicas</h2>
           
           {/* Buscador de habilidades técnicas */}
           <input 
               type='text'
               placeholder='Buscar habilidad técnica...'
               value={searchTermTechnical}
               onChange={(e) => setSearchTermTechnical(e.target.value)}
               className='w-full p-2 border border-gray-300 rounded mb-2'
           />

           {/* Habilidades Técnicas Seleccionadas */}
           {formData.technicalSkills.map((skill) => (
               <div key={skill} className='flex items-center justify-between bg-blue-100 p-2 my-2 rounded'>
                   {skill}
                   <button 
                       onClick={() => handleSkillChange(skill, 'technical')} 
                       className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'>
                       Eliminar
                   </button>
               </div>
           ))}

           {technicalSkillsList.filter(skill => skill.toLowerCase().includes(searchTermTechnical.toLowerCase())).map((skill) => (
               !formData.technicalSkills.includes(skill) && (
                   <button key={skill}
                           onClick={() => handleSkillChange(skill, 'technical')} 
                           className='bg-gray-200 text-black px-3 py-2 mr-2 mt-2 rounded hover:bg-gray-300'>
                       {skill}
                   </button>
               )
           ))}

           {/* Habilidades Blandas */}
           <h2 className='text-xl font-bold mt-[20px] mb-[10px]'>Habilidades Blandas</h2>

           {/* Buscador de habilidades blandas */}
           <input 
               type='text'
               placeholder='Buscar habilidad blanda...'
               value={searchTermSoft}
               onChange={(e) => setSearchTermSoft(e.target.value)}
               className='w-full p-2 border border-gray-300 rounded mb-2'
           />

           {/* Habilidades Blandas Seleccionadas */}
           {formData.softSkills.map((skill) => (
               <div key={skill} className='flex items-center justify-between bg-blue-100 p-2 my-2 rounded'>
                   {skill}
                   <button 
                       onClick={() => handleSkillChange(skill, 'soft')} 
                       className='bg-red-500 text-white px=3 py=1 rounded hover:bg-red=600'>
                       Eliminar
                   </button>
               </div>
           ))}

           {softSkillsList.filter(skill => skill.toLowerCase().includes(searchTermSoft.toLowerCase())).map((skill) => (
               !formData.softSkills.includes(skill) && (
                   <button key={skill}
                           onClick={() => handleSkillChange(skill, 'soft')} 
                           className='bg-gray-200 text-black px=3 py=2 mr=2 mt=2 rounded hover:bg-gray=300'>
                       {skill}
                   </button>
               )
           ))}

           {/* Idiomas */}
           <h2 className='text-xl font-bold mt=[20px] mb=[10px]'>Idiomas</h2>

           {/* Buscador de idiomas */}
           <input 
               type='text'
               placeholder='Buscar idioma...'
               value={searchTermLanguage}
               onChange={(e) => setSearchTermLanguage(e.target.value)}
               className='w-full p=2 border border-gray=300 rounded mb=2'
           />

           {/* Selección de idioma y nivel */}
           {searchTermLanguage && languagesList.filter(language =>
               language.toLowerCase().includes(searchTermLanguage.toLowerCase())
           ).map(language => (
               !formData.languages.some(langObj => langObj.language === language) && (
                   <div key={language}>
                       <span>{language}</span>
                       <select 
                           defaultValue=""
                           onChange={(e) => addLanguage(language, e.target.value)}
                           className='ml=2 p=1 border border-gray=300 rounded'
                       >
                           <option value="" disabled>Selecciona nivel</option>
                           {['Principiante', 'Básico', 'Intermedio', 'Avanzado', 'Nativo'].map(level => (
                               <option key={level} value={level}>{level}</option>
                           ))}
                       </select>
                   </div>
               )
           ))}

           {/* Idiomas Seleccionados */}
           {formData.languages.map(({ language, level }) => (
               <div key={language} className='flex items-center justify-between bg-blue=100 p=2 my=2 rounded'>
                   {language} - {level}
                   <button 
                       onClick={() => removeLanguage(language)} 
                       className='bg-red=500 text-white px=3 py=1 rounded hover:bg-red=600'>
                       Eliminar
                   </button>
               </div>
           ))}

           {/* Certificaciones */}
           <div >
               <label>Certificaciones</label>
               <textarea name='certifications' value={formData.certifications} onChange={handleChange} className='w-full p=[10px] border=[1px] border=[#d1d5db] rounded' />
           </div> 
       </div>
   );
};

export default Perfil;
