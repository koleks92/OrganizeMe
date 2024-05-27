import { View, Text, StyleSheet } from "react-native"

function Task() {
    return (
        <View style={styles.taskSmallHeight}>
            <Text>Task</Text>
        </View>
    )
};

export default Task;

const styles=StyleSheet.create({
    root: {
        height: Sizes.taskSmallHeight
    }
})