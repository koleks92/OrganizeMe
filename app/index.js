// Task/Index page with tasks to do

import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { Modal, StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Background from "../components/UI/Background";
import { useState } from "react";
import AddTask from "../components/AddTask/AddTask";
import ButtonCustom from "../components/UI/ButtonCustom";
import Top from "../components/UI/Top";
import MenuButton from "../components/UI/MenuButton";
import { Sizes } from "../constants/Sizes";
import { Ionicons } from "@expo/vector-icons";
import AllTasks from "../components/Tasks/AllTasks";
import { Colors } from "../constants/Colors";
import { useFonts } from "expo-font";

function Index() {
    // Load fonts
    const [fontsLoaded, fontError] = useFonts({
        RobotoMono: require("../assets/fonts/Roboto_Mono/RobotoMono.ttf"),
    });

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

    // Render loading or error state if fonts are not loaded
    if (!fontsLoaded) {
        return (
            <View style={styles.loadingView}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (fontError) {
        return (
            <View style={styles.loadingView}>
                <Text>Error loading fonts</Text>
            </View>
        );
    }

    return (
        <Background>
            <SafeAreaView>
                {/* Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <SafeAreaProvider>
                        <SafeAreaView>
                            <View style={styles.modalView}>
                                <AddTask closeModal={showCloseModal} />
                            </View>
                        </SafeAreaView>
                    </SafeAreaProvider>
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
                            color={Colors.darkGreen}
                        />
                    </ButtonCustom>
                </Top>
                {/* All Tasks Component */}
                <AllTasks />
            </SafeAreaView>
        </Background>
    );
}

export default Index;

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        marginTop: Sizes.topOptionsHeight,
        alignItems: "center",
    },
    loadingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
