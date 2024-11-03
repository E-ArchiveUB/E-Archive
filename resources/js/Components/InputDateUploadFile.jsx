// File: resources/js/Components/InputDateUploadFile.jsx

import React from "react";

const InputDateUploadFile = ({ value, onChange }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-customBlue">Mail Date</label>
      <input
        type="date"
        className="border p-2 rounded-md border-black border-opacity-10 text-sm font-medium"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default InputDateUploadFile;
