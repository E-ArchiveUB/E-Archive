import React, { useState } from "react";

const InputSwitchButton = () => {
    const [activeButton, setActiveButton] = useState("incoming"); // State to track active button

    const handleToggle = (value) => {
        setActiveButton(value);
    };

    return (
        <div className="flex w-full flex-col gap-2 py-6">
            <div className="grid grid-cols-2 gap-12">
                <button
                    onClick={() => handleToggle("incoming")}
                    className={`border border-black border-opacity-60 rounded-md
                    py-3 text-sm font-medium transition-all duration-300 
                    ${
                        activeButton === "incoming"
                            ? "bg-customBlue text-white" // Active state
                            : "bg-white text-gray-400 hover:border-customBlue hover:text-customBlue"
                    } // Inactive state
                    `}
                >
                    Incoming Mail
                </button>
                <button
                    onClick={() => handleToggle("outgoing")}
                    className={`border border-black border-opacity-60 rounded-md
                    py-3 text-sm font-medium transition-all duration-300 
                    ${
                        activeButton === "outgoing"
                            ? "bg-customBlue text-white" 
                            : "bg-white text-gray-400 hover:border-customBlue hover:text-customBlue"
                    } // Inactive state
                    `}
                >
                    Outgoing Mail
                </button>
            </div>
            <input
                type="hidden"
                value={
                    activeButton === "incoming"
                        ? "Incoming Mail"
                        : "Outgoing Mail"
                }
            />
        </div>
    );
};

export default InputSwitchButton;
