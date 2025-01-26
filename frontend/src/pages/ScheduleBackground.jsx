import React from "react";

const ScheduleBackground = () => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const hours = Array.from({ length: 15 }, (_, i) => `${8 + i}:00`);
  const halfHours = hours.flatMap((hour, i) => (i < 14 ? [hour, ""] : [hour]));

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-4 bg-white rounded-lg shadow-md">
        {/* Days Header */}
        <div className="grid grid-cols-[1fr_repeat(5,2.5fr)] border-b border-gray-300">
          <div></div>
          {days.map((day, index) => (
            <div
              key={index}
              className="text-center font-medium text-gray-700 border-l border-gray-300"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Time Slots and Grid */}
        <div className="grid grid-cols-[1fr_repeat(5,2.5fr)]">
          {/* Times Column */}
          <div className="flex flex-col border-r border-gray-300">
            {halfHours.map((time, index) => (
              <div
                key={index}
                className={`h-6 text-sm text-right pr-2 ${
                  index % 2 === 0 ? "text-gray-600" : "text-gray-400"
                }`}
              >
                {index % 2 === 0 ? time : ""}
              </div>
            ))}
          </div>

          {/* Schedule Grid */}
          {days.map((_, dayIndex) => (
            <div key={dayIndex} className="flex flex-col border-l border-gray-300">
              {halfHours.map((_, index) => (
                <div
                  key={index}
                  className={`h-6 border-b border-gray-300 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                  }`}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleBackground;
