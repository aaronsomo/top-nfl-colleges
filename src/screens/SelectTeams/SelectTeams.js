import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, Button, View } from 'react-native';
import axios from 'axios';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const SelectTeams = ({ navigation }) => {
    const [teams, setTeams] = useState([]);

    const fetchTeams = () => {
        axios.get('http://site.api.espn.com/apis/site/v2/sports/football/nfl/teams')
            // .then(response => console.log(response.data.sports[0].leagues[0].teams));
            .then(({ data }) => (
                // data.sports[0].leagues[0].teams.map(team => {
                //     <Text>{team.displayName}</Text>
                // })
                setTeams(data.sports[0].leagues[0].teams)
            ));
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text>SelectTeams Page</Text>
            <Text>Testing</Text>
            <View style={{ height: 480 }}>
                <ScrollView style={{ display: 'flex', width: '100%' }}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {teams.length > 0 && teams.map((team, index) => (
                            <TouchableOpacity style={{ color: 'black', height: 100, width: 100, margin: 10, borderWidth: 1, borderColor: 'black', borderRadius: 10 }}>
                                <Button key={index} title={team.team.displayName} />
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>
            <Button
                title="Results"
                onPress={() => navigation.navigate("Results")}
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

export default SelectTeams;