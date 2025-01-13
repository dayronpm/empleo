import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EventosList = ({ eventosData }) => {
    const [columnas, setColumnas] = useState([[], [], []]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEventos, setFilteredEventos] = useState(eventosData);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        distribuirEventos(filteredEventos);
    }, [filteredEventos]);

    const distribuirEventos = (eventos) => {
        const nuevaColumnas = [[], [], []];
        const alturasSimuladas = [];
        const tempDiv = document.createElement('div');
        tempDiv.style.position = 'absolute';
        tempDiv.style.visibility = 'hidden';
        document.body.appendChild(tempDiv);

        eventos.forEach((evento) => {
            tempDiv.innerHTML = `
                <h2 style="font-size: 1.25rem; font-weight: bold;">${evento.name}</h2>
                <p style="margin: 0;">${evento.descripcion}</p>
            `;
            const height = tempDiv.offsetHeight;
            alturasSimuladas.push(height);
        });

        document.body.removeChild(tempDiv);

        let totalAlturaColumna1 = 0;
        let totalAlturaColumna2 = 0;
        let totalAlturaColumna3 = 0;

        eventos.forEach((evento, index) => {
            if (totalAlturaColumna1 <= totalAlturaColumna2 && totalAlturaColumna1 <= totalAlturaColumna3) {
                nuevaColumnas[0].push(evento);
                totalAlturaColumna1 += alturasSimuladas[index];
            } else if (totalAlturaColumna2 <= totalAlturaColumna1 && totalAlturaColumna2 <= totalAlturaColumna3) {
                nuevaColumnas[1].push(evento);
                totalAlturaColumna2 += alturasSimuladas[index];
            } else {
                nuevaColumnas[2].push(evento);
                totalAlturaColumna3 += alturasSimuladas[index];
            }
        });

        setColumnas(nuevaColumnas);
    };

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        filterEventos(value, startDate, endDate);
    };

    const filterEventos = (searchTerm, startDate, endDate) => {
        const filtered = eventosData.filter(evento => {
            const eventDateFormatted = format(evento.date, 'd MMMM yyyy', { locale: es });
            const isWithinDateRange =
                (!startDate || evento.date >= startDate) &&
                (!endDate || evento.date <= endDate);

            return (
                evento.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                isWithinDateRange
            );
        });

        setFilteredEventos(filtered);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex flex-col md:flex-row mb-4 items-center w-full">
                <div className="mr-4 flex-grow">
                    <label htmlFor="search-input" className="block mb-1">Buscar evento por nombre:</label>
                    <input
                        id="search-input"
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="p-2 border border-gray-300 rounded w-full"
                    />
                </div>

                <div className="flex">
                    <div className="mr-4">
                        <label className="block mb-1">Desde:</label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => {
                                setStartDate(date);
                                filterEventos(searchTerm, date, endDate);
                            }}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            dateFormat="d MMMM yyyy"
                            className="border border-gray-300 rounded p-2"
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Hasta:</label>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => {
                                setEndDate(date);
                                filterEventos(searchTerm, startDate, date);
                            }}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate} // No permitir seleccionar una fecha anterior a la fecha de inicio
                            dateFormat="d MMMM yyyy"
                            className="border border-gray-300 rounded p-2"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {columnas.map((columna, colIndex) => (
                    <div key={colIndex} className="flex flex-col gap-6">
                        {columna.map((evento, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-200">
                                <h2 className="text-xl font-semibold text-black">{evento.name}</h2>
                                <p className="text-gray-700 mt-2"><strong>Descripción:</strong> {evento.descripcion}</p>
                                <p className="text-gray-700"><strong>Fecha:</strong> {format(evento.date, 'd MMMM yyyy', { locale: es })}</p>
                                <p className="text-gray-700"><strong>Dirección:</strong> {evento.direccion}</p>
                                <p className="text-gray-700"><strong>Contacto:</strong> {evento.contacto}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventosList;
