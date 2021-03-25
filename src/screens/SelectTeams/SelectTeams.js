import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import axios from 'axios';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { find, sortBy } from 'lodash';
import Loader from '../Loader/Loader';

const SelectTeams = ({ navigation }) => {
    const [teams, setTeams] = useState([]);
    const [sortedColleges, setSortedColleges] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTeams, setSelectedTeams] = useState([]);

    const fetchTeams = async () => {
        // fetch a list of teams
        const { data } = await axios.get('http://site.api.espn.com/apis/site/v2/sports/football/nfl/teams');
        const array = data.sports[0].leagues[0].teams;
        array.forEach(item => item.selected = false);
        setTeams(array);
        return(array);
    };

    const fetchTeamRoster = async (teams) => {
        const congregatePlayers = [];

        // counters are used to make sure we only aggregate college data after fetching
        let countA = 0;

        try {
            teams.forEach(async ({ team }) => {
                let countB = 0;
                // iterate through teams list for their abbreviation and fetch roster
                await axios.get(`http://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${team.abbreviation}/roster`)
                    .then(({ data }) => {
                        data.athletes.forEach((position) => {
                            let countC = 0;
                            position.items.forEach(player => {
                                // push every player into a list
                                congregatePlayers.push(player);
                                // execute cb when we've reached the end of the list
                                // opted to do it this way to make sure every iteration is hit
                                if (countA === teams.length - 1 && countB === data.athletes.length - 1 && countC === position.items.length - 1) {
                                    countColleges(congregatePlayers);
                                    setIsLoading(false);
                                }
                                countC++;
                            });
                            countB++;
                        });
                    });
                countA++;
            });
        } catch(error) {
            console.log(error);
        }
    };

    const countColleges = (allPlayers) => {
        const colleges = [];
        if (allPlayers.length > 0) {
            allPlayers.forEach(player => {
                // edge-case for players with no college data
                if (player.college && player.college.name) {
                    // find if player college exists in list of colleges
                    // used college.name property as college.id's didn't repeat
                    const college = find(colleges, { name: player.college.name });

                    // edge-case where there are no players in the list
                    // sort list of colleges by count (players attended)
                    if (!college) {
                        player.college.count = 1;
                        colleges.push(player.college);
                    } else {
                        college.count++;
                    }
                }
            });
        }
        const sorted = sortBy(colleges, college => college.count).reverse();
        setSortedColleges(sorted);
    };

    const handleSelect = (id) => {
        const tempArray = teams;
        const selected = find(tempArray, ['team', {id: id}]);
        if (!find(selectedTeams, ['team', {id: id}])) {
            selected.selected = true;
            setSelectedTeams([...selectedTeams, selected]);
        } else {
            selected.selected = false;
            const filtered = selectedTeams.filter(team => team.team.id !== id);
            setSelectedTeams(filtered);
        }
        setTeams(tempArray);
    };

    const toggleAll = (boolean) => {
        const tempArray = teams;
        tempArray.forEach(team => {
            team.selected = boolean;
        });

        if (boolean) {
            setIsLoading(true);
            setSelectedTeams(tempArray);
        } else {
            setSortedColleges([]);
            setSelectedTeams([]);
        }
    };

    useEffect(() => {
        // populate list of teams independent of selected teams
        fetchTeams();
    }, []);

    useEffect(() => {
        if (selectedTeams.length > 0) {
            fetchTeamRoster(selectedTeams);
        }
    }, [selectedTeams]);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Select Teams</Text>
            <View style={styles.scrollContainer}>
                <ScrollView style={styles.teamsScrollview}>
                    <View style={styles.teamsView}>
                        {teams.length > 0 && teams.map((team, index) => {
                            const image = { uri: team.team.logos[0].href }
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.teamTile}
                                    onPress={() => handleSelect(team.team.id)}
                                >
                                    <Image
                                        style={team.selected ? styles.backgroundImageSelected : styles.backgroundImage}
                                        source={image}
                                    />
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>
            <View style={styles.toggleButtonsContainer}>
                <TouchableOpacity style={styles.toggleButtons} onPress={() => toggleAll(false)}>
                    <Text style={styles.text}>
                        Unselect All
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.toggleButtons} onPress={() => toggleAll(true)}>
                    <Text style={styles.text}>
                        Select All
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.scoutButtonContainer}>
                <TouchableOpacity
                    style={selectedTeams.length > 0 ? styles.scoutButtonContainer : styles.disabledScoutBtn}
                    disabled={!selectedTeams.length > 0}
                    onPress={() => navigation.navigate('Results', {
                        sortedColleges,
                    })}
                >
                    <Text style={styles.text}>
                        Scout >>
                    </Text>
                </TouchableOpacity>
            </View>

            <Loader visible={isLoading} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#595faa',
    },
    header: {
        height: 60,
        width: 200,
        fontSize: 30,
        fontWeight: '600',
        textAlign: 'center',
        color: '#fff',
    },
    scrollContainer : {
        height: 480,
    },
    teamsScrollview: {
        display: 'flex',
        width: '100%',
    },
    teamsView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        height: '100%',
        opacity: 0.25,
    },
    backgroundImageSelected: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        height: '100%',
        opacity: 1,
    },
    teamTile: {
        height: 100,
        width: 100,
        margin: 10,
        borderWidth: 2,
        borderColor: '#3898EC',
        borderRadius: 10,
    },
    text: {
        fontSize: 18,
        fontWeight: '500',
        color: '#fff',
    },
    toggleButtonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '70%',
    },
    toggleButtons: {
        height: 40,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3898EC',
        borderRadius: 10,
        margin: 10,
    },
    scoutButtonContainer: {
        height: 60,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3898EC',
        borderRadius: 10,
        margin: 15,
    },
    disabledScoutBtn: {
        height: 60,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d3d3d3',
        borderRadius: 10,
        margin: 15,
    },
    lottie: {
        width: 100,
        height: 100,
      }
})

export default SelectTeams;