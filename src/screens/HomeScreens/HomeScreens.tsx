import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Card, Paragraph, Searchbar, Title} from 'react-native-paper';
import {GeneralAgetns, stackedData} from '../../constants/constants.data';

import {UserInterface} from '../../domain/interfaces/UserInterface';
import {UserService} from '../../domain/usecases/UserService';
import {UserRepository} from '../../infrastructure/repositories/UserRepository';

import {getToken} from '../../helper/tokens';

import {AgentVariations} from '../../constants/constants.data';
import Icon from 'react-native-vector-icons/FontAwesome';
import {DataRepository} from '../../infrastructure/repositories/DataRepository';
import {DataService} from '../../domain/usecases/DataService';
import {DataInterface} from '../../domain/interfaces/DataInterface';
import {SearchResult} from '../../types/SearchType';

const userRepository = new UserRepository();
const user_interface: UserInterface = new UserService(userRepository);

const dataRepository = new DataRepository();
const data_interface: DataInterface = new DataService(dataRepository);

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
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const handleSearch = async () => {
    console.log(searchQuery);
    try {
      const token = (await getToken()) || '';
      const response = await data_interface.Search(token, searchQuery);
      console.log('Response:', response?.data);
      if (response?.code === 200) {
        console.log('Response:', response.data);
        setSearchResults(response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlePress = (result: SearchResult) => {
    // Navigate to the specified screen
    navigation.navigate(result?.metadata?.screen, {
      chatVariant: result?.metadata?.chatVariant,
      voiceVariant: result?.metadata?.chatVariant,
      agentId: result?.metadata?.agent_id,
    });
    setSearchResults([]);
  };

  const handleClear = () => {
    // Perform the action when the clear button is clicked
    setSearchQuery('');
    console.log('Search cleared');
    setSearchResults([]);
  };

  return (
    <>
      <SafeAreaView style={styles.verticalStack}>
        <View style={styles.smallContainer}>
          <View>
            <Text style={[styles.smallText, styles.blueText]}>Hello, </Text>
            <Text style={[styles.header, styles.blueText]}>
              {userdata.name}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Settings', {
                  chatVariant: 'Settings',
                })
              }>
              <Icon name="cog" size={25} color="#f2742c" />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.searchbox}>
            <View style={styles.boxShadow}>
              <Searchbar
                placeholder="Search"
                onChangeText={setSearchQuery}
                value={searchQuery}
                style={styles.Search}
                onSubmitEditing={handleSearch}
                onClearIconPress={handleClear}
              />
            </View>
            <View style={styles.listContainer}>
              {searchResults.map((result, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.itemContainer}
                  onPress={() => handlePress(result)}>
                  <Text style={styles.subheader}>{result?.text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.Categories}>
            <Text style={[styles.header, styles.blueText]}>
              Data collection
            </Text>

            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('About Data Collection', {})}>
              <Text style={[styles.smallText, styles.blueText]}>
                Learn more
              </Text>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.rowcontiainer}>
            {AgentVariations.map((item, index) => (
              <>
                {item.agent_type === 'chat' && (
                  <TouchableWithoutFeedback
                    key={index.toString() + item.title}
                    onPress={() =>
                      navigation.navigate('Chat', {
                        chatVariant: item.title,
                        agentId: item.agent_id,
                      })
                    }>
                    <Card style={[item.color, styles.card]}>
                      <Card.Content>
                        <Title style={[styles.whiteText]}>{item.title}</Title>
                        <Paragraph style={styles.whiteTextSmall}>
                          {item?.description}
                        </Paragraph>
                      </Card.Content>
                    </Card>
                  </TouchableWithoutFeedback>
                )}
                {item.agent_type === 'voice' && (
                  <TouchableWithoutFeedback
                    key={index.toString() + item.title}
                    onPress={() =>
                      navigation.navigate('Voice', {
                        voiceVariant: item.title,
                        agentId: item.agent_id,
                      })
                    }>
                    <Card style={[item.color, styles.card]}>
                      <Card.Content>
                        <Title style={[styles.whiteText]}>{item.title}</Title>
                        <Paragraph style={styles.whiteTextSmall}>
                          {item?.description}
                        </Paragraph>
                      </Card.Content>
                    </Card>
                  </TouchableWithoutFeedback>
                )}
              </>
            ))}
          </View>

          <View style={styles.Categories}>
            <Text style={[styles.header, styles.blueText]}>Tools</Text>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('About our tools', {})}>
              <Text style={[styles.smallText, styles.blueText]}>
                Learn more
              </Text>
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.containerVertical}>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('Fhir')}
              style={[styles.whiteBackground, styles.boxShadow]}>
              <Card style={styles.whiteBackground}>
                <Card.Content>
                  <Title style={[styles.header, styles.whiteText]}>
                    Image to FHIR file
                  </Title>
                  <Paragraph style={styles.whiteTextSmall}>
                    Use our AI to convert your health pescriptiont into FHIR
                    file format. The FHIR files prove to be very useful when you
                    need to transfer your health data over technology.
                  </Paragraph>
                </Card.Content>
              </Card>
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.Categories}>
            <Text style={[styles.header, styles.blueText]}>
              General conversation
            </Text>
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate('About our general conversation agent', {})
              }>
              <Text style={[styles.smallText, styles.blueText]}>
                Learn more
              </Text>
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.rowcontiainer}>
            {GeneralAgetns.map((item, index) => (
              <>
                {item.agent_type === 'chat' && (
                  <TouchableWithoutFeedback
                    key={index.toString() + item.title}
                    onPress={() =>
                      navigation.navigate('Chat', {
                        chatVariant: item.title,
                        agentId: item.agent_id,
                      })
                    }>
                    <Card style={[item.color, styles.card]}>
                      <Card.Content>
                        <Title style={[styles.whiteText]}>{item.title}</Title>
                        <Paragraph style={styles.whiteTextSmall}>
                          {item?.description}
                        </Paragraph>
                      </Card.Content>
                    </Card>
                  </TouchableWithoutFeedback>
                )}
                {item.agent_type === 'voice' && (
                  <TouchableWithoutFeedback
                    key={index.toString() + item.title}
                    onPress={() =>
                      navigation.navigate('Voice', {
                        voiceVariant: item.title,
                        agentId: item.agent_id,
                      })
                    }>
                    <Card style={[item.color, styles.card]}>
                      <Card.Content>
                        <Title style={[styles.whiteText]}>{item.title}</Title>
                        <Paragraph style={styles.whiteTextSmall}>
                          {item?.description}
                        </Paragraph>
                      </Card.Content>
                    </Card>
                  </TouchableWithoutFeedback>
                )}
              </>
            ))}
          </View>

          <View style={styles.Categories}>
            <Text style={[styles.header, styles.blueText]}>Why us?</Text>
            {/* <Text style={[styles.smallText, styles.blueText]}>Learn more</Text> */}
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
  searchbox: {
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  listContainer: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
    width: '100%',
    transform: [{translateY: -20}],
  },
  subheader: {
    fontSize: 14,
    color: 'black',
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: 'white',
  },
  searchResultContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  rowcontiainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 4,
  },
  smallContainer: {
    paddingTop: 6,
    paddingBottom: 12,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    width: '100%',
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
    marginHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: 'white',
  },
  card: {
    // backgroundColor: '#4CD0BD',
    width: '46%',
    marginHorizontal: 2,
    marginTop: 12,
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
