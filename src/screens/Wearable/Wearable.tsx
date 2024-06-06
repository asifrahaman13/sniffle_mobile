import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, Switch, Text, View} from 'react-native';
import notifee from '@notifee/react-native';
import {LineChart} from 'react-native-chart-kit';
import {getToken} from '../../helper/tokens';
import {Paragraph} from 'react-native-paper';

interface ParameterGraphProps {
  title: string;
  data: number[];
  color: string;
}

const ParameterGraph: React.FC<ParameterGraphProps> = ({
  title,
  data,
  color,
}) => (
  <View style={styles.container}>
    <Text style={styles.graphHeader}>{title}</Text>
    <LineChart
      data={{
        labels: Array.from({length: data.length}, (_, i) => (i + 1).toString()),
        datasets: [{data}],
      }}
      width={400}
      height={200}
      chartConfig={{
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(${color}, ${opacity})`,
      }}
      bezier
      // eslint-disable-next-line react-native/no-inline-styles
      style={{marginVertical: 8, borderRadius: 16, padding: 10, margin: 12}}
    />
  </View>
);

const Wearable: React.FC = () => {
  const [glucoseEnabled, setGlucoseEnabled] = useState<boolean>(false);
  const [heartRateEnabled, setHeartRateEnabled] = useState<boolean>(false);
  const [bloodPressureEnabled, setBloodPressureEnabled] =
    useState<boolean>(false);
  const [temperatureEnabled, setTemperatureEnabled] = useState<boolean>(false);

  const [glucoseData, setGlucoseData] = useState<number[]>([]);
  const [heartRateData, setHeartRateData] = useState<number[]>([]);
  const [bloodPressureData, setBloodPressureData] = useState<number[]>([]);
  const [temperatureData, setTemperatureData] = useState<number[]>([]);

  const websocketRef = useRef<WebSocket | null>(null);
  const [token, setToken] = useState<string | null>(null);

  async function onDisplayNotification(data: string): Promise<void> {
    await notifee.requestPermission();
    const channelId = await notifee.createChannel({
      id: 'myself',
      name: 'myself',
      sound: 'default',
    });

    await notifee.displayNotification({
      title: 'Alert',
      body: `${data}`,
      android: {
        channelId,
        pressAction: {id: 'default'},
      },
    });
  }

  useEffect(() => {
    onDisplayNotification('We will notifiy if there is any alert.');
  }, []);

  useEffect(() => {
    async function getId(): Promise<void> {
      try {
        const idToken = await getToken();
        if (idToken) {
          setToken(idToken);

          const websocketUrl = process.env.WEBSOCKET_URI_VOICE;

          const websocket = new WebSocket(
            `${websocketUrl}/wearable/ws/${idToken}`,
          );
          websocketRef.current = websocket;

          websocket.onopen = () => console.log('WebSocket connection opened');
          websocket.onmessage = (event: any) => {
            console.log('WebSocket message received:', event.data);
            onDisplayNotification(event.data);
          };
          websocket.onerror = (error: any) => {
            console.log('WebSocket error:', error.message);
          };
          websocket.onclose = (event: any) =>
            console.log('WebSocket connection closed:', event.reason);
        }
      } catch (error) {
        console.error('Error in getId:', error);
      }
    }
    getId();

    const interval = setInterval(() => {
      if (websocketRef.current) {
        const data: Record<string, number> = {};
        if (glucoseEnabled) {
          const glucoseLevel = Math.random() * 150;
          data.glucoseLevel = glucoseLevel;
          setGlucoseData(prev => {
            const newData = [...prev, glucoseLevel];
            return newData.length > 10 ? newData.slice(-10) : newData;
          });
        }
        if (heartRateEnabled) {
          const heartRate = Math.floor(Math.random() * 40) + 60;
          data.heartRate = heartRate;
          setHeartRateData(prev => {
            const newData = [...prev, heartRate];
            return newData.length > 10 ? newData.slice(-10) : newData;
          });
        }
        if (bloodPressureEnabled) {
          const bloodPressure = Math.floor(Math.random() * 50) + 100;
          data.bloodPressure = bloodPressure;
          setBloodPressureData(prev => {
            const newData = [...prev, bloodPressure];
            return newData.length > 10 ? newData.slice(-10) : newData;
          });
        }
        if (temperatureEnabled) {
          const temperature = Math.random() * 3 + 36;
          data.temperature = temperature;
          setTemperatureData(prev => {
            const newData = [...prev, temperature];
            return newData.length > 10 ? newData.slice(-10) : newData;
          });
        }
        try {
          websocketRef.current.send(JSON.stringify(data));
        } catch (err) {
          console.log(err);
        }
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      if (websocketRef.current) {
        websocketRef.current.close();
      }
    };
  }, [
    token,
    glucoseEnabled,
    heartRateEnabled,
    bloodPressureEnabled,
    temperatureEnabled,
  ]);

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.headercontainer}>
        <Text style={styles.header}>Wearable devices</Text>
        <Paragraph style={styles.paragraph}>
          **This is a simulation of the data received from wearable devices.
          This is just a demonstration and not your actual health data. In readl
          life we need to connect to the actual wearable devices to get the
          data.
        </Paragraph>
      </View>
      <View style={styles.container}>
        <View style={styles.subcontainer}>
          <Text style={styles.header}>Enable Glucose Level</Text>
          <Switch value={glucoseEnabled} onValueChange={setGlucoseEnabled} />
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.header}>Enable Heart Rate</Text>
          <Switch
            value={heartRateEnabled}
            onValueChange={setHeartRateEnabled}
          />
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.header}>Enable Blood Pressure</Text>
          <Switch
            value={bloodPressureEnabled}
            onValueChange={setBloodPressureEnabled}
          />
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.header}>Enable Temperature</Text>
          <Switch
            value={temperatureEnabled}
            onValueChange={setTemperatureEnabled}
          />
        </View>
        {/* <Button
          title="Display Notification"
          onPress={() => onDisplayNotification('Test')}
        /> */}

        {glucoseEnabled && glucoseData.length > 0 && (
          <ParameterGraph
            title="Glucose Level"
            data={glucoseData}
            color="255, 99, 132"
          />
        )}
        {heartRateEnabled && heartRateData.length > 0 && (
          <ParameterGraph
            title="Heart Rate"
            data={heartRateData}
            color="54, 162, 235"
          />
        )}
        {bloodPressureEnabled && bloodPressureData.length > 0 && (
          <ParameterGraph
            title="Blood Pressure"
            data={bloodPressureData}
            color="75, 192, 192"
          />
        )}
        {temperatureEnabled && temperatureData.length > 0 && (
          <ParameterGraph
            title="Temperature"
            data={temperatureData}
            color="255, 206, 86"
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headercontainer: {
    backgroundColor: 'white',
    padding: 12,
    marginHorizontal: 16,
    width: '90%',
  },
  scrollContainer: {
    backgroundColor: 'white',
  },
  subcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 16,
    width: '90%',
  },
  header: {
    fontSize: 16,
    color: '#51a687',
    fontWeight: 'bold',
    marginHorizontal: 12,
  },
  graphHeader: {
    fontSize: 16,
    color: '#51a687',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraph: {
    marginHorizontal: 12,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
});

export default Wearable;
