import { ImageBackground, StyleSheet, View } from "react-native";
import { Sizes } from "../../constants/Sizes";

function Background({ children }) {
    return (
        <View style={styles.root}>
            <ImageBackground
                source={require("../../assets/images/background/background.png")}
                resizeMode="cover"
                style={styles.root}
                imageStyle={styles.backgroundImage}
            >
                {children}
            </ImageBackground>
        </View>
    );
}

export default Background;

const styles = StyleSheet.create({
    root: {
        height: Sizes.scrH
      },
      backgroundImage: {
        flex: 1,
        opacity: 0.2,
      },
});
