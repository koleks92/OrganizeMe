import { View, Text, StyleSheet } from "react-native";
import { Sizes } from "../../constants/Sizes";

function Task({ task, empty }) {
    if (empty) {
        return (
            <View style={styles.root}>
                <Text>There are not tasks :(</Text>
            </View>
        );
    } else {
        return (
            <View style={styles.root}>
                <Text>{task.name}</Text>
            </View>
        );
    }
}

export default Task;

const styles = StyleSheet.create({
    root: {
        height: Sizes.taskSmallHeight,
    },
});
