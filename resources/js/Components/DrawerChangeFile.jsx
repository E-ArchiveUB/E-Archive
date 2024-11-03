import React, { useRef, useEffect, useState } from "react";
import FileUploadComponent from "./FileUploadComponent";
import axios from "axios";

const DrawerChangeFile = ({ isOpen, onClose, currentMailInfo, drawerRef, triggerToast }) => {
    // If drawerRef is not passed as a prop, create a local one
    const localDrawerRef = useRef(null);
    const ref = drawerRef || localDrawerRef;

    const [file, setFile] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                ref.current &&
                !ref.current.contains(event.target)
            ) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen, onClose, ref]);

    const handleSave = async () => {
        if (!file) {
            setError("Please select a file to upload.");
            return;
        }

        setProcessing(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("file", file);

            // Send a POST request to the backend to update the file
            const response = await axios.post(
                `/change-file/${currentMailInfo.id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "X-CSRF-TOKEN": document
                            .querySelector('meta[name="csrf-token"]')
                            .getAttribute("content"),
                    },
                }
            );

            console.log("File changed successfully:", response.data);
            // Display success toast
            triggerToast('success', 'File changed successfully.');
            onClose();
        } catch (err) {
            console.error("File change failed:", err.response?.data);
            setError(
                err.response?.data?.message || "File change failed. Please try again."
            );
            // Display error toast
            triggerToast('error', 'Failed to change the file.');
        } finally {
            setProcessing(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            ref={ref}
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
                    <FileUploadComponent onFileSelect={setFile} />
                    {error && (
                        <div className="text-red-600 text-sm mt-2">{error}</div>
                    )}
                </div>
            </div>
            <div className="p-4 pr-14 flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={processing}
                    className="px-4 py-2 bg-customBlue text-white rounded-md"
                >
                    {processing ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </div>
    );
};

export default DrawerChangeFile;
