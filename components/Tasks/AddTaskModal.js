import { View, TextInput, StyleSheet } from "react-native";
import { Sizes } from "../../constants/Sizes";
import { Colors } from "../../constants/Colors";
import ButtonCustom from "../UI/ButtonCustom";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { editTaskToDatabase, saveToDatabase } from "../../services/api";
import { OrganizeMeContext } from "../../store/Context";
import CustomModal from "../Modal/CustomModal";
import ModalTopViewBar from "../Modal/ModalTopViewBar";
import CloseButton from "../UI/CloseButton";
import HeadTextModal from "../Modal/HeadTextModal";
import MainViewModal from "../Modal/MainViewModal";

function AddTaskModal({ closeModal, task, edit }) {
    // Context state
    const { newTaskHandler, oldTaskHandler } = useContext(OrganizeMeContext);

    // State
    const [selectedType, setSelectedType] = useState(null);
    const [selectedName, setSelectedName] = useState("");
    const [selectedShop, setSelectedShop] = useState("");
    const [selectedExtra, setSelectedExtra] = useState("");

    // Validation state
    const [missingType, setMissingType] = useState(false);
    const [missingName, setMissingName] = useState(false);

    // Edit state
    const [editMode, setEditMode] = useState(false);
    const [taskId, setTaskId] = useState();

    // Types of tasks
    const types = [
        { label: "Do", value: "do" },
        { label: "Buy", value: "buy" },
        { label: "Sell", value: "sell" },
        { label: "Check", value: "check" },
    ];

    let headText = "New Task";
    if (editMode) {
        headText = "Edit Task";
    }

    // Edit mode
    useEffect(() => {
        if (edit) {
            setEditMode(true);
            setTaskId(task.id);
            setSelectedType(task.type);
            setSelectedName(task.name);
            setSelectedShop(task.shop);
            setSelectedExtra(task.extra);
        }
    }, [edit]);

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
            if (editMode) {
                editTask();
            } else {
                saveTask();
            }
        }
    };

    // Save edited task to database function
    const editTask = async () => {
        try {
            // Save to database
            const result = await editTaskToDatabase(
                taskId,
                selectedName,
                selectedType,
                selectedShop,
                selectedExtra
            );

            // Create task variable
            const task = {
                id: result.data._id,
                name: result.data.name,
                type: result.data.type,
                shop: result.data.shop,
                extra: result.data.extra,
                completed: result.data.completed,
            };

            oldTaskHandler(task.id);

            setTimeout(() => {
                newTaskHandler(task);
            }, 1000);

            closeModal();
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    // Save to database function (last argument: false == not completed)
    const saveTask = async () => {
        try {
            // Save to database
            const result = await saveToDatabase(
                selectedType,
                selectedName,
                selectedShop,
                selectedExtra,
                false
            );

            // Create task variable
            const task = {
                id: result.data._id,
                name: result.data.name,
                type: result.data.type,
                shop: result.data.shop,
                extra: result.data.extra,
                completed: result.data.completed,
            };

            // Pass task to newTaskHandler(Context)
            newTaskHandler(task);

            // Close modal
            closeModal();
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    return (
        <CustomModal>
            {/* Top view bar */}
            <ModalTopViewBar>
                <ButtonCustom onPress={saveCheck}>
                    <Ionicons
                        name="checkmark-circle-outline"
                        size={Sizes.topButtonSize}
                        color={Colors.darkGreen}
                    />
                </ButtonCustom>
                <HeadTextModal>{headText}</HeadTextModal>
                <CloseButton onPress={closeModal} />
            </ModalTopViewBar>
            {/*  Types dropdown */}
            <MainViewModal>
                <View style={[styles.optionViewDropdown, styles.optionView]}>
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
            </MainViewModal>
        </CustomModal>
    );
}

export default AddTaskModal;

const styles = StyleSheet.create({
    topView: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    displayNone: {
        opacity: 0,
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
