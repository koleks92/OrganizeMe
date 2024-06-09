import { createContext, useState } from "react";

export const OrganizeMeContext = createContext();

const OrganizeMeProvider = ({ children }) => {
    const [newTask, setNewTask] = useState(false);
    const [newTaskData, setNewTaskData] = useState(null)

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
        <OrganizeMeContext.Provider value={{ newTaskData, newTaskHandler, newTask, setNewTask, setNewTaskData }}>
            {children}
        </OrganizeMeContext.Provider>
    )
}

export default OrganizeMeProvider;