import React, { useState, useEffect } from "react";
import axios from "axios";

const LandingPage = () => {
    const [schedule, setSchedule] = useState(null);

    const fetchSchedule = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:5000/schedule");
            console.log("Backend Response:", response.data);
            setSchedule(response.data);
        } catch (error) {
            console.error("Error fetching schedule:", error);
        }
    };
    

    useEffect(() => {
        fetchSchedule();
        console.log(schedule);
    }, []);

    return (
        <div>
            {schedule ? (
                <pre>{JSON.stringify(schedule, null, 2)}</pre>
            ) : (
                "Loading..."
            )}
        </div>
    );
}

export default LandingPage;