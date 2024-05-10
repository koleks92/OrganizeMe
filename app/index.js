// Task/Index page with tasks to do

import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Index() {
    const navigation = useNavigation();
    const openDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };

    return (
        <SafeAreaView>
            <View>
                <Button onPress={openDrawer} title="Menu" />

                <Text>Tasks</Text>
            </View>
        </SafeAreaView>
    );
}

export default Index;
