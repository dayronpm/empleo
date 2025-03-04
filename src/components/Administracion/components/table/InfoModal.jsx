// src/components/InfoModal.jsx
import React from 'react';

const InfoModal = ({ isOpen, onClose, data, fields = [] }) => {
  if (!isOpen || !data) return null;

  // Crear una copia de los campos para manipular
  let processedFields = [...fields];
  
  // Determinar el tipo de entidad y reorganizar campos
  let entityType = 'unknown';
  
  // Detectar si es una empresa
  if (data.nombre_completo !== undefined && data.total_cursos !== undefined) {
    entityType = 'empresa';
    
    // Combinar provincia y municipio en ubicación
    if (data.provincia !== undefined && data.municipio !== undefined) {
      // Crear campo de ubicación
      const ubicacionField = {
        label: 'Ubicación',
        key: 'ubicacion',
        computed: true
      };
      
      // Eliminar campos originales y añadir el nuevo
      processedFields = processedFields.filter(field => 
        field.key !== 'provincia' && field.key !== 'municipio'
      );
      
      // Ordenar campos según lo especificado
      const orderedKeys = [
        'nombre_completo', 'tipo', 'descripcion', 'username', 
        'ubicacion', 'total_ofertas', 'total_cursos'
      ];
      
      // Añadir ubicación en la posición correcta
      const tempFields = [];
      orderedKeys.forEach(key => {
        if (key === 'ubicacion') {
          tempFields.push(ubicacionField);
        } else {
          const field = processedFields.find(f => f.key === key);
          if (field) tempFields.push(field);
        }
      });
      
      processedFields = tempFields;
      
      // Marcar descripción como textarea
      const descIndex = processedFields.findIndex(f => f.key === 'descripcion');
      if (descIndex !== -1) {
        processedFields[descIndex] = { ...processedFields[descIndex], type: 'textarea' };
      }
    }
  }
  // Detectar si es una oferta de empleo
  else if (data.titulo !== undefined && data.empresa !== undefined && data.requerimientos !== undefined) {
    entityType = 'oferta';
    
    // Combinar provincia y municipio en ubicación
    if (data.provincia !== undefined && data.municipio !== undefined) {
      // Crear campo de ubicación
      const ubicacionField = {
        label: 'Ubicación',
        key: 'ubicacion',
        computed: true
      };
      
      // Eliminar campos originales y añadir el nuevo
      processedFields = processedFields.filter(field => 
        field.key !== 'provincia' && field.key !== 'municipio'
      );
      
      // Ordenar campos según lo especificado
      const orderedKeys = [
        'titulo', 'empresa', 'ubicacion', 'tipo', 'salario', 'categoria', 
        'experiencia', 'descripcion', 'requerimientos', 'beneficios', 'aplicacion'
      ];
      
      // Añadir ubicación en la posición correcta
      const tempFields = [];
      orderedKeys.forEach(key => {
        if (key === 'ubicacion') {
          tempFields.push(ubicacionField);
        } else {
          const field = processedFields.find(f => f.key === key);
          if (field) tempFields.push(field);
        }
      });
      
      processedFields = tempFields;
      
      // Marcar campos de texto largo como textarea
      ['titulo', 'descripcion', 'requerimientos', 'beneficios', 'aplicacion'].forEach(key => {
        const index = processedFields.findIndex(f => f.key === key);
        if (index !== -1) {
          processedFields[index] = { ...processedFields[index], type: 'textarea' };
        }
      });
    }
  }
  // Detectar si es un curso
  else if (data.titulo !== undefined && data.nivel !== undefined && data.modalidad !== undefined) {
    entityType = 'curso';
    
    // Ordenar campos según lo especificado
    const orderedKeys = [
      'titulo', 'empresa', 'precio', 'nivel', 'modalidad', 
      'descripcion', 'requisitos', 'direccion'
    ];
    
    // Eliminar descripcionCompleta si existe
    processedFields = processedFields.filter(field => field.key !== 'descripcionCompleta');
    
    // Asegurarnos de que existe el campo empresa
    if (!processedFields.some(f => f.key === 'empresa') && data.empresa) {
      processedFields.push({
        label: 'Empresa',
        key: 'empresa'
      });
    }
    
    // Reordenar campos
    const tempFields = [];
    orderedKeys.forEach(key => {
      const field = processedFields.find(f => f.key === key);
      if (field) tempFields.push(field);
    });
    
    processedFields = tempFields;
    
    // Marcar campos de texto largo como textarea
    ['titulo', 'descripcion', 'requisitos', 'direccion'].forEach(key => {
      const index = processedFields.findIndex(f => f.key === key);
      if (index !== -1) {
        processedFields[index] = { ...processedFields[index], type: 'textarea' };
      }
    });
  }

  // Determinar si hay campos que deberían ocupar todo el ancho
  const fullWidthTypes = ['textarea'];
  
  // Separar campos en normales y de ancho completo
  const regularFields = processedFields.filter(field => !fullWidthTypes.includes(field.type));
  const fullWidthFields = processedFields.filter(field => fullWidthTypes.includes(field.type));

  // Función para obtener el valor de un campo, considerando campos calculados
  const getFieldValue = (field) => {
    if (field.computed && field.key === 'ubicacion') {
      return `${data.provincia || ''}, ${data.municipio || ''}`.replace(/^, |, $/, '');
    }
    return data[field.key];
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl relative max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <h3 className="text-xl font-bold">Información Detallada</h3>
          <button
            className="text-gray-500 hover:text-red-500 transition-colors"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="overflow-y-auto flex-grow pr-2">
          {/* Campos de ancho completo primero */}
          {fullWidthFields.length > 0 && (
            <div className="space-y-4 mb-4">
              {fullWidthFields.map((field) => {
                const value = getFieldValue(field);
                const content = value !== undefined && value !== null ? value : 'No especificado';
                
                return (
                  <div key={field.key} className="field-container">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                    <div className="p-3 bg-gray-50 rounded-md border border-gray-200 whitespace-pre-wrap">
                      {content}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          {/* Campos regulares en grid */}
          {regularFields.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {regularFields.map((field) => (
                <div key={field.key} className="field-container">
                  <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                  <div className="p-2 bg-gray-50 rounded-md border border-gray-200">
                    {getFieldValue(field) !== undefined && getFieldValue(field) !== null 
                      ? getFieldValue(field) 
                      : 'No especificado'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end mt-4 pt-3 border-t">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;