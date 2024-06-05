import Icon from 'react-native-vector-icons/FontAwesome';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './HomeScreens/HomeScreens';
import axios from 'axios';
// import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {storeToken, getToken} from '../helper/tokens';
import DataScreen from './DataScreens/DataScreen';
import Recommendation from './RecommendationScreens/Recommendation';
import Assessment from './AssessmentScreen/Assessment';
import Wearable from './Wearable/Wearable';

const Tab = createBottomTabNavigator();

const QuickFeedIcon = ({color}: any) => (
  <Icon name="home" size={25} color={color} />
);
const RecommendationsIcon = ({color}: any) => (
  <Icon name="thumbs-up" size={25} color={color} />
);

const AssessmentIcon = ({color}: any) => (
  <Icon name="clipboard" size={25} color={color} />
);

const WearableIcon = ({color}: any) => (
  <Icon name="bluetooth" size={25} color={color} />
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

  const [token, setToken] = useState<string | null>('');

  React.useEffect(() => {
    async function getId() {
      const idToken = await getToken();
      if (idToken) {
        const backend_uri = process.env.BACKEND_URI;
        const response = await axios.post(`${backend_uri}/auth/decode_token`, {
          token: idToken,
        });
        if (response.data) {
          setToken(idToken);
        } else {
          const googleClientId = process.env.GOOGLE_CLIENT_ID;
          GoogleSignin.configure({
            webClientId: googleClientId,
          });
        }
      } else {
        const googleClientId = process.env.GOOGLE_CLIENT_ID;
        GoogleSignin.configure({
          webClientId: googleClientId,
        });
      }
    }

    getId();

    const googleClientId = process.env.GOOGLE_CLIENT_ID;
    GoogleSignin.configure({
      webClientId: googleClientId,
    });
  }, []);

  const [userInformation, setUserInfo] = useState<any>('');

  // Somewhere in your code

  async function onGoogleButtonPress() {
    const backend_uri = process.env.BACKEND_URI;
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const user = await GoogleSignin.signIn();
      // console.log(user);
      // setToken(user.idToken);

      const response = await axios.post(`${backend_uri}/auth/google`, {
        token: user?.idToken,
      });

      setUserInfo(response.data);
      console.log('The user information', userInformation);
      console.log(response.data);
      if (response.status === 200) {
        console.log('The given token is', response.data.token);
        storeToken(response.data.token);
        setToken(response.data.token);
      }
    } catch (error) {
      console.error('Google Sign-In Error: ', error);
      throw error;
    }
  }

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
              tabBarInactiveTintColor: '#FB9881',
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
              component={DataScreen}
              options={{
                tabBarIcon: DataIcon,
                tabBarLabel: 'Data', // Text to display
              }}
            />
            <Tab.Screen
              name="Assessment"
              component={Assessment}
              options={{
                tabBarIcon: AssessmentIcon,
                tabBarLabel: 'Assessment', // Text to display
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
              name="Wearable"
              component={Wearable}
              options={{
                tabBarIcon: WearableIcon,
                tabBarLabel: 'Wearable', // Text to display
              }}
            />
          </Tab.Navigator>
        </>
      ) : (
        <>
          <View style={styles.container}>
            <Text style={styles.header}>Welcome!</Text>
            <Text style={styles.subheader}>
              You are just one step away from good health
            </Text>
            <View>
              <Image
                source={require('../assets/images/signin.png')}
                style={styles.image}
              />
            </View>
            <TouchableOpacity
              style={styles.signinButton}
              onPress={() =>
                onGoogleButtonPress().then(() =>
                  console.log('Signed in with Google!'),
                )
              }>
              <Text style={styles.buttonText}>Google Sign-In</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  subheader: {
    fontSize: 14,
    color: 'black',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  signinButton: {
    width: '80%',
    height: 48,
    backgroundColor: '#f55549',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  header: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 400,
    resizeMode: 'contain', // Other options: 'cover', 'stretch', etc.
  },
});
