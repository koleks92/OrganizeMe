import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";


function MenuButton({ size }) {
    return (
        <View>
            <Ionicons name="menu-outline" size={size}/>
        </View>
    );
}

export default MenuButton;
