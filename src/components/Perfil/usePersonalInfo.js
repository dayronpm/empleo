import { useState } from "react";

const usePersonalInfo = () => {
  // Estado inicial de la información personal
  const [info, setInfo] = useState({
    fullName: "Juan Pérez",
    username: "juanperez",
    province: "La Habana",
    municipality: "Plaza",
    phones: ["+53 55555555"],
    email: "juanperez@example.com",
  });

  // Estado para manejar el modal de edición de información
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Estado para manejar el modal de edición de contraseña
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Estado para manejar los campos de cambio de contraseña
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Función para abrir el modal de edición de información
  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  // Función para cerrar el modal de edición de información
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  // Función para actualizar un campo específico
  const handleInputChange = (field, value) => {
    setInfo((prevInfo) => ({ ...prevInfo, [field]: value }));
  };

  // Función para agregar un nuevo teléfono
  const addPhone = () => {
    setInfo((prevInfo) => ({ ...prevInfo, phones: [...prevInfo.phones, ""] }));
  };

  // Función para eliminar un teléfono
  const removePhone = (index) => {
    setInfo((prevInfo) => {
      if (prevInfo.phones.length > 1) {
        const updatedPhones = prevInfo.phones.filter((_, i) => i !== index);
        return { ...prevInfo, phones: updatedPhones };
      }
      return prevInfo;
    });
  };

  // Función para guardar los cambios de información personal
  const handleSaveChanges = () => {
    // Validación: Asegúrate de que todos los campos estén completos
    if (!info.fullName || !info.username || !info.province || !info.municipality || !info.email) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    // Simulación de guardado exitoso
    alert("Información actualizada exitosamente.");
    closeEditModal();
  };

  // Función para guardar la nueva contraseña
  const handleSavePassword = () => {
    // Validación: Verificar que todos los campos estén completos
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    // Validación: Verificar que las contraseñas coincidan
    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    // Simulación de validación de la contraseña actual
    const storedPassword = "oldpassword123"; // Contraseña almacenada (simulada)
    if (currentPassword !== storedPassword) {
      alert("La contraseña actual es incorrecta.");
      return;
    }

    // Simulación de guardado exitoso
    alert("Contraseña actualizada exitosamente.");
    setIsPasswordModalOpen(false); // Cierra el modal
    setCurrentPassword(""); // Limpia los campos
    setNewPassword("");
    setConfirmPassword("");
  };

  return {
    info,
    isEditModalOpen,
    isPasswordModalOpen,
    currentPassword,
    newPassword,
    confirmPassword,
    openEditModal,
    closeEditModal,
    setIsPasswordModalOpen,
    handleInputChange,
    addPhone,
    removePhone,
    handleSaveChanges,
    handleSavePassword,
    setCurrentPassword,
    setNewPassword,
    setConfirmPassword,
  };
};

export default usePersonalInfo;