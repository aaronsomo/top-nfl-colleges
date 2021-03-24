import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, Button, View, Image, ImageBackground } from 'react-native';
import axios from 'axios';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const SelectTeams = ({ navigation }) => {
    const [teams, setTeams] = useState([]);
    const [allPlayers, setAllPlayers] = useState([]);

    const fetchTeams = () => {
        axios.get('http://site.api.espn.com/apis/site/v2/sports/football/nfl/teams')
            .then(({ data }) => {
                // data.sports[0].leagues[0].teams.map(team => {
                //     <Text>{team.displayName}</Text>
                // })
                setTeams(data.sports[0].leagues[0].teams);
            });
    };

    const fetchTeamRoster = async () => {
        const congregatePlayers = [];
        // teams.forEach(team => {
        //     axios.get()
        // })
        
        // test chicago bears
        await axios.get('http://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/chi/roster')
            .then(({ data }) => {
                console.log(data.athletes);
                data.athletes.forEach(position => {
                    position.items.forEach(player => {
                        congregatePlayers.push(player);
                    });
                });
            });
        setAllPlayers(congregatePlayers);
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
                        {teams.length > 0 && teams.map((team, index) => {
                            const image = { uri: team.team.logos[0].href }
                            return (
                                <TouchableOpacity key={index} style={{ color: 'black', height: 100, width: 100, margin: 10, borderWidth: 1, borderColor: 'black', borderRadius: 10 }}>
                                    <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                                        <Image style={styles.backgroundImage} source={image}/>
                                        <Text style={{ height: '100%', textAlign: 'center' }}>
                                            {team.team.displayName}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>
            <Button
                title="Get Bears Roster"
                onPress={() => fetchTeamRoster()}
            />
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
    backgroundImage: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        height: '100%',
        opacity: 0.5,
    }
})

export default SelectTeams;