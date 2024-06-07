import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import React from 'react';

export default function ConnectionScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color="#32a852" />
      <Text style={styles.header}>Connecting with server please wait...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: '#32a852',
  },
});
