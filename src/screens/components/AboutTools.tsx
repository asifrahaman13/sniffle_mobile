import React from 'react';
import {Text, StyleSheet, ScrollView} from 'react-native';

export default function AboutTools() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>About our tools</Text>
      <Text style={styles.paragraph}>
        Our present image to FHIR tool helps to provide you with creating FHIR
        file fromat from the image you provide.FHIR is the industry standard on
        how to manage and exchange healthcare data over technology. Please note
        that currently we only support PNG and JPEG image formats and it is not
        yet production ready. So sometimes it may cause error.
      </Text>
      <Text style={styles.paragraph}>
        The process is simple. You just need to select your image from the
        device and hit the upload button. It will take some time and hence you
        can safely go back and come back lter. Remember to please keep your
        image as a healthcare prescription only
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
