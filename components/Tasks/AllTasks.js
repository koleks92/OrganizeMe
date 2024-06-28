import { StyleSheet, View } from "react-native";
import { getAllHistory, getAllTasks } from "../../services/api";
import { useEffect, useState } from "react";
import TaskGroup from "./TasksGroup";
import { Sizes } from "../../constants/Sizes";
import { ScrollView } from "react-native-gesture-handler";
import Loading from "../UI/Loading";

function AllTasks({ focused, history }) {
    const [tasks, setTasks] = useState([]);
    const [tasksLoading, setTasksLoading] = useState(false);

    // Get all tasks
    async function fetchTasks() {
        try {
            // Set loading tasks
            setTasksLoading(true);

            // Fetch tasks
            let fetchedTasks;
            if (history) {
                fetchedTasks = await getAllHistory();
            } else {
                fetchedTasks = await getAllTasks();
            }

            let formattedTasks = [];

            // Save tasks
            for (let i = 0; i < fetchedTasks.length; i++) {
                let newTask = {
                    id: fetchedTasks[i]._id,
                    name: fetchedTasks[i].name,
                    type: fetchedTasks[i].type,
                    shop: fetchedTasks[i].shop,
                    extra: fetchedTasks[i].extra,
                    completed: fetchedTasks[i].completed,
                };

                formattedTasks.push(newTask);
            }
            setTasks(formattedTasks);

            // Set tasks loading false
            setTasksLoading(false);
        } catch (error) {
            console.error("Error fetching tasks: ", error);
        }
    }

    // Check if focused == reload tasks
    useEffect(() => {
        if (focused) {
            fetchTasks();
        }
    }, [focused]);

    // Arrays of tasks
    const doTasks = tasks.filter((task) => task.type == "do");
    const buyTasks = tasks.filter((task) => task.type == "buy");
    const sellTasks = tasks.filter((task) => task.type == "sell");
    const checkTasks = tasks.filter((task) => task.type == "check");

    if (tasksLoading) {
        return (
            <View style={styles.root}>
                <Loading />
            </View>
        );
    }

    return (
        <ScrollView style={styles.root}>
            <TaskGroup type="Do" initialTasks={doTasks} />
            <TaskGroup type="Buy" initialTasks={buyTasks} />
            <TaskGroup type="Sell" initialTasks={sellTasks} />
            <TaskGroup type="Check" initialTasks={checkTasks} />
        </ScrollView>
    );
}

export default AllTasks;

const styles = StyleSheet.create({
    root: {
        margin: Sizes.marginMainView,
    },
});
