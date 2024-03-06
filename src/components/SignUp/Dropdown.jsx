import React from "react";

const Dropdown = ({ label, options, value, onChange }) => {
  const handleChange = (e) => {
    const selectedOptions = Array.isArray(e.target.value)
      ? e.target.value
      : [e.target.value];
    onChange(selectedOptions);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <select
        multiple
        value={Array.isArray(value) ? value : [value]} // Ensure value is an array
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {Array.isArray(value) && value.length > 0 && (
        <div className="mt-2">
          <strong>Selected:</strong>
          <ul className="list-disc list-inside">
            {value.map((selectedValue) => {
              const selectedOption = options.find(
                (option) => option.value === selectedValue,
              );
              return selectedOption ? (
                <li key={selectedOption.value}>{selectedOption.label}</li>
              ) : null;
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
