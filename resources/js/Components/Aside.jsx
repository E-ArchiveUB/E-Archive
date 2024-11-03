import React from "react";
import AsideMenu from "./AsideMenu";
import AsideCategory from "./AsideCategory";
import { MdSpaceDashboard } from "react-icons/md";
import { FaFileUpload } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { Inertia } from "@inertiajs/inertia";

const Aside = () => {
    const handleLogout = (e) => {
        e.preventDefault();
        Inertia.post("/logout");
    };

    return (
        <div className="h-full px-4 border-r border-gray-100 w-2/12 bg-white flex flex-col gap-12">
            <nav className="flex flex-col justify-between h-full">
                <ul className="flex flex-col gap-1 pb-8">
                    <AsideCategory>Monitoring</AsideCategory>
                    <AsideMenu
                        icon={<MdSpaceDashboard size={20} />}
                        menu={"Dashboard"}
                        path={"/dashboard"}
                    />

                    <AsideCategory>Letter Management</AsideCategory>
                    <AsideMenu
                        icon={<FaFileUpload size={20} />}
                        menu={"File Upload"}
                        path={"/fileupload"}
                    />
                    <AsideMenu
                        icon={<MdEmail size={20} />}
                        menu={"Letter List"}
                        path={"/letterlist"}
                    />
                </ul>
                <ul className="flex flex-col gap-4 pb-8">
                    <AsideMenu
                        icon={<TbLogout size={20} />}
                        menu={"Logout"}
                        onClick={handleLogout}
                    />
                </ul>
            </nav>
        </div>
    );
};

export default Aside;
