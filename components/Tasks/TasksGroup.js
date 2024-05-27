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
    withTiming
} from "react-native-reanimated";

function TaskGroup({ type, tasks }) {
    const [tasksOpen, setTasksOpen] = useState(false);

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
            overflow: 'hidden',
            padding: padding.value,
            visible: visible.value
        };
    });

    // Create a component with tasks to render
    let tasksToRender;

    if (tasks.length === 0) {
        tasksToRender = <Task empty={true} />;
    } else {
        tasksToRender = tasks.map((task) => {
            return <Task task={task} key={task.id} />;
        });
    }

    // Calculate correct height of the tasksViewContainer
    const heightMax =
        Sizes.taskSmallHeight * (tasks.length == 0 ? 1 : tasks.length) + 2 * Sizes.tasksViewMP;

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
        <View style={styles.shadowWrapper}>
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
    shadowWrapper: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 6,
    },
    typeView: {
        zIndex: 2,
        flexDirection: "row",
        borderColor: Colors.darkGreen,
        borderWidth: 1,
        borderRadius: Sizes.scrH * 0.015,
        padding: Sizes.scrH * 0.015,
        backgroundColor: Colors.mediumGreen,
        elevation: 5,
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
        borderColor: Colors.darkGreen,
        borderWidth: 1,
        borderTopWidth: 0,
        borderBottomLeftRadius: Sizes.scrH * 0.015,
        borderBottomRightRadius: Sizes.scrH * 0.015,
        marginHorizontal: Sizes.scrW * 0.03,
        marginBottom: Sizes.tasksViewMP,
        backgroundColor: Colors.lightGreen,
    },
});
