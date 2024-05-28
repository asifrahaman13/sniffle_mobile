import {
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {DataRepository} from '../../infrastructure/repositories/DataRepository';
import {DataService} from '../../domain/usecases/DataService';
import {DataInterface} from '../../domain/interfaces/DataInterface';
import {getToken} from '../../helper/tokens';
import {Card, Paragraph, Text, Title} from 'react-native-paper';

import {Recommendations} from '../../types/HeatlhDataType';

const dataRepository = new DataRepository();
const data_interface: DataInterface = new DataService(dataRepository);

export default function Recommendation() {
  const [recommendations, setRecommendation] = useState<Recommendations>();

  React.useEffect(() => {
    async function getRecommendations() {
      const idToken = await getToken();
      if (idToken) {
        const response = await data_interface.GetRecommendations(idToken);
        if (response?.code === 200) {
          console.log(response.data);
          setRecommendation(response?.data);
        }
      }
    }
    getRecommendations();
  }, []);

  return (
    <>
      <ScrollView>
        {recommendations &&
          Object.keys(recommendations).map((key, index) => (
            <View key={index}>
              <Text>{key}</Text>
              {recommendations[key as keyof Recommendations].map(
                (item, subIndex) => (
                  <TouchableWithoutFeedback
                    key={`${index}-${subIndex}`}
                    style={[styles.whiteBackground, styles.boxShadow]}>
                    <Card style={styles.whiteBackground}>
                      <Card.Content>
                        <Title style={[styles.header, styles.whiteText]}>
                          {item?.title}
                        </Title>
                        <Paragraph style={styles.whiteTextSmall}>
                          {item?.details}
                        </Paragraph>
                      </Card.Content>
                    </Card>
                  </TouchableWithoutFeedback>
                ),
              )}
            </View>
          ))}
      </ScrollView>
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
    marginTop: 8,
    marginHorizontal: 6,
  },
  blueText: {
    color: '#70B4FA',
  },
});
