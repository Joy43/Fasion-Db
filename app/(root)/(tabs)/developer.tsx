import DeveloperProfile from '@/components/modules/developer/DeveloperProfile';
import { SafeAreaView, View } from 'react-native';

const developer = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#020813' }}>
      <DeveloperProfile />
    </SafeAreaView>
  );
};

export default developer;
