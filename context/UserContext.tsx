import { getCurrentUser } from '@/services/AuthService';
import { IUser } from '@/types/user';

// Key fix: Import ReactNode (and other types) explicitly
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IUserProviderValues {
  user: IUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: IUser | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<IUserProviderValues | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleUser = async () => {
    try {
      console.log('handleUser triggered');
      // Check if we have a token before attempting to fetch user
      const accessToken = await AsyncStorage.getItem('accessToken');
      console.log('handleUser: retrieved accessToken:', accessToken ? 'Exists (truncated)' : 'Null');

      if (!accessToken) {
        console.log('handleUser: No access token in storage, setting user null');
        setUser(null);
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      const result = await getCurrentUser();
      console.log('handleUser: getCurrentUser result:', result);

      if (result.success && result.data) {
        console.log('handleUser: successfully logged in user:', result.data.name || result.data);
        setUser(result.data);
        setIsAuthenticated(true);
      } else {
        console.log('handleUser: failed to fetch current user, setting user null');
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleUser();
  }, []); // Empty array: Fetch once on mount, no infinite loops

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        setIsLoading,
        isAuthenticated,
        refreshUser: handleUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used within the UserProvider context');
  }

  return context;
};

export default UserProvider;
