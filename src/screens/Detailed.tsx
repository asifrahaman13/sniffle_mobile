import {View, Text, Button} from 'react-native';
import React from 'react';
import {increment} from '../features/counter/counterSlice';
import {useDispatch, useSelector} from 'react-redux';

export default function Detailed() {
  const count = useSelector(
    (state: {counter: {value: any}}) => state.counter.value,
  );
  const dispatch = useDispatch();

  return (
    <View>
      <Text>{count}</Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
    </View>
  );
}
