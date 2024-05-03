import React from "react";

const HistoryBlock = ({ deletedTasks, revertTask, clearTask }) => {
  return (
    <div className="mt-8">
      <h3 className="text-xl mb-2">Deleted Tasks</h3>
      <div className="flex flex-wrap">
        {deletedTasks.map((task) => (
          <div
            key={task.id}
            className="border p-4 mb-2 mr-2 bg-red-400 flex flex-col"
            style={{ maxWidth: "250px" }}
          >
            <div>
              <h4 className="text-lg mb-2">{task.text}</h4>
              <p className="text-sm mb-2">{task.description}</p>
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={() => revertTask(task)}
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              >
                Revert
              </button>
              <button
                onClick={() => clearTask(task)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Clear
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryBlock;
