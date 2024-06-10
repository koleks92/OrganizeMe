import { Text, View, StyleSheet } from "react-native";
import { Sizes } from "../../constants/Sizes";
import { Colors } from "../../constants/Colors";

function HeadText({ children }) {
    return (
        <View style={styles.headTextView}>
            <Text style={styles.headText}>{children}</Text>
        </View>
    );
}

export default HeadText;

const styles = StyleSheet.create({
    headText: {
        fontSize: Sizes.scrH * 0.03,
        fontFamily: "RobotoMono",
        fontWeight: "bold",
        color: Colors.warmWhite,
    },
    headTextView: {
        justifyContent: "center",
        alignItems: "center",
    },
});
