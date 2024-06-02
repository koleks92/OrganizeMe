import { View, Text, StyleSheet, Pressable } from "react-native";
import { Sizes } from "../../constants/Sizes";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withTiming,
} from "react-native-reanimated";
import { markTask } from "../../services/api";
import { useState } from "react";

function Task({ task, empty }) {
    const [markName, setMarkName] = useState("checkmark-circle-outline");

    // Task press handler
    const taskPressHandler = (task) => {
        console.log("Click " + task.id);
    };

    // Shared values
    const scale = useSharedValue(1);

    // Checkmark animation
    const checkmarkAnimation = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    // Checkmark press handler
    const checkmarkPressHandler = async (task) => {
        // Set task.completed
        let newCompleted;
        if (task.completed === true) {
            newCompleted = false;
        } else {
            newCompleted = true;
        }

        // Send API request to mark the task
        try {
            const response = await markTask(task.id, newCompleted);
            console.log(response);
            
            // Checkmark animation
            scale.value = withSequence(
                withTiming(1.2, { duration: 300 }),
                withTiming(
                    1,
                    { duration: 300 },
                    setMarkName("checkmark-circle")
                )
            );
        } catch (error) {
            console.error("Error: ", error);
        }
    };

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
                <Pressable
                    onPress={() => {
                        checkmarkPressHandler(task);
                    }}
                >
                    <Animated.View style={checkmarkAnimation}>
                        <Ionicons
                            name={markName}
                            size={Sizes.scrH * 0.04}
                            color={Colors.darkGreen}
                        />
                    </Animated.View>
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
        flex: 1,
    },
    text: {
        fontFamily: "RobotoMono",
        fontSize: Sizes.scrH * 0.025,
    },
});
