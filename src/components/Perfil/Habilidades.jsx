import React from 'react';

const Habilidades = ({ skillsList, selectedSkills, handleSkillChange, searchTerm, setSearchTerm, title }) => {
    return (
        <>
            <h2 className='text-xl font-bold mt-[20px] mb-[10px]'>{title}</h2>

            {/* Buscador de habilidades */}
            <input
                type='text'
                placeholder={`Buscar habilidad ${title.toLowerCase()}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full p-2 border border-gray-300 rounded mb-2'
            />

            {/* Habilidades Seleccionadas */}
            {selectedSkills.map((skill) => (
                <div key={skill} className='flex items-center justify-between bg-blue-100 p-2 my-2 rounded'>
                    {skill}
                    <button
                        onClick={() => handleSkillChange(skill)}
                        className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'>
                        Eliminar
                    </button>
                </div>
            ))}

            {skillsList.filter(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())).map((skill) => (
                !selectedSkills.includes(skill) && (
                   <button key={skill}
                           onClick={() => handleSkillChange(skill)}  
                           className='bg-gray-200 text-black px-3 py-2 mr-2 mt-2 rounded hover:bg-gray-300'>
                       {skill}
                   </button>
               )
           ))}
        </>
    );
};

export default Habilidades;
