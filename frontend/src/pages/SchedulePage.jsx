import React from 'react'
import ScheduleBackground from './ScheduleBackground';
import Friendbar from './Friendbar';

const SchedulePage = ({schedule}) => {
    return (
        <div class='flex h-screen'>
            <div class='p-5'>
                <Friendbar/>
            </div>
            <div class='p-5'>
                <ScheduleBackground schedule={schedule}/>
            </div>
        </div>

    )
}

export default SchedulePage;