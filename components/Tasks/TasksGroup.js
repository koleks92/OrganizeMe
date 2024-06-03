import { View, Text, StyleSheet, Pressable } from "react-native";
import Task from "./Task";
import { Colors } from "../../constants/Colors";
import { Sizes } from "../../constants/Sizes";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
} from "react-native-reanimated";

function TaskGroup({ type, tasks }) {
    const [tasksOpen, setTasksOpen] = useState(false);

    // Share values for tasksView animation
    const rotation = useSharedValue(0);
    const height = useSharedValue(0);
    const padding = useSharedValue(0);
    const visible = useSharedValue(0);

    // Tasks length
    let tasksLength = tasks.length;

    // Animation
    const rotationStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${rotation.value}deg` }],
        };
    });

    const slidingStyle = useAnimatedStyle(() => {
        return {
            height: height.value,
            overflow: "hidden",
            padding: padding.value,
            visible: visible.value,
        };
    });

    // Calculate correct height of the tasksViewContainer
    let heightMax =
        Sizes.taskSmallHeight * (tasksLength == 0 ? 1 : tasksLength) +
        2 * Sizes.tasksViewMP +
        Sizes.taskHorizontalMargin * (tasksLength == 0 ? 0 : tasksLength * 2);

    const removedData = (data) => {
        if (data == true) {
            handleRemoveOneTask();
        }
    };

    // Create a component with tasks to render
    let tasksToRender;

    if (tasksLength === 0) {
        tasksToRender = <Task empty={true} removedData={removedData} />;
    } else {
        tasksToRender = tasks.map((task) => {
            return <Task task={task} key={task.id} removedData={removedData} />;
        });
    }

    // FIX WHEN NO TASKS

    // Handle remove on task
    const handleRemoveOneTask = () => {
        tasksLength = tasksLength - 1;

        if (tasksLength === 0) {
            tasksToRender = <Task empty={true} removedData={removedData} />;
        }

        // Calculate correct height of the tasksViewContainer
        let heightMax =
            Sizes.taskSmallHeight * (tasksLength == 0 ? 1 : tasksLength) +
            2 * Sizes.tasksViewMP +
            Sizes.taskHorizontalMargin *
                (tasksLength == 0 ? 0 : tasksLength * 2);

        height.value = withTiming(heightMax, {duration: 1000})
    };

    // Open Tasks Handler
    const handleOpenTasks = () => {
        setTasksOpen(!tasksOpen);

        if (tasksOpen) {
            rotation.value = withSpring(0);
            height.value = withTiming(0);
            padding.value = withSpring(0);
        } else if (!tasksOpen) {
            rotation.value = withSpring(180);
            height.value = withSpring(heightMax);
            padding.value = withSpring(Sizes.tasksViewMP);
        }
    };

    return (
        <View>
            <Pressable
                style={styles.typeView}
                onPress={() => handleOpenTasks()}
            >
                <View>
                    <Text style={styles.typeTitle}>{type}</Text>
                </View>
                <Animated.View style={rotationStyle}>
                    <Ionicons
                        name="chevron-up-outline"
                        size={Sizes.scrH * 0.03}
                        color={Colors.darkGreen}
                    />
                </Animated.View>
            </Pressable>
            <View>
                <Animated.View style={[styles.tasksView, slidingStyle]}>
                    {tasksToRender}
                </Animated.View>
            </View>
        </View>
    );
}

export default TaskGroup;

const styles = StyleSheet.create({
    typeView: {
        marginHorizontal: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5,
        zIndex: 2,
        flexDirection: "row",
        borderColor: Colors.darkGreen,
        borderWidth: 1,
        borderRadius: Sizes.scrH * 0.015,
        padding: Sizes.scrH * 0.015,
        backgroundColor: Colors.mediumGreen,
        justifyContent: "space-between",
        alignItems: "center",
    },
    typeTitle: {
        fontFamily: "RobotoMono",
        fontWeight: "bold",
        fontSize: Sizes.scrH * 0.03,
        color: Colors.warmWhite,
    },
    tasksView: {
        top: -1,
        zIndex: 0,
        marginHorizontal: Sizes.scrW * 0.03,
        marginBottom: Sizes.tasksViewMP,
    },
});
