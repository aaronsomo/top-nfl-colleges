import React from 'react';
import { SafeAreaView, StyleSheet, Text, Button } from 'react-native';

const Home = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>NFL Talent Scout</Text>
            <Button
                title="Select Teams"
                onPress={() => navigation.navigate("SelectTeams")}
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
  });

export default Home;