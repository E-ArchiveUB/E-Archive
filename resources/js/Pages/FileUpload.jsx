import React, { useState } from "react";
import Layout from "@/Layouts/Layout";
import InputFieldUploadFile from "@/Components/InputFieldUploadFile";
import FileUploadComponent from "@/Components/FileuploadComponent";
import InputDateUploadFile from "@/Components/InputDateUploadFile";
import InputSwitchButton from "@/Components/InputSwitchButton";
import Toaster from "@/Components/Toaster"; // Import Toaster component

const FileUpload = () => {
    const [toast, setToast] = useState({ show: false, type: "", message: "" });

    // Function to trigger the toaster
    const triggerToast = (type, message) => {
        setToast({ show: true, type, message });
        setTimeout(() => {
            setToast({ ...toast, show: false });
        }, 5000);
    };

    const handleSave = () => {

        triggerToast("success", "File uploaded successfully!");
    };

    return (
        <Layout>
            <div className="flex flex-col justify-center gap-1 mb-8">
                <h1 className="text-2xl font-extrabold text-black">
                    Upload File Archive
                </h1>
                <p className="text-xs text-black text-opacity-60 mb-2">
                    You can upload archive files here and save them in their
                    respective categories.
                </p>
            </div>
            <div className="w-3/5 min-h-60 mb-6 ">
                <FileUploadComponent />
            </div>
            <div className="flex flex-col gap-3">
                <div className="grid grid-cols-3 gap-12">
                    <div className="col-span-2">
                        <InputFieldUploadFile
                            title={"Mail Name"}
                            placeholder={
                                "ex: Student Internship Application Letter"
                            }
                        />
                    </div>
                    <InputFieldUploadFile
                        title={"References Number"}
                        placeholder={"ex: GA/3452/YFH"}
                    />
                </div>
                <div className="grid grid-cols-3 gap-12">
                    <InputFieldUploadFile
                        title={"Category"}
                        placeholder={
                            "ex: Student Internship Application Letter"
                        }
                    />
                    <InputFieldUploadFile
                        title={"Sender"}
                        placeholder={
                            "ex: Student Internship Application Letter"
                        }
                    />
                    <InputFieldUploadFile
                        title={"Recipient"}
                        placeholder={
                            "ex: Student Internship Application Letter"
                        }
                    />
                </div>
                <div className="grid grid-cols-3 gap-12">
                    <InputDateUploadFile />
                    <div className="col-span-2 w-full gap-12">
                        <InputSwitchButton />
                    </div>
                </div>
                <button
                    className="w-44 bg-customBlue border px-8 text-white py-3 text-sm font-medium hover:bg-blue-500 transition-all rounded-md hover:transition-all duration-200 hover:duration-200"
                    onClick={handleSave}
                >
                    Save File
                </button>
                <div className="w-full flex flex-row"></div>
            </div>

            {toast.show && (
                <Toaster type={toast.type} message={toast.message} />
            )}
        </Layout>
    );
};

export default FileUpload;
