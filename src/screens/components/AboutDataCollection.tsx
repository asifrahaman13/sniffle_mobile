import React from 'react';
import {Text, StyleSheet, ScrollView} from 'react-native';

export default function AboutDataCollection() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>About Data Collection</Text>
      <Text style={styles.paragraph}>
        Our mobile application helps collect data through chat bots to enhance
        your user experience. We aim to provide personalized content and
        services based on the data we collect. This ensures that you get the
        most relevant and useful information tailored to your needs.
      </Text>
      <Text style={styles.paragraph}>
        The data collection process is simple and secure. Our chat bots will ask
        you a series of questions, and your responses will help us understand
        your preferences better. All the data collected is stored securely and
        used solely for improving our services.
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
