import React from "react";

const Section = ({ title, items, onAdd, onEdit, onDelete, fields, isEditing }) => {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {items.length === 0 && !isEditing && <p>No hay elementos registrados.</p>}
      {items.map((item) => (
        <div key={item.id} className="mt-2">
          {fields.map((field) => {
            if (isEditing) {
              if (field.type === "textarea") {
                return (
                  <textarea
                    key={field.key}
                    value={item[field.key]}
                    onChange={(e) => onEdit(item.id, field.key, e.target.value)}
                    className="w-full p-2 border rounded resize-none h-20"
                  />
                );
              } else if (field.type === "select") {
                return (
                  <select
                    key={field.key}
                    value={item[field.key]}
                    onChange={(e) => onEdit(item.id, field.key, e.target.value)}
                    className="w-full p-2 border rounded"
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
                    onChange={(e) => onEdit(item.id, field.key, e.target.value)}
                    className="w-full p-2 border rounded"
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
              className="text-red-500 hover:underline mt-2"
            >
              Eliminar
            </button>
          )}
        </div>
      ))}
      {isEditing && (
        <button
          onClick={onAdd}
          className="text-blue-500 hover:underline mt-4 block"
        >
          + Agregar {title.toLowerCase()}
        </button>
      )}
    </div>
  );
};

export default Section;