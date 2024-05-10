// About page with information about app and developer

import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function About() {
    const navigation = useNavigation();
    const openDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };

    return (
        <SafeAreaView>
            <View>
                <Button onPress={openDrawer} title="Menu" />
                <Text>About</Text>
            </View>
        </SafeAreaView>
    );
}

export default About;
