import React from 'react';
import { usePage } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import DashboardCard from '@/Components/DashboardCard';
import { RiMailSendLine } from "react-icons/ri";
import { TbMailDown } from "react-icons/tb";
import { TbMailUp } from "react-icons/tb";
import { FaMailBulk } from "react-icons/fa";

const Dashboard = () => {
    const { totalMails, incomingMails, outgoingMails, categories } = usePage().props;

    return (
        <Layout>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <DashboardCard
                    title="All Mail"
                    icon={<RiMailSendLine size={20} />}
                    point={totalMails}
                    description="Total number of letters successfully archived"
                />
                <DashboardCard
                    title="Incoming Mail"
                    icon={<TbMailDown size={22} />}
                    point={incomingMails}
                    description="Total number of incoming mail"
                />
                <DashboardCard
                    title="Outgoing Mail"
                    icon={<TbMailUp size={22} />}
                    point={outgoingMails}
                    description="Total number of outgoing mail"
                />
            </div>
            <hr className="border border-blue-400 border-opacity-20" />
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <DashboardCard
                            key={category.id}
                            title={category.name}
                            icon={<FaMailBulk size={20} />}
                            point={category.files_count}
                            description={`Category ${category.name}`}
                        />
                    ))
                ) : (
                    <p>No categories available.</p>
                )}
            </div>
        </Layout>
    );
};

export default Dashboard;
