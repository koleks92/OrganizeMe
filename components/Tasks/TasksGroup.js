import { View, Text, StyleSheet, Pressable } from "react-native";
import Task from "./Task";
import { Colors } from "../../constants/Colors";
import { Sizes } from "../../constants/Sizes";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState, useCallback } from "react";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
} from "react-native-reanimated";

function TaskGroup({ type, initialTasks }) {
    const [tasksOpen, setTasksOpen] = useState(false);
    const [tasks, setTasks] = useState(initialTasks);
    const [tasksToRender, setTasksToRender] = useState([]);

    // Shared values for tasksView animation
    const rotation = useSharedValue(0);
    const height = useSharedValue(0);
    const padding = useSharedValue(0);

    // Calcluate maximum height of the tasks view container
    const calculateHeightMax = useCallback((length) => {
        return (
            Sizes.taskSmallHeight * (length === 0 ? 1 : length) +
            Sizes.tasksViewMP +
            Sizes.taskVerticalMargin * (length === 0 ? 0 : length * 2)
        );
    }, []);

    // Create array of tasks to render
    const createTasksToRender = useCallback((tasks) => {
        if (tasks.length === 0) {
            setTasksToRender([<Task empty={true} key="empty" />]);
        } else {
            setTasksToRender(tasks.map((task) => (
                <Task task={task} key={task.id} removedData={removedData} />
            )));
        }
    }, [removedData]);

    // Remove one task from array/state
    const removedData = useCallback((taskId) => {
        setTasks((prevTasks) => {
            const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
            createTasksToRender(updatedTasks);
            return updatedTasks;
        });
    }, []);

    // Create new array of tasks to render, when tasks state changes
    useEffect(() => {
        createTasksToRender(tasks);

        if (tasksOpen) {
            const heightMax = calculateHeightMax(tasks.length);
            height.value = withTiming(heightMax, {duration: 1000});
        }
    }, [tasks]);

    // Animation styles
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
        };
    });

    // Open/Close tasks accordion
    const handleOpenTasks = () => {
        setTasksOpen(!tasksOpen);

        if (tasksOpen) {
            rotation.value = withSpring(0);
            height.value = withTiming(0);
            padding.value = withSpring(0);
        } else {
            const heightMax = calculateHeightMax(tasks.length);
            rotation.value = withSpring(180);
            height.value = withTiming(heightMax);
            padding.value = withSpring(Sizes.tasksViewMP);
        }
    };

    return (
        <View>
            <Pressable
                style={styles.typeView}
                onPress={handleOpenTasks}
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
        borderWidth: 0,
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
        zIndex: 3,
        marginHorizontal: Sizes.scrW * 0.03,
        marginBottom: Sizes.tasksViewMP,
    },
});
