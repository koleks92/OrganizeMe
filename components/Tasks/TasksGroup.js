import { View, Text } from "react-native";

function TaskGroup({type, tasks}) {
    console.log(tasks)

    return (
        <View>
            <Text>{type}</Text>
        </View>
    );
}

export default TaskGroup;