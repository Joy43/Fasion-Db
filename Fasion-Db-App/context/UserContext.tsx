/**
 * UserContext is preserved for backward compatibility with any remaining
 * components that reference it, but now reads user state from Redux instead
 * of making its own service calls.
 *
 * NOTE: New components should use `useAppSelector((state) => state.auth.user)`
 * directly from '@/redux' instead of this context.
 */
import { IUser } from '@/types/user';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useContext } from 'react';
import { useAppSelector } from '@/redux';

import { useEffect } from 'react';
import { setupFcmToken } from '@/utils/notificationUtils';

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
  // Auth is now managed by Redux — read from the store
  const authUser = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (authUser) {
      setupFcmToken();
    }
  }, [authUser]);

  const user = authUser
    ? ({
        _id: authUser.userId,
        email: authUser.email,
        role: authUser.role,
        name: authUser.name || '',
      } as unknown as IUser)
    : null;

  const value: IUserProviderValues = {
    user,
    isLoading: false,
    isAuthenticated: !!authUser,
    setUser: () => {},       // no-op: use Redux dispatch instead
    setIsLoading: () => {},  // no-op: use Redux dispatch instead
    refreshUser: async () => {}, // no-op: RTK Query refetches automatically
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within the UserProvider context');
  }
  return context;
};

export default UserProvider;
