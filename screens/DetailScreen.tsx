import React from 'react'; // Import React
import {Button, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {increment} from '../features/counter/counterSlice';

export default function DetailsScreen({navigation}: any) {
  const count = useSelector(
    (state: {counter: {value: any}}) => state.counter.value,
  );
  const dispatch = useDispatch();

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Home page... again"
        onPress={() => navigation.navigate('Home')}
      />
      <Text style={styles.header}>{count}</Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    fontSize: 30,
  },
  header: {
    color: 'black',
  },
});
