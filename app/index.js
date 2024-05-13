// Task/Index page with tasks to do

import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Background from "../components/background/background";

function Index() {
    const navigation = useNavigation();
    const openDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };

    return (
        <Background>
            <SafeAreaView>
                <Button onPress={openDrawer} title="Menu" />
                <Text>Tasks</Text>
            </SafeAreaView>
        </Background>
    );
}

export default Index;
