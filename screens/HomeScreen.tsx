import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Card, Paragraph, Title} from 'react-native-paper';

const Tab = createBottomTabNavigator();

function Home({navigation}: any) {
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Details')}>
          <Card style={styles.card}>
            <Card.Content>
              <Title>Entry Chat</Title>
              <Paragraph>
                Enter your details through chat with our agent
              </Paragraph>
            </Card.Content>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Details')}>
          <Card style={styles.cardchat}>
            <Card.Content>
              <Title>Another Card</Title>
              <Paragraph>More content goes here.</Paragraph>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      </View>
    </>
  );
}

function Data() {
  return <Text>Data</Text>;
}

function Settings() {
  return <Text>Settings</Text>;
}

function Recommendation() {
  return <Text>Recommendation</Text>;
}
import Icon from 'react-native-vector-icons/FontAwesome';
export default function HomeScreen() {
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen
          name="Quick Feed"
          component={Home}
          options={{
            tabBarIcon: () => <Icon name="home" size={20} />,
            tabBarLabel: 'Quick Feed', // Text to display
          }}
        />
        <Tab.Screen name="Data" component={Data} />
        <Tab.Screen name="Recommendations" component={Recommendation} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
    margin: 4,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#c9f5ed',
    height: '60%',
  },
  cardchat: {
    backgroundColor: '#f5f2c9',
    height: '60%',
  },
  button: {
    marginTop: 6,
    width: '50%',
    marginHorizontal: 4,
  },
});
