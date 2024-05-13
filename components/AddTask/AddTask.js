// Add task for index modal 

import { View, Text, Button } from "react-native";

function AddTask({closeModal}) {
    return (
        <View>
            <Text>Add New Task</Text>
            <Button onPress={closeModal} title="Close Modal" />
        </View>
    );
}

export default AddTask;
