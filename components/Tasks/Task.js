import { View, Text, StyleSheet, Pressable, Modal } from "react-native";
import { Sizes } from "../../constants/Sizes";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withTiming,
    runOnJS,
} from "react-native-reanimated";
import { markTask } from "../../services/api";
import { useContext, useState } from "react";
import TaskModal from "./TaskModal";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { OrganizeMeContext } from "../../store/Context";

function Task({ task, empty, removedData }) {
    const [markName, setMarkName] = useState("checkmark-circle-outline");

    // Modal visible state
    const [modalVisible, setModalVisible] = useState(false);

    // Context
    const { setEditMode, setEditTask } = useContext(OrganizeMeContext);

    // Task press handler
    const taskPressHandler = () => {
        setModalVisible(true);
    };

    // Show/Close Modal
    const showCloseModal = () => {
        setModalVisible(false);
    };

    // Shared values
    const scale = useSharedValue(1); // Checkmark scale
    const translateX = useSharedValue(0); // Task root position X
    const height = useSharedValue(Sizes.taskSmallHeight); // Height of task container
    const marginVertical = useSharedValue(Sizes.taskVerticalMargin); // Margin vertial of task container
    const borderWidth = useSharedValue(1); // Border width of task container
    const opacity = useSharedValue(1);

    // Checkmark animation style
    const checkmarkAnimationStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    // Slideout animation style
    const slideoutAnimationStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
            height: height.value,
            marginVertical: marginVertical.value,
            borderWidth: borderWidth.value,
            opacity: opacity.value,
        };
    });

    // Checkmark animation
    const checkmarkAnimation = () => {
        scale.value = withSequence(
            withTiming(1.2, { duration: 300 }),
            withTiming(1, { duration: 300 }, () => {
                runOnJS(setMarkName)("checkmark-circle");
                runOnJS(slideoutAnimation)();
            })
        );
    };

    // Slideout animation
    const slideoutAnimation = () => {
        opacity.value = withTiming(0);

        translateX.value = withSequence(
            withTiming(-10, { duration: 100 }),
            withTiming(600, { duration: 600 })
        );

        marginVertical.value = withTiming(0);

        height.value = withSequence(
            withTiming(0, { duration: 1000 }, () => {
                runOnJS(removedData)(task.id);
            })
        );
        borderWidth.value = withTiming(0);
    };

    // Checkmark press handler
    const checkmarkPressHandler = async (task) => {
        // Set task.completed
        let newCompleted;
        if (task.completed === true) {
            newCompleted = false;
        } else {
            newCompleted = true;
        }

        checkmarkAnimation();

        // Send API request to mark the task
        try {
            const response = await markTask(task.id, newCompleted);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    // Edit handler
    const editHandler = () => {
        showCloseModal();
        setEditTask(task);
        setEditMode(true);
    };

    // Checkmark component
    let checkmark = (
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
    );

    // History mode
    if (task) {
        if (task.completed) {
            checkmark = <></>;
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
            <>
                {/* Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <SafeAreaProvider>
                        <SafeAreaView>
                            <View style={styles.modalView}>
                                <TaskModal
                                    task={task}
                                    closeModal={showCloseModal}
                                    slideOutAnimation={slideoutAnimation}
                                    edit={editHandler}
                                />
                            </View>
                        </SafeAreaView>
                    </SafeAreaProvider>
                </Modal>
                {/* Task view */}
                <Animated.View style={[styles.root, slideoutAnimationStyle]}>
                    <Pressable
                        style={styles.namePressable}
                        onPress={() => {
                            taskPressHandler(task);
                        }}
                    >
                        <Text
                            style={styles.text}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {task.name}
                        </Text>
                    </Pressable>
                    {checkmark}
                </Animated.View>
            </>
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
    modalView: {
        flex: 1,
        marginTop: Sizes.topOptionsHeight,
        alignItems: "center",
    },
});
