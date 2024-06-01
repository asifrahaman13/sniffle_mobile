import React from 'react';
import {useCallback, useEffect, useRef, useState} from 'react';
import {
  PermissionsAndroid,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  OutputFormatAndroidType,
} from 'react-native-audio-recorder-player';

const Pause = () => <Text>Pause</Text>;

const Record = () => <Text>Record</Text>;

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

const AudioVisualizer = () => {
  return (
    <View>
      {/* Implement your audio visualizer here */}
      <Text>Audio Visualizer</Text>
    </View>
  );
};

import axios from 'axios';
import RNFS from 'react-native-fs';
import {Buffer} from 'buffer';
import TrackPlayer from 'react-native-track-player';
import {getToken} from '../../../helper/tokens';

const audioSet: AudioSet = {
  AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
  AudioSamplingRateAndroid: 44100,
  AudioSourceAndroid: AudioSourceAndroidType.MIC,
  AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
  AVNumberOfChannelsKeyIOS: 2,
  AVFormatIDKeyIOS: AVEncodingOption.aac,
  OutputFormatAndroid: OutputFormatAndroidType.MPEG_4,
};

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
    const apiKey = process.env.DEEPGRAM_API_KEY;

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
    const websockerUrl = process.env.WEBSOCKET_URI_VOICE;

    async function setUpVoice() {
      const idToken = await getToken();
      if (idToken) {
        const websocket = new WebSocket(
          `${websockerUrl}/voice/${agentId}/${idToken}`,
        );

        websocket.onopen = async () => {
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
    <View>
      <View>
        {firstPlay ? (
          <Text>Let's chat</Text>
        ) : (
          <Text>{!isRecording ? 'Paused' : 'Need time to think?'}</Text>
        )}
        <Text>
          {isRecording
            ? 'Press the Pause button till you are ready'
            : 'Press the Mic button to continue talking'}
        </Text>
      </View>
      <AudioVisualizer />
      <View>
        <Pressable onPress={handleRecord}>
          {isRecording ? <Pause /> : <Record />}
        </Pressable>
      </View>
    </View>
  );
};

export default AudioRecord;
