import React, { useState } from "react";
import Priority from "./Priorities";

const TaskItem = ({ task, onDelete, onEdit }) => {
  const { id, text, description, priority, dueDate } = task; // Destructure dueDate from task object
  const [selectedPriority, setSelectedPriority] = useState(
    priority || Priority.MEDIUM
  );

  const handlePriorityChange = (e) => {
    setSelectedPriority(e.target.value);
  };

  return (
    <div className="border p-4 rounded-lg bg-green-400">
      <h4 className="text-lg mb-2">{text}</h4>
      <p className="text-sm mb-2">{description}</p>
      {dueDate && ( // Check if due date exists
        <p className="text-sm mb-2">Due Date: {dueDate}</p>
      )}
      <div className="flex justify-between">
        <select
          value={selectedPriority}
          onChange={handlePriorityChange}
          className="p-2 mr-2 rounded"
        >
          {Object.values(Priority).map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-4 py-2 rounded mr-2"
        >
          Delete
        </button>
        <button
          onClick={onEdit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
