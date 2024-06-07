import Config from 'react-native-config';

const {WEBSOCKET_URI, GOOGLE_CLIENT_ID, BACKEND_URI, DEEPGRAM_API_KEY} = Config;

console.log(
  'The configuarations are',
  WEBSOCKET_URI,
  GOOGLE_CLIENT_ID,
  BACKEND_URI,
  DEEPGRAM_API_KEY,
);

export {WEBSOCKET_URI, GOOGLE_CLIENT_ID, BACKEND_URI, DEEPGRAM_API_KEY};
