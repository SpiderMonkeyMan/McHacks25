import React from 'react';

const Friendbar = ({friendCourses}) => {
    
    return (
        <div
            class="relative flex w-full max-w-[20rem] flex-col rounded-xl bg-white bg-clip-border p-4 text-gray-700 shadow-md shadow-blue-gray-900/5">
            <div class="p-2 mb-2">
                <h5 class="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-900">
                    Friends
                </h5>
            </div>
            <nav class="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-gray-700">
                
            </nav>
        </div>

    )
}

export default Friendbar;