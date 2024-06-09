import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { Sizes } from "../../constants/Sizes";

function TaskModal({ task }) {
    return (
        <View style={styles.shadowWrapper}>
            <View style={styles.root}>
                <Text>Yes</Text>
            </View>
        </View>
    );
}

export default TaskModal;

const styles = StyleSheet.create({
    shadowWrapper: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 6,
    },
    root: {
        borderWidth: 1,
        borderColor: Colors.darkGreen,
        borderRadius: Sizes.scrH * 0.015,
        width: Sizes.addTaskWidth,
        height: Sizes.addTaskHeight,
        backgroundColor: Colors.lightGreen,
        padding: Sizes.scrH * 0.01,
        elevation: 5
    },
});
