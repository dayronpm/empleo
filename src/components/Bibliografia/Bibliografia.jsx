import React, { useState } from 'react';
import DatePicker from 'react-datepicker'; // Asegúrate de instalar esta librería
import "react-datepicker/dist/react-datepicker.css";
import { items } from './items';

const Bibliografia = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('todos');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [sortOrder, setSortOrder] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

// Filtrar elementos según búsqueda, tipo y categoría
const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "todos" || item.type === selectedType;
    const matchesCategory = selectedCategory === "todos" || item.category === selectedCategory;
    
    // Filtrar por rango de fechas
    const matchesDateRange =
        (!startDate || new Date(item.date) >= startDate) &&
        (!endDate || new Date(item.date) <= endDate);

    return matchesSearch && matchesType && matchesCategory && matchesDateRange;
});

// Ordenar elementos
const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOrder === "") return 0;
    if (sortOrder === "nombre") return a.name.localeCompare(b.name);
    if (sortOrder === "autor") return a.author.localeCompare(b.author);
    if (sortOrder === "fecha") return new Date(a.date) - new Date(b.date);
    return a.category.localeCompare(b.category);
});

return (
<div className="p-6 bg-gray-100 min-h-screen">
<header className="flex justify-between items-center mb-6">
<button 
onClick={() => setShowSidebar(!showSidebar)} 
className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
>
{showSidebar ? "Cerrar Menú" : "Menú"}
</button>
<h1 className="text-3xl font-bold text-red-600 mx-auto">Bibliografía</h1>
</header>

<div className="flex">
{showSidebar && (
<aside className="w-64 bg-white p-4 shadow-lg rounded-lg mr-4">
<div className="mb-5">
<label className="block mb-2">Tipo de Archivo</label>
<select 
onChange={(e) => setSelectedType(e.target.value)} 
className="border p-2 rounded w-full"
>
<option value="todos">Todos</option>
<option value="DOCX">DOCX</option>
<option value="PPT">PPT</option>
<option value="XLS">XLS</option>
<option value="PPTX">PPTX</option>
<option value="PDF">PDF</option>
</select>
</div>
<div className="mb–5">
<label className="block mb–2">Categoría</label>
<select 
onChange={(e) => setSelectedCategory(e.target.value)} 
className="border p–2 rounded w-full"
>
<option value="todos">Todos</option>
<option value="A">A</option>
<option value="B">B</option>
<option value="C">C</option>
</select>
</div>
<div className="mb–5">
<label className="block mb–2">Ordenar por</label>
<select 
onChange={(e) => setSortOrder(e.target.value)} 
className="border p–2 rounded w-full"
>
<option value="">Sin ordenar</option>
<option value="nombre">Por Nombre</option>
<option value="autor">Por Autor</option>
<option value="fecha">Por Fecha</option>
</select>
</div>

{/* Filtros por Fecha */}
<div className="mb–5">
<label className="block mb–2">Desde:</label>
<DatePicker 
selected={startDate} 
onChange={(date) => setStartDate(date)} 
className="border p–2 rounded w-full"
/>
</div>

<div className="mb–5">
<label className="block mb–2">Hasta:</label>
<DatePicker 
selected={endDate} 
onChange={(date) => setEndDate(date)} 
className="border p–2 rounded w-full"
/>
</div>

</aside>
)}

<div className="flex-grow">
<div className="mb–5">
<input 
type="text" 
placeholder="Buscar documento" 
value={searchTerm} 
onChange={(e) => setSearchTerm(e.target.value)} 
className="border mb-2 p–2 rounded w-full"
/>
</div>

<table className="min-w-full bg-white border border-gray–300 rounded-lg shadow-md">
<thead className="bg-gray–200">
<tr>
<th className="py–2 px–4 border-b text-left">Nombre</th> {/* Nombre del archivo */}
<th className="py–2 px–4 border-b text-left">Autor</th> {/* Autor del archivo */}
<th className="py–2 px–4 border-b text-left">Tipo</th> {/* Tipo de archivo */}
<th className="py–2 px–4 border-b text-left">Categoría</th> {/* Categoría del archivo centrada */}
<th className="py–2 px–4 border-b text-center">Fecha</th> {/* Fecha de publicación */}
</tr>
</thead>
<tbody>
{sortedItems.map(item => (
<tr key={item.name} className="hover:bg-gray–100">
<td className="py–2 px–4 border-b">
<a href={item.url} download className="text-black-600 hover:text-red-600">{item.name}</a>

</td>
<td className="py–2 px–4 border-b">{item.author}</td> {/* Autor */}
<td className="py–2 px–4 border-b">{item.type}</td> {/* Tipo */}
<td className="py–2 px–4 border-b">{item.category}</td> {/* Categoría centrada */}
<td className="py–2 px–4 border-b text-center">{item.date}</td> {/* Fecha */}
</tr>
))}
</tbody>
</table>

</div>
</div>
</div>

);
};

export default Bibliografia;
