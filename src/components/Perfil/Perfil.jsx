// Perfil.js
import React from 'react';
import usePerfil from './usePerfil'; // Importar el hook personalizado
import DatosPersonales from './DatosPersonales';
import ExperienciaLaboral from './ExperienciaLaboral';
import FormacionAcademica from './FormacionAcademica';
import Habilidades from './Habilidades';
import Idiomas from './Idiomas';
import Certificaciones from './Certificaciones';
import { technicalSkillsList, softSkillsList, provincesAndMunicipalities, languagesList } from './data'; // Importar datos

const Perfil = () => {
    const {
      formData,
      handleChange,
      handleExperienceChange,
      removeExperience,
      addExperience,
      handleEducationChange,
      removeEducation,
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
    } = usePerfil(); // Usar el hook personalizado

    return (
       <div className="max-w-3xl mx-auto p-5">
           <h1 className="text-2xl font-bold mb-4">Currículum Vitae</h1>

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
