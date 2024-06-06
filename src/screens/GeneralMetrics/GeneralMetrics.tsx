import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {getToken} from '../../helper/tokens';
import Markdown from 'react-native-markdown-display';
import {WEBSOCKET_URI} from '@env';

// import {useDispatch, useSelector} from 'react-redux';

export default function GeneralMetrics({route, navigation}: any) {
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
        // Get the token frm async storage.
        const idToken = await getToken();

        // If token is present, then create a websocket connection.
        if (idToken) {
          console.log('idToken:', idToken);
          setToken(idToken);
          console.log('token:', token);

          //  Get the web socket connection uri from env file.
          const websocket_uri = WEBSOCKET_URI;

          console.log(`${websocket_uri}/general_metrics/${idToken}`);

          // Create a websocket connection.
          const websocket = new WebSocket(
            `${websocket_uri}/general_metrics/${idToken}`,
          );

          // Store the websocket connection in a ref.
          websocketRef.current = websocket;

          // Set the onopen, onmessage, onerror and onclose event listeners.
          websocket.onopen = () => {
            console.log('WebSocket connection opened');
          };

          // On receiving a message, parse the message and add it to the messages array.
          websocket.onmessage = event => {
            try {
              console.log('Received message:', event.data);
              // Parse the message on receiving from the client.
              const receivedMessage = JSON.parse(event.data);

              // Add the message to the messages array.
              setMessages(prevMessages => [
                ...prevMessages,
                {type: 'server', message: receivedMessage},
              ]);
            } catch (error) {
              console.error('Error in onmessage:', error);
            }
          };

          // On error, log the error message.
          websocket.onerror = error => {
            console.log('WebSocket error:', error.message);
          };

          // On closing the connection, log the reason.
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
    // If websocket connection is present, then send the message.
    if (websocketRef.current) {
      const messageObject = {query: message};
      websocketRef.current.send(JSON.stringify(messageObject));
      setMessage('');
    }

    // Add the message to the messages array.
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

      {messages[0].type === '' && (
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/bot.jpg')}
            style={styles.image}
          />
          <Text style={styles.subheader}>
            Hit the send button to start the conversation.
          </Text>
        </View>
      )}

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
  subheader: {
    fontSize: 16,
    color: '#7dc6f0',
  },
  imageContainer: {
    alignItems: 'center',
    height: '60%',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 400,
    resizeMode: 'contain',
  },
  header: {
    color: '#56bce8',
    fontWeight: 'bold',
    fontSize: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
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
