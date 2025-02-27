import React, { useState } from 'react';
import AdminActions from './AdminActions';
import AdminTable from './AdminTable';
import AddAdminModal from './AddAdminModal';
import EditAdminModal from './EditAdminModal'; // Nuevo componente para editar
import SearchBar from './SearchBar';

const Admins = () => {
  const [admins, setAdmins] = useState([
    { id: 1, nombre: 'Admin 1', rol: 'Superadministrador', fechaRegistro: '2023-01-01' },
    // ... más administradores ...
  ]);
  const [filteredAdmins, setFilteredAdmins] = useState(admins);
  const [isMultiDeleteMode, setIsMultiDeleteMode] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Estado para el modal de edición
  const [selectedAdmin, setSelectedAdmin] = useState(null); // Administrador seleccionado para editar

  // Función para agregar un nuevo administrador
  const handleAddAdmin = (newAdmin) => {
    const newId = admins.length > 0 ? Math.max(...admins.map((admin) => admin.id)) + 1 : 1;
    setAdmins([...admins, { id: newId, ...newAdmin }]);
    setFilteredAdmins([...admins, { id: newId, ...newAdmin }]);
  };

  // Función para editar un administrador existente
  const handleEditAdmin = (updatedAdmin) => {
    setAdmins(
      admins.map((admin) =>
        admin.id === updatedAdmin.id ? { ...admin, ...updatedAdmin } : admin
      )
    );
    setFilteredAdmins(
      filteredAdmins.map((admin) =>
        admin.id === updatedAdmin.id ? { ...admin, ...updatedAdmin } : admin
      )
    );
  };

  return (
    <div className="p-4">
      {/* Título */}
      <h2 className="text-2xl font-bold mb-4">Administradores</h2>

      {/* Encabezado con Botones Agregar, Eliminar y Buscador */}
      <div className="flex justify-between items-center mb-4">
        <AdminActions
          isMultiDeleteMode={isMultiDeleteMode}
          setIsMultiDeleteMode={setIsMultiDeleteMode}
          onAdd={() => setIsAddModalOpen(true)}
        />
        <SearchBar data={admins} setSearchResults={setFilteredAdmins} />
      </div>

      {/* Tabla */}
      <AdminTable
        admins={filteredAdmins}
        isMultiDeleteMode={isMultiDeleteMode}
        onEdit={(admin) => {
          setSelectedAdmin(admin); // Guardar el administrador seleccionado
          setIsEditModalOpen(true); // Abrir el modal de edición
        }}
      />

      {/* Modal de Agregar Administrador */}
      <AddAdminModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddAdmin}
      />

      {/* Modal de Editar Administrador */}
      <EditAdminModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        admin={selectedAdmin}
        onSave={handleEditAdmin}
      />
    </div>
  );
};

export default Admins;