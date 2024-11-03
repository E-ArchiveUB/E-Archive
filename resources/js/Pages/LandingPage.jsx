import React from "react";
import { useForm } from "@inertiajs/inertia-react";

const LandingPage = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
    });

    const handleLogin = async (e) => {
        e.preventDefault();

        post('/login', {
            onError: (err) => {
                console.log('Error response received:', err); // Debugging check
                reset('password'); // Clear the password field on error
            }
        });
    };

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

                <form onSubmit={handleLogin}>
                    <div className="flex flex-col gap-2 mb-6">
                        <label
                            className="text-black text-opacity-60 text-sm font-medium"
                            htmlFor="username"
                        >
                            Username
                        </label>
                        <input
                            className={`py-2 px-4 w-80 text-black text-opacity-60 text-sm font-semibold border rounded-lg placeholder:text-black placeholder:text-opacity-40 placeholder:text-sm placeholder:font-medium focus-within:outline-none ${
                                errors.login ? "border-red-500" : "border-black border-opacity-60"
                            }`}
                            type="text"
                            placeholder="Masukkan Username Anda"
                            value={data.username}
                            onChange={(e) => setData('username', e.target.value)}
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm">{errors.username}</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-2 mb-6">
                        <label
                            className="text-black text-opacity-60 text-sm font-medium"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className={`py-2 px-4 w-80 text-black text-opacity-60 text-sm font-semibold border rounded-lg placeholder:text-black placeholder:text-opacity-40 placeholder:text-sm placeholder:font-medium focus-within:outline-none ${
                                errors.login ? "border-red-500" : "border-black border-opacity-60"
                            }`}
                            type="password"
                            placeholder="********"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password}</p>
                        )}
                    </div>

                    {/* General login error message */}
                    {errors.login && (
                        <p className="text-red-500 text-sm mb-4">
                            {errors.login}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={processing}
                        className="flex justify-center items-center rounded-md bg-blue-500 text-white hover:bg-white border-2 border-blue-500 hover:text-blue-500 transition-all duration-200 w-32 py-2 px-4 font-semibold text-sm"
                    >
                        Login
                    </button>
                </form>
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
