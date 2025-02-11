import React from 'react';

const Idiomas = ({ languagesList, formData, addLanguage, removeLanguage, searchTermLanguage, setSearchTermLanguage }) => {
    return (
        <>
           {/* Idiomas */}
           <h2 className='text-xl font-bold mt-4 mb-2'>Idiomas</h2>

           {/* Buscador de idiomas */}
           <input
               type='text'
               placeholder='Buscar idioma...'
               value={searchTermLanguage}
               onChange={(e) => setSearchTermLanguage(e.target.value)}
               className='w-full p-2 border border-gray-300 rounded mb-4'
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
                           className='ml-2 p-1 border border-gray=300 rounded mb-2'
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
               <div key={language} className='flex items-center justify-between bg-blue-100 p-2 my-2 rounded'>
                   {language} - {level}
                   <button
                       onClick={() => removeLanguage(language)}
                       className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'>
                       Eliminar
                   </button>
               </div>
           ))}
        </>
    );
};

export default Idiomas;
