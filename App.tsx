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
              options={{
                title: 'Quick insights',
                headerStyle: {
                  backgroundColor: '#f2742c',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen name="Chat" component={ChatScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}

export default App;
