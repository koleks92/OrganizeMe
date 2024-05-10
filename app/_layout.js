import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function Layout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer>
                <Drawer.Screen
                    name="index"
                    options={{
                        drawerLabel: 'Tasks',
                        headerShown: false
                    }}
                />
                <Drawer.Screen
                    name="history"
                    options={{
                        drawerLabel: 'History',
                        headerShown: false
                    }}
                />
                <Drawer.Screen
                    name="about"
                    options={{
                        drawerLabel: 'About',
                        headerShown: false
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}
