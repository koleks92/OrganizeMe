import { View, Text, StyleSheet, Pressable } from "react-native";
import Task from "./Task";
import { Colors } from "../../constants/Colors";
import { Sizes } from "../../constants/Sizes";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
} from "react-native-reanimated";

function TaskGroup({ type, initialTasks }) {
    const [tasksOpen, setTasksOpen] = useState(false);
    const [tasks, setTasks] = useState(initialTasks);

    // Share values for tasksView animation
    const rotation = useSharedValue(0);
    const height = useSharedValue(0);
    const padding = useSharedValue(0);
    const visible = useSharedValue(0);

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
        Sizes.taskSmallHeight * (tasks.length == 0 ? 1 : tasks.length) +
        Sizes.tasksViewMP +
        Sizes.taskVerticalMargin * (tasks.length == 0 ? 0 : tasks.length * 2);

    // Remove one task handler
    const removeOneTaskHandler = (data) => {
        setTasks((prevTasks) => {
            const updatedTasks = prevTasks.filter((task) => task.id !== data);
            return updatedTasks;
        });
        if ((tasks.length - 1) == 0) {
            return;
        } else {
            height.value = withTiming(heightMax - (Sizes.taskSmallHeight + Sizes.taskVerticalMargin), {duration: 1000})
        }
        
    };

    const removedData = (data) => {
        removeOneTaskHandler(data);
    };

    // Create a component with tasks to render
    let tasksToRender;

    if (tasks.length == 0) {
        tasksToRender = <Task empty={true} />;
    } else {
        tasksToRender = tasks.map((task) => {
            return <Task task={task} key={task.id} removedData={removedData} />;
        });
    }

    // FIX WHEN NO TASKS

    // Open Tasks Handler
    const handleOpenTasks = () => {
        setTasksOpen(!tasksOpen);

        if (tasksOpen) {
            rotation.value = withSpring(0);
            height.value = withTiming(0);
            padding.value = withSpring(0);
        } else if (!tasksOpen) {
            rotation.value = withSpring(180);
            height.value = withTiming(heightMax);
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
        zIndex: 3,
        marginHorizontal: Sizes.scrW * 0.03,
        marginBottom: Sizes.tasksViewMP,
    },
});
