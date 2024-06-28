import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { Colors } from "../../constants/Colors";

function MenuButton({ size }) {
    return (
        <View>
            <Ionicons
                name="menu-outline"
                size={size}
                color={Colors.darkGreen}
            />
        </View>
    );
}

export default MenuButton;
