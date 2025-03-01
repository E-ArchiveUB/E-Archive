// File: resources/js/Components/FileUploadComponent.jsx

import React, { useState } from "react";

const FileUploadComponent = ({ onFileSelect }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dragOver, setDragOver] = useState(false);

    // Handle file drop
    const handleDrop = (event) => {
        event.preventDefault();
        setDragOver(false);
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile) {
            setLoading(true); // Start loading animation
            setFile(droppedFile);
            onFileSelect(droppedFile); // Pass file to parent
            setLoading(false); // Stop loading after file is processed
        }
    };

    // Handle drag over effect
    const handleDragOver = (event) => {
        event.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = () => {
        setDragOver(false);
    };

    // Handle file selection from input
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setLoading(true);
            setFile(selectedFile);
            onFileSelect(selectedFile); // Pass file to parent
            setLoading(false);
        }
    };

    // Handle file removal
    const handleFileRemove = () => {
        setFile(null);
        onFileSelect(null); // Clear file in parent as well
    };

    return (
        <div
            className={`border-2 h-full flex flex-col justify-center items-center border-dashed border-gray-300 rounded-lg p-4 pb-8 gap-2 ${
                dragOver ? "border-blue-400 bg-blue-50" : ""
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
            <div className="h-full">
                {!loading ? (
                    <>
                        <label
                            htmlFor="file-upload"
                            className="flex justify-center items-center cursor-pointer h-full"
                        >
                            <div className="text-center">
                                <div className="text-lg font-semibold">
                                    Drag & drop or click to choose files
                                </div>
                                <div className="text-xs text-gray-500">
                                    Only accept pdf, docx, xls, xlsx files - Max file size: 10 MB
                                </div>
                            </div>
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            accept=".pdf, .doc, .docx, .xls, .xlsx"
                            onChange={handleFileChange}
                        />
                    </>
                ) : (
                    <div className="flex justify-center items-center h-full">
                        {/* Simple loading spinner */}
                        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
                    </div>
                )}
            </div>

            {file ? (
                <div className="flex w-full justify-between items-center border rounded p-2 bg-gray-50">
                    <div className="flex items-center">
                        <span className="mr-2 text-customBlue">
                            📄 {/* Simple file icon */}
                        </span>
                        <span className="line-clamp-1 text-sm text-black text-opacity-80">
                            {file.name}
                        </span>
                    </div>
                    <button
                        onClick={handleFileRemove}
                        className="text-customBlue focus:outline-none"
                    >
                        ❌ {/* Remove icon */}
                    </button>
                </div>
            ) : (
                !loading && (
                    <p className="text-center font-medium text-gray-400">
                        No file selected
                    </p>
                )
            )}
        </div>
    );
};

export default FileUploadComponent;
