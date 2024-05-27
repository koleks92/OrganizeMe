import { Dimensions } from "react-native";

const scrH = Dimensions.get("screen").height;
const scrW = Dimensions.get("screen").width;

export const Sizes = {
    scrH: scrH,
    scrW: scrW,
    topButtonSize: scrH * 0.05,         // Top Options Buttons Size
    topOptionsHeight: scrH * 0.05,      // Top Options Component Height
    addTaskHeight: scrH * 0.5,          // Add/Edit Task Modal Height
    addTaskWidth: scrW * 0.8,           // Add/Edit Task Modal Width
    marginMainView: scrW * 0.06,        // Margin for root view for screens,
    taskSmallHeight: scrH * 0.05,       // Task height for TasksGroup
    tasksViewMP: scrH * 0.01,           // Tasks View Margin Bottom/Padding
    taskHorizontalMargin: scrH * 0.002  // Horizontal margin for each task view in tasksGroup
}