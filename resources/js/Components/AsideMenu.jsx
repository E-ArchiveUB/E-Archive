import React from "react";

const AsideMenu = ({ icon, menu, path, onClick }) => {
    // Check if the current path matches the href path
    const isActive = window.location.pathname === path;

    return (
        <li>
            {onClick ? (
                <button
                    onClick={onClick}
                    className={`flex px-4 p-2 rounded hover:bg-blue-100 ${
                        isActive ? "bg-customBlue bg-opacity-80 text-white" : "text-gray-600"
                    } w-full text-left`}
                >
                    <span className="mr-3">{icon}</span>
                    <p className="font-semibold text-[13px]">{menu}</p>
                </button>
            ) : (
                <a
                    href={path}
                    className={`flex px-4 p-2 rounded hover:bg-blue-100 ${
                        isActive ? "bg-customBlue bg-opacity-80 text-white" : "text-gray-600"
                    }`}
                >
                    <span className="mr-3">{icon}</span>
                    <p className="font-semibold text-[13px]">{menu}</p>
                </a>
            )}
        </li>
    );
};

export default AsideMenu;
