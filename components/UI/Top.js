import { View, StyleSheet, Dimensions } from "react-native";
import { Sizes } from "../../constants/Sizes";




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
        height: Sizes.scrH * 0.05,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        marginHorizontal: Sizes.scrW * 0.04
    }
})