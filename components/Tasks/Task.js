import { View, Text, StyleSheet, Pressable } from "react-native";
import { Sizes } from "../../constants/Sizes";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withTiming,
    withSpring,
    runOnJS,
} from "react-native-reanimated";
import { markTask } from "../../services/api";
import { useEffect, useState } from "react";

function Task({ task, empty, removedData }) {
    const [markName, setMarkName] = useState("checkmark-circle-outline");
    const [removed, setRemoved] = useState(false);

    // Task press handler
    const taskPressHandler = (task) => {
        console.log("Click " + task.id);
    };

    if (!empty) {
        if (removed) {
            removedData(task.id);
        }
    }

    // Shared values
    const scale = useSharedValue(1); // Checkmark scale
    const translateX = useSharedValue(0); // Task root position X
    const height = useSharedValue(Sizes.taskSmallHeight);

    // Checkmark animation style
    const checkmarkAnimationStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    const slideoutAnimationStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
            height: height.value,
        };
    });

    // Checkmark animation
    const checkmarkAnimation = () => {
        scale.value = withSequence(
            withTiming(1.2, { duration: 300 }),
            withTiming(1, { duration: 300 }, () => {
                runOnJS(setMarkName)("checkmark-circle");
                runOnJS(slideoutAnimation)();
                runOnJS(setRemoved)(true);
            })
        );
    };

    // Slideout animation
    const slideoutAnimation = () => {
        translateX.value = withSequence(
            withTiming(-10, { duration: 100 }),
            withTiming(1000, { duration: 900 })
        );
        height.value = withTiming(0, { duration: 1000 });
    };

    // Checkmark press handler
    const checkmarkPressHandler = async (task) => {
        // // Set task.completed
        // let newCompleted;
        // if (task.completed === true) {
        //     newCompleted = false;
        // } else {
        //     newCompleted = true;
        // }

        checkmarkAnimation();

        // // Send API request to mark the task
        // try {
        //     const response = await markTask(task.id, newCompleted);

        //     // Checkmark animation
        //     scale.value = withSequence(
        //         withTiming(1.2, { duration: 300 }),
        //         withTiming(
        //             1,
        //             { duration: 300 },
        //             setMarkName("checkmark-circle")
        //         )
        //     );

        //
        // } catch (error) {
        //     console.error("Error: ", error);
        // }
    };

    if (empty) {
        return (
            <View style={[styles.root, styles.empty]}>
                <Text style={styles.text}>There are no tasks :(</Text>
            </View>
        );
    } else {
        return (
            <Animated.View style={[styles.root, slideoutAnimationStyle]}>
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
                    <Animated.View style={checkmarkAnimationStyle}>
                        <Ionicons
                            name={markName}
                            size={Sizes.scrH * 0.04}
                            color={Colors.darkGreen}
                        />
                    </Animated.View>
                </Pressable>
            </Animated.View>
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
        marginVertical: Sizes.taskVerticalMargin,
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
