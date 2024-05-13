// About page with information about app and developer

import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Background from "../components/UI/Background";
import ButtonCustom from "../components/UI/ButtonCustom";
import Top from "../components/UI/Top";
import MenuButton from "../components/UI/MenuButton";
import { Sizes } from "../constants/Sizes";


function About() {
    const navigation = useNavigation();
    const openDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };

    return (
        <Background>
            <SafeAreaView>
                <Top>
                    <ButtonCustom onPress={openDrawer}>
                        <MenuButton size={Sizes.topButtonSize} />
                    </ButtonCustom>
                </Top>
                <Text>About</Text>
            </SafeAreaView>
        </Background>
    );
}

export default About;
