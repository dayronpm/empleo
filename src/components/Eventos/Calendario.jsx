import React, { useState } from 'react';
import { format, addDays, startOfMonth, endOfMonth, isSameDay, isSameMonth, addMonths, isBefore } from 'date-fns';
import { es } from 'date-fns/locale'; // Importa la configuración regional en español
import eventosData from './eventosData';

const Calendario = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedEvento, setSelectedEvento] = useState(null);

    const getDaysInMonth = (date) => {
        const start = startOfMonth(date);
        const end = endOfMonth(date);
        const days = [];
        for (let d = start; d <= end; d = addDays(d, 1)) {
            days.push(d);
        }
        return days;
    };

    const daysInMonth = getDaysInMonth(selectedDate);

    const eventosDelDia = (date) => {
        return eventosData.filter(evento => isSameDay(evento.date, date));
    };

    const handleEventClick = (evento) => {
        setSelectedEvento(evento);
    };

    const closePopup = () => {
        setSelectedEvento(null);
    };

    const changeMonth = (increment) => {
        const newDate = addMonths(selectedDate, increment);
        if (isBefore(newDate, new Date()) && !isSameMonth(newDate, new Date())) {
            return;
        }
        setSelectedDate(newDate);
    };

    // Función para capitalizar la primera letra
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <div className="p-6 bg-white min-h-screen">
            <div className="flex justify-between items-center mb-4">
                <button onClick={() => changeMonth(-1)} className="px-4 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-600 transition duration-200">
                    Mes Anterior
                </button>
                <h2 className="text-2xl font-semibold text-black">{capitalizeFirstLetter(format(selectedDate, 'MMMM', { locale: es }))} {format(selectedDate, 'yyyy')}</h2>
                <button onClick={() => changeMonth(1)} className="px-4 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-600 transition duration-200">
                    Mes Siguiente
                </button>
            </div>
            <div className="grid grid-cols-7 gap-4">
                {daysInMonth.map((day) => (
                    <div key={day} 
                         className={`border p-4 rounded-lg cursor-pointer 
                         ${eventosDelDia(day).length > 0 ? 'bg-gray-200 hover:bg-gray-300 text-black font-bold' : ''} 
                         ${isSameDay(day, selectedDate) ? 'bg-gray-800 font-bold text-white' : 'text-black'}`} 
                         onClick={() => setSelectedDate(day)}>
                        <div className="text-center text-lg">
                            {format(day, 'd', { locale: es })}
                        </div>
                    </div>
                ))}
            </div>
            {/* Mostrar eventos del día seleccionado */}
            {selectedDate && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-black">Eventos del {format(selectedDate, 'd MMMM yyyy', { locale: es })}</h2>
                    <ul className="mt-2 space-y-2">
                        {eventosDelDia(selectedDate).map((evento, index) => (
                            <li key={index} className="border p-4 rounded-lg bg-white shadow-md cursor-pointer hover:bg-gray-100 transition duration-200" onClick={() => handleEventClick(evento)}>
                                {evento.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {/* Popup para mostrar información del evento */}
            {selectedEvento && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                        <h3 className="text-xl font-bold">{selectedEvento.name}</h3>
                        <p><strong>Descripción:</strong> {selectedEvento.descripcion}</p>
                        <p><strong>Fecha:</strong> {format(selectedEvento.date, 'd MMMM yyyy', { locale: es })}</p>
                        <p><strong>Dirección:</strong> {selectedEvento.direccion}</p>
                        <p><strong>Contacto:</strong> {selectedEvento.contacto}</p>
                        <button onClick={closePopup} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200">
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendario;
