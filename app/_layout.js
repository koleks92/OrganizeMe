import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { Colors } from "../constants/Colors";

const scrH = Dimensions.get("window").height;
const scrW = Dimensions.get("window").width;

const labelSize = scrH * 0.025;

export default function Layout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                screenOptions={{
                    drawerStyle: {
                        backgroundColor: Colors.mediumGreen,
                        width: scrW * 0.6,
                        borderRightWidth: 0.5,
                        borderRightColor: Colors.darkGreen,    
                    },
                    drawerLabelStyle: {
                        fontSize: labelSize,
                    },
                    drawerActiveTintColor: Colors.warmWhite,
                    drawerActiveBackgroundColor: Colors.darkGreen,
                    
                }}
            >
                <Drawer.Screen
                    name="index"
                    options={{
                        drawerLabel: "Tasks",
                        headerShown: false,
                        drawerIcon: ({color}) => (
                            <Ionicons
                                name="documents-outline"
                                size={labelSize * 1.2}
                                color={color}
                            />
                        ),
                        
                    }}
                />
                <Drawer.Screen
                    name="history"
                    options={{
                        drawerLabel: "History",
                        headerShown: false,
                        drawerIcon: ({ color }) => (
                            <Ionicons
                                name="time-outline"
                                size={labelSize * 1.2}
                                color={color}
                            />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="about"
                    options={{
                        drawerLabel: "About",
                        headerShown: false,
                        drawerIcon: ({ color }) => (
                            <Ionicons
                                name="information-circle-outline"
                                size={labelSize * 1.2}
                                color={color}
                            />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="add_task"
                    options={{
                        drawerItemStyle: { display: 'none'}
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}
