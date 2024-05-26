import { View, Text } from "react-native";
import Task from "./Task";

function TaskGroup({type, tasks}) {

    const tasksToRender = tasks.map((task) => {
        return (
            <Task task={task} key={task.id} />
        )
    })
    

    return (
        <View>
            <Text>{type}</Text>
            {tasksToRender}
        </View>
    );
}

export default TaskGroup;