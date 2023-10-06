import React from 'react'; 
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LayoutScreen from './screens/LayoutScreen';
import HookScreen from './screens/HookScreen';
import SpeedGameScreen from './screens/SpeedGame';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Home Screen'}}
        />
        <Stack.Screen name="LayoutScreen" component={LayoutScreen} />
        <Stack.Screen name="SpeedGameScreen" component={SpeedGameScreen} />
        <Stack.Screen name="HookScreen" component={HookScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.homeView}>
      <TouchableOpacity onPress={() => navigation.navigate('LayoutScreen')} style={styles.button}>
        <Text style={styles.buttonText}>Q2. Layout Screen</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('HookScreen')} style={styles.button}>
        <Text style={styles.buttonText}>Q3. Hook Screen</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SpeedGameScreen')} style={styles.button}>
        <Text style={styles.buttonText}>Q4. SpeedGame Screen</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  homeView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: 'lightblue',
    width: 220,
    display: 'flex',
    alignItems: 'center',
    margin: 5,
    padding: 10,
    borderRadius: 10
  },
  buttonText: {
    color: 'darkblue',
    fontSize: 16,
    fontWeight: '600'
  },
});