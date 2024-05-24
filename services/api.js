import axios from "axios";

const url = "http://192.168.0.3:5000/tasks";
const urlHistory = "http://192.168.0.3:5000/history";

export async function saveToDatabase(type, name, shop, extra, completed) {
    try {
        const response = await axios.post(url, {
            type: type,
            name: name,
            shop: shop,
            extra: extra,
            completed: completed
        })
        console.log(response);
    }
    catch (error) {
        console.error("Error: ", error)
    }
}

// Get all uncompleted tasks

export async function getAllTasks() {
    try {
        const response = await axios.get(url);
        console.log(response)
    } catch (error) {
        console.error("Error: ", error)
    }
};

// Get all history (completed tasks)

export async function getAllHistory() {
    try {
        const response = await axios.get(urlHistory);
        console.log(response)
    } catch (error) {
        console.error("Error: ", error)
    }
}

// Delete one task by id

export async function deleteTask(id) {
    try {
        const response = await axios.delete(url, id);
        console.log(response);
    } catch (error) {
        console.error("Error:", error)
    }
}

// Get one task by id

export async function getTask(id) {
    try {
        const response = await axios.get(url + "/" + id)
        console.log(response)
    } catch (error) {
        console.error("Error: ", error);
    }
}

// Edit task
// TODO

// Mark as completed/uncompleted
// TODO