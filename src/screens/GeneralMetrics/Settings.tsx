import {View, Button, TextInput, StyleSheet, Text} from 'react-native';
import React from 'react';

import {DataRepository} from '../../infrastructure/repositories/DataRepository';
import {DataService} from '../../domain/usecases/DataService';
import {DataInterface} from '../../domain/interfaces/DataInterface';
import {getToken} from '../../helper/tokens';
import {GeneralMetricsType} from '../../types/HeatlhDataType';
import {ScrollView} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

const dataRepository = new DataRepository();
const data_interface: DataInterface = new DataService(dataRepository);

export default function Settings({navigation}: any) {
  const isFocused = useIsFocused();
  const [generalMetrics, setGeneralMetrics] = React.useState<
    GeneralMetricsType | undefined
  >(undefined);
  React.useEffect(() => {
    console.log('Settings screen mounted');
    async function getGeneralMetrics() {
      const idToken = await getToken();
      if (idToken) {
        console.log('Getting general health metrics');
        const response = await data_interface.GetGeneralMetrics(idToken);
        console.log(response);
        if (response?.code === 200) {
          setGeneralMetrics(response.data);
        }
      }
    }

    if (isFocused) {
      getGeneralMetrics();
    }
  }, [isFocused]);

  const handleInputChange = (
    field: keyof GeneralMetricsType,
    value: string | number,
  ) => {
    if (generalMetrics) {
      setGeneralMetrics({
        ...generalMetrics,
        [field]: value,
      });
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {generalMetrics && (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Weight</Text>
              <TextInput
                style={styles.input}
                value={generalMetrics.weight.toString()}
                onChangeText={value =>
                  handleInputChange('weight', parseFloat(value))
                }
                placeholder="Weight"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Age</Text>
              <TextInput
                style={styles.input}
                value={generalMetrics.age.toString()}
                // eslint-disable-next-line prettier/prettier
        onChangeText={(value) => handleInputChange('age', parseInt(value, 10))}
                placeholder="Age"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Current Medications</Text>
              <TextInput
                style={styles.input}
                value={generalMetrics.current_medications}
                onChangeText={value =>
                  handleInputChange('current_medications', value)
                }
                placeholder="Current Medications"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Previous Medical History</Text>
              <TextInput
                style={styles.input}
                value={generalMetrics.previous_medical_history}
                onChangeText={value =>
                  handleInputChange('previous_medical_history', value)
                }
                placeholder="Previous Medical History"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Family Health History</Text>
              <TextInput
                style={styles.input}
                value={generalMetrics.family_health_history}
                onChangeText={value =>
                  handleInputChange('family_health_history', value)
                }
                placeholder="Family Health History"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Height</Text>
              <TextInput
                style={styles.input}
                value={generalMetrics.height.toString()}
                onChangeText={value =>
                  handleInputChange('height', parseFloat(value))
                }
                placeholder="Height"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Surgical History</Text>
              <TextInput
                style={styles.input}
                value={generalMetrics.surgical_history}
                onChangeText={value =>
                  handleInputChange('surgical_history', value)
                }
                placeholder="Surgical History"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Reproductive Health</Text>
              <TextInput
                style={styles.input}
                value={generalMetrics.reproductive_health}
                onChangeText={value =>
                  handleInputChange('reproductive_health', value)
                }
                placeholder="Reproductive Health"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={generalMetrics.email}
                onChangeText={value => handleInputChange('email', value)}
                placeholder="Email"
                keyboardType="email-address"
              />
            </View>

            <Button
              onPress={() =>
                navigation.navigate('GeneralMetrics', {
                  chatVariant: 'GeneralMetrics',
                })
              }
              title="Fill with our chat bot"
              color="#f2742c"
            />
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
    color: 'black',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
});
