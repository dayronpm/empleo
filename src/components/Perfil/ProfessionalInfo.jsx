import React, { useState } from "react";

const ProfessionalInfo = () => {
  // Estados para manejar la información profesional
  const [activeSection, setActiveSection] = useState("summary");
  const [isEditing, setIsEditing] = useState(false); // Controla si está en modo edición
  const [summary, setSummary] = useState("");
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [certifications, setCertifications] = useState([]);

  // Función genérica para agregar un nuevo elemento
  const addItem = (state, setState, newItem) => {
    setState([...state, { id: Date.now(), ...newItem }]);
  };

  // Función genérica para editar un elemento
  const editItem = (state, setState, id, field, value) => {
    setState(
      state.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // Función genérica para eliminar un elemento
  const deleteItem = (state, setState, id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este elemento?")) {
      setState(state.filter((item) => item.id !== id));
    }
  };

  // Función para guardar cambios
  const saveChanges = () => {
    setIsEditing(false);
  };

  // Función para cancelar cambios
  const cancelChanges = () => {
    setIsEditing(false);
    // Aquí podrías restaurar los valores originales si es necesario
  };

  return (
    <div className="bg-[#e0e8f0] p-6 rounded-lg shadow-md mb-6">
      Información profesional
      {/* Dropdown para seleccionar la sección */}
      <select
        value={activeSection}
        onChange={(e) => setActiveSection(e.target.value)}
        className="p-2 border rounded bg-white"
      >
        <option value="summary">Resumen Profesional</option>
        <option value="experience">Experiencia Laboral</option>
        <option value="education">Educación</option>
        <option value="skills">Habilidades</option>
        <option value="languages">Idiomas</option>
        <option value="certifications">Certificaciones</option>
      </select>

      {/* Botón de edición */}
      {!isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="text-blue-500 hover:underline mb-4 block"
        >
          Editar
        </button>
      )}

      {/* Renderizar la sección activa */}
      {activeSection === "summary" && (
        <div>
          Resumen Profesional
          {isEditing ? (
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full p-2 border rounded resize-none h-24"
            />
          ) : (
            <p>{summary || "No hay resumen registrado."}</p>
          )}
        </div>
      )}
      {activeSection === "experience" && (
        <Section
          title="Experiencia Laboral"
          items={experiences}
          onAdd={() =>
            addItem(experiences, setExperiences, {
              company: "",
              position: "",
              period: "",
              description: "",
            })
          }
          onEdit={(id, field, value) =>
            editItem(experiences, setExperiences, id, field, value)
          }
          onDelete={(id) => deleteItem(experiences, setExperiences, id)}
          fields={[
            { label: "Empresa", key: "company" },
            { label: "Puesto", key: "position" },
            { label: "Período", key: "period" },
            { label: "Descripción", key: "description", type: "textarea" },
          ]}
          isEditing={isEditing}
        />
      )}
      {activeSection === "education" && (
        <Section
          title="Educación"
          items={educations}
          onAdd={() =>
            addItem(educations, setEducations, {
              institution: "",
              degree: "",
              period: "",
              details: "",
            })
          }
          onEdit={(id, field, value) =>
            editItem(educations, setEducations, id, field, value)
          }
          onDelete={(id) => deleteItem(educations, setEducations, id)}
          fields={[
            { label: "Institución", key: "institution" },
            { label: "Título", key: "degree" },
            { label: "Período", key: "period" },
            { label: "Detalles adicionales", key: "details", type: "textarea" },
          ]}
          isEditing={isEditing}
        />
      )}
      {activeSection === "skills" && (
        <Section
          title="Habilidades"
          items={skills}
          onAdd={() =>
            addItem(skills, setSkills, {
              name: "",
              level: "",
            })
          }
          onEdit={(id, field, value) =>
            editItem(skills, setSkills, id, field, value)
          }
          onDelete={(id) => deleteItem(skills, setSkills, id)}
          fields={[
            { label: "Nombre de la habilidad", key: "name" },
            {
              label: "Nivel",
              key: "level",
              type: "select",
              options: ["Básico", "Intermedio", "Avanzado"],
            },
          ]}
          isEditing={isEditing}
        />
      )}
      {activeSection === "languages" && (
        <Section
          title="Idiomas"
          items={languages}
          onAdd={() =>
            addItem(languages, setLanguages, {
              language: "",
              spokenLevel: "",
              writtenLevel: "",
            })
          }
          onEdit={(id, field, value) =>
            editItem(languages, setLanguages, id, field, value)
          }
          onDelete={(id) => deleteItem(languages, setLanguages, id)}
          fields={[
            { label: "Idioma", key: "language" },
            {
              label: "Nivel hablado",
              key: "spokenLevel",
              type: "select",
              options: ["Básico", "Intermedio", "Avanzado", "Nativo"],
            },
            {
              label: "Nivel escrito",
              key: "writtenLevel",
              type: "select",
              options: ["Básico", "Intermedio", "Avanzado", "Nativo"],
            },
          ]}
          isEditing={isEditing}
        />
      )}
      {activeSection === "certifications" && (
        <Section
          title="Certificaciones"
          items={certifications}
          onAdd={() =>
            addItem(certifications, setCertifications, {
              name: "",
              institution: "",
              year: "",
            })
          }
          onEdit={(id, field, value) =>
            editItem(certifications, setCertifications, id, field, value)
          }
          onDelete={(id) => deleteItem(certifications, setCertifications, id)}
          fields={[
            { label: "Nombre de la certificación", key: "name" },
            { label: "Institución", key: "institution" },
            { label: "Año", key: "year" },
          ]}
          isEditing={isEditing}
        />
      )}

      {/* Botones Aceptar y Cancelar al final */}
      {isEditing && (
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={saveChanges}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Aceptar
          </button>
          <button
            onClick={cancelChanges}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};

// Componente reutilizable para cada sección
const Section = ({
  title,
  items,
  onAdd,
  onEdit,
  onDelete,
  fields,
  isEditing,
}) => {
  return (
    <div>
      <h2>{title}</h2>
      {items.length === 0 && !isEditing && <p>No hay elementos registrados.</p>}
      {items.map((item) => (
        <div key={item.id}>
          {fields.map((field) => {
            if (isEditing) {
              if (field.type === "textarea") {
                return (
                  <textarea
                    key={field.key}
                    value={item[field.key]}
                    onChange={(e) =>
                      onEdit(item.id, field.key, e.target.value)
                    }
                    className="w-full p-2 mb-2 border rounded resize-none h-20"
                  />
                );
              } else if (field.type === "select") {
                return (
                  <select
                    key={field.key}
                    value={item[field.key]}
                    onChange={(e) =>
                      onEdit(item.id, field.key, e.target.value)
                    }
                    className="w-full p-2 mb-2 border rounded"
                  >
                    <option>{`Selecciona ${field.label.toLowerCase()}`}</option>
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                );
              } else {
                return (
                  <input
                    key={field.key}
                    type="text"
                    value={item[field.key]}
                    onChange={(e) =>
                      onEdit(item.id, field.key, e.target.value)
                    }
                    className="w-full p-2 mb-2 border rounded"
                  />
                );
              }
            } else {
              return (
                <p key={field.key}>
                  {field.label}: {item[field.key] || "N/A"}
                </p>
              );
            }
          })}
          {isEditing && (
            <button
              onClick={() => onDelete(item.id)}
              className="text-red-500 hover:underline"
            >
              Eliminar
            </button>
          )}
        </div>
      ))}
      {isEditing && (
        <button onClick={onAdd} className="text-blue-500 hover:underline">
          + Agregar {title.toLowerCase()}
        </button>
      )}
    </div>
  );
};

export default ProfessionalInfo;