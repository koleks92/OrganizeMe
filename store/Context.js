import { createContext, useState } from "react";

export const OrganizeMeContext = createContext();

const OrganizeMeProvider = ({ children }) => {
    const [taskContext, setTaskContext] = useState();

    return (
        <OrganizeMeContext.Provider value={{ taskContext, setTaskContext }}>
            {children}
        </OrganizeMeContext.Provider>
    )
}

export default OrganizeMeProvider;