import React, { useState, useRef, useEffect } from "react";
import { LuSettings } from "react-icons/lu";
import { TbLogout } from "react-icons/tb";
import { useForm, usePage } from "@inertiajs/react";

const Avatar = () => {
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const avatarRef = useRef(null);

    const { auth } = usePage().props;

    const fullName = auth.user?.name || "Guest";
    const role = auth.user?.role || "Guest";
    const firstName = fullName.split(" ")[0];
    const profilePicture =
        auth.user?.profile_picture || "/Assets/Images/Logo.png";

    // Menampilkan dan menyembunyikan tooltip
    const toggleTooltip = (visible) => {
        setIsTooltipVisible(visible);
    };

    // Menampilkan dan menyembunyikan menu dropdown
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Menutup menu jika klik di luar komponen
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                avatarRef.current &&
                !avatarRef.current.contains(event.target)
            ) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const { post } = useForm();
    const handleLogout = () => {
        post(route("logout"));
    };

    return (
        <div
            className="group relative inline-block rounded-lg hover:bg-slate-100 p-2 px-4"
            ref={avatarRef}
        >
            {/* Avatar */}
            <div
                onClick={toggleMenu}
                onMouseEnter={() => toggleTooltip(true)}
                onMouseLeave={() => toggleTooltip(false)}
                className="group-hover:cursor-pointer flex items-center"
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

            {/* Tooltip */}
            {isTooltipVisible && !isMenuOpen && (
                <div className="absolute left-0 mt-4 text-xs p-2 w-auto bg-white rounded-md shadow-lg border border-gray-200">
                    Dimas Fiebry | Owner
                </div>
            )}

            {/* Dropdown Menu */}
            {isMenuOpen && (
                <div className="absolute right-0 mt-5 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <div className="p-4 font-bold border-b border-gray-100">
                        My Account
                    </div>
                    <ul className="py-2">
                        <li className="px-4 py-2 flex justify-between items-center hover:bg-gray-100 cursor-pointer">
                            <a href="/Admin/ProfileSetting">
                                <span className="flex gap-4 text-sm items-center">
                                    <LuSettings size={20} /> Settings
                                </span>
                            </a>
                        </li>
                        <li
                            className="px-4 py-2 flex justify-between items-center hover:bg-gray-100 cursor-pointer"
                            onClick={handleLogout}
                        >
                            <span className="flex gap-4 text-sm items-center">
                                <TbLogout size={20} /> Log out
                            </span>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Avatar;
