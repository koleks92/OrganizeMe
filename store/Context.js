import { createContext, useState } from "react";

export const OrganizeMeContext = createContext();

const OrganizeMeProvider = ({ children }) => {
    const [newTask, setNewTask] = useState(false);
    const [newTaskData, setNewTaskData] = useState(null);

    const [oldTaskId, setOldTaskId] = useState(null);
    const [oldTask, setOldTask] = useState(false);

    const [editMode, setEditMode] = useState(false);
    const [editTask, setEditTask] = useState(null);

    const oldTaskHandler = (taskId) => {
        if (taskId) {
            setOldTaskId(taskId);
            setOldTask(true);
        } else {
            setOldTaskId(null);
            setOldTask(false);
        }
    };

    const newTaskHandler = (task) => {
        if (task) {
            setNewTaskData(task);
            setNewTask(true);
        } else {
            setNewTaskData(null);
            setNewTask(false);
        }
    };

    return (
        <OrganizeMeContext.Provider
            value={{
                // New Task Data
                newTaskData,
                newTaskHandler,
                newTask,
                setNewTask,
                setNewTaskData,
                // Old Task Data
                oldTask,
                setOldTask,
                oldTaskHandler,
                setOldTaskId,
                oldTaskId,
                // Edit task mode
                editTask,
                setEditTask,
                editMode,
                setEditMode
            }}
        >
            {children}
        </OrganizeMeContext.Provider>
    );
};

export default OrganizeMeProvider;
