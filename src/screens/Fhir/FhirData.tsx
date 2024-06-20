import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import axios from 'axios';
import {ScrollView} from 'react-native';
import {BACKEND_URI} from '../../config/config';
import {getToken} from '../../helper/tokens';

export default function FhirData({route}: any) {
  const {fileName} = route.params;
  console.log(fileName);

  const backendUrl = BACKEND_URI;
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    async function getFhirData() {
      try {
        const token = await getToken();
        const response = await axios.post(
          `${backendUrl}/fhir/presigned-url`,
          {
            fileName: fileName,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(response.data);
        if (response.data) {
          //   setData(response?.data.presigned_url);
          const jsonResponse = await axios.get(response.data.presigned_url);
          setData(jsonResponse.data);
        }
      } catch (err) {
        console.log(err);
      }
    }

    getFhirData();
  }, [backendUrl, fileName]);

  return (
    <ScrollView>
      <View style={styles.headercontainer}>
        <Text style={styles.header}>{fileName} </Text>
      </View>
      <View style={styles.fhircontainer}>
        <Text style={styles.text}>{JSON.stringify(data, null, 2)} </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headercontainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  header: {color: 'black', fontWeight: 'bold', fontSize: 24},
  text: {color: 'white'},
  fhircontainer: {
    backgroundColor: '#6eccff',
    marginHorizontal: 12,
    borderRadius: 12,
    padding: 12,
  },
});
