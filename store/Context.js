import { createContext, useState } from "react";
import { setShouldAnimateExitingForTag } from "react-native-reanimated/lib/typescript/reanimated2/core";

const OrganizeMeContext = createContext();

const OrganizeMeProvider = ({ children }) => {
    const [task, setTask] = useState();

    return (
        <OrganizeMeContext.Provider value={{ taskContext, setTaskContext }}>
            {children}
        </OrganizeMeContext.Provider>
    )
}

export default OrganizeMeContext;