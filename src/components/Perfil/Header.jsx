import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa"; // Mantenemos el ícono de eliminar

const Header = () => {
  const [formData, setFormData] = useState({
    fullName: "Juan Pérez",
    username: "juanperez",
    password: "******",
    confirmPassword: "",
    province: "La Habana",
    municipality: "Plaza",
    phones: ["+53 55555555"],
    email: "juanperez@example.com",
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const addPhone = () => {
    setFormData({ ...formData, phones: [...formData.phones, ""] });
  };

  const removePhone = (index) => {
    const updatedPhones = formData.phones.filter((_, i) => i !== index);
    setFormData({ ...formData, phones: updatedPhones });
  };

  return (
    <>
      {/* Encabezado */}
      <header className="bg-gray-900 text-white p-6">
        <div className="container mx-auto flex justify-between items-center">
          {/* Información del usuario */}
          <div>
           
            <h1 className="text-2xl font-bold text-white">Bienvenido, Juan Pérez</h1>
          </div>

          {/* Botones de acciones */}
          <div className="flex gap-4">
            {/* Botón de eliminar cuenta */}
            <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 transition-colors px-4 py-2 rounded-full shadow-md">
              <FaTrashAlt className="text-white" /> Eliminar cuenta
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
