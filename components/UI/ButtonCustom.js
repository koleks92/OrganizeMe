import { Pressable, StyleSheet, Text } from "react-native";


function ButtonCustom({ children, onPress }) {
    return (
        <Pressable onPress={onPress} style={styles.root}>
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
});
