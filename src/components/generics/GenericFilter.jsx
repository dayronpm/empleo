import React from 'react';

const GenericFilter = ({ 
    filters, 
    onFilterChange, 
    config,
    className = "flex flex-wrap gap-4 mb-6 p-4 bg-white rounded-lg shadow-md"
}) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onFilterChange(name, value);
    };

    return (
        <div className={className}>
            {config.map(({ type, name, label, options, placeholder, min, step }) => {
                switch (type) {
                    case 'text':
                        return (
                            <div key={name} className="flex-1 min-w-[200px]">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {label}
                                </label>
                                <input
                                    type="text"
                                    name={name}
                                    value={filters[name] || ''}
                                    onChange={handleChange}
                                    placeholder={placeholder}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        );

                    case 'select':
                        return (
                            <div key={name} className="flex-1 min-w-[200px]">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {label}
                                </label>
                                <select
                                    name={name}
                                    value={filters[name] || ''}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Todos</option>
                                    {options.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        );

                    case 'number':
                        return (
                            <div key={name} className="flex-1 min-w-[200px]">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {label}
                                </label>
                                <input
                                    type="number"
                                    name={name}
                                    value={filters[name] || ''}
                                    onChange={handleChange}
                                    placeholder={placeholder}
                                    min={min}
                                    step={step}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        );

                    default:
                        return null;
                }
            })}
        </div>
    );
};

export default GenericFilter; 