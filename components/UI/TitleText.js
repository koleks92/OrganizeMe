import { View, Text, StyleSheet } from "react-native";
import { Sizes } from "../../constants/Sizes";
import { Colors } from "../../constants/Colors";

function TitleText({ children }) {
    return (
        <View>
            <Text style={styles.text}>{children}</Text>
        </View>
    );
}

export default TitleText;

const styles = StyleSheet.create({
    text: {
        fontFamily: "RobotoMono",
        fontSize: Sizes.scrH * 0.03,
        fontWeight: "bold",
        color: Colors.darkGreen,
    },
});
