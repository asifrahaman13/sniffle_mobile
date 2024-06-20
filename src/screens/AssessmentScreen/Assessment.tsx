import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import React from 'react';

import {DataRepository} from '../../infrastructure/repositories/DataRepository';
import {DataService} from '../../domain/usecases/DataService';
import {DataInterface} from '../../domain/interfaces/DataInterface';
import {getToken} from '../../helper/tokens';
import {useIsFocused} from '@react-navigation/native';

import {AssessmeentMetrics} from '../../types/HeatlhDataType';
import {Card, Paragraph, Text, Title} from 'react-native-paper';
import Markdown from 'react-native-markdown-display';

import {formatDateInIST} from '../../helper/time';
import Loading from '../components/Loading';
import Error from '../components/Error';
import {TouchableOpacity} from 'react-native';
import {ExportRepository} from '../../infrastructure/repositories/ExportRepository';
import {ExportService} from '../../domain/usecases/ExportService';
import {ExportInterface} from '../../domain/interfaces/ExportInterface';

const dataRepository = new DataRepository();
const data_interface: DataInterface = new DataService(dataRepository);

const exportRepository = new ExportRepository();
const export_interface: ExportInterface = new ExportService(exportRepository);

export default function Assessment() {
  const isFocused = useIsFocused();
  const [healthData, setHealthData] = React.useState<AssessmeentMetrics[]>([]);
  const [datastate, setDataState] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Function to get th
    async function assessmentMetrics() {
      setDataState('loading');
      // Get the idToken from async storage.

      try {
        const idToken = await getToken();

        // if idToken exists then proceed.
        if (idToken) {
          // Call the GetAssessmentMetrics function to fetch the assessments.
          const response = await data_interface.GetAssessmeentMetrics(idToken);
          if (response?.code === 200) {
            // Set the healthData state with the response data.
            setHealthData(response.data);
            setDataState('loaded');
          }
        }
      } catch (err) {
        console.log(err);
        setDataState('error');
      }
    }
    if (isFocused) {
      assessmentMetrics();
    }
  }, [isFocused]);

  async function exportData() {
    try {
      const idToken = await getToken();
      if (idToken) {
        const response = await export_interface.ExportData(
          idToken,
          'assessment_metrics',
        );
        if (response?.code === 200) {
          console.log('success');
        } else {
          console.log('Error exporting data');
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <ScrollView style={styles.messagesContainer}>
        <Paragraph style={styles.paragraph}>
          **This screen displays a assessments our AI agent did on your health.
          This is basically a summary of the conversation you and the agents
          had.
        </Paragraph>
        <View>
          <TouchableOpacity
            onPress={() => {
              exportData();
            }}>
            <Text style={styles.header}>Export 📧</Text>
          </TouchableOpacity>
        </View>

        {datastate === 'loading' && healthData.length === 0 && <Loading />}
        {datastate === 'error' && (
          <Error message="Something went wrong most probably you have no data yet. Please chat with our agents to provide some details. It can be found in home page" />
        )}

        {(datastate === 'loaded' || healthData.length > 0) && (
          <>
            <View style={styles.columnContainer}>
              {healthData.map((item, index) => (
                <TouchableWithoutFeedback
                  // onPress={() => navigation.navigate('Chat')}
                  key={index.toString() + item.timestamp}
                  style={[styles.whiteBackground, styles.boxShadow]}>
                  <Card style={styles.whiteBackground}>
                    <Card.Content>
                      <Title style={[styles.header, styles.whiteText]}>
                        {formatDateInIST(item.timestamp)}
                      </Title>
                      <Markdown
                        style={{
                          body: {color: 'white', fontSize: 14},
                        }}>
                        {item.summary}
                      </Markdown>
                    </Card.Content>
                  </Card>
                </TouchableWithoutFeedback>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  columnContainer: {
    flex: 1,
    gap: 12,
  },
  smallContainer: {
    paddingTop: 6,
    paddingBottom: 12,
    marginHorizontal: 20,
    flexDirection: 'column',
  },
  messagesContainer: {
    flex: 1,
    padding: 12,
    backgroundColor: 'white',
  },
  Categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    marginTop: 20,
    marginBottom: 20,
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
    paddingVertical: 12,
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
    flex: 1,
    gap: 12,
  },
  blueText: {
    color: '#70B4FA',
  },
  paragraph: {
    marginHorizontal: 12,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginVertical: 12,
  },
});
