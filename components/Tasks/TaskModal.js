import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { Sizes } from "../../constants/Sizes";
import CustomModal from "../Modal/CustomModal";
import ModalTopViewBar from "../Modal/ModalTopViewBar";
import CloseButton from "../UI/CloseButton";

function TaskModal({ task, closeModal }) {
    return (
        <CustomModal>
            <ModalTopViewBar>
                <CloseButton onPress={closeModal} />
            </ModalTopViewBar>
        </CustomModal>
    );
}

export default TaskModal;

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
});
