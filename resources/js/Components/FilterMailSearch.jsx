import React from "react";
import { IoSearch } from "react-icons/io5";

const FilterMailSearch = ({ searchQuery, onSearchChange }) => {
    return (
        <div className="w-auto rounded-md px-2 flex flex-row gap-2 justify-center items-center border-[0.1px] border-black">
            <input
                value={searchQuery}
                onChange={onSearchChange} // Handle input changes
                style={{
                    outline: "none",
                    border: "none",
                    boxShadow: "none",
                    WebkitBoxShadow: "none",
                    MozBoxShadow: "none",
                }}
                className="w-[500px] text-sm placeholder:text-sm tracking-wide py-2 focus-within:outline-none"
                type="text"
                placeholder="Search Archive"
            />
            <IoSearch />
        </div>
    );
};

export default FilterMailSearch;
