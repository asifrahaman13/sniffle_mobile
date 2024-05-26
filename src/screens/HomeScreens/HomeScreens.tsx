import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Card, Paragraph, Title} from 'react-native-paper';
import {stackedData} from '../../constants/constants.data';
import {Searchbar} from 'react-native-paper';

import {UserRepository} from '../../infrastructure/repositories/UserRepository';
import {UserService} from '../../domain/usecases/UserService';
import {UserInterface} from '../../domain/interfaces/UserInterface';

import {getToken} from '../../helper/tokens';

import {AgentVariations} from '../../constants/constants.data';

const userRepository = new UserRepository();
const user_interface: UserInterface = new UserService(userRepository);

export default function Home({navigation}: any) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [userdata, setUserData] = React.useState({
    name: '',
    sub: '',
  });

  useEffect(() => {
    console.log('Home screen mounted');
    async function fetchData() {
      const idToken = await getToken();
      if (idToken) {
        const response = await user_interface.Authenticateduser(idToken);
        if (response?.code === 200) {
          setUserData(response.data);
        }
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <SafeAreaView style={styles.verticalStack}>
        <View style={styles.smallContainer}>
          <Text style={[styles.smallText, styles.blueText]}>Hello, </Text>
          <Text style={[styles.header, styles.blueText]}>{userdata.name}</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.boxShadow}>
            <Searchbar
              placeholder="Search"
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={styles.Search}
            />
          </View>
          <View style={styles.Categories}>
            <Text style={[styles.header, styles.blueText]}>
              Data collection
            </Text>
            <Text style={[styles.smallText, styles.blueText]}>See more</Text>
          </View>
          <ScrollView horizontal={true}>
            <View style={styles.container}>
              {AgentVariations.map((item, index) => (
                <>
                  <TouchableWithoutFeedback
                    key={index.toString() + item.title}
                    onPress={() =>
                      navigation.navigate('Chat', {
                        chatVariant: item.title,
                      })
                    }>
                    <Card style={[item.color, styles.cardchat]}>
                      <Card.Content>
                        <Title style={[styles.whiteText]}>{item.title}</Title>
                        <Paragraph style={styles.whiteTextSmall}>
                          {item?.description}
                        </Paragraph>
                      </Card.Content>
                    </Card>
                  </TouchableWithoutFeedback>
                </>
              ))}
            </View>
          </ScrollView>

          <View style={styles.Categories}>
            <Text style={[styles.header, styles.blueText]}>Latest blogs</Text>
            <Text style={[styles.smallText, styles.blueText]}>See more</Text>
          </View>

          <View style={styles.containerVertical}>
            {stackedData.map((item, index) => (
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('Chat')}
                key={index.toString() + item.title}
                style={[styles.whiteBackground, styles.boxShadow]}>
                <Card style={styles.whiteBackground}>
                  <Card.Content>
                    <Title style={[styles.header, styles.whiteText]}>
                      {item?.title}
                    </Title>
                    <Paragraph style={styles.whiteTextSmall}>
                      {item?.description}
                    </Paragraph>
                  </Card.Content>
                </Card>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  smallContainer: {
    paddingTop: 6,
    paddingBottom: 12,
    marginHorizontal: 20,
    flexDirection: 'column',
  },
  Categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
  },
  Search: {
    backgroundColor: 'white',
  },
  boxShadow: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 24,
    marginTop: 12,
    overflow: 'hidden',
    shadowColor: '#a0a2a3',
    shadowOpacity: 0.8,
    borderColor: '#4CD0BD',
  },
  verticalStack: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'white',
    gap: 12,
  },
  container: {
    padding: 1,
    gap: 4,
    marginTop: 10,
    flexDirection: 'row',
    width: '45%',
  },
  scrollView: {
    marginHorizontal: 2,
    flex: 1,
    flexDirection: 'column',
  },
  containerVertical: {
    padding: 1,
    marginTop: 10,
    marginHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: 'white',
  },
  card: {
    backgroundColor: '#4CD0BD',
    width: '42%',
    marginHorizontal: 4,
    height: 220,
  },
  cardchat: {
    height: 220,
    width: 200,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    color: '#37383b',
  },
  whiteText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    color: 'white',
  },
  whiteTextSmall: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'normal',
  },
  smallText: {
    fontSize: 14,
    color: '#37383b',
    fontWeight: 'bold',
  },
  whiteBackground: {
    backgroundColor: '#6eccff',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  blueText: {
    color: '#70B4FA',
  },
});