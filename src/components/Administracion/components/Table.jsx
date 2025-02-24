// src/components/Table.jsx
const Table = ({ headers, data, actions }) => {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              {headers.map((header, index) => (
                <th key={index} className="py-2 px-4 text-left">{header}</th>
              ))}
              <th className="py-2 px-4 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t">
                {Object.values(row).map((value, colIndex) => (
                  <td key={colIndex} className="py-2 px-4">{value}</td>
                ))}
                <td className="py-2 px-4">
                  {actions(row)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default Table;