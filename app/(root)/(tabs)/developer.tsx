import DeveloperProfile from '@/components/modules/developer/DeveloperProfile';
import { SafeAreaView, View } from 'react-native';

const developer = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
      <DeveloperProfile />
    </SafeAreaView>
  );
};

export default developer;
