import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Hero Section */}
            <header className="bg-gray-100 text-gray-800 py-16">
                <div className="max-w-6xl mx-auto flex flex-col items-center px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">
                        McGill Schedule Sharer
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mb-8">
                        Effortlessly share your schedule and connect with friends using the McGill Schedule Sharer app. Start now with your VSB link and make planning easier than ever.
                    </p>
                    <Link 
                        to="/schedule" 
                        className="inline-block bg-red-500 text-white font-medium py-3 px-6 rounded-md shadow-md hover:bg-red-600 transition duration-300"
                    >
                        Get Started
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow py-16">
                <div className="max-w-6xl mx-auto px-6">
                    {/* How It Works Section */}
                    <section className="mb-12 text-center">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                            How It Works
                        </h2>
                        <ol className="list-decimal pl-8 space-y-3 text-gray-600 text-left max-w-3xl mx-auto">
                            <li>Paste your VSB schedule link.</li>
                            <li>Store your schedule securely in our system.</li>
                            <li>Follow friends to view their schedules.</li>
                        </ol>
                    </section>

                    {/* Features Section */}
                    <section className="mb-12 text-center">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                            Features
                        </h2>
                        <ul className="list-disc pl-8 space-y-3 text-gray-600 text-left max-w-3xl mx-auto">
                            <li>Securely store your schedule</li>
                            <li>Follow and view friends' schedules</li>
                            <li>Plan meetups and study sessions effortlessly</li>
                        </ul>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default LandingPage;
