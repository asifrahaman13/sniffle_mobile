import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Alert,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import FormData from 'form-data';
import axios from 'axios';
import {Card, Paragraph, Title} from 'react-native-paper';
import {ScrollView} from 'react-native';

interface Response {
  filename: string;
}

const Fhir: React.FC = ({navigation}: any) => {
  const backendUri = process.env.BACKEND_URI;
  const [image, setImage] = useState<Asset | null>(null);
  const [responses, setResponses] = useState<Response[]>([]);

  const selectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          setImage(response.assets[0]);
        }
      },
    );
  };

  useEffect(() => {
    const allPdfs = async () => {
      try {
        const allpdf = await axios.get<Response[]>(
          `${backendUri}/fhir/get-all-json/username`,
        );
        if (allpdf.data) {
          console.log(allpdf.data);
          setResponses(allpdf.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    allPdfs();
  }, [backendUri]);

  const uploadImage = async () => {
    if (!image) {
      Alert.alert('No image selected', 'Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', {
      uri: image.uri!,
      type: image.type!,
      name: image.fileName!,
    });
    formData.append('file_name', image.fileName!);

    try {
      const response = await axios.post<{data: string}>(
        `${backendUri}/fhir/image-description`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.data) {
        setResponses(prevResponses => [
          ...prevResponses,
          {filename: response.data.data},
        ]);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to upload image.');
    }
  };

  return (
    <View style={styles.container}>
      {/* <Button title="Select Image" onPress={selectImage} />
      {image && (
        <View style={styles.imageContainer}>
          <Image source={{uri: image.uri}} style={styles.image} />
        </View>
      )}
      <Button title="Upload Image" onPress={uploadImage} /> */}
      <Text style={styles.header}>FHIR file</Text>
      <View style={styles.headercontainer}>
        <Text style={styles.subheader}>
          Select image from the below button. Next click on the upload image
          button. Our AI will automatically generate the FHIR file from the
          image. Note: The agent is still not optimized and can take upto ~30
          seconds. If you encounter any isse please try again
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={selectImage}>
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>
      {image && (
        <View style={styles.imageContainer}>
          <Image source={{uri: image.uri}} style={styles.image} />
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={uploadImage}>
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>

      <ScrollView>
        <View>
          {responses.length > 0 && (
            <View style={styles.display}>
              {responses.map((response, index) => (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() =>
                    navigation.navigate('FHIR file data', {
                      fileName: response.filename,
                    })
                  }
                  style={[styles.whiteBackground, styles.boxShadow]}>
                  <Card style={styles.whiteBackground}>
                    <Card.Content>
                      <Title style={[styles.header, styles.whiteText]}>
                        Image to FHIR file
                      </Title>
                      <Paragraph style={styles.whiteTextSmall}>
                        {response.filename}
                      </Paragraph>
                    </Card.Content>
                  </Card>
                </TouchableWithoutFeedback>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headercontainer: {
    width: '80%',
  },
  subheader: {
    color: 'black',
  },
  containers: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    marginVertical: 20,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  image: {
    width: 300,
    height: 300,
  },
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  display: {
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    gap: 12,
    padding: 12,
  },
  whiteBackground: {
    backgroundColor: '#6eccff',
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: 300,
    flexDirection: 'row',
  },
  boxShadow: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 24,
    marginTop: 12,
    overflow: 'hidden',
    shadowColor: '#a0a2a3',
    shadowOpacity: 0.8,
    borderColor: '#4CD0BD',
  },
  text: {
    color: 'black',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    color: '#37383b',
  },
  whiteText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    color: 'white',
  },
  whiteTextSmall: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'normal',
  },
});

export default Fhir;
