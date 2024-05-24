import Icon from 'react-native-vector-icons/FontAwesome';
import {Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './HomeScreens/HomeScreens';

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

  return (
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
  );
}
