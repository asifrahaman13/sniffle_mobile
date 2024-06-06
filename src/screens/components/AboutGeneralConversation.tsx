import React from 'react';
import {Text, StyleSheet, ScrollView} from 'react-native';

export default function AboutGeneralConversation() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>About our general conversation agent </Text>
      <Text style={styles.paragraph}>
        Our general conversation agent helps to provide you with personalized
        health infromation. Whether you need to know about particular data,
        facts or whether you need help in improving your health our agent can do
        all.
      </Text>
      <Text style={styles.paragraph}>
        Specailly creafter to meet your requirements in friendly tone.
      </Text>
      <Text style={styles.paragraph}>
        We value your privacy and are committed to protecting your personal
        information. You have full control over the data you share with us, and
        you can update or delete your information at any time.
      </Text>
      <Text style={styles.paragraph}>
        If you have any questions or concerns about our data collection process,
        feel free to contact our support team. We're here to help!
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    color: '#666',
  },
});
