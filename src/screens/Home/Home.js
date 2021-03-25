import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Home = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logoImage}
                    source={require('../../assets/logo.png')}
                />
            </View>
            <Text style={styles.text}>Scout Top NFL Colleges by Teams</Text>
            <View style={styles.selectTeamsButtonContainer}>
                <TouchableOpacity
                    style={styles.selectTeamsButton}
                    onPress={() => navigation.navigate('SelectTeams')}
                >
                    <Text style={styles.text}>
                        Select Teams >>
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#3898EC',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        display: 'flex',
        alignSelf: 'center',
        height: 400,
        width: 400,
        margin: 10,
        borderWidth: 2,
        borderColor: '#3898EC',
        borderRadius: 10,
    },
    logoImage: {
        height: '100%',
        width: '100%',
        opacity: 1,
        alignSelf: 'center',
    },
    selectTeamsButtonContainer: {
        height: 60,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3898EC',
        borderRadius: 10,
        margin: 15,
    },
    selectTeamsButton: {
        height: 60,
        width: 130,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#595faa',
        borderRadius: 10,
        margin: 15,
    },
    text: {
        fontSize: 18,
        fontWeight: '500',
        color: '#fff',
        textAlign: 'center',
    },
  });

export default Home;