import React from 'react';
import {View, ScrollView, Dimensions, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Text} from 'react-native-paper';

interface HealthData {
  systol_blood_pressure: number;
  diastol_blood_pressure: number;
  heart_rate: number;
  respiratory_rate: number;
  body_temperature: number;
  timestamp: number;
}

const healthData: HealthData[] = [
  {
    systol_blood_pressure: 143,
    diastol_blood_pressure: 90,
    heart_rate: 96,
    respiratory_rate: 90,
    body_temperature: 99.5,
    timestamp: 1716693383,
  },
  {
    systol_blood_pressure: 144,
    diastol_blood_pressure: 96,
    heart_rate: 93,
    respiratory_rate: 98,
    body_temperature: 99.4,
    timestamp: 1716693425,
  },
  {
    systol_blood_pressure: 142,
    diastol_blood_pressure: 97,
    heart_rate: 93,
    respiratory_rate: 98,
    body_temperature: 99.6,
    timestamp: 1716695643,
  },
];

const screenWidth = Dimensions.get('window').width;

const extractChartData = (key: keyof HealthData): number[] => {
  return healthData.map(item => item[key] as number);
};

const extractLabels = (): string[] => {
  return healthData.map(item =>
    new Date(item.timestamp * 1000).toLocaleTimeString(),
  );
};

export default function DataScreen() {
  const chartConfig = {
    backgroundColor: '#fff',
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <ScrollView>
      <View>
        <Text style={styles.header}>General health metrics</Text>
      </View>
      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: extractLabels(),
            datasets: [
              {
                data: extractChartData('systol_blood_pressure'),
                color: () => 'rgba(255, 0, 0, 0.5)',
                strokeWidth: 2,
              },
              {
                data: extractChartData('diastol_blood_pressure'),
                color: () => 'rgba(0, 0, 255, 0.5)',
                strokeWidth: 2,
              },
            ],
          }}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />

        <LineChart
          data={{
            labels: extractLabels(),
            datasets: [
              {
                data: extractChartData('heart_rate'),
                color: () => 'rgba(0, 255, 0, 0.5)',
                strokeWidth: 2,
              },
            ],
          }}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />

        <LineChart
          data={{
            labels: extractLabels(),
            datasets: [
              {
                data: extractChartData('respiratory_rate'),
                color: () => 'rgba(255, 165, 0, 0.5)',
                strokeWidth: 2,
              },
            ],
          }}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />

        <LineChart
          data={{
            labels: extractLabels(),
            datasets: [
              {
                data: extractChartData('body_temperature'),
                color: () => 'rgba(0, 255, 255, 0.5)',
                strokeWidth: 2,
              },
            ],
          }}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    padding: 8,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    marginHorizontal: 12,
  },
});
