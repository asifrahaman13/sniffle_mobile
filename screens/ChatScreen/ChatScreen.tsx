import React, {useState, useEffect, useRef} from 'react';
import {Button, StyleSheet, Text, View, TextInput} from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';

import {WEBSOCKET_URI} from '@env';

export default function ChatScreen({navigation}: any) {
  console.log(navigation);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      type: 'client',
      message: 'Hello',
    },
  ]);
  const websocketRef = useRef<WebSocket | null>(null);
  // const count = useSelector(
  //   (state: {counter: {value: any}}) => state.counter.value,
  // );
  // const dispatch = useDispatch();

  useEffect(() => {
    // Create WebSocket connection and store it in the ref
    const websocket = new WebSocket(WEBSOCKET_URI);
    websocketRef.current = websocket;

    websocket.onopen = () => {
      console.log('WebSocket connection opened');
    };

    websocket.onmessage = event => {
      console.log('#### event-', event);
      const receivedMessage = JSON.parse(event.data);
      console.log(receivedMessage);
      setMessages(prevMessages => [
        ...prevMessages,
        {type: 'server', message: receivedMessage},
      ]);
    };

    websocket.onerror = error => {
      console.error('WebSocket error:', error);
    };

    websocket.onclose = event => {
      console.log('WebSocket connection closed:', event);
    };

    // Cleanup on unmount
    return () => {
      websocket.close();
    };
  }, []);

  const sendMessage = () => {
    if (websocketRef.current) {
      websocketRef.current.send(JSON.stringify({message}));
      setMessage('');
    }
    setMessages(prevMessages => [
      ...prevMessages,
      {type: 'server', message: message},
    ]);
  };

  return (
    <View style={styles.container}>
      {messages?.map((item, index) => (
        <>
          <View>
            <Text key={index} style={styles.header}>
              {item?.message}
            </Text>
          </View>
        </>
      ))}
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message"
      />
      <Button title="Send" onPress={sendMessage} />
      {/* <Button
        title="Go to Home page... again"
        onPress={() => navigation.navigate('Home')}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
  },
  chatList: {
    flex: 1,
    width: '100%',
    color: 'black',
  },
  messageContainer: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  messageText: {
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  count: {
    fontSize: 30,
  },
  header: {
    fontSize: 20,
    color: 'black',
  },
});
