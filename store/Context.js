import { createContext, useState } from "react";

export const OrganizeMeContext = createContext();

const OrganizeMeProvider = ({ children }) => {
    const [newTask, setNewTask] = useState(false);
    const [newTaskData, setNewTaskData] = useState(null);

    const [oldTaskId, setOldTaskId] = useState(null);
    const [oldTask, setOldTask] = useState(false);

    const oldTaskHandler = (taskId) => {
        if (taskId) {
            setOldTaskId(taskId);
            setOldTask(true);
        } else {
            setOldTaskId(null);
            setOldTask(false);
        }
    }

    const newTaskHandler = (task) => {
        if (task) {
            setNewTaskData(task);
            setNewTask(true);
        } else {
            setNewTaskData(null);
            setNewTask(false);
        }
    } 

    return (
        <OrganizeMeContext.Provider value={{ newTaskData, newTaskHandler, newTask, setNewTask, setNewTaskData,
            oldTask, setOldTask, oldTaskHandler, setOldTaskId, oldTaskId
         }}>
            {children}
        </OrganizeMeContext.Provider>
    )
}

export default OrganizeMeProvider;