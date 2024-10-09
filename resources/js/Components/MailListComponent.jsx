import React, { useState, useRef, useEffect } from "react";
import { CgEditUnmask } from "react-icons/cg";
import ActionModal from "./ActionModal"; // Import ActionModal
import mailInfo from "@/Data/MailInfo"; // Assume this is your mail data
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import FilterMailType from "./FilterMailType"; // Import FilterMailType
import FilterMailSearch from "./FilterMailSearch"; // Import FilterMailSearch
import HeaderMailList from "./HeaderMailList";

const MailListComponent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
    const [modalPosition, setModalPosition] = useState({ top: 10, left: 0 }); // State to track modal position
    const [selectedMail, setSelectedMail] = useState(null); // State to store selected mail for modal
    const modalRef = useRef(null); // Ref for the modal
    const actionButtonRefs = useRef([]); // Array of refs for each action button

    const [activeFilter, setActiveFilter] = useState("all"); // State to track active filter (all, incoming, outgoing)
    const [searchQuery, setSearchQuery] = useState(""); // State to track search input

    // Function to toggle modal visibility and set its position
    const handleActionClick = (e, mail, index) => {
        e.stopPropagation(); // Prevent the click from propagating to the document event listener

        const rect = e.target.getBoundingClientRect();
        const screenHeight = window.innerHeight;

        // Calculate whether to show modal above or below the button
        const modalTopPosition =
            rect.bottom + 300 > screenHeight
                ? rect.top + window.scrollY - 300 // Show above if it overflows bottom
                : rect.bottom + window.scrollY; // Otherwise, show below

        setModalPosition({
            top: modalTopPosition,
            left: rect.left + window.scrollX,
        });

        if (isModalOpen && selectedMail?.id === mail.id) {
            // Close the modal if it's open and the same mail is clicked
            setIsModalOpen(false);
            setSelectedMail(null);
        } else {
            setSelectedMail(mail); // Set the selected mail for editing
            setIsModalOpen(true); // Open the modal
        }
    };

    // Close modal on outside click
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                isModalOpen &&
                modalRef.current &&
                !modalRef.current.contains(event.target) &&
                !actionButtonRefs.current.some(
                    (ref) => ref && ref.contains(event.target)
                )
            ) {
                setIsModalOpen(false); // Close the modal
                setSelectedMail(null); // Clear selected mail
            }
        };

        if (isModalOpen) {
            document.addEventListener("mousedown", handleOutsideClick);
        } else {
            document.removeEventListener("mousedown", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isModalOpen]);

    // Function to handle filter change
    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
    };

    // Function to handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter and search logic
    const filteredMail = mailInfo.filter((mail) => {
        // Filter based on activeFilter (all, incoming, outgoing)
        if (activeFilter !== "all" && mail.mailType !== activeFilter) {
            return false;
        }

        // Filter based on searchQuery (fileName)
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
            <HeaderMailList/>

            {/* Mail List */}
            {filteredMail.map((mail, index) => {
                // Determine if the mail is incoming or outgoing
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
                                href="/dashboard"
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
                    modalRef={modalRef}
                    modalPosition={modalPosition}
                    currentMailInfo={selectedMail}
                />
            )}
        </>
    );
};

export default MailListComponent;
