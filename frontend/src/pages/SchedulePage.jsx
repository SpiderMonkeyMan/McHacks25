import React from 'react'
import ScheduleBackground from './ScheduleBackground';
import Friendbar from './Friendbar';

const SchedulePage = ({schedule, friendCourses, addFriend }) => {
    return (
        <div class='flex'>
            <div class='p-5'>
                <Friendbar friendCourses={friendCourses} addFriend={addFriend} />
            </div>
            <div class='p-5'>
                <ScheduleBackground schedule={schedule}/>
            </div>
        </div>

    )
}

export default SchedulePage;