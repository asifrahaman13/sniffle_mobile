import React, {useEffect} from 'react';
import {View, ScrollView, Dimensions, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Text} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';

import {DataRepository} from '../../infrastructure/repositories/DataRepository';
import {DataService} from '../../domain/usecases/DataService';
import {DataInterface} from '../../domain/interfaces/DataInterface';
import {getToken} from '../../helper/tokens';

import {HealthData, MetricInfo} from '../../types/HeatlhDataType';

const dataRepository = new DataRepository();
const data_interface: DataInterface = new DataService(dataRepository);

const metricInfo: MetricInfo = {
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

export default function DataScreen() {
  const [healthData, setHealthData] = React.useState<HealthData[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function getGeneralMetrics() {
      const idToken = await getToken();
      if (idToken) {
        const response = await data_interface.GeneralHealthMetrics(idToken);
        if (response?.code === 200) {
          setHealthData(response.data);
        }
      }
    }
    if (isFocused) {
      getGeneralMetrics();
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
    fillShadowGradient: (_opacity = 1, color = '#000') => color,
    fillShadowGradientOpacity: 0.3,
  };

  return (
    <ScrollView>
      <View>
        <Text style={styles.header}>General health metrics</Text>
      </View>

      {healthData.length !== 0 && (
        <View style={styles.chartContainer}>
          {Object.keys(metricInfo).map(key => {
            const metricKey = key as keyof HealthData;
            return (
              <View key={metricKey}>
                <Text style={styles.subheader}>
                  {metricInfo[metricKey].displayName}
                </Text>
                <LineChart
                  data={{
                    labels: extractLabels(),
                    datasets: [
                      {
                        data: extractChartData(metricKey),
                        color: () => metricInfo[metricKey].color,
                        strokeWidth: 2,
                      },
                    ],
                  }}
                  width={screenWidth}
                  height={220}
                  chartConfig={{
                    ...chartConfig,
                    fillShadowGradient: metricInfo[metricKey].color,
                    fillShadowGradientOpacity: 0.3,
                  }}
                  bezier
                  style={styles.chart}
                />
              </View>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    padding: 8,
    marginHorizontal: 12,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
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
  subheader: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Inter-Bold',
  },
});
