import React from "react";
import FileUploadComponent from "./FileuploadComponent";

const DrawerChangeFile = ({ isOpen, onClose, currentMailInfo }) => {
    return (
        <div
            className={`fixed inset-x-0 bottom-0 transform ${
                isOpen ? "translate-y-0" : "translate-y-full"
            } transition-transform duration-300 ease-in-out bg-white h-[500px] shadow-lg border-t-2 border-gray-200 z-50`}
        >
            <div className="flex flex-col gap-1 p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold tracking-tight">
                        Change File
                    </h2>
                    <button onClick={onClose} className="text-lg font-bold pr-8">
                        X
                    </button>
                </div>
                <p className="text-sm text-black text-opacity-40 font-medium mb-8">
                    Make changes to your file. Click save when you're done.
                </p>

                <div className="flex flex-col px-10 pl-56 pr-96 gap-3 h-56">
                    <FileUploadComponent />
                </div>
            </div>
            <div className="p-4 pr-14 flex justify-end">
                <button className="px-4 py-2 bg-customBlue text-white rounded-md">
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default DrawerChangeFile;
