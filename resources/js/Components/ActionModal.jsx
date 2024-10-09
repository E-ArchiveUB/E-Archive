import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { CgArrowsExchange } from "react-icons/cg";
import DrawerComponent from "./DrawerComponent";
import DrawerChangeFile from "./DrawerChangeFile";

const ActionModal = ({ modalRef, modalPosition, currentMailInfo }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isChangeFileDrawerOpen, setIsChangeFileDrawerOpen] = useState(false);

    const handleEditClick = () => {
        setIsDrawerOpen(true); // Open the edit drawer
    };

    const handleChangeFileClick = () => {
        setIsChangeFileDrawerOpen(true); // Open the change file drawer
    };

    return (
        <>
            <div
                ref={modalRef}
                style={{ top: modalPosition.top, left: modalPosition.left }}
                className="absolute pb-0 -translate-x-40 mt-8 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
            >
                <div className="flex flex-col p-4 pt-1 gap-1 pb-1 border-b border-gray-200">
                    <p className="text-sm font-semibold line-clamp-1">
                        {currentMailInfo.fileName}
                    </p>
                    {/* Display current mail info */}
                    <p className="text-xs">
                        Category: {currentMailInfo.category}
                    </p>
                    <p className="text-xs">Sender: {currentMailInfo.sender}</p>
                </div>
                <div className="px-1 py-1 flex flex-col">
                    <button
                        className="flex flex-row justify-start w-full py-2 px-3 gap-4 rounded-md hover:bg-gray-100"
                        onClick={handleEditClick} // Trigger the edit drawer
                    >
                        <AiOutlineEdit size={18} />
                        <span className="text-sm font-medium">Edit</span>
                    </button>
                    <button
                        className="flex flex-row justify-start w-full py-2 px-3 gap-4 rounded-md hover:bg-gray-100"
                        onClick={handleChangeFileClick} // Trigger the change file drawer
                    >
                        <CgArrowsExchange size={18} />
                        <span className="text-sm font-medium">Change File</span>
                    </button>
                    <button className="flex flex-row justify-start w-full py-2 px-3 gap-4 rounded-md hover:bg-gray-100">
                        <MdDeleteOutline size={18} />
                        <span className="text-sm font-medium">Delete</span>
                    </button>
                </div>
            </div>

            {/* Drawer Component for editing */}
            <DrawerComponent
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                currentMailInfo={currentMailInfo}
            />

            {/* Drawer Component for changing file */}
            <DrawerChangeFile
                isOpen={isChangeFileDrawerOpen}
                onClose={() => setIsChangeFileDrawerOpen(false)}
                currentMailInfo={currentMailInfo}
            />
        </>
    );
};

export default ActionModal;
