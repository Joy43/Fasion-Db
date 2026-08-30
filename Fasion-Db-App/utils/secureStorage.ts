import * as SecureStore from 'expo-secure-store';

// SecureStore keys on iOS can only contain alphanumeric characters, '.', '-', and '_'
const sanitizeKey = (key: string) => key.replace(/[^a-zA-Z0-9._-]/g, '_');

export const secureStorage = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      return await SecureStore.getItemAsync(sanitizeKey(key));
    } catch (error) {
      console.error('SecureStore getItem error:', error);
      return null;
    }
  },
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      await SecureStore.setItemAsync(sanitizeKey(key), value);
    } catch (error) {
      console.error('SecureStore setItem error:', error);
    }
  },
  removeItem: async (key: string): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync(sanitizeKey(key));
    } catch (error) {
      console.error('SecureStore removeItem error:', error);
    }
  },
};
