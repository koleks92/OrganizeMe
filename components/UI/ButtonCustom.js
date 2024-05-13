import { Pressable, StyleSheet, Text, Dimensions} from "react-native";

const scrW = Dimensions.get("screen").width

function ButtonCustom({children, onPress}) {
    return (
        <Pressable onPress={onPress} style={styles.root}>
            <Text>{children}</Text>
        </Pressable>
    )
}

export default ButtonCustom;

const styles = StyleSheet.create({
    root: {
        marginHorizontal: scrW * 0.04 
    }
})