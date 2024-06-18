import React from 'react';
import {useCallback, useEffect, useRef, useState} from 'react';
import {
  Image,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {DEEPGRAM_API_KEY, WEBSOCKET_URI} from '../../../config/config';

const Pause = () => <Text style={styles.record}>Done</Text>;

const Record = () => <Text style={styles.record}>Record</Text>;

const useMicrophonePermissions = () => {
  const checkPermissions = async () => {
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'This app needs access to your microphone to record audio.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return result === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };
  return {checkPermissions};
};

// const AudioVisualizer = () => {
//   return (
//     <View>
//       {/* Implement your audio visualizer here */}
//       <Text>Audio Visualizer</Text>
//     </View>
//   );
// };

import axios from 'axios';
import RNFS from 'react-native-fs';
import {Buffer} from 'buffer';
import TrackPlayer from 'react-native-track-player';
import {getToken} from '../../../helper/tokens';
import ConnectionScreen from '../ConnectionScreen';
import {audioSet} from '../../../constants/constants.data';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const AudioRecord = ({route, navigation}: any) => {
  console.log(route, navigation);
  const {voiceVariant, agentId} = route.params;
  console.log(voiceVariant, agentId);
  const audioRecorderPlayer = useRef(new AudioRecorderPlayer()).current;
  const {checkPermissions} = useMicrophonePermissions();

  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [firstPlay, setFirstPlay] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  const getAudioResponse = (text: string) => {
    if (!text) {
      return;
    }
    const message = {
      query: text,
    };
    ws?.send(JSON.stringify(message));
  };

  const sendAudioToDeepgram = async (audioBase64: string) => {
    const apiKey = DEEPGRAM_API_KEY;

    try {
      console.log('Sending audio to Deepgram');
      const audioData = await RNFS.readFile(audioBase64, 'base64');
      const buffer = Buffer.from(audioData, 'base64');

      const response = await axios.post(
        'https://api.deepgram.com/v1/listen',
        buffer,
        {
          headers: {
            Authorization: `Token ${apiKey}`,
            'Content-Type': 'audio/*',
          },
        },
      );
      const text =
        response?.data?.results?.channels?.[0]?.alternatives?.[0]?.transcript ||
        '';

      console.log('############## response-', text);

      getAudioResponse(text);
    } catch (e: any) {
      console.log('#### e-', e?.response?.data);
    }
  };

  const handleRecord = useCallback(async () => {
    const granted = await checkPermissions();
    if (!granted) {
      return;
    }

    if (isRecording) {
      await TrackPlayer.reset();

      const audioUri = await audioRecorderPlayer.stopRecorder();
      sendAudioToDeepgram(audioUri);

      setIsRecording(false);

      return;
    }

    if (!isRecording && duration > 0) {
      await audioRecorderPlayer.resumeRecorder();
      setIsRecording(true);
    }

    setFirstPlay(false);

    await audioRecorderPlayer.startRecorder(undefined, audioSet, true);
    audioRecorderPlayer.addRecordBackListener(({currentPosition}) => {
      setDuration(Math.floor(currentPosition));
    });

    setIsRecording(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioRecorderPlayer, checkPermissions, duration, isRecording]);

  const playAudio = async (data: string) => {
    await TrackPlayer.add({
      id: 'trackId3',
      url: `data:audio/wav;base64,${data}`,
      title: 'Track Title',
      artist: 'Track Artist',
    });
    await TrackPlayer.play();
  };

  useEffect(() => {
    const websockerUrl = WEBSOCKET_URI;

    async function setUpVoice() {
      const idToken = await getToken();
      if (idToken) {
        const websocket = new WebSocket(
          `${websockerUrl}/voice/${agentId}/${idToken}`,
        );

        websocket.onopen = async () => {
          setIsConnected(true);
          await TrackPlayer.setupPlayer();
          console.log('WebSocket connection opened');
        };

        websocket.onmessage = async event => {
          // console.log('### event?.data-', event);
          playAudio(event?.data);
        };

        websocket.onerror = error => {
          console.error('WebSocket error:', error);
        };

        websocket.onclose = event => {
          console.log('WebSocket connection closed:', event);
        };

        setWs(websocket);
      }
    }
    setUpVoice();

    // return () => {
    //   websocket.close();
    // };
  }, [agentId]);

  useEffect(() => {
    const unsubscribe = async () => {
      await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
    };

    return () => {
      unsubscribe();
    };
  }, [audioRecorderPlayer]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {firstPlay ? (
          <Text style={styles.primaryText}> {voiceVariant}</Text>
        ) : (
          <Text style={styles.primaryText}>
            {!isRecording ? 'Paused' : 'Done?'}
          </Text>
        )}
        <Text style={styles.secondaryText}>
          {isRecording
            ? 'Press the Done button when you are done'
            : 'Press the Mic button to continue talking'}
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../assets/images/bot.jpg')}
          style={styles.image}
        />
      </View>
      {/* <AudioVisualizer /> */}

      {isConnected ? (
        <View style={styles.footer}>
          <Pressable onPress={handleRecord} style={styles.button}>
            {isRecording ? <Pause /> : <Record />}
          </Pressable>
        </View>
      ) : (
        <ConnectionScreen />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  record: {
    color: 'white',
  },
  image: {
    width: 300,
    height: 400,
    resizeMode: 'contain', // Other options: 'cover', 'stretch', etc.
  },
  imageContainer: {
    alignItems: 'center',
    height: '70%',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  primaryText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#343a40',
  },
  secondaryText: {
    fontSize: 16,
    color: '#6c757d',
    marginTop: 10,
    textAlign: 'center',
  },
  visualizer: {
    flex: 1,
    width: '100%',
    marginVertical: 20,
  },
  footer: {
    marginBottom: 20,
  },
  button: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5856e',
    borderRadius: 30,
  },
});

export default AudioRecord;
