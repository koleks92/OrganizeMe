import { Pressable, StyleSheet, Text } from "react-native";


function ButtonCustom({ children, onPress, history }) {
    let disabled = false; 
    if (history) {
        disabled = true;
    }

    return (
        <Pressable onPress={onPress} style={[styles.root, disabled && styles.disabled]} disabled={disabled}>
            <Text>{children}</Text>
        </Pressable>
    );
}

export default ButtonCustom;

const styles = StyleSheet.create({
    root: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
    },
    disabled: {
        opacity: 0
    }
});
