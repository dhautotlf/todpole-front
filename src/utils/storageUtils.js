import AsyncStorage from '@react-native-community/async-storage';

/*
This class is a wrapper around a persistence layer.
The goal is to decouple the persistence module used from the rest of the codebase.
*/
const STORAGE_NAME = '@todpole:';

export const storeData = async (key, value) => {
  await AsyncStorage.setItem(`${STORAGE_NAME}${key}`, value);
};

export const restoreData = async (key) => {
  return await AsyncStorage.getItem(`${STORAGE_NAME}${key}`);
};

export const removeData = async (key) => {
  await AsyncStorage.removeItem(`${STORAGE_NAME}${key}`);
};

export const storeSession = (session) => {
  return storeData('SESSION', JSON.stringify(session));
};

export const restoreSession = async () => {
  const session = await restoreData('SESSION');
  return JSON.parse(session);
};

export const clearSession = async () => {
  await removeData('SESSION');
};

export default {
  storeSession,
  restoreSession,
  clearSession,
};
