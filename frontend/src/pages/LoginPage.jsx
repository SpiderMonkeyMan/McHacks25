import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { LoginContext } from "./LoginContext"; // Ensure this is the correct path for your context

const LoginPage = () => {
    const { username, setUsername } = useContext(LoginContext);
    const [inputValue, setInputValue] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            setUsername(inputValue);
            const timeout = setTimeout(() => navigate('/schedule'), 1000);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            {username ? (
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Welcome back!</h1>
                    <p className="text-lg mt-2">Logged in as <strong>{username}</strong></p>
                </div>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-lg shadow-md w-80"
                >
                    <h1 className="text-2xl font-bold mb-4">Login</h1>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 mt-4 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Submit
                    </button>
                </form>
            )}
        </div>
    );
};

export default LoginPage;
