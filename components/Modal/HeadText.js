import { Text, View } from "react-native";

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
