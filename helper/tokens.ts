import AsyncStorage from '@react-native-async-storage/async-storage';

const storeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('@auth_token', token);
  } catch (e) {
    // saving error
    console.error('Failed to save the token to the storage', e);
  }
};

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('@auth_token');
    console.log('The token', token);
    if (token) {
      return token;
    }
    return null;
  } catch (e) {
    // reading error
    console.error('Failed to fetch the token from storage', e);
  }
};

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('@auth_token');
  } catch (e) {
    // saving error
    console.error('Failed to remove the token from the storage', e);
  }
};

export {storeToken, getToken, removeToken};
