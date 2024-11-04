// MailListComponent.jsx

import React, { useState, useRef } from 'react';
import { CgEditUnmask } from 'react-icons/cg';
import ActionModal from './ActionModal';
import { FaArrowTrendUp, FaArrowTrendDown } from 'react-icons/fa6';
import FilterMailType from './FilterMailType';
import FilterMailSearch from './FilterMailSearch';
import HeaderMailList from './HeaderMailList';

const MailListComponent = ({ mailInfo }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: 10, left: 0 });
    const [selectedMail, setSelectedMail] = useState(null);
    const modalRef = useRef(null);
    const actionButtonRefs = useRef([]);

    const [activeFilter, setActiveFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const handleActionClick = (e, mail, index) => {
        e.stopPropagation();

        const rect = e.target.getBoundingClientRect();
        const screenHeight = window.innerHeight;

        const modalTopPosition =
            rect.bottom + 300 > screenHeight
                ? rect.top + window.scrollY - 300
                : rect.bottom + window.scrollY;

        setModalPosition({
            top: modalTopPosition,
            left: rect.left + window.scrollX,
        });

        // Close any existing modal
        if (isModalOpen) {
            setIsModalOpen(false);
            setSelectedMail(null);
        }

        // Open the modal for the new mail item
        setSelectedMail(mail);
        setIsModalOpen(true);
    };

    // Remove handleOutsideClick from MailListComponent

    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredMail = mailInfo.filter((mail) => {
        if (activeFilter !== "all" && mail.mailType !== activeFilter) {
            return false;
        }

        if (
            searchQuery &&
            !mail.fileName.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
            return false;
        }

        return true;
    });

    return (
        <>
            {/* Filters */}
            <div className="flex justify-between items-center mb-4">
                <FilterMailType
                    activeFilter={activeFilter}
                    onFilterChange={handleFilterChange}
                />
                <FilterMailSearch
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                />
            </div>
            <HeaderMailList />

            {/* Mail List */}
            {filteredMail.map((mail, index) => {
                const isIncoming = mail.mailType === "incoming";
                const icon = isIncoming ? (
                    <FaArrowTrendDown />
                ) : (
                    <FaArrowTrendUp />
                );
                const textColor = isIncoming
                    ? "text-green-700"
                    : "text-orange-700";

                return (
                    <div
                        key={mail.id}
                        className="group grid grid-cols-12 border border-black border-opacity-20 rounded-md justify-center items-center"
                    >
                        <div className="w-full flex flex-row justify-center px-3 h-full min-h-10 rounded-l-md items-center bg-blue-200 group-hover:bg-opacity-40 col-span-2">
                            <h1 className="text-xs font-medium line-clamp-1">
                                {mail.mailReference}
                            </h1>
                        </div>
                        <div className="w-full flex flex-row justify-start px-3 h-full min-h-10 items-center bg-blue-100 group-hover:bg-opacity-40 col-span-4">
                            <a
                                target="_blank"
                                href={mail.file_url}
                                className="underline text-xs font-medium"
                            >
                                {mail.fileName}
                            </a>
                        </div>
                        <div
                            className={`w-full flex flex-row gap-1 justify-between px-2 h-full min-h-10 items-center bg-blue-200 group-hover:bg-opacity-40 col-span-1 ${textColor}`}
                        >
                            <h1 className="text-xs text-center font-medium">
                                {mail.mailType}
                            </h1>
                            <span className={`w-6 ${textColor} pt-1`}>
                                {icon}
                            </span>
                        </div>
                        <div className="w-full flex flex-row justify-start px-3 h-full min-h-10 items-center bg-blue-100 group-hover:bg-opacity-40 col-span-2">
                            <h1 className="text-xs font-medium">
                                {mail.sender}
                            </h1>
                        </div>
                        <div className="w-full flex flex-row justify-start px-3 h-full min-h-10 items-center bg-blue-200 group-hover:bg-opacity-40 col-span-2">
                            <h1 className="text-xs font-medium">
                                {mail.recipient}
                            </h1>
                        </div>
                        <div className="w-full flex flex-row justify-center px-3 h-full min-h-10 items-center rounded-r-md bg-blue-100 group-hover:bg-opacity-40 col-span-1">
                            <button
                                className="rounded-md hover:bg-blue-200 p-1"
                                onClick={(e) =>
                                    handleActionClick(e, mail, index)
                                }
                                ref={(el) =>
                                    (actionButtonRefs.current[index] = el)
                                }
                            >
                                <CgEditUnmask />
                            </button>
                        </div>
                    </div>
                );
            })}

            {/* Render modal conditionally */}
            {isModalOpen && selectedMail && (
                <ActionModal
                    key={selectedMail.id} // Add key prop
                    modalRef={modalRef}
                    modalPosition={modalPosition}
                    currentMailInfo={selectedMail}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
};

export default MailListComponent;
