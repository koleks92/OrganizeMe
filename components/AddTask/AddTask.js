import { View, Text, TextInput, StyleSheet } from "react-native";
import { Sizes } from "../../constants/Sizes";
import { Colors } from "../../constants/Colors";
import ButtonCustom from "../UI/ButtonCustom";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { saveToDatabase } from "../../services/api";
import { OrganizeMeContext } from "../../store/Context";

function AddTask({ closeModal }) {
    // Context state
    const {setNewTaskData, setNewTask} = useContext(OrganizeMeContext);
    
    // State
    const [selectedType, setSelectedType] = useState(null);
    const [selectedName, setSelectedName] = useState("");
    const [selectedShop, setSelectedShop] = useState("");
    const [selectedExtra, setSelectedExtra] = useState("");

    // Validation state
    const [missingType, setMissingType] = useState(false);
    const [missingName, setMissingName] = useState(false);

    // Types of tasks
    const types = [
        { label: "Do", value: "do" },
        { label: "Buy", value: "buy" },
        { label: "Sell", value: "sell" },
        { label: "Check", value: "check" },
    ];

    // Check for save the task !
    const saveCheck = () => {
        if (selectedType === null || selectedName === "") {
            if (selectedType === null) {
                setMissingType(true);
            } else {
                setMissingType(false);
            }
            if (selectedName === "") {
                setMissingName(true);
            } else {
                setMissingName(false);
            }
            return;
        } else {
            setMissingName(false);
            setMissingType(false);
            // If everything ok, try to save
            saveTask();
        }
    };

    // Save to database function (last argument: false == not completed)
    const saveTask = async () => {
        try {
            const result = await saveToDatabase(
                selectedType,
                selectedName,
                selectedShop,
                selectedExtra,
                false
            );

            setNewTask(true);
            setNewTaskData({
                id: result.data._id,
                name: result.data.name,
                type: result.data.type,
                shop: result.data.shop,
                extra: result.data.extra,
                completed: result.data.completed,
            });

            // Close modal
            closeModal();
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    return (
        <View style={styles.shadowWrapper}>
            <View style={styles.root}>
                {/* Top view bar */}
                <View style={styles.topView}>
                    <ButtonCustom onPress={saveCheck}>
                        <Ionicons
                            name="checkmark-circle-outline"
                            size={Sizes.topButtonSize}
                            color={Colors.darkGreen}
                        />
                    </ButtonCustom>
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
                {/*  Types dropdown */}
                <View style={styles.optionsView}>
                    <View
                        style={[styles.optionViewDropdown, styles.optionView]}
                    >
                        <Dropdown
                            style={[
                                styles.selectInput,
                                missingType && styles.warnBorder,
                            ]}
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
                    {/* Name input */}
                    <View style={styles.optionView}>
                        <TextInput
                            onChangeText={setSelectedName}
                            value={selectedName}
                            style={[
                                styles.selectInput,
                                styles.textInput,
                                missingName && styles.warnBorder,
                            ]}
                            placeholder="Enter name"
                            placeholderTextColor={Colors.darkGreen}
                        />
                    </View>
                    {/* Shop input */}
                    <View style={styles.optionView}>
                        <TextInput
                            onChangeText={setSelectedShop}
                            value={selectedShop}
                            style={[styles.selectInput, styles.textInput]}
                            placeholder="Enter shop (optional)"
                            placeholderTextColor={Colors.darkGreen}
                        />
                    </View>
                    {/* Extra input */}
                    <View style={styles.optionViewExtra}>
                        <TextInput
                            onChangeText={setSelectedExtra}
                            value={selectedExtra}
                            style={[styles.selectInput, styles.textInput]}
                            placeholder="Extra info (optional)"
                            multiline={true}
                            placeholderTextColor={Colors.darkGreen}
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
        borderRadius: Sizes.scrH * 0.015,
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
    warnBorder: {
        borderColor: Colors.warnRed,
        borderWidth: 3,
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
        paddingHorizontal: Sizes.scrW * 0.04,
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
        color: "Colors.darkGreen",
    },
});
