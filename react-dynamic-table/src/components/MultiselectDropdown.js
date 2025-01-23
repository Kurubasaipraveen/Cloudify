import React, { useState } from 'react';
import '../styles/MultiselectDropdown.css';

const MultiselectDropdown = ({ options, selected, onChange, onAddNewOption }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [newOption, setNewOption] = useState('');

  const handleOptionChange = (option) => {
    const updatedSelection = selected.includes(option)
      ? selected.filter((item) => item !== option) 
      : [...selected, option];
    onChange(updatedSelection);
  };

  const handleRemoveSelected = (option) => {
    onChange(selected.filter((item) => item !== option));
  };

  const handleAddOption = () => {
    if (newOption.trim() && !options.includes(newOption.trim())) {
      onAddNewOption(newOption.trim());
      setNewOption('');
    }
  };

  // Filter out the selected options from all rows
  const availableOptions = options.filter((option) => !selected.includes(option));

  return (
    <div className="multiselect-dropdown">
      <div className="selected-options">
        {selected.map((option) => (
          <div key={option} className="selected-item">
            {option}
            <button
              className="remove-btn"
              onClick={() => handleRemoveSelected(option)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div
        className="dropdown-header"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <span>{selected.length > 0 ? 'Edit Selection' : 'Select Options'}</span>
        <span className="dropdown-arrow">{dropdownOpen ? '▲' : '▼'}</span>
      </div>
      {dropdownOpen && (
        <div className="dropdown-menu">
          {availableOptions.map((option) => (
            <div key={option} className="dropdown-item">
              <label>
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => handleOptionChange(option)}
                />
                {option}
              </label>
            </div>
          ))}
          <div className="add-new-option">
            <input
              type="text"
              value={newOption}
              placeholder="Add new item"
              onChange={(e) => setNewOption(e.target.value)}
            />
            <button onClick={handleAddOption}>Add</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiselectDropdown;
