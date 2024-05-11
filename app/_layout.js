import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Ionicons } from '@expo/vector-icons';




export default function Layout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer>
                <Drawer.Screen
                    name="index"
                    options={{
                        drawerLabel: 'Tasks',
                        headerShown: false,
                        drawerIcon: ({ size, color }) => (
                            <Ionicons name="documents-outline" size={size} color={color}/>
                        )
                    }}
                />
                <Drawer.Screen
                    name="history"
                    options={{
                        drawerLabel: 'History',
                        headerShown: false,
                        drawerIcon: ({ size, color }) => (
                            <Ionicons name="time-outline" size={size} color={color}/>
                        )
                    }}
                />
                <Drawer.Screen
                    name="about"
                    options={{
                        drawerLabel: 'About',
                        headerShown: false,
                        drawerIcon: ({ size, color }) => (
                            <Ionicons name="information-circle-outline" size={size} color={color}/>
                        )
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}
