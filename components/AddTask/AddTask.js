import { View, Text, Button, StyleSheet } from "react-native";
import { Sizes } from "../../constants/Sizes";
import { Colors } from "../../constants/Colors";
import ButtonCustom from "../UI/ButtonCustom";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { SelectList } from 'react-native-dropdown-select-list'


function AddTask({ closeModal }) {

    const [selectedType, setSelectedType] = useState("");

    const types = [
        {key: '1', value: 'Do'},
        {key: '2', value: 'Buy'},
        {key: '3', value: 'Sell'},
        {key: '4', value: 'Check'}
    ]

    return (
        <View style={styles.shadowWrapper}>
            <View style={styles.root}>
                <View style={styles.topView}>
                    <View style={styles.displayNone}><Ionicons
                            name="close-circle-outline"
                            size={Sizes.topButtonSize}
                            color={Colors.darkGreen}
                        /></View>
                <View style={styles.headTextView}>
                    <Text style={styles.headText}>New Task</Text>
                </View>
                    <ButtonCustom onPress={closeModal}>
                        <Ionicons
                            name="close-circle-outline"
                            size={Sizes.topButtonSize}
                            color={Colors.darkGreen}
                        />
                    </ButtonCustom>
                </View>
                <View style={styles.optionView}>
                    <SelectList 
                        setSelected={(val) => setSelectedType(val)}
                        data={types}
                        save="value"
                        search={false}
                        fontFamily="RobotoMono"
                        placeholder="Select type"/>
                </View>
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
        padding: Sizes.scrH * 0.01,
    },
    topView: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    displayNone: {
        opacity: 0
    },
    headText: {
        fontSize: Sizes.scrH * 0.03,
        fontFamily: "RobotoMono",
        fontWeight: "bold",
        color: Colors.warmWhite,
    },
    headTextView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    optionView: {
        margin: Sizes.scrH * 0.02
    }
});
