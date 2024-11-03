// File: resources/js/Pages/FileUpload.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "@/Layouts/Layout";
import InputFieldUploadFile from "@/Components/InputFieldUploadFile";
import FileUploadComponent from "@/Components/FileUploadComponent";
import InputDateUploadFile from "@/Components/InputDateUploadFile";
import InputSwitchButton from "@/Components/InputSwitchButton";
import Toaster from "@/Components/Toaster";

const FileUpload = () => {
    const [toast, setToast] = useState({ show: false, type: "", message: "" });
    const [file, setFile] = useState(null);

    // States for form data
    const [formData, setFormData] = useState({
        name: "",
        reference_number: "",
        sender: "",
        recipient: "",
        upload_date: "",
        mailType: "incoming", // Added mailType with default value
    });

    // Category handling
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
    const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        // Fetch categories from the server when the component mounts
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("/api/categories");
            setCategories(response.data.categories);
            console.log("Fetched categories:", response.data.categories);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
            triggerToast("error", "Failed to fetch categories.");
        }
    };

    const triggerToast = (type, message) => {
        setToast({ show: true, type, message });
        setTimeout(() => {
            setToast({ show: false, type: "", message: "" });
        }, 5000);
    };

    // Handle file and form submission
    const handleSave = async () => {
        console.log("File object:", file);
        console.log("Form data:", formData);
        console.log("Selected Category ID:", selectedCategory);

        // Check mail name
        if (!formData.name || formData.name.trim() === "") {
            triggerToast("error", "Mail Name is required.");
            return;
        }

        // Check file
        if (!file) {
            triggerToast("error", "Please select a file to upload.");
            return;
        }

        // Check category
        if (!selectedCategory) {
            triggerToast("error", "Please select a category.");
            return;
        }

        try {
            const formDataObj = new FormData();

            // Add the file
            formDataObj.append("file", file);

            // Add form fields
            formDataObj.append("name", formData.name.trim());
            formDataObj.append("reference_number", formData.reference_number.trim());
            formDataObj.append("sender", formData.sender.trim());
            formDataObj.append("recipient", formData.recipient.trim());
            formDataObj.append("category_id", selectedCategory);
            formDataObj.append("mailType", formData.mailType);

            if (formData.upload_date) {
                formDataObj.append("upload_date", formData.upload_date);
            }

            // Debug log - check what's being sent
            for (let [key, value] of formDataObj.entries()) {
                console.log(`Sending ${key}:`, value);
            }

            const response = await axios.post("/file-upload", formDataObj, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                },
            });

            console.log("Upload successful:", response.data);
            triggerToast("success", "File uploaded successfully.");

            // Reset form
            setFile(null);
            setFormData({
                name: "",
                reference_number: "",
                sender: "",
                recipient: "",
                upload_date: "",
                mailType: "incoming",
            });
            setSelectedCategory(null);
        } catch (error) {
            console.error("Upload failed:", error.response?.data);
            const errorMessage = error.response?.data?.errors
                ? Object.values(error.response.data.errors)
                    .flat()
                    .join(", ")
                : error.response?.data?.message || "Upload failed. Please try again.";
            triggerToast("error", errorMessage);
        }
    };

    // Add a new category
    const handleAddCategory = async () => {
        if (!newCategory.trim()) {
            triggerToast("error", "Category name cannot be empty.");
            return;
        }

        try {
            const response = await axios.post("/add-category", {
                name: newCategory.trim(),
            });

            setCategories([...categories, response.data.category]);
            setNewCategory("");
            setCategoryModalOpen(false);
            setSelectedCategory(response.data.category.id);
            triggerToast("success", response.data.message);
        } catch (error) {
            console.error("Failed to add category:", error);
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.errors
                    ? Object.values(error.response.data.errors)
                        .flat()
                        .join(", ")
                    : error.response.data.message || "Failed to add category.";
                triggerToast("error", errorMessage);
            } else {
                triggerToast("error", "Failed to add category.");
            }
        }
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category.id);
        setCategoryDropdownOpen(false);
        console.log("Category selected:", category.id);
    };

    // Handle mail type change
    const handleTypeChange = (type) => {
        setFormData({ ...formData, mailType: type });
    };

    return (
        <Layout>
            <div className="flex flex-col justify-center gap-1 mb-8">
                <h1 className="text-2xl font-extrabold text-black">
                    Upload File Archive
                </h1>
                <p className="text-xs text-black text-opacity-60 mb-2">
                    You can upload archive files here and save them in their respective
                    categories.
                </p>
            </div>
            <div className="w-3/5 min-h-60 mb-6">
                <FileUploadComponent onFileSelect={setFile} />
            </div>
            <div className="flex flex-col gap-3">
                <div className="grid grid-cols-3 gap-12">
                    <div className="col-span-2">
                        <InputFieldUploadFile
                            title={"Mail Name"}
                            placeholder={"ex: Student Internship Application Letter"}
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                        />
                    </div>
                    <InputFieldUploadFile
                        title={"References Number"}
                        placeholder={"ex: GA/3452/YFH"}
                        value={formData.reference_number}
                        onChange={(e) =>
                            setFormData({ ...formData, reference_number: e.target.value })
                        }
                    />
                </div>
                <div className="grid grid-cols-3 gap-12">
                    <div>
                        <label className="text-sm font-semibold text-customBlue">Category</label>
                        <div className="relative">
                            <button
                                className="border p-2 rounded-md w-full border-black border-opacity-10 text-sm font-medium"
                                onClick={() =>
                                    setCategoryDropdownOpen(!isCategoryDropdownOpen)
                                }
                            >
                                {categories.find((cat) => cat.id === selectedCategory)?.name || "Select Category"}
                            </button>
                            {isCategoryDropdownOpen && (
                                <div
                                    className="absolute mt-2 w-full bg-white border rounded-md shadow-lg z-50"
                                    style={{ maxHeight: '150px', overflowY: 'auto' }}
                                >
                                    {categories.map((category) => (
                                        <div
                                            key={category.id}
                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => handleCategoryClick(category)}
                                        >
                                            {category.name}
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
                                        onChange={(e) => setNewCategory(e.target.value)}
                                    />
                                    <div className="flex justify-end gap-2">
                                        <button
                                            className="px-4 py-2 bg-gray-300 text-black rounded-md"
                                            onClick={() => setCategoryModalOpen(false)}
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
                        value={formData.sender}
                        onChange={(e) =>
                            setFormData({ ...formData, sender: e.target.value })
                        }
                    />
                    <InputFieldUploadFile
                        title={"Recipient"}
                        placeholder={"ex: Jane Doe"}
                        value={formData.recipient}
                        onChange={(e) =>
                            setFormData({ ...formData, recipient: e.target.value })
                        }
                    />
                </div>
                <div className="grid grid-cols-3 gap-12">
                    <InputDateUploadFile
                        value={formData.upload_date}
                        onChange={(date) =>
                            setFormData({ ...formData, upload_date: date })
                        }
                    />
                    <div className="col-span-2 w-full gap-12">
                        <InputSwitchButton
                            activeButton={formData.mailType}
                            onToggle={handleTypeChange}
                        />
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

            {toast.show && <Toaster type={toast.type} message={toast.message} />}
        </Layout>
    );

};

export default FileUpload;
