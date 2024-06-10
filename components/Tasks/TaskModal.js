import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { Sizes } from "../../constants/Sizes";
import CustomModal from "../Modal/CustomModal";
import ModalTopViewBar from "../Modal/ModalTopViewBar";
import CloseButton from "../UI/CloseButton";
import HeadTextModal from "../Modal/HeadTextModal";
import ButtonCustom from "../UI/ButtonCustom";
import { Ionicons } from "@expo/vector-icons";
import { deleteTask } from "../../services/api";

function TaskModal({ task, closeModal, slideOutAnimation }) {
    const deleteHandler = async () => {
        try {
            const response = await deleteTask(task.id);
            closeModal();
            slideOutAnimation();
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    return (
        <CustomModal>
            <ModalTopViewBar>
                <ButtonCustom onPress={deleteHandler}>
                    <Ionicons
                        name="trash-outline"
                        size={Sizes.topButtonSize * 0.9}
                        color={Colors.darkGreen}
                    />
                </ButtonCustom>
                <HeadTextModal>{task.name}</HeadTextModal>
                <CloseButton onPress={closeModal} />
            </ModalTopViewBar>
        </CustomModal>
    );
}

export default TaskModal;

const styles = StyleSheet.create({});
