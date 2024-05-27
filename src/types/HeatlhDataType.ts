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
export type MetricInfo = {
  [K in keyof HealthData]: {
    displayName: string;
    color: string;
  };
};
