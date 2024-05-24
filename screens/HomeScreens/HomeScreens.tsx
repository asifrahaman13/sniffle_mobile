import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {Card, Paragraph, Title} from 'react-native-paper';

export default function Home({navigation}: any) {
  return (
    <>
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Details')}>
          <Card style={styles.card}>
            <Card.Content>
              <Title>Entry Chat</Title>
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
              <Title>Another Card</Title>
              <Paragraph>More content goes here.</Paragraph>
            </Card.Content>
          </Card>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 1,
    marginHorizontal: 20,
    marginTop: 10,
    flexDirection: 'row',
    height: 250,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#c9f5ed',
    height: '60%',
    width: '50%',
    marginHorizontal: 4,
  },
  cardchat: {
    backgroundColor: '#f5f2c9',
    height: '60%',
  },
});
