
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';


export default function Home() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
       <Text className='font-serif text-center justify-center text-blue-500'>this is home page</Text>
      </View>
   
     
     
  
      <View 
      style={{height:100}}>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  section: {
    marginBottom: 10,
  },
});
