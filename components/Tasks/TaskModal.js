import { StyleSheet, View, Text } from "react-native";
import { Colors } from "../../constants/Colors";
import { Sizes } from "../../constants/Sizes";
import CustomModal from "../Modal/CustomModal";
import ModalTopViewBar from "../Modal/ModalTopViewBar";
import CloseButton from "../UI/CloseButton";
import HeadTextModal from "../Modal/HeadTextModal";
import ButtonCustom from "../UI/ButtonCustom";
import { Ionicons } from "@expo/vector-icons";
import { deleteTask } from "../../services/api";
import MainViewModal from "../Modal/MainViewModal";
import { useState } from "react";

function TaskModal({ task, closeModal, slideOutAnimation, edit }) {

    // Handler for delete button
    const deleteHandler = async () => {
        try {
            const response = await deleteTask(task.id);
            closeModal();
            slideOutAnimation();
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    // Edit handler
    const editHandler = () => {
        edit(true);
    }

    // Type name converter
    const type =
        task.type.charAt(0).toUpperCase() + task.type.slice(1).toLowerCase();

    // Shop text
    let shop;
    if (task.shop === "") {
        shop = "-";
    } else {
        shop = task.shop;
    }

    // Extra text
    let extra;
    if (task.extra === "") {
        extra = "-";
    } else {
        extra = task.extra;
    }

    // Completed text
    let completed;
    if (task.completed === true) {
        completed = "Yes";
    } else {
        completed = "No";
    }
    return (
        <CustomModal>
            <ModalTopViewBar>
            <ButtonCustom onPress={editHandler}>
                    <Ionicons
                        name="create-outline"
                        size={Sizes.topButtonSize * 0.9}
                        color={Colors.darkGreen}
                    />
                </ButtonCustom>
                <HeadTextModal>{task.name}</HeadTextModal>
                <CloseButton onPress={closeModal} />
            </ModalTopViewBar>
            <MainViewModal>
                <View style={styles.doubleView}>
                    <Text style={styles.titleText}>Type</Text>
                    <View style={styles.singleView}>
                        <Text style={styles.contentText}>{type}</Text>
                    </View>
                </View>
                <View style={styles.doubleView}>
                    <Text style={styles.titleText}>Shop</Text>
                    <View style={styles.singleView}>
                        <Text style={styles.contentText}>{shop}</Text>
                    </View>
                </View>
                <View style={styles.doubleView}>
                    <Text style={styles.titleText}>Extra</Text>
                    <View style={styles.singleView}>
                        <Text style={styles.contentText}>{extra}</Text>
                    </View>
                </View>
                <View style={styles.doubleView}>
                    <Text style={styles.titleText}>Completed</Text>
                    <View style={styles.singleView}>
                        <Text style={styles.contentText}>{completed}</Text>
                    </View>
                </View>
            </MainViewModal>
            <ModalTopViewBar>
                <View></View>
                <ButtonCustom onPress={deleteHandler}>
                    <Ionicons
                        name="trash-outline"
                        size={Sizes.topButtonSize * 0.9}
                        color={Colors.darkGreen}
                    />
                </ButtonCustom>
                
                <View></View>
                </ModalTopViewBar>
        </CustomModal>
    );
}

export default TaskModal;

const styles = StyleSheet.create({
    titleText: {
        fontSize: Sizes.scrH * 0.025,
        fontFamily: "RobotoMono",
        fontWeight: "bold",
        color: Colors.warmWhite,
    },
    contentText: {
        fontSize: Sizes.scrH * 0.02,
        fontFamily: "RobotoMono",
        color: Colors.warmWhite,
    },
    doubleView: {
        padding: Sizes.scrW * 0.02,
        borderColor: Colors.darkGreen
    },
    singleView: {
        paddingHorizontal: Sizes.scrW * 0.03
    }
});
