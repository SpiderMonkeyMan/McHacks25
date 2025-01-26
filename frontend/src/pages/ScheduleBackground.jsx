const ScheduleBackground = ({ schedule }) => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const hours = Array.from({ length: 14 }, (_, i) => `${8 + i}:00`); // Ends at 9 PM
  const halfHours = hours.flatMap((hour, i) => (i < 14 ? [hour, ""] : [hour])); // Adjusted for 9 PM end

  // Helper functions to calculate grid position
  const getGridRowStart = (startTime) => Math.floor((startTime - 8) * 4); // Start row based on time
  const getGridRowSpan = (length) => Math.round(length * 4); // Row span for duration

  // Convert schedule object to array of events
  const events = Object.entries(schedule).map(([name, details]) => ({
    name,
    ...details,
  }));
  console.log(events);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-4 bg-white rounded-lg shadow-md w-[800px]">
        {/* Days Header */}
        <div className="grid grid-cols-6 border-b border-gray-300">
          <div></div> {/* Empty cell for times */}
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
        <div className="grid grid-cols-6">
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
          {days.map((day, dayIndex) => (
            <div
              key={dayIndex}
              className="relative grid grid-rows-[repeat(28,_1fr)] border-l border-gray-300"
            >
              {/* Time Slots */}
              {halfHours.map((_, index) => (
                <div
                  key={index}
                  className={`h-6 border-b border-gray-300 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                  }`}
                ></div>
              ))}

              {/* Event Blocks */}
              {events
                .filter((event) => event.days.includes(days[dayIndex]))
                .map((event, index) => {
                  console.log("Event Starttime:", event.start_time);
                  return (
                    <div
                      key={index}
                      className="absolute left-0 right-0 mx-auto w-[90%] rounded-lg bg-blue-500 text-white text-xs text-center shadow-md flex items-center justify-center"
                      style={{
                        top: `${getGridRowStart(event.start_time) * 12}px`, // Adjust top position
                        height: `${getGridRowSpan(event.length) * 12}px`, // Adjust height
                      }}
                    >
                      {event.name}
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleBackground;