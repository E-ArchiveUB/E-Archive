// ActionModal.jsx

import React, { useState, useRef, useEffect } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';
import { CgArrowsExchange } from 'react-icons/cg';
import DrawerComponent from './DrawerComponent';
import DrawerChangeFile from './DrawerChangeFile';
import { Inertia } from '@inertiajs/inertia';
import Toaster from './Toaster';

const ActionModal = ({ modalPosition, currentMailInfo, onClose }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isChangeFileDrawerOpen, setIsChangeFileDrawerOpen] = useState(false);
    const [toast, setToast] = useState({ show: false, type: '', message: '' });

    const actionModalRef = useRef(null);
    const drawerRef = useRef(null);
    const changeFileDrawerRef = useRef(null);

    // Function to trigger toasts
    const triggerToast = (type, message) => {
        setToast({ show: true, type, message });
        setTimeout(() => {
            setToast({ show: false, type: '', message: '' });
        }, 5000);
    };

    const handleEditClick = () => {
        setIsDrawerOpen(true);
    };

    const handleChangeFileClick = () => {
        setIsChangeFileDrawerOpen(true);
    };

    const handleDeleteClick = () => {
        if (confirm('Are you sure you want to delete this file?')) {
            Inertia.delete(route('files.destroy', currentMailInfo.id), {
                preserveScroll: true,
                onSuccess: () => {
                    triggerToast('success', 'File deleted successfully.');
                    onClose(); // Close the ActionModal after deletion
                },
                onError: () => {
                    triggerToast('error', 'Failed to delete the file.');
                },
            });
        }
    };

    // Unified handler for detecting clicks outside the modal and drawers
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                actionModalRef.current &&
                !actionModalRef.current.contains(event.target) &&
                (!drawerRef.current || !drawerRef.current.contains(event.target)) &&
                (!changeFileDrawerRef.current || !changeFileDrawerRef.current.contains(event.target))
            ) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [onClose]);

    return (
        <>
            {/* Little Modal */}
            <div
                ref={actionModalRef}
                style={{ top: modalPosition.top, left: modalPosition.left }}
                className="absolute pb-0 -translate-x-40 mt-8 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
            >
                <div className="flex flex-col p-4 pt-1 gap-1 pb-1 border-b border-gray-200">
                    <p className="text-sm font-semibold line-clamp-1">
                        {currentMailInfo.fileName}
                    </p>
                    <p className="text-xs">Category: {currentMailInfo.category}</p>
                    <p className="text-xs">Sender: {currentMailInfo.sender}</p>
                </div>
                <div className="px-1 py-1 flex flex-col">
                    <button
                        className="flex flex-row justify-start w-full py-2 px-3 gap-4 rounded-md hover:bg-gray-100"
                        onClick={handleEditClick}
                    >
                        <AiOutlineEdit size={18} />
                        <span className="text-sm font-medium">Edit</span>
                    </button>
                    <button
                        className="flex flex-row justify-start w-full py-2 px-3 gap-4 rounded-md hover:bg-gray-100"
                        onClick={handleChangeFileClick}
                    >
                        <CgArrowsExchange size={18} />
                        <span className="text-sm font-medium">Change File</span>
                    </button>
                    <button
                        className="flex flex-row justify-start w-full py-2 px-3 gap-4 rounded-md hover:bg-gray-100"
                        onClick={handleDeleteClick}
                    >
                        <MdDeleteOutline size={18} />
                        <span className="text-sm font-medium">Delete</span>
                    </button>
                </div>
            </div>

            {/* Drawer Component for Editing */}
            <DrawerComponent
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                currentMailInfo={currentMailInfo}
                drawerRef={drawerRef} // Reference for DrawerComponent
                triggerToast={triggerToast} // Pass triggerToast to DrawerComponent
            />

            {/* Drawer Component for Changing File */}
            <DrawerChangeFile
                isOpen={isChangeFileDrawerOpen}
                onClose={() => setIsChangeFileDrawerOpen(false)}
                currentMailInfo={currentMailInfo}
                drawerRef={changeFileDrawerRef} // Reference for DrawerChangeFile
                triggerToast={triggerToast} // Pass triggerToast to DrawerChangeFile
            />

            {/* Toaster */}
            {toast.show && <Toaster type={toast.type} message={toast.message} />}
        </>
    );

};

export default ActionModal;
