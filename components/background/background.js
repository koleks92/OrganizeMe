import { ImageBackground, StyleSheet, View } from "react-native";
import { Colors } from "../../constants/Colors";

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
        flex: 1,
      },
      backgroundImage: {
        flex: 1,
        opacity: 0.2,
      },
});
