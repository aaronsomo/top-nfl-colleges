import React from 'react';
import { SafeAreaView, StyleSheet, Text, Button, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const Results = ({ navigation, route: { params } }) => {
    const { sortedColleges } = params;
    const topFive = sortedColleges.splice(0, 5);
    return (
        <SafeAreaView style={styles.container}>
            <Text>The Top 5 Most Attended Colleges By NFL Players Are:</Text>
            <View style={styles.scrollview}>
                <ScrollView style={{ width: '90%' }}>
                    <View style={{ width: '100%' }}>
                        {topFive.map((college, index) => (
                            <TouchableOpacity key={index}>
                                <View style={{ display: 'flex', flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                                    <Text key={index} style={{ margin: 10 }}>{index + 1}. {college.abbrev}</Text>
                                    <View style={{ width: '60%' }}>
                                        <Text>{college.name}</Text>
                                        <Text>Mascot: {college.mascot}</Text>
                                        <Text>{college.count} Current NFL Players</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>
            <Button
                title="Home"
                onPress={() => {
                    navigation.navigate("Home")
                }}
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
    scrollview: {
        height: 480
    }
})

export default Results;
