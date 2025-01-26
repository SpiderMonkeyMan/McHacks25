import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-blue-600 text-white p-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-4">McGill Schedule Sharer</h1>
                    <p className="text-lg">
                        Easily share your schedule and see your friends' schedules with the McGill Schedule Sharer app. Simply paste your VSB link and get started!
                    </p>
                </div>
            </header>
            <main className="flex-grow bg-gray-100 py-12">
                <div className="max-w-4xl mx-auto px-6">
                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">How It Works</h2>
                        <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                            <li>Paste your VSB schedule link.</li>
                            <li>Store your schedule securely in our system.</li>
                            <li>Follow friends to view their schedules.</li>
                        </ol>
                    </section>
                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Get Started</h2>
                        <Link 
                            to="/schedule" 
                            className="inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Get Started
                        </Link>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Features</h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>Securely store your schedule</li>
                            <li>Follow and view friends' schedules</li>
                            <li>Plan meetups and study sessions effortlessly</li>
                        </ul>
                    </section>
                </div>
            </main>
            <footer className="bg-gray-800 text-gray-300 p-6">
                <div className="max-w-4xl mx-auto text-center">
                    <p>&copy; 2025 McGill Schedule Sharer. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;
