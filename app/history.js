import { DrawerActions, useIsFocused } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Background from "../components/UI/Background";
import ButtonCustom from "../components/UI/ButtonCustom";
import Top from "../components/UI/Top";
import MenuButton from "../components/UI/MenuButton";
import { Sizes } from "../constants/Sizes";
import AllTasks from "../components/Tasks/AllTasks";
import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";

function History() {
    // Focused view
    const isFocused = useIsFocused();

    const [focused, setFocused] = useState(false);

    useEffect(() => {
        setFocused(isFocused);
    }, [isFocused]);

    // Open side menu
    const navigation = useNavigation();
    const openDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };

    return (
        <Background>
            <SafeAreaView style={styles.safeArea}>
                <Top>
                    <ButtonCustom onPress={openDrawer}>
                        <MenuButton size={Sizes.topButtonSize} />
                    </ButtonCustom>
                </Top>
                <View style={styles.allTasksContainer}>
                    <AllTasks focused={focused} history={true} />
                </View>
            </SafeAreaView>
        </Background>
    );
}

export default History;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    allTasksContainer: {
        flex: 1,
    },
});
