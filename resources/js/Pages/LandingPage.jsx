import React from "react";

const LandingPage = () => {
    return (
        <div className="flex flex-row h-full w-full">
            <div className="h-full w-1/2 flex flex-col pl-24 pt-16">
                <img
                    className="w-96"
                    src="/Assets/Images/logo-fix.png"
                    alt=""
                />
                <div className="flex flex-col gap-4 mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 pt-10 leading-12 text-opacity-90">
                        E-Arsip
                        <br />
                        CV Tunas Abadi
                    </h1>
                    <p className="text-xs text-black text-opacity-40 font-medium">
                        Login Terlebih Dahulu Untuk Mengakses
                    </p>
                </div>
                <div className="flex flex-col gap-2 mb-6">
                    <label
                        className="text-black text-opacity-60 text-sm font-medium"
                        htmlFor="username"
                    >
                        username
                    </label>
                    <input
                        className="py-2 px-4 w-80 text-black text-opacity-60 text-sm font-semibold border border-black border-opacity-60 rounded-lg placeholder:text-black placeholder:text-opacity-40 placeholder:text-sm placeholder:font-medium focus-within:outline-none"
                        type="text"
                        placeholder="Masukkan Username Anda"
                    />
                </div>
                <div className="flex flex-col gap-2 mb-6">
                    <label
                        className="text-black text-opacity-60 text-sm font-medium"
                        htmlFor="password"
                    >
                        password
                    </label>
                    <input
                        className="py-2 px-4 w-80 text-black text-opacity-60 text-sm font-semibold border border-black border-opacity-60 rounded-lg placeholder:text-black placeholder:text-opacity-40 placeholder:text-sm placeholder:font-medium focus-within:outline-none"
                        type="password"
                        placeholder="********"
                    />
                </div>
                <a
                    href="/dashboard"
                    className=" flex justify-center items-center rounded-md bg-blue-500 text-white hover:bg-white border-2 border-blue-500 hover:text-blue-500 transition-all duration-200 hover:transition-all hover:duration-200 w-32 py-2 px-4 font-semibold text-sm "
                >
                    Login
                </a>
            </div>
            <div className="h-screen w-1/2 flex flex-col">
                <img
                    className="w-full h-full rounded-sm object-cover"
                    src="/Assets/Images/company.jpg"
                    alt=""
                />
            </div>
        </div>
    );
};

export default LandingPage;
