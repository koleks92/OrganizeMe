import { Pressable, StyleSheet, Text, Dimensions} from "react-native";

const scrW = Dimensions.get("screen").width

function ButtonCustom({children, onPress}) {
    return (
        <Pressable onPress={onPress}>
            <Text>{children}</Text>
        </Pressable>
    )
}

export default ButtonCustom;
