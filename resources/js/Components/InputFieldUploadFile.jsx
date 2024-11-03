// File: resources/js/Components/InputFieldUploadFile.jsx

import React from "react";

const InputFieldUploadFile = ({ title, placeholder, value, onChange }) => {
    console.log(`InputFieldUploadFile ${title}:`, { value }); // Debug log

    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-customBlue" htmlFor={title}>
                {title}
            </label>
            <input
                id={title} // Ensure the label is correctly associated
                type="text"
                className="border p-2 rounded-md border-black border-opacity-10 text-sm font-medium"
                placeholder={placeholder}
                value={value || ""}
                onChange={onChange}
            />
        </div>
    );
};

export default InputFieldUploadFile;
