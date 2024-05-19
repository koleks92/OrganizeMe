import { View, Text, TextInput, StyleSheet } from "react-native";
import { Sizes } from "../../constants/Sizes";
import { Colors } from "../../constants/Colors";
import ButtonCustom from "../UI/ButtonCustom";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import DropDownPicker from "react-native-dropdown-picker";

function AddTask({ closeModal }) {
    const [open, setOpen] = useState(false);
    const [selectedType, setSelectedType] = useState(null);
    const [selectedName, setSelectedName] = useState("");
    const [selectedShop, setSelectedShop] = useState("");
    const [selectedExtra, setSelectedExtra] = useState("");

    const types = [
        { label: "Do", value: "1" },
        { label: "Buy", value: "2" },
        { label: "Sell", value: "3" },
        { label: "Check", value: "4" },
    ];

    return (
        <View style={styles.shadowWrapper}>
            <View style={styles.root}>
                <View style={styles.topView}>
                    <View style={styles.displayNone}>
                        <Ionicons
                            name="close-circle-outline"
                            size={Sizes.topButtonSize}
                            color={Colors.darkGreen}
                        />
                    </View>
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
                <View style={styles.optionsView}>
                    <View
                        style={[styles.optionViewDropdown, styles.optionView]}
                    >
                        <Dropdown
                            style={styles.selectInput}
                            placeholderStyle={styles.textInput}
                            selectedTextStyle={styles.textInput}
                            itemTextStyle={styles.dropdownTextStyles}
                            containerStyle={styles.dropdownStyles}
                            data={types}
                            labelField="label"
                            valueField="value"
                            placeholder={"Select type..."}
                            value={selectedType}
                            onChange={(item) => {
                                setSelectedType(item.value);
                            }}
                            activeColor={Colors.lightGreen}
                        />
                    </View>
                    <View style={styles.optionView}>
                        <TextInput
                            onChangeText={setSelectedName}
                            value={selectedName}
                            style={[styles.selectInput, styles.textInput]}
                            placeholder="Enter name"
                        />
                    </View>
                    <View style={styles.optionView}>
                        <TextInput
                            onChangeText={setSelectedShop}
                            value={selectedShop}
                            style={[styles.selectInput, styles.textInput]}
                            placeholder="Enter shop (optional)"
                        />
                    </View>
                    <View style={styles.optionViewExtra}>
                        <TextInput
                            onChangeText={setSelectedExtra}
                            value={selectedExtra}
                            style={[styles.selectInput, styles.textInput]}
                            placeholder="Extra info"
                            multiline={true}
                        />
                    </View>
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
    },
    root: {
        borderWidth: 1,
        borderColor: Colors.darkGreen,
        borderRadius: 20,
        width: Sizes.addTaskWidth,
        height: Sizes.addTaskHeight,
        backgroundColor: Colors.lightGreen,
        padding: Sizes.scrH * 0.01,
        elevation: 5,
    },
    topView: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    displayNone: {
        opacity: 0,
    },
    headText: {
        fontSize: Sizes.scrH * 0.03,
        fontFamily: "RobotoMono",
        fontWeight: "bold",
        color: Colors.warmWhite,
    },
    headTextView: {
        justifyContent: "center",
        alignItems: "center",
    },
    optionsView: {
        flex: 1,
        margin: Sizes.scrH * 0.02,
        justifyContent: "center",
    },
    optionView: {
        height: Sizes.scrH * 0.06,
        marginVertical: Sizes.scrH * 0.01,
    },
    optionViewDropdown: {
        zIndex: 1,
    },
    optionViewExtra: {
        height: Sizes.scrH * 0.12,
        marginVertical: Sizes.scrH * 0.01,
    },
    selectInput: {
        alignItems: "center",
        height: Sizes.scrH * 0.06,
        borderWidth: 1,
        borderRadius: Sizes.scrH * 0.015,
        borderColor: Colors.darkGreen,
    },
    textInput: {
        paddingHorizontal: Sizes.scrW * 0.05,
        flex: 1,
        fontFamily: "RobotoMono",
        fontSize: Sizes.scrH * 0.02,
    },
    dropdownStyles: {
        marginTop: Sizes.scrH * 0.01,
        backgroundColor: Colors.warmWhite,
        borderRadius: Sizes.scrH * 0.015,
        borderWidth: 1,
        borderColor: Colors.darkGreen,
        fontFamily: "RobotoMono",
        paddingVertical: Sizes.scrH * 0.015,
    },
    dropdownTextStyles: {
        fontSize: Sizes.scrH * 0.02,
        color: "Colors.darkGreen", // Ensure text color is visible
    },
});
