import React, { useState } from "react";
import Layout from "@/Layouts/Layout";
import InputFieldUploadFile from "@/Components/InputFieldUploadFile";
import FileUploadComponent from "@/Components/FileuploadComponent";
import InputDateUploadFile from "@/Components/InputDateUploadFile";
import InputSwitchButton from "@/Components/InputSwitchButton";
import Toaster from "@/Components/Toaster";

const FileUpload = () => {
    const [toast, setToast] = useState({ show: false, type: "", message: "" });

    // States for category selection
    const [categories, setCategories] = useState([
        "Makanan",
        "Minuman",
        "Snack",
        "Obat",
    ]);
    const [newCategory, setNewCategory] = useState("");
    const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
    const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");

    const triggerToast = (type, message) => {
        setToast({ show: true, type, message });
        setTimeout(() => {
            setToast({ ...toast, show: false });
        }, 5000);
    };

    const handleSave = () => {
        triggerToast("success", "File uploaded successfully!");
    };

    const handleAddCategory = () => {
        if (newCategory) {
            setCategories([...categories, newCategory]);
            setNewCategory("");
            setCategoryModalOpen(false);
            setSelectedCategory(newCategory);
        }
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setCategoryDropdownOpen(false);
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
            <div className="w-3/5 min-h-60 mb-6">
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
                    {/* Updated Category Dropdown */}
                    <div>
                        <label className="text-sm font-semibold">
                            Category
                        </label>
                        <div className="relative">
                            <button
                                className="border p-2 rounded-md w-full border-black border-opacity-10 text-sm font-medium"
                                onClick={() =>
                                    setCategoryDropdownOpen(
                                        !isCategoryDropdownOpen
                                    )
                                }
                            >
                                {selectedCategory || "Select Category"}
                            </button>
                            {isCategoryDropdownOpen && (
                                <div className="absolute mt-2 w-full bg-white border rounded-md shadow-lg z-50">
                                    {categories.map((category) => (
                                        <div
                                            key={category}
                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() =>
                                                handleCategoryClick(category)
                                            }
                                        >
                                            {category}
                                        </div>
                                    ))}
                                    <div
                                        className="p-2 bg-gray-100 hover:bg-gray-200 cursor-pointer"
                                        onClick={() => {
                                            setCategoryModalOpen(true);
                                            setCategoryDropdownOpen(false);
                                        }}
                                    >
                                        + Add Category
                                    </div>
                                </div>
                            )}
                        </div>
                        {isCategoryModalOpen && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                                <div className="bg-white p-6 rounded-md shadow-lg">
                                    <h2 className="text-lg font-semibold mb-4">
                                        Add New Category
                                    </h2>
                                    <input
                                        type="text"
                                        className="border p-2 rounded-md w-full mb-4"
                                        placeholder="Enter new category"
                                        value={newCategory}
                                        onChange={(e) =>
                                            setNewCategory(e.target.value)
                                        }
                                    />
                                    <div className="flex justify-end gap-2">
                                        <button
                                            className="px-4 py-2 bg-gray-300 text-black rounded-md"
                                            onClick={() =>
                                                setCategoryModalOpen(false)
                                            }
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-customBlue text-white rounded-md"
                                            onClick={handleAddCategory}
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <InputFieldUploadFile
                        title={"Sender"}
                        placeholder={"ex: John Doe"}
                    />
                    <InputFieldUploadFile
                        title={"Recipient"}
                        placeholder={"ex: Jane Doe"}
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
