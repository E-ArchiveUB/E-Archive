import React from "react";
import { FiCalendar } from "react-icons/fi";

const InputDateUploadFile = () => {
    return (
        <div className="relative flex flex-col gap-2">
            <label
                className="text-sm font-semibold text-customBlue"
                htmlFor="mail-date"
            >
                Mail Date
            </label>
            <div className="relative">
                <input
                    id="mail-date"
                    className="border border-black rounded-md py-2 pr-3 text-black text-opacity-80 text-sm font-medium placeholder:text-gray-200 cursor-pointer placeholder:text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out w-full"
                    type="date"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <FiCalendar size={18} className="text-customBlue"/>
                </span>
            </div>
        </div>
    );
};

export default InputDateUploadFile;
