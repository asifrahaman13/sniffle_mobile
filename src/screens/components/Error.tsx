import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({message}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8d7da',
    padding: 15,
    borderRadius: 5,
    borderColor: '#f5c6cb',
    borderWidth: 1,
    margin: 10,
  },
  text: {
    color: '#721c24',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Error;
