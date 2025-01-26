import React, { useState } from 'react'
import ScheduleBackground from './ScheduleBackground';
import Friendbar from './Friendbar';

const SchedulePage = ({schedule, userSchedule, setSchedule, friendCourses, addFriend }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    
    return (
        <div className='flex'>
            <div className='p-5'>
                <Friendbar userSchedule={userSchedule} friendCourses={friendCourses} addFriend={addFriend} isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} setSchedule={setSchedule} />
            </div>
            {!isPopupOpen && (<div className='p-5'>
                <ScheduleBackground schedule={schedule}/>
            </div>)}
        </div>

    )
}

export default SchedulePage;