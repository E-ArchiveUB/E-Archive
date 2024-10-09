import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js"; // Import the required components
import mailData from "@/Data/MailData";
import dayjs from "dayjs";

// Registering the required components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const MailChart = () => {
    const [filter, setFilter] = useState("all");

    const filterData = (data) => {
        const currentDate = dayjs();
        if (filter === "1month") {
            const startOfMonth = currentDate.startOf("month");
            return data.filter((item) =>
                dayjs(item.tanggal).isAfter(startOfMonth)
            );
        } else if (filter === "3months") {
            const threeMonthsAgo = currentDate
                .subtract(3, "month")
                .startOf("month");
            return data.filter((item) =>
                dayjs(item.tanggal).isAfter(threeMonthsAgo)
            );
        } else if (filter === "1year") {
            const oneYearAgo = currentDate.subtract(1, "year").startOf("year");
            return data.filter((item) =>
                dayjs(item.tanggal).isAfter(oneYearAgo)
            );
        } else {
            return data;
        }
    };

    const filteredData = filterData(mailData);

    const chartData = {
        labels: filteredData.map((item) =>
            dayjs(item.tanggal).format("DD MMM YYYY")
        ),
        datasets: [
            {
                label: "Surat Masuk",
                data: filteredData.map((item) => item.suratMasuk),
                borderColor: "#147FC5",
                borderWidth: 2,
                tension: 0.4,
                fill: false,
            },
            {
                label: "Surat Keluar",
                data: filteredData.map((item) => item.suratKeluar),
                borderColor: "#FF6384",
                borderWidth: 2,
                tension: 0.4,
                fill: false,
            },
        ],
    };

    return (
        <div>
            <div className="flex gap-4 mb-4">
                <button
                    onClick={() => setFilter("1month")}
                    className="px-4 py-2 bg-white border border-customBlue text-black text-sm font-semibold hover:bg-customBlue hover:text-white  hover:duration-200 duration-200 rounded-md hover:scale-105 transition"
                >
                    Bulan Ini
                </button>
                <button
                    onClick={() => setFilter("3months")}
                    className="px-4 py-2 bg-white border border-customBlue text-black text-sm font-semibold hover:bg-customBlue hover:text-white  hover:duration-200 duration-200 rounded-md hover:scale-105 transition"
                >
                    3 Bulan Terakhir
                </button>
                <button
                    onClick={() => setFilter("1year")}
                    className="px-4 py-2 bg-white border border-customBlue text-black text-sm font-semibold hover:bg-customBlue hover:text-white  hover:duration-200 duration-200 rounded-md hover:scale-105 transition"
                >
                    1 Tahun Terakhir
                </button>
                <button
                    onClick={() => setFilter("all")}
                    className="px-4 py-2 bg-white border border-customBlue text-black text-sm font-semibold hover:bg-customBlue hover:text-white  hover:duration-200 duration-200 rounded-md hover:scale-105 transition"
                >
                    Semua
                </button>
            </div>
            <Line data={chartData} />
        </div>
    );
};

export default MailChart;
