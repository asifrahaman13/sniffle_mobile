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
import {Button} from 'react-native';
// import AudioRecord from './src/screens/components/VoiceScreen/VoiceScreen';
import Settings from './src/screens/GeneralMetrics/Settings';
import AudioRecord from './src/screens/components/VoiceScreen/VoiceScreen';
import GeneralMetrics from './src/screens/GeneralMetrics/GeneralMetrics';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              // headerShown: false, // Hide the header
              headerTintColor: '#f5b189',
            }}>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={({navigation}) => ({
                title: 'Quick insights',
                headerStyle: {
                  backgroundColor: '#FB9881',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                // eslint-disable-next-line react/no-unstable-nested-components
                headerRight: () => (
                  <Button
                    onPress={() =>
                      navigation.navigate('Settings', {
                        chatVariant: 'Settings',
                      })
                    }
                    title="Info"
                    color="#f2742c"
                  />
                ),
              })}
            />

            <Stack.Screen name="GeneralMetrics" component={GeneralMetrics} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Voice" component={AudioRecord} />
            <Stack.Screen name="Settings" component={Settings} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}

export default App;
