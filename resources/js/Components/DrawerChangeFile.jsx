import React from "react";

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
                    <button onClick={onClose} className="text-lg font-bold">
                        X
                    </button>
                </div>
                <p className="text-sm text-black text-opacity-40 font-medium mb-8">
                    Make changes to your file. Click save when you're done.
                </p>

                <div className="flex flex-col px-10 pl-56 gap-3">
                    <div className="flex flex-row gap-2 mb-2 items-center">
                        <label className="text-sm w-24 font-semibold text-right">
                            File Name
                        </label>
                        <input
                            type="text"
                            className="border p-2 rounded-md w-full border-black border-opacity-10 text-sm font-medium"
                            defaultValue={currentMailInfo?.fileName || ""}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DrawerChangeFile;
