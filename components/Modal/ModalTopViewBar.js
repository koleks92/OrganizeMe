import { View, StyleSheet } from "react-native";

function ModalTopViewBar({children}) {
    return (
        <View style={styles.topViewBar}>
            {children}
        </View>
    )
};

export default ModalTopViewBar;

const styles = StyleSheet.create({
    topView: {
        flexDirection: "row",
        justifyContent: "space-between",
    }
})