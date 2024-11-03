// InputSwitchButton.jsx

import React, { useState, useEffect } from "react";

const InputSwitchButton = ({ activeButton, onToggle }) => {
    const [selectedButton, setSelectedButton] = useState(activeButton || "incoming");

    useEffect(() => {
        setSelectedButton(activeButton || "incoming");
    }, [activeButton]);

    const handleToggle = (value) => {
        setSelectedButton(value);
        if (onToggle) {
            onToggle(value);
        }
    };

    return (
        <div className="flex w-full flex-col gap-2 py-6">
            <div className="grid grid-cols-2 gap-12">
                <button
                    type="button"
                    onClick={() => handleToggle("incoming")}
                    className={`border border-black border-opacity-60 rounded-md
                    py-3 text-sm font-medium transition-all duration-300 
                    ${
                        selectedButton === "incoming"
                            ? "bg-customBlue text-white"
                            : "bg-white text-gray-400 hover:border-customBlue hover:text-customBlue"
                    }`}
                >
                    Incoming Mail
                </button>
                <button
                    type="button"
                    onClick={() => handleToggle("outgoing")}
                    className={`border border-black border-opacity-60 rounded-md
                    py-3 text-sm font-medium transition-all duration-300 
                    ${
                        selectedButton === "outgoing"
                            ? "bg-customBlue text-white"
                            : "bg-white text-gray-400 hover:border-customBlue hover:text-customBlue"
                    }`}
                >
                    Outgoing Mail
                </button>
            </div>
            <input type="hidden" value={selectedButton} />
        </div>
    );
};

export default InputSwitchButton;
