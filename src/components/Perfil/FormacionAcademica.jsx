import React from 'react';

const FormacionAcademica = ({ education, handleEducationChange, removeEducation, addEducation }) => {
    return (
        <div>
            <h2 className='text-xl font-bold mt-[20px] mb-[10px]'>Formación Académica</h2>
            {education.map((edu, index) => (
                <div key={index} className='border p-[15px] mb-[15px] rounded'>
                    <input type='text' name='degree' placeholder='Título Obtenido' value={edu.degree} onChange={(e) => handleEducationChange(index, e)} className='w-full p-[10px] border-[1px] border-[#d1d5db] rounded mb-[10px]' />
                    <input type='text' name='institution' placeholder='Institución' value={edu.institution} onChange={(e) => handleEducationChange(index, e)} className='w-full p-[10px] border-[1px] border-[#d1d5db] rounded mb-[10px]' />
                    <input type='text' name='dates' placeholder='Fechas (ejemplo: 2018 - 2020)' value={edu.dates} onChange={(e) => handleEducationChange(index, e)} className='w-full p-[10px] border-[1px] border-[#d1d5db] rounded mb-[10px]' />
                    <button onClick={() => removeEducation(index)} className='bg-red-500 text-white px-[15px] py-[8px] rounded'>Eliminar Educación</button>
                </div>
            ))}
            
            <button onClick={addEducation} className='bg-blue-500 text-white px-[15px] py-[8px] rounded'>Agregar Educación</button>
        </div>
    );
};

export default FormacionAcademica;
