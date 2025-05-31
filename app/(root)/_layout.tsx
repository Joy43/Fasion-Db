import { Stack } from 'expo-router'
import React from 'react'


export default function tabLayout() {
  return (
<Stack>
    <Stack.Screen name='(tabs)' options={{headerShown:false}}/>
</Stack>
  )
}