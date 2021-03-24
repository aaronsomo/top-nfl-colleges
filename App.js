import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home/Home';
import SelectTeams from './src/screens/SelectTeams/SelectTeams';
import Results from './src/screens/Results/Results';

const NavigationStack = createStackNavigator();

const App = () => {
  return (
    // <View style={styles.container}>
    //   {/* <Text>Open up App.js to start working on your app!</Text> */}
    //   <Home />
    //   <StatusBar style="auto" />
    // </View>
    <NavigationContainer>
      <NavigationStack.Navigator>
        <NavigationStack.Screen name="Home" component={Home} />
        <NavigationStack.Screen name="SelectTeams" component={SelectTeams} />
        <NavigationStack.Screen name="Results" component={Results} />
      </NavigationStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
