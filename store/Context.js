import { createContext, useState } from "react";

export const OrganizeMeContext = createContext();

const OrganizeMeProvider = ({ children }) => {
    const [newTaskData, setNewTaskData] = useState();
    const [newTask, setNewTask] = useState(false);

    return (
        <OrganizeMeContext.Provider value={{ newTaskData, setNewTaskData, newTask, setNewTask }}>
            {children}
        </OrganizeMeContext.Provider>
    )
}

export default OrganizeMeProvider;