import React, { useState } from "react";
import { technicalSkillsList } from "./data";

import Section from "./Section";

const SkillsSection = ({ skills, setSkills, addItem, editItem, deleteItem, isEditing }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredSkills, setFilteredSkills] = useState([]);

  const handleInputChange = (value) => {
    setInputValue(value);
    if (value) {
      const filtered = technicalSkillsList.filter(skill =>
        skill.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSkills(filtered);
    } else {
      setFilteredSkills([]);
    }
  };

  const handleSkillSelect = (skill) => {
    setInputValue(skill);
    setFilteredSkills([]);
  };

  return (
    <Section
      title="Habilidades"
      items={skills}
      onAdd={() => addItem(skills, setSkills, { name: "", level: "" })}
      onEdit={(id, field, value) => editItem(skills, setSkills, id, field, value)}
      onDelete={(id) => deleteItem(skills, setSkills, id)}
      fields={[
        { 
          label: "Nombre de la habilidad", 
          key: "name",
          customInput: (value, onChange) =>
            isEditing ? (
              <div>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => {
                    handleInputChange(e.target.value);
                    onChange(e.target.value);
                  }}
                  className="w-full p-2 border rounded"
                />
                {filteredSkills.length > 0 && (
                  <ul className="absolute z-10 bg-white border border-gray-300 rounded mt-1 w-full max-h-48 overflow-y-auto">
                    {filteredSkills.map((skill, index) => (
                      <li 
                        key={index} 
                        onClick={() => {
                          handleSkillSelect(skill);
                          onChange(skill);
                        }}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

            ) : (
              <span>{value || "No especificado"}</span>
            ),
        },
        {
          label: "Nivel",
          key: "level",
          type: "select",
          options: ["Básico", "Intermedio", "Avanzado"],
          customInput: (value, onChange) =>
            isEditing ? (
              <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="Básico">Básico</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
              </select>
            ) : (
              <span>{value || "No especificado"}</span>
            ),
        },
      ]}

      isEditing={isEditing}
    />
  );
};

export default SkillsSection;
