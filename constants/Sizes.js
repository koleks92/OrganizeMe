import { Dimensions } from "react-native";

const scrH = Dimensions.get("screen").height;
const scrW = Dimensions.get("screen").width;

export const Sizes = {
    topButtonSize: scrH * 0.04,     // Top Options Buttons Size
    addTaskHeight: scrH * 0.5,      // Add Task Modal Height
    addTaskWidth: scrW * 0.8,       // Add Task Modal Width
}