// History page with tasks that was marked as done

import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function History() {
    const navigation = useNavigation();
    const openDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };

    return (
        <SafeAreaView>
            <View>
                <Button onPress={openDrawer} title="Menu" />

                <Text>History</Text>
            </View>
        </SafeAreaView>
    );
}

export default History;
