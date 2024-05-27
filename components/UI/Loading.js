import { View, ActivityIndicator } from "react-native";
import { Colors } from "../../constants/Colors";

function Loading() {
    return (
        <View style={styles.loadingView}>
            <ActivityIndicator size="large" color={Colors.darkGreen} />
        </View>
    )
}

export default Loading;

const styles = StyleSheet.create({
    loadingView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})