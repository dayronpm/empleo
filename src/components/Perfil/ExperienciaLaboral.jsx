import React from 'react';

const ExperienciaLaboral = ({ experience, handleExperienceChange, removeExperience, addExperience }) => {
    return (
        <div>
            <h2 className="text-xl font-bold mt-6 mb-2">Experiencia Laboral</h2>
            {experience.map((exp, index) => (
                <div key={index} className="border p-4 mb-4 rounded">
                    <input 
                        type="text" 
                        name="jobTitle" 
                        placeholder="Cargo" 
                        value={exp.jobTitle} 
                        onChange={(e) => handleExperienceChange(index, e)} 
                        className="w-full p-[10px] border-[1px] border-[#d1d5db] rounded mb-[10px]" 
                    />
                    <input 
                        type="text" 
                        name="company" 
                        placeholder="Empresa" 
                        value={exp.company} 
                        onChange={(e) => handleExperienceChange(index, e)} 
                        className="w-full p-[10px] border-[1px] border-[#d1d5db] rounded mb-[10px]" 
                    />
                    <input 
                        type="text" 
                        name="dates" 
                        placeholder="Fechas (ejemplo: 2020 - 2021)" 
                        value={exp.dates} 
                        onChange={(e) => handleExperienceChange(index, e)} 
                        className="w-full p-[10px] border-[1px] border-[#d1d5db] rounded mb-[10px]" 
                    />
                    <textarea 
                        name="responsibilities" 
                        placeholder="Responsabilidades" 
                        value={exp.responsibilities} 
                        onChange={(e) => handleExperienceChange(index, e)} 
                        className="w-full p-[10px] border-[1px] border-[#d1d5db] rounded mb-[10px]" 
                    />
                    <button onClick={() => removeExperience(index)} className='bg-red-500 text-white px-[15px] py-[8px] rounded'>Eliminar Experiencia</button>
                </div>
            ))}
            
            <button onClick={addExperience} className='bg-blue-500 text-white px-[15px] py-[8px] rounded'>Agregar Experiencia</button>
        </div>
    );
};

export default ExperienciaLaboral;
