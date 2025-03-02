import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AdminTable = ({ admins, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Usuario
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tipo
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {admins.map((admin) => (
            <tr key={admin.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {admin.username}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {admin.tipo}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEdit(admin)}
                  className="text-blue-600 hover:text-blue-900 mr-4"
                >
                  <FaEdit size={18} />
                </button>
                <button
                  onClick={() => onDelete(admin.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <FaTrash size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {admins.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No hay administradores registrados
        </div>
      )}
    </div>
  );
};

export default AdminTable; 