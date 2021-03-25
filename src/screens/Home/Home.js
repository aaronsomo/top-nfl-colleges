import React from 'react';
import { SafeAreaView, StyleSheet, Text, Button, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Home = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>NFL Talent Scout</Text>
            <View style={styles.scoutButtonContainer}>
                <TouchableOpacity
                    style={styles.disabledScoutBtn}
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
      flex: 1,
      backgroundColor: '#3898EC',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
        height: 60,
        width: 400,
        fontSize: 30,
        fontWeight: '600',
        textAlign: 'center',
        color: '#fff',
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