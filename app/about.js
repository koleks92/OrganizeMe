// About page with information about app and developer

import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Background from "../components/UI/Background";
import ButtonCustom from "../components/UI/ButtonCustom";
import Top from "../components/UI/Top";
import MenuButton from "../components/UI/MenuButton";
import { Sizes } from "../constants/Sizes";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";
import * as Linking from "expo-linking"; // Importing Linking from expo-linking

function About() {
    const navigation = useNavigation();
    const openDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };

    // Open a link
    const openLink = (link) => {
        Linking.openURL(link).catch((err) =>
            console.error("Couldn't load page", err)
        );
    };

    // Open mail app
    const openMail = (mail) => {
        Linking.openURL(`mailto:${mail}`).catch((err) =>
            console.error("Failed to open email client", err)
        );
    };

    return (
        <Background>
            <SafeAreaView style={styles.safeArea}>
                <Top>
                    <ButtonCustom onPress={openDrawer}>
                        <MenuButton size={Sizes.topButtonSize} />
                    </ButtonCustom>
                </Top>
                {/* First section */}
                <View style={styles.container}>
                    <Text style={styles.textStyleSmall}>created by:</Text>
                    <Text style={styles.textStyleBig}>
                        Jan Sebastian Konieczek
                    </Text>
                </View>
                {/* Second section / links */}
                <View style={styles.container}>
                    <Text style={styles.textStyleSmall}>contact:</Text>
                    <View style={styles.linksContainer}>
                        <ButtonCustom
                            onPress={() => openMail("konieczekjan@gmail.com")}
                        >
                            <Ionicons
                                name="mail-outline"
                                size={Sizes.topButtonSize}
                                color={Colors.darkGreen}
                            />
                        </ButtonCustom>
                        <ButtonCustom
                            onPress={() =>
                                openLink("https://github.com/koleks92")
                            }
                        >
                            <Ionicons
                                name="logo-github"
                                size={Sizes.topButtonSize}
                                color={Colors.darkGreen}
                            />
                        </ButtonCustom>
                        <ButtonCustom
                            onPress={() =>
                                openLink(
                                    "https://www.linkedin.com/in/jan-konieczek"
                                )
                            }
                        >
                            <Ionicons
                                name="logo-linkedin"
                                size={Sizes.topButtonSize}
                                color={Colors.darkGreen}
                            />
                        </ButtonCustom>
                    </View>
                </View>
            </SafeAreaView>
        </Background>
    );
}

export default About;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        margin: Sizes.marginMainView,
    },
    textStyleBig: {
        fontFamily: "RobotoMono",
        fontSize: Sizes.scrH * 0.03,
        marginHorizontal: Sizes.marginMainView,
    },
    textStyleSmall: {
        fontFamily: "RobotoMono",
        fontSize: Sizes.scrH * 0.025,
    },
    linksContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: Sizes.marginMainView,
    },
});
