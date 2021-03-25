import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home/Home';
import SelectTeams from './src/screens/SelectTeams/SelectTeams';
import Results from './src/screens/Results/Results';

const NavigationStack = createStackNavigator();

const App = () => {
  return (
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
