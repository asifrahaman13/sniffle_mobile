import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {getToken} from '../../helper/tokens';
import Markdown from 'react-native-markdown-display';

// import {useDispatch, useSelector} from 'react-redux';

export default function ChatScreen({route, navigation}: any) {
  const {chatVariant, agentId} = route.params;
  console.log(chatVariant, agentId);
  console.log(navigation);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      type: '',
      message: '',
    },
  ]);
  const websocketRef = useRef<WebSocket | null>(null);
  // const count = useSelector(
  //   (state: {counter: {value: any}}) => state.counter.value,
  // );
  // const dispatch = useDispatch();

  const [token, setToken] = useState<string | null>('');

  useEffect(() => {
    async function getId() {
      try {
        const idToken = await getToken();
        if (idToken) {
          console.log('idToken:', idToken);
          setToken(idToken);
          console.log('token:', token);
          const websocket_uri = process.env.WEBSOCKET_URI;
          const websocket = new WebSocket(
            `${websocket_uri}/${agentId}/${idToken}`,
          );
          websocketRef.current = websocket;

          websocket.onopen = () => {
            console.log('WebSocket connection opened');
          };

          websocket.onmessage = event => {
            try {
              console.log('Received message:', event.data);
              const receivedMessage = JSON.parse(event.data);
              setMessages(prevMessages => [
                ...prevMessages,
                {type: 'server', message: receivedMessage},
              ]);
            } catch (error) {
              console.error('Error in onmessage:', error);
            }
          };

          websocket.onerror = error => {
            console.log('WebSocket error:', error.message);
          };

          websocket.onclose = event => {
            console.log('WebSocket connection closed:', event.reason);
          };
        }
      } catch (error) {
        console.error('Error in getId:', error);
      }
    }
    getId();

    return () => {
      if (websocketRef.current) {
        websocketRef.current.close();
      }
    };
  }, [agentId, token]);

  const sendMessage = () => {
    if (websocketRef.current) {
      const messageObject = {query: message};
      websocketRef.current.send(JSON.stringify(messageObject));
      setMessage('');
    }
    setMessages(prevMessages => [
      ...prevMessages,
      {type: 'client', message: message},
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.centering}>
        <Text style={styles.header}>{chatVariant}</Text>
      </View>
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
                {/* <Text style={styles.messageText}>{item.message}</Text> */}
                <Markdown
                  style={{
                    body: {color: 'white', fontSize: 14},
                  }}>
                  {item.message}
                </Markdown>
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
  header: {
    color: '#56bce8',
    fontWeight: 'bold',
    fontSize: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  centering: {
    flexDirection: 'row',
    justifyContent: 'center',
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
