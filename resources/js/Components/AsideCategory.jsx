import React, { Children } from "react";

const AsideCategory = ({ children }) => {
    return (
        <div className="pl-4 pt-6">
            <h2 className="text-xs font-bold mb-2 text-black text-opacity-60">{children}</h2>
        </div>
    );
};

export default AsideCategory;
