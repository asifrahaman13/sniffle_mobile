import Icon from 'react-native-vector-icons/FontAwesome';
import {Button, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './HomeScreens/HomeScreens';
import axios from 'axios';
// import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {storeToken, getToken} from '../helper/tokens';


const Tab = createBottomTabNavigator();

function Data() {
  return <Text>Data</Text>;
}

function Settings() {
  return <Text>Settings</Text>;
}

function Recommendation() {
  return <Text>Recommendation</Text>;
}

const QuickFeedIcon = ({color}: any) => (
  <Icon name="home" size={25} color={color} />
);
const RecommendationsIcon = ({color}: any) => (
  <Icon name="thumbs-up" size={25} color={color} />
);
const SettingsIcon = ({color}: any) => (
  <Icon name="cog" size={25} color={color} />
);
const DataIcon = ({color}: any) => (
  <Icon name="database" size={25} color={color} />
);

export default function HomeScreen() {
  function colorSwitcher(route: any, focused: boolean) {
    if (focused) {
      return '#77d9b5'; // Active color
    } else {
      return '#ffcc00'; // Inactive color (yellow)
    }
  }

  React.useEffect(() => {
    const token = process.env.GOOGLE_CLIENT_ID;
    console.log(token);
    GoogleSignin.configure({
      webClientId: token,
    });
  }, []);

  // const [userInformation, setUserInfo] = useState<any>('');

  // Somewhere in your code
  const [token, setToken] = useState<string | null>('');

  async function onGoogleButtonPress() {
    // const backend_uri = process.env.BACKEND_URI;
    try {
      // Check if your device supports Google Play
      const result = await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      console.log('the result', result);

      const user = await GoogleSignin.signIn();
      console.log(user);
      setToken(user.idToken);

      // const response = await axios.post(`${backend_uri}/auth/google`, {
      //   token: user?.idToken,
      // });

      // console.log('Backend response: ', response.data);
      // setUserInfo(response.data);
      // console.log('The token', userInformation);
      // if (response.status === 200) {
      //   storeToken(response.data.token);
      // }

      // // Get the users ID token
      // const {idToken} = await GoogleSignin.signIn();
      // console.log(idToken);

      // // Create a Google credential with the token
      // const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // // Sign-in the user with the credential
      // return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.error('Google Sign-In Error: ', error);
      throw error;
    }
  }

  // function logout() {
  //   removeToken();
  // }

  return (
    <>
      {token ? (
        <>
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: ({focused}) => {
                return colorSwitcher(route, focused);
              },
              inactiveTintColor: 'red',
              labelStyle: {fontSize: 11},
              tabBarActiveTintColor: '#77d9b5',
              tabBarInactiveTintColor: '#ffcc00',
            })}>
            <Tab.Screen
              name="Quick Feed"
              component={Home}
              options={{
                tabBarIcon: QuickFeedIcon,
                tabBarLabel: 'Quick Feed', // Text to display
              }}
            />
            <Tab.Screen
              name="Data"
              component={Data}
              options={{
                tabBarIcon: DataIcon,
                tabBarLabel: 'Data', // Text to display
              }}
            />
            <Tab.Screen
              name="Recommendations"
              component={Recommendation}
              options={{
                tabBarIcon: RecommendationsIcon,
                tabBarLabel: 'Recommendations', // Text to display
              }}
            />
            <Tab.Screen
              name="Settings"
              component={Settings}
              options={{
                tabBarIcon: SettingsIcon,
                tabBarLabel: 'Settings', // Text to display
              }}
            />
          </Tab.Navigator>
        </>
      ) : (
        <>
          <View>
            <Text>GoogleSigninScreen</Text>
            <Button
              title="Google Sign-In"
              onPress={() =>
                onGoogleButtonPress().then(() =>
                  console.log('Signed in with Google!'),
                )
              }
            />
          </View>
        </>
      )}
    </>
  );
}
