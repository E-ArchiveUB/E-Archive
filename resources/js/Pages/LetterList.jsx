import React from "react";
import Layout from "@/Layouts/Layout";
import FilterMailType from "@/Components/FilterMailType";
import FilterMailSearch from "@/Components/FilterMailSearch";
import MailListComponent from "@/Components/MailListComponent";
import HeaderMailList from "@/Components/HeaderMailList";

const LetterList = () => {
    return (
        <Layout>
            <div className="flex flex-col justify-center gap-1 mb-4">
                <h1 className="text-2xl font-extrabold text-black">
                    Letter List Archive
                </h1>
                <p className="text-xs text-black text-opacity-60 mb-2">
                    You can search and view archive files here and update them
                    in action.
                </p>
            </div>
            
            <div className="w-full flex flex-col gap-3">
                {/* Rendering Mail List */}
                <MailListComponent />
            </div>
        </Layout>
    );
};

export default LetterList;
