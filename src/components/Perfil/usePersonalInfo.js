import { useState, useEffect } from "react";

const API_URL = 'http://localhost:3001'; // Change this if your server is at a different URL

const usePersonalInfo = () => {
  // Estado inicial de la información personal
  const [info, setInfo] = useState({

    telefono : [""],

  });

  const telefono = [""];
  // Obtiene el ID del usuario almacenado en localStorage.
  const id = localStorage.getItem('id');

  // Estado para manejar los campos de cambio de contraseña
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //Cargar datos del usuario
  const fetchUserData = async () => {
      try {
          const response = await fetch(`${API_URL}/usuario`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id }), // Send user ID in the body
          });
          if (!response.ok) {
              throw new Error('Error al cargar la información del usuario');
          }
          const data = await response.json();

          if (!data.telefono) {
            data.telefono = [];
          }
          else{
            data.telefono = JSON.parse(data.telefono);
          }
          setInfo(data);
      } catch (error) {
          console.error(error);
      }
  };

  //Actualizar datos del usuario
  const updateUserData = async (id, info) => {
    try {
        const response = await fetch(`${API_URL}/updateusuario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, info }), // Send user ID in the body
        });
        if (!response.ok) {
            throw new Error('Error al actualizar la información del usuario');
        }
        else{
          // Simulación de guardado exitoso
          alert("Información actualizada exitosamente.");
        }
    } catch (error) {
        console.error(error);
    }
};

  //Llamar a la función para cargar datos del usuario
  useEffect(() => {
      fetchUserData();
  }, []);

//Actualizar contraseña del usuario
const updateUserPassword = async (newPassword) => {
  try {
      alert("Actualizando información.");
      const response = await fetch(`${API_URL}/updatePassword`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, newPassword }), // Send user ID in the body
      });
      if (!response.ok) {
          throw new Error('Error al actualizar la información del usuario');
      }
      else{
        // Simulación de guardado exitoso
        alert("Contraseña actualizada exitosamente.");
      }
  } catch (error) {
      console.error(error);
  }
};

  // Estado para manejar el modal de edición de información
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Estado para manejar el modal de edición de contraseña
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

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
    setInfo((prevInfo) => ({ ...prevInfo, telefono: [...prevInfo.telefono, ""] }));
  };

  // Función para eliminar un teléfono
  const removePhone = (index) => {
    setInfo((prevInfo) => {
      if (prevInfo.telefono.length > 1) {
        const updatedPhones = prevInfo.telefono.filter((_, i) => i !== index);
        return { ...prevInfo, telefono: updatedPhones };
      }
      return prevInfo;
    });
  };

  // Función para guardar los cambios de información personal
  const handleSaveChanges = (updatedInfo) => {
    // Validación: Asegúrate de que el campo "nombre" esté completo
    if (!updatedInfo.nombre) {
      alert("El campo 'Nombre completo' es obligatorio.");
      return; // Detener la ejecución si el campo está vacío
    }

    // Actualizar el estado global con los datos confirmados
    setInfo(updatedInfo);

    // Llamar a la función para actualizar los datos en el servidor
    updateUserData(id, updatedInfo);

    // Cerrar el modal
    closeEditModal();
  };

  // Función para guardar la nueva contraseña
  const handleSavePassword = (formData) => {
    const { currentPassword, newPassword, confirmPassword } = formData;
    const errors = {};
  
    // Validación: Verificar que todos los campos estén completos
    if (!currentPassword) errors.currentPassword = "La contraseña actual es obligatoria.";
    if (!newPassword) errors.newPassword = "La nueva contraseña es obligatoria.";
    if (!confirmPassword) errors.confirmPassword = "La confirmación de contraseña es obligatoria.";
  
    // Validación: Verificar que las contraseñas coincidan
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden.";
    }
  
    // Validación: Verificar que la contraseña actual sea correcta
    const storedPassword = localStorage.getItem('password'); // Contraseña almacenada (simulada)
    if (currentPassword && currentPassword !== storedPassword) {
      errors.currentPassword = "La contraseña actual es incorrecta.";
    }
  
    // Si hay errores, retornarlos para que se muestren en el formulario
    if (Object.keys(errors).length > 0) {
      return errors; // Retornar los errores al modal
    }
  
    // Cambio de contraseña
    updateUserPassword(newPassword);
    localStorage.setItem('password', newPassword);
    setIsPasswordModalOpen(false);
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