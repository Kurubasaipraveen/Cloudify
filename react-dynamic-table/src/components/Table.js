import React, { useState } from 'react';
import MultiselectDropdown from './MultiselectDropdown';
import '../styles/Tables.css';

const Table = () => {
  const [rows, setRows] = useState([{ id: 1, column1: '', column2: [] }]);
  const [column1Options] = useState(['Option 1', 'Option 2', 'Option 3', 'Option 4']);
  const [column2Options, setColumn2Options] = useState(['Option 1', 'Option 2', 'Option 3', 'Option 4']);

  const handleAddRow = () => {
    setRows([...rows, { id: rows.length + 1, column1: '', column2: [] }]);
  };

  const handleColumn1Change = (id, value) => {
    setRows(rows.map((row) => (row.id === id ? { ...row, column1: value } : row)));
  };

  const handleColumn2Change = (id, value) => {
    setRows(rows.map((row) => (row.id === id ? { ...row, column2: value } : row)));
  };

  const handleAddColumn2Option = (newOption) => {
    if (newOption && !column2Options.includes(newOption)) {
      setColumn2Options([...column2Options, newOption]);
    }
  };

  // Function to get the selected options across all rows for column2
  const getSelectedColumn2Options = () => {
    return rows.flatMap((row) => row.column2);
  };

  return (
    <div className="table-container">
      <table className="dynamic-table">
        <thead>
          <tr>
            <th>Label 1</th>
            <th>Label 2</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const selectedColumn2Options = getSelectedColumn2Options(); // Get all selected options for column2

            // Filter out the selected options for the current row
            const availableColumn2Options = column2Options.filter(
              (option) => !selectedColumn2Options.includes(option) || row.column2.includes(option)
            );

            return (
              <tr key={row.id}>
                <td>
                  <select
                    value={row.column1}
                    onChange={(e) => handleColumn1Change(row.id, e.target.value)}
                  >
                    <option value="">Select Option</option>
                    {column1Options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <MultiselectDropdown
                    options={availableColumn2Options}
                    selected={row.column2}
                    onChange={(value) => handleColumn2Change(row.id, value)}
                    onAddNewOption={handleAddColumn2Option}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button className="add-row-button" onClick={handleAddRow}>
        + Add New Row
      </button>
    </div>
  );
};

export default Table;
