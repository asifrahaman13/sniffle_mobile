import {
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  OutputFormatAndroidType,
} from 'react-native-audio-recorder-player';

const stackedData = [
  {
    id: '1',
    title: 'Generate graphs through AI',
    description:
      'No need to manually enter the data with those confusing UIs. Simply have friendly conversation with out agent and our AI will take the responsibility or your data.',
  },
  {
    id: '2',
    title: ' Voice based conversation',
    description:
      'If you are more comfortable with voice then instead of typing you can have voice conversation with our voice agent.',
  },
  {
    id: '3',
    title: 'Monitor data',
    description:
      'NMonittor your health. But here is a catch. You do not need to monitor yourself. Instead we will notify when things goes wrong.',
  },
  {
    id: '4',
    title: 'Get recommendations',
    description:
      'Get insightful recommendations based on your health data. We update recommendation every day around 10:30. It will be personalized recommendations specially designed for you.',
  },
];

const AgentVariations = [
  {
    id: '1',
    title: 'Health metrics agent',
    agent_id: 'health_metrics',
    description: 'Share your health data with our chat agent',
    color: {backgroundColor: '#FB9881'},
    agent_type: 'chat',
  },
  {
    id: '2',
    title: 'Voice health metrics agent',
    agent_id: 'voice_health_metrics',
    description: 'Enter your health data through our voice agent.',
    color: {backgroundColor: '#FB9881'},
    agent_type: 'voice',
  },
  {
    id: '3',
    title: 'Asessment agent',
    agent_id: 'assessment',
    description:
      'Share your qualitative data with our assessment agent through chat.',
    color: {backgroundColor: '#4CD0BD'},
    agent_type: 'chat',
  },
  {
    id: '4',
    title: 'Voice assessment agent',
    agent_id: 'voice_assessment',
    description:
      'Share your qualitative data with our assessment agent through voice.',
    color: {backgroundColor: '#4CD0BD'},
    agent_type: 'voice',
  },
];

const GeneralAgetns = [
  {
    id: '1',
    title: 'General Chat agent',
    agent_id: 'general_chat_reponse',
    description: 'have friendly conversation with our AI chat agent.',
    color: {backgroundColor: '#FB9881'},
    agent_type: 'chat',
  },
  {
    id: '2',
    title: 'General voice agent',
    agent_id: 'general_voice_response',
    description: 'Have friendly conversation with our AI voice agent.',
    color: {backgroundColor: '#FB9881'},
    agent_type: 'voice',
  },
];

const audioSet: AudioSet = {
  AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
  AudioSamplingRateAndroid: 44100,
  AudioSourceAndroid: AudioSourceAndroidType.MIC,
  AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
  AVNumberOfChannelsKeyIOS: 2,
  AVFormatIDKeyIOS: AVEncodingOption.aac,
  OutputFormatAndroid: OutputFormatAndroidType.MPEG_4,
};

export {stackedData, AgentVariations, GeneralAgetns, audioSet};
