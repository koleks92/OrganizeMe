// About page with information about app and developer

import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Background from "../components/UI/Background";
import ButtonCustom from "../components/UI/ButtonCustom";
import Top from "../components/UI/Top";

function About() {
    const navigation = useNavigation();
    const openDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };

    return (
        <Background>
            <SafeAreaView>
                <Top>
                    <ButtonCustom onPress={openDrawer}>Menu</ButtonCustom>
                </Top>
                <Text>About</Text>
            </SafeAreaView>
        </Background>
    );
}

export default About;
