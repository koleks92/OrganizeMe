// Task/Index page with tasks to do

import { DrawerActions, useIsFocused } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { Modal, StyleSheet, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Background from "../components/UI/Background";
import { useContext, useEffect, useState } from "react";
import AddTaskModal from "../components/Tasks/AddTaskModal";
import ButtonCustom from "../components/UI/ButtonCustom";
import Top from "../components/UI/Top";
import MenuButton from "../components/UI/MenuButton";
import { Sizes } from "../constants/Sizes";
import { Ionicons } from "@expo/vector-icons";
import AllTasks from "../components/Tasks/AllTasks";
import { Colors } from "../constants/Colors";
import { useFonts } from "expo-font";
import Loading from "../components/UI/Loading";
import { OrganizeMeContext } from "../store/Context";

function Index() {
    // Context for edit mode
    const { editMode, editTask, setEditMode, setEditTask } =
        useContext(OrganizeMeContext);
    const [task, setTask] = useState(null);

    // Load fonts
    const [fontsLoaded, fontError] = useFonts({
        RobotoMono: require("../assets/fonts/Roboto_Mono/RobotoMono.ttf"),
    });

    // Focused view
    const isFocused = useIsFocused();

    const [focused, setFocused] = useState(false);

    useEffect(() => {
        setFocused(isFocused);
    }, [isFocused]);

    // Edit mode setter
    useEffect(() => {
        if (editMode == true) {
            setTask(editTask);
            showCloseModal();
        }
    }, [editMode]);

    // Add task modal visible state
    const [modalVisible, setModalVisible] = useState(false);

    const navigation = useNavigation();

    // Open side menu
    const openDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };

    // Show/Close modal prop
    const showCloseModal = () => {
        if (editMode && modalVisible) {
            setEditMode(false);
            setEditTask(null);
        }
        setModalVisible(!modalVisible);
    };

    // Render loading or error state if fonts are not loaded
    if (!fontsLoaded) {
        return <Loading />;
    }

    if (fontError) {
        return <Loading error={true} />;
    }

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
                            <AddTaskModal
                                closeModal={showCloseModal}
                                task={task}
                                edit={editMode}
                            />
                        </View>
                    </SafeAreaView>
                </SafeAreaProvider>
            </Modal>
            {/* Index view */}
            <Background>
                <SafeAreaView>
                    <Top>
                        {/*  Side menu */}
                        <ButtonCustom onPress={openDrawer}>
                            <MenuButton size={Sizes.topButtonSize} />
                        </ButtonCustom>
                        {/* Add task */}
                        <ButtonCustom onPress={showCloseModal}>
                            <Ionicons
                                name="add-circle-outline"
                                size={Sizes.topButtonSize}
                                color={Colors.darkGreen}
                            />
                        </ButtonCustom>
                    </Top>
                    {/* All Tasks Component */}
                    <AllTasks focused={focused} />
                </SafeAreaView>
            </Background>
        </>
    );
}

export default Index;

const styles = StyleSheet.create({
    modalView: {
        marginTop: Sizes.topOptionsHeight,
        alignItems: "center",
    },
});
