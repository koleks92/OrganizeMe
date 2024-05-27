import { StyleSheet, Text, View } from "react-native";
import { getAllTasks } from "../../services/api";
import { useEffect, useState } from "react";
import TaskGroup from "./TasksGroup";
import { Sizes } from "../../constants/Sizes";
import { ScrollView } from "react-native-gesture-handler";

function AllTasks() {
    const [tasks, setTasks] = useState([]);

    // Get all tasks
    async function fetchTasks() {
        try {
            // Fetch tasks
            const fetchedTasks = await getAllTasks();
            

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
                
                setTasks((prevTasks) => [...prevTasks, newTask])
            }
        } catch (error) {
            console.error("Error fetching tasks: ", error);
        }
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    const doTasks = tasks.filter((task) => task.type == "do");
    const buyTasks = tasks.filter((task) => task.type == "buy");
    const sellTasks = tasks.filter((task) => task.type == "sell");
    const checkTasks = tasks.filter((task) => task.type == "check");


    return (
        <ScrollView style={styles.root}>
            <Text>All Tasks</Text>
            <TaskGroup type="Do" tasks={doTasks}/>
            <TaskGroup type="Buy" tasks={buyTasks}/>
            <TaskGroup type="Sell" tasks={sellTasks}/>
            <TaskGroup type="Check" tasks={checkTasks}/>
        </ScrollView>
    );
}

export default AllTasks;

const styles = StyleSheet.create({
    root: {
        margin: Sizes.marginMainView
    }
});
