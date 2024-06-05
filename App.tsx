/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Provider} from 'react-redux';
import ChatScreen from './src/screens/ChatScreen/ChatScreen';
import HomeScreen from './src/screens/HomeScreen';
import store from './src/store';
// import AudioRecord from './src/screens/components/VoiceScreen/VoiceScreen';
import Settings from './src/screens/GeneralMetrics/Settings';
import AudioRecord from './src/screens/components/VoiceScreen/VoiceScreen';
import GeneralMetrics from './src/screens/GeneralMetrics/GeneralMetrics';
import Fhir from './src/screens/Fhir/Fhir';
import FhirData from './src/screens/Fhir/FhirData';
import AboutDataCollection from './src/screens/components/AboutDataCollection';
import AboutTools from './src/screens/components/AboutTools';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false, // Hide the header
              headerTintColor: '#f5b189',
            }}>
            <Stack.Screen name="Home" component={HomeScreen} />

            <Stack.Screen name="GeneralMetrics" component={GeneralMetrics} />
            <Stack.Screen
              name="Chat"
              component={ChatScreen}
              options={{headerShown: true}}
            />
            <Stack.Screen
              name="Voice"
              component={AudioRecord}
              options={{headerShown: true}}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{headerShown: true}}
            />
            <Stack.Screen
              name="Fhir"
              component={Fhir}
              options={{headerShown: true}}
            />
            <Stack.Screen
              name="FHIR file data"
              component={FhirData}
              options={{headerShown: true}}
            />
            <Stack.Screen
              name="About Data Collection"
              component={AboutDataCollection}
              options={{headerShown: true}}
            />
            <Stack.Screen
              name="About our tools"
              component={AboutTools}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}

export default App;
