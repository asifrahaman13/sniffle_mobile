import React, {useEffect} from 'react';
import {View, ScrollView, Dimensions, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Text} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';

import {DataRepository} from '../../infrastructure/repositories/DataRepository';
import {DataService} from '../../domain/usecases/DataService';
import {DataInterface} from '../../domain/interfaces/DataInterface';
import {getToken} from '../../helper/tokens';

const dataRepository = new DataRepository();
const data_interface: DataInterface = new DataService(dataRepository);

interface HealthData {
  systol_blood_pressure: number;
  diastol_blood_pressure: number;
  heart_rate: number;
  respiratory_rate: number;
  body_temperature: number;
  timestamp: number;
}

export default function DataScreen() {
  const [healthData, SetHealthData] = React.useState<HealthData[]>([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    async function GetGeneralMetrics() {
      const idToken = await getToken();
      console.log('Called');
      if (idToken) {
        const response = await data_interface.GeneralHealthMetrics(idToken);
        if (response?.code === 200) {
          console.log(response.data);
          SetHealthData(response.data);
        }
      }
    }
    if (isFocused) {
      GetGeneralMetrics();
    }
  }, [isFocused]);

  const screenWidth = Dimensions.get('window').width;

  const extractChartData = (key: keyof HealthData): number[] => {
    return healthData.map(item => item[key] as number);
  };

  const extractLabels = (): string[] => {
    return healthData.map(item =>
      new Date(item.timestamp * 1000).toLocaleTimeString(),
    );
  };

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

      {healthData.length !== 0 && (
        <>
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
        </>
      )}
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
