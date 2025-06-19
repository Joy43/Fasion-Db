import AsyncStorage from "@react-native-async-storage/async-storage";
type RNAsyncStorage = {
  setItem: (key: string, value: string) => Promise<void>;
  getItem: (key: string) => Promise<string | null>;
  removeItem: (key: string) => Promise<void>;
};

const storage: RNAsyncStorage = {
  setItem: (key, value) => {
    return AsyncStorage.setItem(key, value);
  },
  getItem: (key) => {
    return AsyncStorage.getItem(key);
  },
  removeItem: (key) => {
    return AsyncStorage.removeItem(key);
  },
};

export default storage;
