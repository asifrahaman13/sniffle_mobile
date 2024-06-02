import React, {useEffect} from 'react';
import {View, ScrollView, Dimensions, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Paragraph, Text} from 'react-native-paper';
// import {useIsFocused} from '@react-navigation/native';

import {DataRepository} from '../../infrastructure/repositories/DataRepository';
import {DataService} from '../../domain/usecases/DataService';
import {DataInterface} from '../../domain/interfaces/DataInterface';
import {getToken} from '../../helper/tokens';

import {HealthData, metricInfo} from '../../types/HeatlhDataType';
import {useIsFocused} from '@react-navigation/native';

const dataRepository = new DataRepository();
const data_interface: DataInterface = new DataService(dataRepository);

export default function DataScreen() {
  const [healthData, setHealthData] = React.useState<HealthData[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function getGeneralMetrics() {
      const idToken = await getToken();
      if (idToken) {
        console.log('Getting general health metrics');
        const response = await data_interface.GeneralHealthMetrics(idToken);
        if (response?.code === 200) {
          setHealthData(response.data);
        }
      }
    }
    getGeneralMetrics();
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
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.header}>General health metrics</Text>
        <Paragraph style={styles.paragraph}>
          **This screen displays a graph of the general health metrics recorded
          the user. We strongly recommend users to track their health metrics
          periodically and visuazlize better with our graphs.
        </Paragraph>
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
  container: {
    backgroundColor: 'white',
  },
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
    marginTop: 16,
  },
  paragraph: {
    marginHorizontal: 12,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
});
