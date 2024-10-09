import { React } from "react";

const FilterMailType = ({ activeFilter, onFilterChange }) => {
    return (
        <div className="flex w-96 flex-col gap-2 py-6">
            <div className="grid grid-cols-3 gap-2">
                {/* "All" Button */}
                <button
                    onClick={() => onFilterChange("all")}
                    className={`border border-black border-opacity-60 rounded-md
                    py-2 text-sm font-medium transition-all duration-300 
                    ${
                        activeFilter === "all"
                            ? "bg-customBlue text-white" // Active state
                            : "bg-white text-gray-400 hover:border-customBlue hover:text-customBlue"
                    } // Inactive state
                    `}
                >
                    All
                </button>

                {/* "Incoming Mail" Button */}
                <button
                    onClick={() => onFilterChange("incoming")}
                    className={`border border-black border-opacity-60 rounded-md
                    py-2 text-sm font-medium transition-all duration-300 
                    ${
                        activeFilter === "incoming"
                            ? "bg-customBlue text-white" // Active state
                            : "bg-white text-gray-400 hover:border-customBlue hover:text-customBlue"
                    } // Inactive state
                    `}
                >
                    Incoming Mail
                </button>

                {/* "Outgoing Mail" Button */}
                <button
                    onClick={() => onFilterChange("outgoing")}
                    className={`border border-black border-opacity-60 rounded-md
                    py-2 text-sm font-medium transition-all duration-300 
                    ${
                        activeFilter === "outgoing"
                            ? "bg-customBlue text-white"
                            : "bg-white text-gray-400 hover:border-customBlue hover:text-customBlue"
                    } // Inactive state
                    `}
                >
                    Outgoing Mail
                </button>
            </div>
        </div>
    );
};

export default FilterMailType;
