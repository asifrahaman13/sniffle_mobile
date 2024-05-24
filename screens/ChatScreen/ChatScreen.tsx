import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';

import {WEBSOCKET_URI} from '@env';

export default function ChatScreen({navigation}: any) {
  console.log(navigation);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      type: null,
      message: null,
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
      {type: 'client', message: message},
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.messagesContainer}>
        {messages.map((item, index) => (
          <>
            {item.type && (
              <View
                key={index}
                style={[
                  styles.messageBubble,
                  item.type === 'client'
                    ? styles.clientMessage
                    : styles.serverMessage,
                ]}>
                <Text style={styles.messageText}>{item.message}</Text>
              </View>
            )}
          </>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message"
        />
        <TouchableOpacity onPress={sendMessage} style={styles.button}>
          <Text style={styles.messageText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  messagesContainer: {
    flex: 1,
  },
  messageBubble: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: '80%',
  },
  clientMessage: {
    backgroundColor: '#FB9980',
    alignSelf: 'flex-end',
  },
  serverMessage: {
    backgroundColor: '#4DD0BC',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ECECEC',
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#FFF',
    color: 'black',
  },
  button: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#4DD0BC',
  },
});
