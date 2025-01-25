import React, { useState, useEffect } from "react";
import axios from "axios";

const Schedule = () => {
    const [schedule, setSchedule] = useState(null);
    const [username, setUsername] = useState('');
    const [inputValue, setInputValue] = useState('');

    // Fetch the schedule from the backend
    const fetchSchedule = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:5000/schedule");
            console.log("Backend Response:", response.data);
            setSchedule(response.data);
        } catch (error) {
            console.error("Error fetching schedule:", error);
        }
    };

    // Fetch the username based on the input value
    const fetchUsername = async (event) => {
        event.preventDefault(); // Prevent the form from refreshing the page
        try {
            const response = await axios.get(`http://127.0.0.1:5000/database?username=${inputValue}`);
            setUsername("response.data");
        } catch (error) {
            console.error("Error fetching username:", error);
        }
    };

    useEffect(() => {
        fetchSchedule();
    }, []);

    return (
        <div>
            {/* Form to fetch username */}
            <form>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter username"
                />
                <button onClick={fetchUsername}>Submit</button>
            </form>

            {/* Display the fetched username */}
            {username ? (
                <pre>{JSON.stringify(username, null, 2)}</pre>
            ) : (
                "No username data available."
            )}

            {/* Display the fetched schedule */}
            {schedule ? (
                <pre>{JSON.stringify(schedule, null, 2)}</pre>
            ) : (
                "Loading schedule..."
            )}
        </div>
    );
};

export default Schedule;
