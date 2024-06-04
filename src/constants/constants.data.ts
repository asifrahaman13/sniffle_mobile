const stackedData = [
  {
    id: '1',
    title: 'Stacked Card 1',
    description:
      'Share your data with other platform for better conmmunication. We have multiple export options available.',
  },
  {
    id: '5',
    title: 'Stacked Card 2',
    description:
      'Share your data with other platform for better conmmunication. We have multiple export options available.',
  },
  {
    id: '6',
    title: 'Stacked Card 2',
    description:
      'Share your data with other platform for better conmmunication. We have multiple export options available.',
  },
  {
    id: '7',
    title: 'Stacked Card 2',
    description:
      'Share your data with other platform for better conmmunication. We have multiple export options available.',
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

export {stackedData, AgentVariations};
