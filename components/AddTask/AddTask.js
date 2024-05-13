import { View, Text, Button, StyleSheet } from "react-native";
import { Sizes } from "../../constants/Sizes";
import { Colors } from "../../constants/Colors";
import Top from "../UI/Top";
import ButtonCustom from "../UI/ButtonCustom";
import { Ionicons } from "@expo/vector-icons";


function AddTask({ closeModal }) {
    return (
        <View style={styles.shadowWrapper}>
            <View style={styles.root}>
                <View style={styles.topView}>
                    <View></View>
                    <ButtonCustom onPress={closeModal}><Ionicons
                            name="close-circle-outline"
                            size={Sizes.topButtonSize}
                            color={Colors.darkGreen}
                        /></ButtonCustom>
                </View>
                <Text>Add New Task</Text>
            </View>
        </View>
    );
}

export default AddTask;

const styles = StyleSheet.create({
    shadowWrapper: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 5,
    },
    root: {
        borderWidth: 1,
        borderColor: Colors.darkGreen,
        borderRadius: 20,
        width: Sizes.addTaskWidth,
        height: Sizes.addTaskHeight,
        backgroundColor: Colors.lightGreen,
        padding: Sizes.scrH * 0.01
    },
    topView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});
