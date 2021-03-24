import React from 'react';
import { SafeAreaView, StyleSheet, Text, Button } from 'react-native';

const Results = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Results Page</Text>
            <Button
                title="Home"
                onPress={() => navigation.navigate("Home")}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default Results;
