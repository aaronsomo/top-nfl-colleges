import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, Button, View, Image } from 'react-native';
import axios from 'axios';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { find, sortBy } from 'lodash';

const SelectTeams = ({ navigation }) => {
    const [teams, setTeams] = useState([]);
    const [allPlayers, setAllPlayers] = useState([]);
    const [sortedColleges, setSortedColleges] = useState([]);

    const fetchTeams = () => {
        // fetch a list of teams
        axios.get('http://site.api.espn.com/apis/site/v2/sports/football/nfl/teams')
            .then(({ data }) => {
                // set list of teams to iterate through players
                setTeams(data.sports[0].leagues[0].teams);
            });
    };

    const fetchTeamRoster = () => {
        const congregatePlayers = [];
        teams.forEach(async ({ team }) => {
            // iterate through teams list for their abbreviation and fetch roster
            await axios.get(`http://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${team.abbreviation}/roster`)
                .then(({ data }) => {
                    data.athletes.forEach(position => {
                        position.items.forEach(player => {
                            // push every player into a list
                            congregatePlayers.push(player);
                        });
                    });
                });
        });
        setAllPlayers(congregatePlayers);
    };

    const countColleges = () => {
        const colleges = [];
        // edge-case where there are no players in the list
        if (allPlayers.length > 0) {
            allPlayers.forEach(player => {
                // edge-case for players with no college data
                if (player.college && player.college.name) {
                    // find if player college exists in list of colleges
                    // used college.name property as college.id's didn't repeat
                    const college = find(colleges, { name: player.college.name });
                    if (!college) {
                        player.college.count = 1;
                        colleges.push(player.college);
                    } else {
                        college.count++;
                    }
                }
            });
        }
        // sort list of colleges by count (players attended)
        const sorted = sortBy(colleges, college => college.count).reverse();
        setSortedColleges(sorted);
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
                title="Get Bears Colleges"
                onPress={() => countColleges()}
            />
            <Button
                title="Results"
                onPress={() => navigation.navigate("Results", {
                    sortedColleges,
                })}
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