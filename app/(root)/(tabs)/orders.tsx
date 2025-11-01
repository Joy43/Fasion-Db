import MyOrder from '@/components/modules/myorder/MyOrder';
import React from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';

const orders = () => {
  return (
    <SafeAreaView>
      <MyOrder />
    </SafeAreaView>
  );
};

export default orders;
