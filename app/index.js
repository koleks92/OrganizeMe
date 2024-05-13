// Task/Index page with tasks to do

import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { Text, Modal, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Background from "../components/UI/Background";
import { useState } from "react";
import AddTask from "../components/AddTask/AddTask";
import ButtonCustom from "../components/UI/ButtonCustom";
import Top from "../components/UI/Top";
import MenuButton from "../components/UI/MenuButton";
import { Sizes } from "../constants/Sizes";
import { Ionicons } from "@expo/vector-icons";
import AllTasks from "../components/Tasks/AllTasks";

function Index() {
    // Add task modal visible state
    const [modalVisible, setModalVisible] = useState(false);

    const navigation = useNavigation();

    // Open side menu
    const openDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };

    // Show/Close modal prop
    const showCloseModal = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <Background>
            <SafeAreaView style={styles.root}>
                {/* Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={styles.modalView}>
                        <AddTask closeModal={showCloseModal} />
                    </View>
                </Modal>
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
                        />
                    </ButtonCustom>
                </Top>
                    <AllTasks />
            </SafeAreaView>
        </Background>
    );
}

export default Index;

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
