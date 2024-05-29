import { View, Text, StyleSheet, Pressable } from "react-native";
import { Sizes } from "../../constants/Sizes";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Animated, {useSharedValue} from "react-native-reanimated";
import { markTask } from "../../services/api";

function Task({ task, empty }) {
    // Task press handler
    const taskPressHandler = (task) => {
        console.log("Click " + task.id);
    };

    // Checkmark press handler
    const checkmarkPressHandler = async (task) => {
        let newCompleted;
        if (task.completed === true ) {
            newCompleted = false;
        } else {
            newCompleted = true;
        }
        try {
            const response = await markTask(task.id, newCompleted);
            console.log(response);
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    if (empty) {
        return (
            <View style={[styles.root, styles.empty]}>
                <Text style={styles.text}>There are no tasks :(</Text>
            </View>
        );
    } else {
        return (
            <View style={styles.root}>
                <Pressable
                    style={styles.namePressable}
                    onPress={() => {
                        taskPressHandler(task);
                    }}
                >
                    <Text style={styles.text}>{task.name}</Text>
                </Pressable>
                <Pressable onPress={() => {
                        checkmarkPressHandler(task);
                    }}>  
                    <Ionicons
                        name="checkmark-circle-outline"
                        size={Sizes.scrH * 0.03}
                        color={Colors.darkGreen}
                    />
                </Pressable>
            </View>
        );
    }
}

export default Task;

const styles = StyleSheet.create({
    root: {
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        marginVertical: Sizes.taskHorizontalMargin,
        height: Sizes.taskSmallHeight,
        borderColor: Colors.darkGreen,
        borderWidth: 1,
        borderRadius: Sizes.scrW * 0.02,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: Colors.warmWhite,
        paddingHorizontal: Sizes.tasksViewMP,
    },
    empty: {
        borderWidth: 0,
        backgroundColor: "transparent",
        elevation: 0,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
    },
    namePressable: {
        flex: 1
    },  
    text: {
        fontFamily: "RobotoMono",
        fontSize: Sizes.scrH * 0.025,
    },
});
