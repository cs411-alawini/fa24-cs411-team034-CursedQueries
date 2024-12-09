import React from "react";
import "./TimeWidget.css";

const TimeWidget = ({ toggleTimeSlot, clearFilters, closeWidget, selectedTimes }) => {
  const timeSlots = [
    "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM",
    "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM"
  ];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div className="time-widget">
      <div className="time-widget-header">
        <h3>Select Meeting Times</h3>
        <button className="close-button" onClick={closeWidget}>Close</button>
      </div>
      <div className="time-widget-grid">
        {days.map((day) => (
          <div key={day} className="day-column">
            <h4>{day}</h4>
            <div className="time-slots">
              {timeSlots.map((time) => {
                const timeKey = `${day}-${time}`;
                return (
                  <label key={timeKey} className="time-slot">
                    <input
                      type="checkbox"
                      checked={selectedTimes.includes(timeKey)}
                      onChange={() => toggleTimeSlot(day, time)}
                    />
                    {time}
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <button className="clear-button" onClick={clearFilters}>Clear Filters</button>
    </div>
  );
};

export default TimeWidget;
