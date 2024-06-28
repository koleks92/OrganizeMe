import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/Colors";

function Loading({ error }) {
    if (error) {
        return (
            <View style={styles.loadingView}>
                <Text>Error loading !</Text>
            </View>
        );
    }
    return (
        <View style={styles.loadingView}>
            <ActivityIndicator size="large" color={Colors.darkGreen} />
        </View>
    );
}

export default Loading;

const styles = StyleSheet.create({
    loadingView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
