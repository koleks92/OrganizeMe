// History page with tasks that was marked as done

import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { Text, Dimensions} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Background from "../components/UI/Background";
import ButtonCustom from "../components/UI/ButtonCustom";
import Top from "../components/UI/Top";
import MenuButton from "../components/UI/MenuButton";

const scrH = Dimensions.get("screen").height;

function History() {
    const navigation = useNavigation();
    const openDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };

    // Buttons size
    const buttonSize = scrH * 0.04;

    return (
        <Background>
            <SafeAreaView>
                <Top>
                    <ButtonCustom onPress={openDrawer}>
                        <MenuButton size={buttonSize} />
                    </ButtonCustom>
                </Top>
                <Text>History</Text>
            </SafeAreaView>
        </Background>
    );
}

export default History;
