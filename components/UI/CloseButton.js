import { Colors } from "../../constants/Colors";
import { Sizes } from "../../constants/Sizes";
import ButtonCustom from "./ButtonCustom";
import { Ionicons } from "@expo/vector-icons";

function CloseButton({ onPress }) {
    return (
        <ButtonCustom onPress={onPress}>
            <Ionicons
                name="close-circle-outline"
                size={Sizes.topButtonSize}
                color={Colors.darkGreen}
            />
        </ButtonCustom>
    );
}
export default CloseButton;


