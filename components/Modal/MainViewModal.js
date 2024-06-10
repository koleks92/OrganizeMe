import { View } from "react-native";

function MainViewModal({children}) {
    return (
        <View style={styles.root}>
            {children}
        </View>
    )
}

export default MainViewModal;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        margin: Sizes.scrH * 0.02,
        justifyContent: "center",
    }
})