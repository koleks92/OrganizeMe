import { View, StyleSheet } from "react-native";
import { Sizes } from "../../constants/Sizes";

function MainViewModal({ children }) {
    return <View style={styles.root}>{children}</View>;
}

export default MainViewModal;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        margin: Sizes.scrH * 0.02,
        justifyContent: "center",
    },
});
