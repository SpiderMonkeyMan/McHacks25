import React, { useContext, useState } from 'react';
import { LoginContext } from './LoginContext';

const Friendbar = ({ userSchedule, friendCourses, addFriend, isPopupOpen, setIsPopupOpen, setSchedule }) => {
    const [newFriend, setNewFriend] = useState('');
    const { username } = useContext(LoginContext);

    const handleAddFriend = () => {
        if (newFriend.trim()) {
            addFriend(newFriend.trim());
            setNewFriend('');
            setIsPopupOpen(false);
        }
    };

    return (
        <div className="relative flex w-full max-w-[20rem] flex-col rounded-xl bg-white bg-clip-border p-4 text-gray-700 shadow-md shadow-blue-gray-900/5">
            <div className="p-2 mb-2">
                <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-900">
                    Friends
                </h5>
            </div>
            <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-gray-700">
                {/* Username Button */}
                <button
                    className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => setSchedule(userSchedule)}
                >
                    {username} (You)
                </button>

                {/* Friend Buttons */}
                {(friendCourses || []).map((friend, index) => (
                    <button
                        key={index}
                        className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={() => setSchedule(friend.courses)}
                    >
                        {friend.username}
                    </button>
                ))}
            </nav>
            <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => setIsPopupOpen(true)}
            >
                Add Friend
            </button>

            {isPopupOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-xl p-6 shadow-lg w-80">
                        <h3 className="text-lg font-semibold mb-4">Add a Friend</h3>
                        <input
                            type="text"
                            value={newFriend}
                            onChange={(e) => setNewFriend(e.target.value)}
                            placeholder="Enter username"
                            className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                                onClick={() => {
                                    setIsPopupOpen(false);
                                    setNewFriend('');
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                onClick={handleAddFriend}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Friendbar;
