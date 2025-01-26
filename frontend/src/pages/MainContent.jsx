import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { LoginContext } from "./LoginContext";
import { Link } from "react-router-dom";
import SchedulePage from "./SchedulePage";


const ScheduleInput = ({ onSave }) => {
    const { username } = useContext(LoginContext);
    const [link, setLink] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (link.trim()) {
            try {
                const response = await axios.post("http://127.0.0.1:5000/process-schedule", {
                    username: username,
                    link: link.trim(),
                });
                if (response.data.success) {
                    onSave(response.data.courses); // Pass the fetched schedule data to the parent
                } else {
                    alert("Failed to save schedule. Please try again.");
                }
            } catch (error) {
                console.error("Error saving schedule:", error);
                alert("An error occurred while saving the schedule.");
            }
        } else {
            alert("Please enter a valid link.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md w-80"
            >
                <h1 className="text-2xl font-bold mb-4">Add Your Schedule</h1>
                <input
                    type="text"
                    placeholder="Enter the schedule link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 mt-4 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

const MainContent = () => {
    const { username } = useContext(LoginContext);
    const [schedule, setSchedule] = useState(null);
    const [friendCourses, setFriendsCourses] = useState(null);

    const fetchUserData = async () => {
        if (!username) return; // Ensure the username is available before making the request
        try {
            const response = await axios.post(
                "http://127.0.0.1:5000/check-username", // Update to remove query string
                { username }, // Send username in the request body
                {
                    headers: {
                        "Content-Type": "application/json", // Ensure the Content-Type is JSON
                    },
                }
            );
            if (response.data.schedule) {
                setSchedule(response.data.user_courses);
                setFriendsCourses(response.data.friends);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }

    const addFriend = async (friend) => {
        try {
            const response = await axios.post("http://127.0.0.1:5000/add-friend", { user: username, friend: friend });
            setFriendsCourses([response.data.friend_courses, ...friendCourses])
        } catch (error) {
            console.log("Error adding friend:", error)
        }
    }
    
    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {username ? (
                schedule ? (
                    <SchedulePage schedule={schedule} setSchedule={setSchedule} friendCourses={friendCourses} addFriend={addFriend} />
                ) : (
                    <ScheduleInput onSave={setSchedule} />
                )
            ) : (
                <div className="text-center bg-white p-6 rounded-lg shadow-md w-80">
                    <h1 className="text-2xl font-bold mb-4">No User Data</h1>
                    <p className="text-gray-600 mb-4">You need to log in to access your schedule.</p>
                    <Link
                        to="/login"
                        className="inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Log in
                    </Link>
                </div>
            )}
        </div>
    );
      
};

export default MainContent;
