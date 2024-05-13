import { Pressable, Text} from "react-native";

function ButtonCustom({children, onPress}) {
    return (
        <Pressable onPress={onPress}>
            <Text>{children}</Text>
        </Pressable>
    )
}

export default ButtonCustom;

