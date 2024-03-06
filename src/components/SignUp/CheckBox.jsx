// src/components/RadioButton.jsx
import React, { useState, useEffect } from "react";

const CheckBox = ({ value, checked, onChange, label }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleSelected = () => {
    setIsChecked(!isChecked);
    onChange(value, !isChecked);
  };

  return (
    <label className="m-2 ml-2 text-sm font-medium text-gray-900 dark:text-white">
      <input
        type="checkbox"
        value={value}
        checked={isChecked}
        onChange={handleSelected}
      />
      {label}
    </label>
  );
};

export default CheckBox;
