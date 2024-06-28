import { View, Text, Button, StyleSheet, TextInput } from "react-native";

function TestModal({ showClose }) {
    return(
        <View style={styles.root}>
            <Button title="Close" onPress={showClose} />
            <TextInput />
            <Text>Hello</Text>
        </View>
    )
}

export default TestModal;

const styles = StyleSheet.create({
    root: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        backgroundColor: 'lightgray'
    }
})