import React, { useState } from "react";

const UpdateMailInfo = ({ isOpen, onClose, currentMailInfo }) => {
    const [formData, setFormData] = useState({
        category: currentMailInfo.category || "",
        productCode: currentMailInfo.productCode || "",
        name: currentMailInfo.name || "",
        price: currentMailInfo.price || "",
        quantity: currentMailInfo.quantity || "",
        description: currentMailInfo.description || "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        // Handle form submission here, for example, by calling an API to update the data
        console.log("Updated Data:", formData);
        onClose(); // Close the drawer after saving
    };

    return (
        <div
            className={`fixed inset-0 z-50 transition-transform duration-300 ${
                isOpen ? "translate-x-0" : "translate-x-full"
            } bg-gray-800 bg-opacity-50`}
            style={{ visibility: isOpen ? "visible" : "hidden" }}
        >
            <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">
                    Edit Mail Information
                </h2>
                <form className="flex flex-col gap-4">
                    <label className="text-sm font-medium">
                        Category
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="mt-1 w-full border border-gray-300 rounded-md p-2"
                        />
                    </label>

                    <label className="text-sm font-medium">
                        Product Code
                        <input
                            type="text"
                            name="productCode"
                            value={formData.productCode}
                            onChange={handleInputChange}
                            className="mt-1 w-full border border-gray-300 rounded-md p-2"
                        />
                    </label>

                    <label className="text-sm font-medium">
                        Name
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="mt-1 w-full border border-gray-300 rounded-md p-2"
                        />
                    </label>

                    <label className="text-sm font-medium">
                        Price
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            className="mt-1 w-full border border-gray-300 rounded-md p-2"
                        />
                    </label>

                    <label className="text-sm font-medium">
                        Quantity
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleInputChange}
                            className="mt-1 w-full border border-gray-300 rounded-md p-2"
                        />
                    </label>

                    <label className="text-sm font-medium">
                        Description
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="mt-1 w-full border border-gray-300 rounded-md p-2"
                        />
                    </label>

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm bg-gray-500 text-white rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateMailInfo;
