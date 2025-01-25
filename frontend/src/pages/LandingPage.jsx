import React, { useState, useEffect } from "react";

const LandingPage = () => {
    return (
        <div>
            <header>
                <h1>McGill Schedule Sharer</h1>
                <p>
                    Easily share your schedule and see your friends' schedules with the McGill Schedule Sharer app. Simply paste your VSB link and get started!
                </p>
            </header>
            <main>
                <section>
                    <h2>How It Works</h2>
                    <ol>
                        <li>Paste your VSB schedule link.</li>
                        <li>Store your schedule securely in our system.</li>
                        <li>Follow friends to view their schedules.</li>
                    </ol>
                </section>
                <section>
                    <h2>Get Started</h2>
                    <form>
                        <label htmlFor="vsb-link">Enter your VSB link:</label>
                        <input type="text" id="vsb-link" name="vsb-link" placeholder="Paste your VSB link here" />
                        <button type="submit">Submit</button>
                    </form>
                </section>
                <section>
                    <h2>Features</h2>
                    <ul>
                        <li>Securely store your schedule</li>
                        <li>Follow and view friends' schedules</li>
                        <li>Plan meetups and study sessions effortlessly</li>
                    </ul>
                </section>
            </main>
            <footer>
                <p>&copy; 2025 McGill Schedule Sharer. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default LandingPage;