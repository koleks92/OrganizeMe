import { StyleSheet, Text, View } from "react-native";
import { getAllTasks } from "../../services/api";
import { useEffect, useState } from "react";
import TaskGroup from "./TasksGroup";
import { Sizes } from "../../constants/Sizes";

function AllTasks() {
    const [doTasks, setDoTasks] = useState([]);
    const [buyTasks, setBuyTasks] = useState([]);
    const [sellTasks, setSellTasks] = useState([]);
    const [checkTasks, setCheckTasks] = useState([]);

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
                
                if (newTask.type == "do") {
                    setDoTasks(prevTasks => [...prevTasks, newTask])
                } else if (newTask.type == "buy") {
                    setBuyTasks(prevTasks => [...prevTasks, newTask])
                } else if (newTask.type == "sell") {
                    setSellTasks(prevTasks => [...prevTasks, newTask])
                } else if (newTask.type == "check") {
                    setCheckTasks(prevTasks => [...prevTasks, newTask])
                }
            }
        } catch (error) {
            console.error("Error fetching tasks: ", error);
        }
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    


    return (
        <View style={styles.root}>
            <Text>All Tasks</Text>
            <TaskGroup type="Do" tasks={doTasks}/>
            <TaskGroup type="Buy" tasks={buyTasks}/>
            <TaskGroup type="Sell" tasks={sellTasks}/>
            <TaskGroup type="Check" tasks={checkTasks}/>

        </View>
    );
}

export default AllTasks;

const styles = StyleSheet.create({
    root: {
        margin: Sizes.marginMainView
    }
});
