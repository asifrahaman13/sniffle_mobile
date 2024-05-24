import React from 'react';
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

export default function Home({navigation}: any) {
  const [searchQuery, setSearchQuery] = React.useState('');
  return (
    <>
      <SafeAreaView style={styles.verticalStack}>
        <View style={styles.smallContainer}>
          <Text style={[styles.smallText, styles.blueText]}>Hello, </Text>
          <Text style={[styles.header, styles.blueText]}>Mr Abdulf</Text>
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
            <Text style={[styles.header, styles.blueText]}>Categories</Text>
            <Text style={[styles.smallText, styles.blueText]}>See more</Text>
          </View>
          <ScrollView horizontal={true}>
            <View style={styles.container}>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('Details')}>
                <Card style={[styles.backgroundGreen, styles.cardchat]}>
                  <Card.Content>
                    <Title style={[styles.whiteText]}>Another Card</Title>
                    <Paragraph style={styles.whiteTextSmall}>
                      More content goes here.
                    </Paragraph>
                  </Card.Content>
                </Card>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('Details')}>
                <Card style={[styles.cardchat, styles.backgroundBlue]}>
                  <Card.Content>
                    <Title style={styles.whiteText}>See recommendataion</Title>
                    <Paragraph style={styles.whiteTextSmall}>
                      Click here to see the recommendations specially for you.
                    </Paragraph>
                  </Card.Content>
                </Card>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('Details')}>
                <Card style={[styles.cardchat, styles.backgroundRed]}>
                  <Card.Content>
                    <Title style={styles.whiteText}>See recommendataion</Title>
                    <Paragraph style={styles.whiteTextSmall}>
                      Click here to see the recommendations specially for you.
                    </Paragraph>
                  </Card.Content>
                </Card>
              </TouchableWithoutFeedback>
            </View>
          </ScrollView>

          <View style={styles.Categories}>
            <Text style={[styles.header, styles.blueText]}>Latest blogs</Text>
            <Text style={[styles.smallText, styles.blueText]}>See more</Text>
          </View>

          <View style={styles.containerVertical}>
            {stackedData.map((item, index) => (
              <>
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate('Details')}
                  key={index}
                  style={styles.whiteBackground}>
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
              </>
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
    maxWidth: '45%',
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
  },
  backgroundBlue: {
    backgroundColor: '#70B4FA',
  },
  backgroundGreen: {
    backgroundColor: '#4CD0BD',
  },
  backgroundRed: {
    backgroundColor: '#FB9881',
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
