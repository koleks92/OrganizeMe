import { View, StyleSheet, Dimensions } from "react-native";

const scrH = Dimensions.get("screen").height;

function Top({children}) {
    return (
        <View style={styles.root}>
            {children}
        </View>
    )
}

export default Top;

const styles = StyleSheet.create({
    root: {
        height: scrH * 0.05,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center'
    }
})