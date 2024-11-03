// DrawerComponent.jsx

import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import axios from 'axios';

const DrawerComponent = ({ isOpen, onClose, currentMailInfo, drawerRef, triggerToast }) => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
    const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
    const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);

    // Fetch categories when component mounts
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/api/categories');
            setCategories(response.data.categories);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    // Initialize useForm with current mail info
    const { data, setData, put, processing, errors } = useForm({
        name: currentMailInfo?.name || currentMailInfo?.fileName || '',
        reference_number: currentMailInfo?.reference_number || currentMailInfo?.mailReference || '',
        sender: currentMailInfo?.sender || '',
        recipient: currentMailInfo?.recipient || '',
        category_id: currentMailInfo?.category_id || currentMailInfo?.category?.id || '',
        upload_date: currentMailInfo?.upload_date || currentMailInfo?.date || '',
        mailType: currentMailInfo?.mailType || '',
    });

    // Synchronize selectedCategory and data.category_id
    const [selectedCategory, setSelectedCategory] = useState(data.category_id);

    useEffect(() => {
        setData('category_id', selectedCategory);
    }, [selectedCategory]);

    // Synchronize selectedType and data.mailType
    const [selectedType, setSelectedType] = useState(data.mailType);

    useEffect(() => {
        setData('mailType', selectedType);
    }, [selectedType]);

    const handleAddCategory = async () => {
        if (!newCategory.trim()) {
            return;
        }

        try {
            const response = await axios.post('/add-category', {
                name: newCategory.trim(),
            });
            setCategories([...categories, response.data.category]);
            setNewCategory('');
            setCategoryModalOpen(false);
            setSelectedCategory(response.data.category.id);
        } catch (error) {
            console.error('Failed to add category:', error);
        }
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category.id);
        setCategoryDropdownOpen(false);
    };

    const handleTypeClick = (type) => {
        setSelectedType(type);
        setIsTypeDropdownOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('files.update', currentMailInfo.id), {
            preserveScroll: true,
            onSuccess: () => {
                onClose();
                triggerToast('success', 'Mail information updated successfully.');
                Inertia.reload({ only: ['mailInfo'] });
            },
            onError: () => {
                triggerToast('error', 'Failed to update mail information.');
            },
        });
    };

    return (
        isOpen && (
            <form
                ref={drawerRef}
                onSubmit={handleSubmit}
                className={`fixed inset-x-0 bottom-0 transform ${
                    isOpen ? 'translate-y-0' : 'translate-y-full'
                } transition-transform duration-300 ease-in-out bg-white h-[500px] shadow-lg border-t-2 border-gray-200 z-50`}
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
                        Make changes to your mail information. Click save when you're done.
                    </p>

                    <div className="flex flex-col px-10 pl-56 gap-3">
                        <div className="flex flex-row gap-2 mb-2 items-center">
                            <label className="text-sm w-24 font-semibold text-right">
                                File Name
                            </label>
                            <input
                                type="text"
                                className="border p-2 rounded-md w-full border-black border-opacity-10 text-sm font-medium"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            {errors.name && (
                                <div className="text-red-600 text-sm">{errors.name}</div>
                            )}
                        </div>

                        {/* Category Dropdown */}
                        <div className="grid grid-cols-12 ml-2 gap-10">
                            <div className="flex flex-row gap-2 mb-2 items-center col-span-6">
                                <label className="text-sm w-24 font-semibold text-right">
                                    Category
                                </label>
                                <div className="relative w-full">
                                    <button
                                        type="button"
                                        className="border p-2 rounded-md w-full border-black border-opacity-10 text-sm font-medium text-left"
                                        onClick={() =>
                                            setCategoryDropdownOpen(!isCategoryDropdownOpen)
                                        }
                                    >
                                        {categories.find((cat) => cat.id === selectedCategory)
                                            ?.name || 'Select Category'}
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
                                {errors.category_id && (
                                    <div className="text-red-600 text-sm">
                                        {errors.category_id}
                                    </div>
                                )}
                            </div>

                            {/* Type Dropdown */}
                            <div className="flex flex-row gap-2 mb-2 items-center col-span-6">
                                <label className="text-sm w-24 font-semibold text-right">
                                    Type
                                </label>
                                <div className="relative w-full">
                                    <button
                                        type="button"
                                        className="border p-2 rounded-md w-full border-black border-opacity-10 text-sm font-medium text-left"
                                        onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                                    >
                                        {selectedType || 'Select Type'}
                                    </button>
                                    {isTypeDropdownOpen && (
                                        <div
                                            className="absolute mt-2 w-full bg-white border rounded-md shadow-lg z-50"
                                            style={{ maxHeight: '150px', overflowY: 'auto' }}
                                        >
                                            {['incoming', 'outgoing'].map((type) => (
                                                <div
                                                    key={type}
                                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => handleTypeClick(type)}
                                                >
                                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {errors.mailType && (
                                    <div className="text-red-600 text-sm">
                                        {errors.mailType}
                                    </div>
                                )}
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
                                    value={data.reference_number}
                                    onChange={(e) => setData('reference_number', e.target.value)}
                                />
                                {errors.reference_number && (
                                    <div className="text-red-600 text-sm">
                                        {errors.reference_number}
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-row gap-2 mt-2 items-center col-span-6">
                                <label className="text-sm w-24 font-semibold text-right">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    className="border p-2 rounded-md w-full border-black border-opacity-10 text-sm font-medium"
                                    value={data.upload_date}
                                    onChange={(e) => setData('upload_date', e.target.value)}
                                />
                                {errors.upload_date && (
                                    <div className="text-red-600 text-sm">{errors.upload_date}</div>
                                )}
                            </div>
                            <div className="flex flex-row gap-2 mt-2 items-center col-span-6">
                                <label className="text-sm w-24 font-semibold text-right">
                                    Sender
                                </label>
                                <input
                                    type="text"
                                    className="border p-2 rounded-md w-full border-black border-opacity-10 text-sm font-medium"
                                    value={data.sender}
                                    onChange={(e) => setData('sender', e.target.value)}
                                />
                                {errors.sender && (
                                    <div className="text-red-600 text-sm">{errors.sender}</div>
                                )}
                            </div>
                            <div className="flex flex-row gap-2 mt-2 items-center col-span-6">
                                <label className="text-sm w-24 font-semibold text-right">
                                    Recipient
                                </label>
                                <input
                                    type="text"
                                    className="border p-2 rounded-md w-full border-black border-opacity-10 text-sm font-medium"
                                    value={data.recipient}
                                    onChange={(e) => setData('recipient', e.target.value)}
                                />
                                {errors.recipient && (
                                    <div className="text-red-600 text-sm">{errors.recipient}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 pr-14 flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-4 py-2 bg-customBlue text-white rounded-md"
                    >
                        {processing ? 'Saving...' : 'Save Changes'}
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
                                    type="button"
                                    className="px-4 py-2 bg-customBlue text-white rounded-md"
                                    onClick={handleAddCategory}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        )
    );
};

export default DrawerComponent;
