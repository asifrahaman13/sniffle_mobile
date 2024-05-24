import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Card, Paragraph, Title} from 'react-native-paper';

export default function Home({navigation}: any) {
  const stackedData = [
    {
      id: '4',
      title: 'Stacked Card 1',
      description:
        'Share your data with other platform for better conmmunication. We have multiple export options available.',
    },
    {
      id: '5',
      title: 'Stacked Card 2',
      description:
        'Share your data with other platform for better conmmunication. We have multiple export options available.',
    },
    {
      id: '6',
      title: 'Stacked Card 2',
      description:
        'Share your data with other platform for better conmmunication. We have multiple export options available.',
    },
    {
      id: '7',
      title: 'Stacked Card 2',
      description:
        'Share your data with other platform for better conmmunication. We have multiple export options available.',
    },
  ];
  return (
    <>
      <SafeAreaView style={styles.verticalStack}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('Details')}>
              <Card style={styles.card}>
                <Card.Content>
                  <Title style={styles.header}>Entry Chat</Title>
                  <Paragraph>
                    Enter your details through chat with our agent
                  </Paragraph>
                </Card.Content>
              </Card>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('Details')}>
              <Card style={styles.cardchat}>
                <Card.Content>
                  <Title style={styles.header}>Another Card</Title>
                  <Paragraph>More content goes here.</Paragraph>
                </Card.Content>
              </Card>
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.containerVertical}>
            {stackedData.map((item, index) => (
              <>
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate('Details')}
                  key={index}>
                  <Card style={styles.cardchats}>
                    <Card.Content>
                      <Title style={styles.header}>{item?.title}</Title>
                      <Paragraph>{item?.description}</Paragraph>
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
  verticalStack: {
    flexDirection: 'column',
    flex: 1,
  },
  container: {
    padding: 1,
    marginHorizontal: 20,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
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
  },
  card: {
    backgroundColor: '#c9f5ed',
    width: '50%',
    marginHorizontal: 4,
  },
  cardchat: {
    backgroundColor: '#f5f2c9',
  },
  cardchats: {
    backgroundColor: '#daf7cb',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
  },
});
