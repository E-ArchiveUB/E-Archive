import React, { useState, useEffect } from "react";
import { IoCloudDoneSharp } from "react-icons/io5";
import { MdSmsFailed } from "react-icons/md";
import { TiInfoLarge } from "react-icons/ti";

const Toaster = React.memo(({ type, message, duration = 5000 }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    if (!visible) return null;

    let borderColor, bgColor, textColor, icon;
    if (type === "success") {
        borderColor = "border-customBlue";
        bgColor = "bg-white";
        textColor = "text-customBlue";
        icon = <IoCloudDoneSharp />;
    } else if (type === "warning") {
        borderColor = "border-orange-800";
        bgColor = "bg-white";
        textColor = "text-orange-800";
        icon = <MdSmsFailed />;
    } else if (type === "info") {
        borderColor = "border-blue-900";
        bgColor = "bg-white";
        textColor = "text-blue-900";
        icon = <TiInfoLarge />;
    }

    return (
        <div
            className={`${borderColor} ${textColor} ${bgColor} px-6 py-3 border font-medium rounded-lg shadow-lg flex items-center space-x-2 fixed bottom-4 right-12 z-50 transition-opacity duration-300 ease-in-out`}
            style={{ minWidth: "250px" }}
        >
            <span className="text-2xl">{icon}</span>
            <span>{message}</span>
        </div>
    );
});

export default Toaster;
