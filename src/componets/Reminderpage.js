import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ReminderPage = () => {
  const navigate = useNavigate();
  const [reminders, setReminders] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    // Load reminders from localStorage when component mountsa
    const storedReminders = localStorage.getItem("reminders");
    if (storedReminders) {
      setReminders(JSON.parse(storedReminders));
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  useEffect(() => {
    // Save reminders to localStorage whenever reminders state changes
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]); // This effect runs whenever the reminders state changes

  const handleCreateReminder = () => {
    const newReminder = { title, date, time };
    setReminders([...reminders, newReminder]);
    setTitle("");
    setDate("");
    setTime("");
  };

  const handleClearReminder = (index) => {
    const updatedReminders = reminders.filter((_, i) => i !== index);
    setReminders(updatedReminders);
  };

  const navigateToTaskManager = () => {
    navigate("/browse"); // Assuming the route to TaskManagerPage is '/taskmanager'
  };

  return (
    <div className="container mx-auto px-4 py-8 rounded-lg bg-white bg-opacity-80">
      <h2 className="text-4xl font-semibold mb-8 text-center text-blue-600 bg-opacity-80">
        Create Reminder
      </h2>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Enter reminder title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
        />
        <button
          onClick={handleCreateReminder}
          className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          Create Reminder
        </button>
        {reminders.map((reminder, index) => (
          <div key={index} className="p-4 border border-gray-300 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Reminder Details</h3>
            <p>
              <strong>Title:</strong> {reminder.title}
            </p>
            <p>
              <strong>Date:</strong> {reminder.date}
            </p>
            <p>
              <strong>Time:</strong> {reminder.time}
            </p>
            <button
              onClick={() => handleClearReminder(index)}
              className="mt-2 bg-red-600 text-white px-4 py-2 rounded"
            >
              Clear Reminder
            </button>
          </div>
        ))}
        <button
          onClick={navigateToTaskManager}
          className="bg-gray-600 text-white px-8 py-4 rounded-lg hover:bg-gray-700 focus:outline-none"
        >
          Go to Task Manager
        </button>
      </div>
    </div>
  );
};

export default ReminderPage;
