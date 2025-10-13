import { getCurrentUser, logout } from "@/services/AuthService";
import { IUser } from "@/types/user";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface IUserProviderValues {
  user: IUser | null;
  isLoading: boolean;
  setUser: (user: IUser | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const UserContext = createContext<IUserProviderValues | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initUser = async () => {
      try {
        const result = await getCurrentUser();

        if (result.success && result.data) {
          setUser(result.data as IUser); // valid token
        } else {
          // No valid token → auto logout
          await logout();
          setUser(null);
        }
      } catch (err) {
        console.warn("Error fetching user:", err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initUser();
  }, []); // run only once on mount

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within the UserProvider");
  return context;
};

export default UserProvider;
