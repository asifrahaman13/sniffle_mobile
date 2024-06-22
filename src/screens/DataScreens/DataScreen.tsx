import React, {useEffect} from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Paragraph, Text} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';

import {DataRepository} from '../../infrastructure/repositories/DataRepository';
import {DataService} from '../../domain/usecases/DataService';
import {DataInterface} from '../../domain/interfaces/DataInterface';
import {getToken} from '../../helper/tokens';

import {HealthData, metricInfo} from '../../types/HeatlhDataType';
import Loading from '../components/Loading';
import Error from '../components/Error';
import {ExportRepository} from '../../infrastructure/repositories/ExportRepository';
import {ExportService} from '../../domain/usecases/ExportService';
import {ExportInterface} from '../../domain/interfaces/ExportInterface';

const dataRepository = new DataRepository();
const data_interface: DataInterface = new DataService(dataRepository);
const exportRepository = new ExportRepository();
const export_interface: ExportInterface = new ExportService(exportRepository);

export default function DataScreen() {
  const [healthData, setHealthData] = React.useState<HealthData[]>([]);
  const isFocused = useIsFocused();
  const [datastate, setDataState] = React.useState<string | null>(null);

  useEffect(() => {
    async function getGeneralMetrics() {
      if (datastate !== 'loaded') {
        setDataState('loading');
      }
      try {
        const idToken = await getToken();
        if (idToken) {
          console.log('Getting general health metrics');
          const response = await data_interface.GeneralHealthMetrics(idToken);
          if (response?.code === 200) {
            setHealthData(response.data);
            setDataState('loaded');
          }
        }
      } catch (err) {
        setDataState('error');
      }
    }
    getGeneralMetrics();
    if (isFocused) {
      getGeneralMetrics();
    }
  }, [datastate, isFocused]);

  const screenWidth = Dimensions.get('window').width;
  const extractLabels = (data: HealthData[]): string[] => {
    return data
      .filter(item => item.timestamp)
      .map(item => new Date(item.timestamp * 1000).toLocaleTimeString());
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

  async function exportQuantitativeData() {
    try {
      const idToken = await getToken();
      if (idToken) {
        const response = await export_interface.ExportData(
          idToken,
          'quantitative_metrics',
        );
        if (response?.code === 200) {
          console.log('success');
          setDataState('loaded');
        } else {
          console.log('Error exporting data');
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.header}>Quantitative health metrics</Text>
        <Paragraph style={styles.paragraph}>
          **This screen displays a graph of the general health metrics recorded
          by the user. We strongly recommend users track their health metrics
          periodically and visualize them better with our graphs.
        </Paragraph>
        <View>
          <TouchableOpacity
            onPress={() => {
              exportQuantitativeData();
            }}>
            <Text style={styles.header}>Export 📧</Text>
          </TouchableOpacity>
        </View>
      </View>

      {(datastate === 'loading' || healthData.length === 0) && <Loading />}
      {datastate === 'error' && (
        <Error message="Something went wrong most probably you have no data yet. Please chat with our agents to provide some details. It can be found in the home page" />
      )}
      {datastate === 'loaded' && (
        <>
          {(healthData.length !== 0 || healthData.length > 0) && (
            <View style={styles.chartContainer}>
              {Object.keys(metricInfo).map(key => {
                const metricKey = key as keyof HealthData;
                const filteredData = healthData.filter(
                  item =>
                    item[metricKey] !== undefined && !isNaN(item[metricKey]),
                );
                return (
                  <View key={metricKey}>
                    <Text style={styles.subheader}>
                      {metricInfo[metricKey]?.displayName}
                    </Text>
                    <LineChart
                      data={{
                        labels: extractLabels(filteredData),
                        datasets: [
                          {
                            data: filteredData.map(
                              item => (item[metricKey] as number) ?? NaN,
                            ),
                            color: () =>
                              metricInfo[metricKey]?.color !== undefined
                                ? metricInfo[metricKey]?.color
                                : 'rgba(0, 0, 0, 1)',
                            strokeWidth: 2,
                          },
                        ],
                      }}
                      width={screenWidth}
                      height={220}
                      chartConfig={{
                        ...chartConfig,
                        fillShadowGradient: metricInfo[metricKey]?.color,
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
        </>
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
