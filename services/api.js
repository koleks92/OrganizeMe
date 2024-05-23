import axios from "axios";

const url = "http://192.168.0.3:5000/tasks";

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

// Create delete function !