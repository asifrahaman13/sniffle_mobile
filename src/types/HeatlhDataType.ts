export interface HealthData {
  systol_blood_pressure: number;
  diastol_blood_pressure: number;
  heart_rate: number;
  respiratory_rate: number;
  body_temperature: number;
  step_count: number;
  calories_burned: number;
  distance_travelled: number;
  sleep_duration: number;
  water_consumed: number;
  caffeine_consumed: number;
  alchohol_consumed: number;
  timestamp: number;
}

export interface AssessmeentMetrics {
  summary: string;
  timestamp: number;
}
export type MetricInfo = {
  [K in keyof HealthData]: {
    displayName: string;
    color: string;
  };
};

export const metricInfo: MetricInfo = {
  systol_blood_pressure: {
    displayName: 'Systolic Blood Pressure',
    color: 'rgba(255, 0, 0, 0.5)',
  },
  diastol_blood_pressure: {
    displayName: 'Diastolic Blood Pressure',
    color: 'rgba(0, 0, 255, 0.5)',
  },
  heart_rate: {displayName: 'Heart Rate', color: 'rgba(0, 255, 0, 0.5)'},
  respiratory_rate: {
    displayName: 'Respiratory Rate',
    color: 'rgba(255, 165, 0, 0.5)',
  },
  body_temperature: {
    displayName: 'Body Temperature',
    color: 'rgba(0, 255, 255, 0.5)',
  },
  step_count: {displayName: 'Step Count', color: 'rgba(237, 142, 174, 1)'},
  calories_burned: {
    displayName: 'Calories Burned',
    color: 'rgba(237, 237, 142, 1)',
  },
  distance_travelled: {
    displayName: 'Distance Travelled',
    color: 'rgba(242, 180, 138, 1)',
  },
  sleep_duration: {
    displayName: 'Sleep Duration',
    color: 'rgba(200, 240, 151, 1)',
  },
  water_consumed: {
    displayName: 'Water Consumed',
    color: 'rgba(126, 154, 247, 1)',
  },
  caffeine_consumed: {
    displayName: 'Caffeine Consumed',
    color: 'rgba(225, 142, 230, 1)',
  },
  alchohol_consumed: {
    displayName: 'Alcohol Consumed',
    color: 'rgba(227, 144, 138, 1)',
  },
  timestamp: {
    displayName: 'Your frequency of entering data',
    color: 'rgba(128, 196, 188, 1)',
  },
};

export interface RecommendationItem {
  title: string;
  details: string;
}

export interface Recommendations {
  medications_recommended: RecommendationItem[];
  diet_recommended: RecommendationItem[];
  exercise_recommended: RecommendationItem[];
  lifestyle_changes_recommended: RecommendationItem[];
  stress_management_techniques_recommended: RecommendationItem[];
  sleep_hygiene_techniques_recommended: RecommendationItem[];
  mental_health_techniques_recommended: RecommendationItem[];
  relaxation_techniques_recommended: RecommendationItem[];
  social_support_techniques_recommended: RecommendationItem[];
  other_recommendations: RecommendationItem[];
}