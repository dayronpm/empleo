// src/pages/People.jsx
import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import Modal from '../components/Modal';
import Dropdown from '../components/Dropdown';
import { notifySuccess, notifyError } from '../components/ToastNotification';
import { FaPlus, FaTrash } from 'react-icons/fa';
import SearchBar from './SearchBar';
import { provincesAndMunicipalities } from '../../Perfil/data';
import { BsTrash, BsPlus } from 'react-icons/bs';
import Section from '../../generics/Section';
import { getSectionConfigs } from '../../helpers/SectionConfigurations';

const People = () => {
  const [people, setPeople] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMultiDeleteMode, setIsMultiDeleteMode] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [activeTab, setActiveTab] = useState('personal');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedMunicipality, setSelectedMunicipality] = useState('');
  const [availableMunicipalities, setAvailableMunicipalities] = useState([]);
  const [phones, setPhones] = useState([]);

  // Estados para información profesional
  const [activeSection, setActiveSection] = useState("summary");
  const [summary, setSummary] = useState("");
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchPeople();
  }, []);

  useEffect(() => {
    if (selectedPerson) {
      setSelectedProvince(selectedPerson.provincia);
      setSelectedMunicipality(selectedPerson.municipio);
      setAvailableMunicipalities(provincesAndMunicipalities[selectedPerson.provincia] || []);
      setPhones(selectedPerson.telefono || []);
    }
  }, [selectedPerson]);

  // Modificar el useEffect que carga los datos profesionales
  useEffect(() => {
    if (selectedPerson) {
      fetch('http://localhost:3001/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedPerson.id
        })
      })
      .then(response => response.json())
      .then(userData => {
        try {
          setSummary(userData.resumen ? JSON.parse(userData.resumen)[0] || '' : '');
          
          // Convertir las fechas a objetos Date en experiencias
          const parsedExperiences = userData.experiencia ? 
            JSON.parse(userData.experiencia).map(exp => ({
              ...exp,
              startDate: exp.startDate ? new Date(exp.startDate) : null,
              endDate: exp.endDate ? new Date(exp.endDate) : null
            })) : [];
          setExperiences(parsedExperiences);

          // Convertir las fechas a objetos Date en educación
          const parsedEducation = userData.educacion ? 
            JSON.parse(userData.educacion).map(edu => ({
              ...edu,
              startDate: edu.startDate ? new Date(edu.startDate) : null,
              endDate: edu.endDate ? new Date(edu.endDate) : null
            })) : [];
          setEducations(parsedEducation);

          // Convertir las fechas a objetos Date en proyectos
          const parsedProjects = userData.proyectos ? 
            JSON.parse(userData.proyectos).map(proj => ({
              ...proj,
              startDate: proj.startDate ? new Date(proj.startDate) : null,
              endDate: proj.endDate ? new Date(proj.endDate) : null
            })) : [];
          setProjects(parsedProjects);

          // El resto de los datos no tienen fechas
          setSkills(userData.habilidades ? JSON.parse(userData.habilidades) : []);
          setLanguages(userData.idiomas ? JSON.parse(userData.idiomas) : []);
          setCertifications(userData.certificaciones ? JSON.parse(userData.certificaciones) : []);
        } catch (error) {
          console.error('Error al parsear datos profesionales:', error);
          notifyError('Error al cargar la información profesional');
        }
      })
      .catch(error => {
        console.error('Error al obtener información del usuario:', error);
        notifyError('Error al cargar la información del usuario');
      });
    }
  }, [selectedPerson]);

  const fetchPeople = async () => {
    try {
      const response = await fetch('http://localhost:3001/getallpersona');
      const peopleData = await response.json();
      
      const formattedPeople = peopleData.map(person => ({
        id: person.id,
        nombreCompleto: person.nombre,
        username: person.username,
        password: person.password,
        provincia: person.provincia || '',
        municipio: person.municipio || '',
        telefono: person.telefono ? JSON.parse(person.telefono) : [],
        correo: person.correo || '',
      }));

      setPeople(formattedPeople);
      setFilteredPeople(formattedPeople);
      setIsLoading(false);
    } catch (error) {
      console.error('Error al cargar personas:', error);
      notifyError('Error al cargar las personas');
      setIsLoading(false);
    }
  };

  const handleAddPerson = async (formData) => {
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.get('nombreUsuario'),
          password: formData.get('contraseña'),
          userType: 'persona',
          name: formData.get('nombreCompleto')
        }),
      });

      const data = await response.json();

      if (response.ok) {
        notifySuccess('Persona agregada exitosamente');
        fetchPeople();
        setIsAddModalOpen(false);
      } else {
        notifyError(data.error || 'Error al agregar la persona');
      }
    } catch (error) {
      console.error('Error:', error);
      notifyError('Error al agregar la persona');
    }
  };

  // Agregar función para eliminar personas
  const handleDeletePeople = async (ids) => {
    try {
      const deletePromises = ids.map(id => {
        const person = people.find(p => p.id === id);
        if (!person) throw new Error('Persona no encontrada');

        return fetch('http://localhost:3001/borrarusuario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            id,
            username: person.username,
            password: person.password
          })
        }).then(response => {
          if (!response.ok) {
            throw new Error('Error al eliminar la persona');
          }
          return response;
        });
      });

      await Promise.all(deletePromises);
      notifySuccess('Personas eliminadas exitosamente');
      fetchPeople();
      setIsMultiDeleteMode(false);
    } catch (error) {
      console.error('Error:', error);
      notifyError('Error al eliminar las personas');
    }
  };

  const handleProvinceChange = (e) => {
    const province = e.target.value;
    setSelectedProvince(province);
    setAvailableMunicipalities(provincesAndMunicipalities[province] || []);
    setSelectedMunicipality('');
  };

  const handleAddPhone = () => {
    setPhones([...phones, '']);
  };

  const handleRemovePhone = (index) => {
    const newPhones = phones.filter((_, i) => i !== index);
    setPhones(newPhones);
  };

  const handlePhoneChange = (index, value) => {
    const newPhones = [...phones];
    newPhones[index] = value;
    setPhones(newPhones);
  };

  const handleEditPersonalInfo = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      const response = await fetch('http://localhost:3001/updateusuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedPerson.id,
          info: {
            nombre: formData.get('nombreCompleto'),
            provincia: formData.get('provincia'),
            municipio: formData.get('municipio'),
            telefono: phones,
            correo: formData.get('correo') || selectedPerson.correo
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al actualizar la información personal');
      }

      // Si hay contraseña nueva, actualizarla
      if (formData.get('password')) {
        const passwordResponse = await fetch('http://localhost:3001/updatePassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: selectedPerson.id,
            newPassword: formData.get('password')
          }),
        });

        if (!passwordResponse.ok) {
          throw new Error('Error al actualizar la contraseña');
        }
      }

      notifySuccess('Información personal actualizada exitosamente');
      fetchPeople();
      setIsEditModalOpen(false);
      setSelectedPerson(null);
      
    } catch (error) {
      console.error('Error:', error);
      notifyError(error.message || 'Error al actualizar la información personal');
    }
  };

  // Modificar la función que guarda toda la información profesional
  const saveAllProfessionalInfo = async (closeModal = false) => {
    try {
      // Guardar todos los campos
      await Promise.all([
        handleSaveProfessionalInfo('resumen', summary, false),
        handleSaveProfessionalInfo('experiencia', experiences, false),
        handleSaveProfessionalInfo('educacion', educations, false),
        handleSaveProfessionalInfo('habilidades', skills, false),
        handleSaveProfessionalInfo('idiomas', languages, false),
        handleSaveProfessionalInfo('certificaciones', certifications, false),
        handleSaveProfessionalInfo('proyectos', projects, false)
      ]);

      notifySuccess('Información profesional actualizada exitosamente');
      
      if (closeModal) {
        setIsEditModalOpen(false);
        setSelectedPerson(null);
      }
    } catch (error) {
      console.error('Error:', error);
      notifyError('Error al guardar la información profesional');
    }
  };

  // Modificar la función handleSaveProfessionalInfo para controlar cuándo mostrar el toast
  const handleSaveProfessionalInfo = async (campo, datos, showToast = true) => {
    try {
      let datosToSend = datos;
      
      // Manejar el resumen como array
      if (campo === 'resumen') {
        datosToSend = [datos];
      }
      // Manejar las fechas para experiencia, educación y proyectos
      else if (campo === 'experiencia' || campo === 'educacion' || campo === 'proyectos') {
        datosToSend = datos.map(item => ({
          ...item,
          startDate: item.startDate ? item.startDate.toISOString() : null,
          endDate: item.endDate ? item.endDate.toISOString() : null
        }));
      }

      const response = await fetch('http://localhost:3001/update-curriculum', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedPerson.id,
          campo,
          datos: datosToSend
        }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la información profesional');
      }

      if (showToast) {
        notifySuccess('Información actualizada exitosamente');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error; // Re-lanzar el error para manejarlo en saveAllProfessionalInfo
    }
  };

  // Configuraciones de las secciones
  const sectionConfigs = getSectionConfigs(true);

  const headers = ['Nombre Completo', 'Usuario', 'Provincia', 'Municipio'];

  const actions = {
    onEdit: (person) => {
      setSelectedPerson(person);
      setIsEditModalOpen(true);
    },
    onDeleteMultiple: handleDeletePeople,
    onAdd: () => setIsAddModalOpen(true),
  };

  // Función auxiliar para validar fechas
  const validateDates = (startDate, endDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Resetear la hora para comparar solo fechas

    // Si hay fecha de inicio, no puede ser posterior a hoy
    if (startDate && new Date(startDate) > today) {
      notifyError('La fecha de inicio no puede ser posterior a la fecha actual');
      return false;
    }

    // Si hay fecha de fin, no puede ser posterior a hoy
    if (endDate && new Date(endDate) > today) {
      notifyError('La fecha de fin no puede ser posterior a la fecha actual');
      return false;
    }

    // Si hay ambas fechas, inicio no puede ser posterior a fin
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      notifyError('La fecha de inicio no puede ser posterior a la fecha de fin');
      return false;
    }

    return true;
  };

  // Modificar la función handleEditItem para incluir validaciones
  const handleEditItem = (sectionName, itemId, field, value) => {
    // Obtener el item que se está editando
    let currentItem;
    switch (sectionName) {
      case 'experience':
        currentItem = experiences.find(item => item.id === itemId);
        break;
      case 'education':
        currentItem = educations.find(item => item.id === itemId);
        break;
      case 'projects':
        currentItem = projects.find(item => item.id === itemId);
        break;
    }

    // Validaciones específicas para fechas
    if (field === 'startDate' || field === 'endDate') {
      const startDate = field === 'startDate' ? value : currentItem?.startDate;
      const endDate = field === 'endDate' ? value : currentItem?.endDate;

      if (!validateDates(startDate, endDate)) {
        return; // No actualizar si la validación falla
      }
    }

    // Validaciones específicas para cada sección
    switch (sectionName) {
      case 'experience':
        if (field === 'company' && !value.trim()) {
          notifyError('El nombre de la empresa es obligatorio');
          return;
        }
        if (field === 'position' && !value.trim()) {
          notifyError('El cargo es obligatorio');
          return;
        }
        setExperiences(experiences.map(item => 
          item.id === itemId ? { ...item, [field]: value } : item
        ));
        break;

      case 'education':
        if (field === 'institution' && !value.trim()) {
          notifyError('El nombre de la institución es obligatorio');
          return;
        }
        if (field === 'degree' && !value.trim()) {
          notifyError('El título obtenido es obligatorio');
          return;
        }
        setEducations(educations.map(item => 
          item.id === itemId ? { ...item, [field]: value } : item
        ));
        break;

      case 'skills':
        if (!value.trim()) {
          notifyError('La habilidad no puede estar vacía');
          return;
        }
        setSkills(skills.map(item => 
          item.id === itemId ? { ...item, [field]: value } : item
        ));
        break;

      case 'languages':
        if (field === 'name' && !value.trim()) {
          notifyError('El nombre del idioma es obligatorio');
          return;
        }
        if (field === 'level' && !value) {
          notifyError('El nivel es obligatorio');
          return;
        }
        setLanguages(languages.map(item => 
          item.id === itemId ? { ...item, [field]: value } : item
        ));
        break;

      case 'certifications':
        if (field === 'name' && !value.trim()) {
          notifyError('El nombre de la certificación es obligatorio');
          return;
        }
        if (field === 'institution' && !value.trim()) {
          notifyError('La institución es obligatoria');
          return;
        }
        setCertifications(certifications.map(item => 
          item.id === itemId ? { ...item, [field]: value } : item
        ));
        break;

      case 'projects':
        if (field === 'name' && !value.trim()) {
          notifyError('El nombre del proyecto es obligatorio');
          return;
        }
        setProjects(projects.map(item => 
          item.id === itemId ? { ...item, [field]: value } : item
        ));
        break;
    }
  };

  const handleDeleteItem = (sectionName, itemId) => {
    switch (sectionName) {
      case 'experience':
        setExperiences(experiences.filter(item => item.id !== itemId));
        break;
      case 'education':
        setEducations(educations.filter(item => item.id !== itemId));
        break;
      case 'skills':
        setSkills(skills.filter(item => item.id !== itemId));
        break;
      case 'languages':
        setLanguages(languages.filter(item => item.id !== itemId));
        break;
      case 'certifications':
        setCertifications(certifications.filter(item => item.id !== itemId));
        break;
      case 'projects':
        setProjects(projects.filter(item => item.id !== itemId));
        break;
    }
  };

  // Modificar la función que abre el modal de edición
  const handleEdit = (person) => {
    setSelectedProvince(person.provincia);
    setSelectedMunicipality(person.municipio);
    setAvailableMunicipalities(provincesAndMunicipalities[person.provincia] || []);
    setSelectedPerson(person);
    setIsEditModalOpen(true);
  };

  // Agregar función para manejar cambios en el municipio
  const handleMunicipalityChange = (e) => {
    setSelectedMunicipality(e.target.value);
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Personas</h2>
        <div className="flex space-x-4">
          <SearchBar
            data={people}
            setSearchResults={setFilteredPeople}
          />

          <button
            className="flex items-center text-green-500 hover:text-green-700"
            onClick={actions.onAdd}
          >
            <FaPlus className="mr-2" /> Agregar
          </button>
          <button
            className={`flex items-center ${
              isMultiDeleteMode ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
            }`}
            onClick={() => setIsMultiDeleteMode(!isMultiDeleteMode)}
          >
            <FaTrash className="mr-2" /> Eliminar
          </button>
        </div>
      </div>

      <Table
        headers={headers}
        data={filteredPeople.map(person => ({
          id: person.id,
          visibleData: {
            nombreCompleto: person.nombreCompleto,
            username: person.username,
            provincia: person.provincia,
            municipio: person.municipio,
          },
          ...person
        }))}
        actions={actions}
        isMultiDeleteMode={isMultiDeleteMode}
      />

      {/* Modal de Agregar Persona */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition-colors"
              onClick={() => setIsAddModalOpen(false)}
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

            <h3 className="text-xl font-bold mb-4">Agregar Persona</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const contraseña = formData.get('contraseña');
                const confirmarContraseña = formData.get('confirmarContraseña');

                if (contraseña !== confirmarContraseña) {
                  notifyError('Las contraseñas no coinciden');
                  return;
                }

                handleAddPerson(formData);
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                  <input
                    type="text"
                    name="nombreCompleto"
                    placeholder="Ej. Juan Pérez"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
                  <input
                    type="text"
                    name="nombreUsuario"
                    placeholder="Ej. juan.perez"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                  <input
                    type="password"
                    name="contraseña"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
                  <input
                    type="password"
                    name="confirmarContraseña"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                    onClick={() => setIsAddModalOpen(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    Aceptar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Editar Persona */}
      {isEditModalOpen && selectedPerson && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition-colors"
              onClick={() => {
                setIsEditModalOpen(false);
                setSelectedPerson(null);
              }}
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

            <h3 className="text-xl font-bold mb-4">Editar Persona</h3>

            {/* Tabs para alternar entre información personal y profesional */}
            <div className="mb-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  <button
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'personal'
                        ? 'border-red-500 text-red-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('personal')}
                  >
                    Información Personal
                  </button>
                  <button
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'professional'
                        ? 'border-red-500 text-red-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('professional')}
                  >
                    Información Profesional
                  </button>
                </nav>
              </div>
            </div>

            {/* Contenido del tab activo */}
            {activeTab === 'personal' ? (
              <form onSubmit={handleEditPersonalInfo}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                    <input
                      type="text"
                      name="nombreCompleto"
                      defaultValue={selectedPerson.nombreCompleto}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                    <input
                      type="email"
                      name="correo"
                      defaultValue={selectedPerson.correo}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Provincia</label>
                    <select
                      name="provincia"
                      value={selectedProvince}
                      onChange={handleProvinceChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Seleccione una provincia</option>
                      {Object.keys(provincesAndMunicipalities).map(province => (
                        <option key={province} value={province}>{province}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Municipio</label>
                    <select
                      name="municipio"
                      value={selectedMunicipality}
                      onChange={handleMunicipalityChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                      disabled={!selectedProvince}
                    >
                      <option value="">Seleccione un municipio</option>
                      {availableMunicipalities.map(municipality => (
                        <option key={municipality} value={municipality}>{municipality}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Teléfonos</label>
                    <div className="space-y-2">
                      {phones.map((phone, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={phone}
                            onChange={(e) => handlePhoneChange(index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="Ingrese un número de teléfono"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemovePhone(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <BsTrash size={20} />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={handleAddPhone}
                        className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
                      >
                        <BsPlus size={20} />
                        Agregar teléfono
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nueva Contraseña (opcional)</label>
                    <input
                      type="password"
                      name="password"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="flex justify-end space-x-2 mt-6">
                    <button
                      type="button"
                      onClick={() => setIsEditModalOpen(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-red-500 text-white rounded-md"
                    >
                      Guardar Cambios
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-4">
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
                    <option value="projects">Proyectos</option>
                  </select>
                </div>

                {activeSection === "summary" ? (
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">Resumen Profesional</label>
                    <textarea
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      className="w-full p-2 border rounded"
                      rows={4}
                    />
                  </div>
                ) : (
                  <Section
                    {...sectionConfigs[activeSection]}
                    items={
                      activeSection === 'experience' ? experiences :
                      activeSection === 'education' ? educations :
                      activeSection === 'skills' ? skills :
                      activeSection === 'languages' ? languages :
                      activeSection === 'certifications' ? certifications :
                      projects
                    }
                    onAdd={() => {
                      const newItem = { id: Date.now(), ...sectionConfigs[activeSection].defaultItem };
                      switch (activeSection) {
                        case 'experience': setExperiences([...experiences, newItem]); break;
                        case 'education': setEducations([...educations, newItem]); break;
                        case 'skills': setSkills([...skills, newItem]); break;
                        case 'languages': setLanguages([...languages, newItem]); break;
                        case 'certifications': setCertifications([...certifications, newItem]); break;
                        case 'projects': setProjects([...projects, newItem]); break;
                      }
                    }}
                    onEdit={(id, field, value) => handleEditItem(activeSection, id, field, value)}
                    onDelete={(id) => handleDeleteItem(activeSection, id)}
                    isEditing={true}
                  />
                )}

                {/* En el JSX, modificar los botones de guardar y agregar el botón de cancelar */}
                <div className="flex justify-end mt-6 space-x-2">
                  <button
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setSelectedPerson(null);
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => saveAllProfessionalInfo(false)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => saveAllProfessionalInfo(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Guardar y Cerrar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default People;