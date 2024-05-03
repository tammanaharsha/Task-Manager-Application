import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import HistoryBlock from "./HistoryBlock";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { Link } from "react-router-dom";

const TaskManagerPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [deletedTasks, setDeletedTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        loadUserData(user);
      } else {
        setUser(null);
        setTasks([]);
        // setDeletedTasks([]); // Clear deleted tasks if user is signed out
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      // Save deleted tasks to localStorage when user changes
      localStorage.setItem(
        user.uid + "_deletedTasks",
        JSON.stringify(deletedTasks)
      );
    }
  }, [deletedTasks, user]);

  const loadUserData = (user) => {
    const userTasks = JSON.parse(localStorage.getItem(user.uid));
    if (userTasks && Array.isArray(userTasks)) {
      setTasks(userTasks);
    } else {
      setTasks([]);
    }

    const userDeletedTasks = JSON.parse(
      localStorage.getItem(user.uid + "_deletedTasks")
    );
    if (userDeletedTasks && Array.isArray(userDeletedTasks)) {
      setDeletedTasks(userDeletedTasks);
    } else {
      setDeletedTasks([]);
    }
  };

  const saveUserTasks = (user, userTasks) => {
    localStorage.setItem(user.uid, JSON.stringify(userTasks));
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const newTaskData = {
        id: Date.now(),
        text: newTask,
        description: newTaskDescription,
        dueDate: newTaskDueDate,
      };
      const updatedTasks = [...tasks, newTaskData];
      setTasks(updatedTasks);
      saveUserTasks(user, updatedTasks);
      setNewTask("");
      setNewTaskDescription("");
      setNewTaskDueDate("");
    }
  };

  const handleDeleteTask = (taskId) => {
    const taskToDelete = tasks.find((task) => task.id === taskId);
    if (taskToDelete) {
      setDeletedTasks([...deletedTasks, taskToDelete]);
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
      saveUserTasks(user, updatedTasks);
    }
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      const editedTaskCopy = { ...taskToEdit };
      setEditedTask(editedTaskCopy);
      setEditMode(true);
    }
  };

  const revertTask = (task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    setDeletedTasks(deletedTasks.filter((t) => t.id !== task.id));
    alert(
      `Task "${task.text}" with description "${task.description}" has been reverted.`
    );
    saveUserTasks(user, updatedTasks);
  };

  const handleSaveEdit = () => {
    const index = tasks.findIndex((task) => task.id === editedTask.id);
    if (index !== -1) {
      const updatedTasks = [...tasks];
      updatedTasks[index] = editedTask;
      setTasks(updatedTasks);
      setEditMode(false);
      setEditedTask(null);
      saveUserTasks(user, updatedTasks);
    }
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

  const clearTask = (task) => {
    const updatedDeletedTasks = deletedTasks.filter((t) => t.id !== task.id);
    setDeletedTasks(updatedDeletedTasks);
  };

  return (
    <div
      className="w-full h-full flex items-center justify-center absolute z-10"
      style={{
        backgroundImage: `url("https://www.amitree.com/wp-content/uploads/2021/12/what-is-a-task-tracker-and-why-you-need-one.jpeg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-4 py-8 rounded-lg bg-white bg-opacity-80 max-h-full overflow-y-auto">
        <h2 className="text-4xl font-semibold mb-8 text-center text-blue-600 bg-opacity-80">
          Task Manager
        </h2>
        <button className="text-white text-lg bg-gray-600 rounded-lg px-2 py-2 m-2 ">
          <Link to="/reminder">Create Reminder</Link>
        </button>
        {!editMode ? (
          <>
            <div className="flex items-center mb-8">
              <input
                type="text"
                placeholder="Enter task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 flex-1"
              />
              <input
                type="text"
                placeholder="Enter task description"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                className="p-4 ml-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 flex-1"
              />
              <input
                type="date"
                value={newTaskDueDate}
                onChange={(e) => setNewTaskDueDate(e.target.value)}
                className="p-4 ml-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
              <button
                onClick={handleAddTask}
                className="bg-blue-600 text-white px-8 py-4 ml-4 rounded-lg hover:bg-blue-700 focus:outline-none"
              >
                Add Task
              </button>
            </div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onDelete={() => handleDeleteTask(task.id)}
                  onEdit={() => handleEditTask(task.id)}
                />
              ))}
            </div>
          </>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
            <input
              type="text"
              placeholder="Enter task"
              value={editedTask.text}
              onChange={(e) =>
                setEditedTask({ ...editedTask, text: e.target.value })
              }
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 w-full mb-4"
            />
            <input
              type="text"
              placeholder="Enter task description"
              value={editedTask.description}
              onChange={(e) =>
                setEditedTask({ ...editedTask, description: e.target.value })
              }
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 w-full mb-4"
            />
            <input
              type="date"
              value={editedTask.dueDate}
              onChange={(e) =>
                setEditedTask({ ...editedTask, dueDate: e.target.value })
              }
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 w-full mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={handleSaveEdit}
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        <HistoryBlock
          deletedTasks={deletedTasks}
          revertTask={revertTask}
          clearTask={clearTask}
        />
      </div>
      <button
        onClick={handleSignOut}
        className="fixed top-4 right-4 bg-red-600 text-white px-4 py-2 rounded"
      >
        Sign Out
      </button>
    </div>
  );
};

export default TaskManagerPage;
