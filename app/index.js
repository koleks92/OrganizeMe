// Task/Index page with tasks to do

import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { Text, Modal, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Background from "../components/UI/Background";
import { useState } from "react";
import AddTask from "../components/AddTask/AddTask";
import ButtonCustom from "../components/UI/ButtonCustom";
import Top from "../components/UI/Top";
import MenuButton from "../components/UI/MenuButton";

const scrH = Dimensions.get("screen").height;

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

    // Buttons size
    const buttonSize = scrH * 0.04

    return (
        <Background>
            <SafeAreaView>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <AddTask closeModal={showCloseModal} />
                </Modal>
                <Top>
                    <ButtonCustom onPress={openDrawer}><MenuButton size={buttonSize}/></ButtonCustom>
                    <ButtonCustom onPress={showCloseModal}>
                        AddTask
                    </ButtonCustom>
                </Top>

                <Text>Tasks</Text>
            </SafeAreaView>
        </Background>
    );
}

export default Index;
