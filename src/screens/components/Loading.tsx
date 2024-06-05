import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import React from 'react';

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#32a852" />
      <Text style={styles.header}>Loading your data please wait...</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: '#32a852',
  },
});
