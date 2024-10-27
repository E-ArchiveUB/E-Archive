import React, { useState, useRef, useEffect } from "react";
import { LuSettings } from "react-icons/lu";
import { TbLogout } from "react-icons/tb";
import { useForm, usePage } from "@inertiajs/react";

const Avatar = () => {
    const avatarRef = useRef(null);

    const { auth } = usePage().props;
    const fullName = auth.user?.name || "Guest";
    const role = auth.user?.role || "Guest";
    const firstName = fullName.split(" ")[0];
    const profilePicture =
        auth.user?.profile_picture || "/Assets/Images/admin_profile.png";

    // Toggle menu dropdown
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    

    

    return (
        <div className="relative inline-block" ref={avatarRef}>
            {/* Avatar */}
            <div
                onClick={toggleMenu}
                className="flex items-center p-2 px-4 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
                <img
                    src={profilePicture}
                    alt="User Avatar"
                    className="w-6 h-6 rounded-full object-cover"
                />
                <span className="ml-2 text-xs font-semibold text-black text-opacity-60">
                    {firstName}
                </span>
                <span className="px-2 text-md font-semibold text-black text-opacity-60">
                    |
                </span>
                <span className="text-xs font-semibold text-black text-opacity-60">
                    {role}
                </span>
            </div>

            
        </div>
    );
};

export default Avatar;
