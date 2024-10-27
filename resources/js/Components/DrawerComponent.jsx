import React, { useState } from "react";

const DrawerComponent = ({ isOpen, onClose, currentMailInfo, drawerRef }) => {
    const [categories, setCategories] = useState([
        "Makanan",
        "Minuman",
        "Snack",
        "Obat",
    ]);
    const [newCategory, setNewCategory] = useState("");
    const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
    const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
    const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false); // For Type Dropdown
    const [selectedType, setSelectedType] = useState(
        currentMailInfo?.mailType || ""
    );
    const [selectedCategory, setSelectedCategory] = useState(
        currentMailInfo?.category || ""
    );

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
        setCategoryDropdownOpen(false); // Close dropdown after selecting a category
    };

    const handleTypeClick = (type) => {
        setSelectedType(type);
        setIsTypeDropdownOpen(false); // Close dropdown after selecting a type
    };

    return (
        <div
            className={`fixed inset-x-0 bottom-0 transform ${
                isOpen ? "translate-y-0" : "translate-y-full"
            } transition-transform duration-300 ease-in-out bg-white h-[500px] shadow-lg border-t-2 border-gray-200 z-50`}
            ref={drawerRef}
        >
            <div className="flex flex-col gap-1 p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold tracking-tight">
                        Edit Mail
                    </h2>
                    <button onClick={onClose} className="text-lg font-bold">
                        X
                    </button>
                </div>
                <p className="text-sm text-black text-opacity-40 font-medium mb-8">
                    Make changes to your mail information. Click save when
                    you're done.
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

                    {/* Category Dropdown */}
                    <div className="grid grid-cols-12 ml-2 gap-10">
                        <div className="flex flex-row gap-2 mb-2 items-center col-span-6">
                            <label className="text-sm w-24 font-semibold text-right">
                                Category
                            </label>
                            <div className="relative w-full">
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
                                                    handleCategoryClick(
                                                        category
                                                    )
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
                        </div>

                        {/* Type as Button Group */}
                        <div className="flex flex-row gap-2 mb-2 items-center col-span-6">
                            <label className="text-sm w-24 font-semibold text-right">
                                Type
                            </label>
                            <div className="relative w-full">
                                <button
                                    className="border p-2 rounded-md w-full border-black border-opacity-10 text-sm font-medium"
                                    onClick={() =>
                                        setIsTypeDropdownOpen(
                                            !isTypeDropdownOpen
                                        )
                                    }
                                >
                                    {selectedType || "Select Type"}
                                </button>
                                {isTypeDropdownOpen && (
                                    <div className="absolute mt-2 w-full bg-white border rounded-md shadow-lg z-50">
                                        {["Ongoing", "Outgoing"].map((type) => (
                                            <div
                                                key={type}
                                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                                onClick={() =>
                                                    handleTypeClick(type)
                                                }
                                            >
                                                {type}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 ml-2 gap-5">
                        {/* Other Inputs */}
                        <div className="flex flex-row gap-2 mt-2 items-center col-span-6">
                            <label className="text-sm w-24 font-semibold text-right">
                                References
                            </label>
                            <input
                                type="text"
                                className="border p-2 rounded-md w-full border-black border-opacity-10 text-sm font-medium"
                                defaultValue={
                                    currentMailInfo?.mailReference || ""
                                }
                            />
                        </div>
                        <div className="flex flex-row gap-2 mt-2 items-center col-span-6">
                            <label className="text-sm w-24 font-semibold text-right">
                                Date
                            </label>
                            <input
                                type="text"
                                className="border p-2 rounded-md w-full border-black border-opacity-10 text-sm font-medium"
                                defaultValue={currentMailInfo?.date || ""}
                            />
                        </div>
                        <div className="flex flex-row gap-2 mt-2 items-center col-span-6">
                            <label className="text-sm w-24 font-semibold text-right">
                                Sender
                            </label>
                            <input
                                type="text"
                                className="border p-2 rounded-md w-full border-black border-opacity-10 text-sm font-medium"
                                defaultValue={currentMailInfo?.sender || ""}
                            />
                        </div>
                        <div className="flex flex-row gap-2 mt-2 items-center col-span-6">
                            <label className="text-sm w-24 font-semibold text-right">
                                Recipient
                            </label>
                            <input
                                type="text"
                                className="border p-2 rounded-md w-full border-black border-opacity-10 text-sm font-medium"
                                defaultValue={currentMailInfo?.recipient || ""}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="p-4 pr-14 flex justify-end">
                <button className="px-4 py-2 bg-customBlue text-white rounded-md">
                    Save Changes
                </button>
            </div>

            {/* Add Category Modal */}
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
    );
};

export default DrawerComponent;
