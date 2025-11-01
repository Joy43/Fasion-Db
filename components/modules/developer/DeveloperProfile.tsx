import React from 'react';
import { View, Text, Image, ScrollView, Switch } from 'react-native';
const skills = [
  { title: 'React Native', color: '#61DAFB', textColor: '#FFFFFF' },
  { title: 'TypeScript', color: '#3178C6', textColor: '#FFFFFF' },
  { title: 'JavaScript', color: '#F7DF1E', textColor: '#FFFFFF' },
  { title: 'NestJS', color: '#E0234E', textColor: '#FFFFFF' },
  { title: 'Node.js', color: '#68A063', textColor: '#FFFFFF' },
  { title: 'Express.js', color: '#000000', textColor: '#FFFFFF' },
];

const DeveloperProfile = () => {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
      {/*------------- Profile Header -----------------------*/}
      <View className="bg-gradient-to-b from-pink-100 to-pink-50 rounded-b-3xl shadow-lg pb-10">
        <View className="items-center pt-10">
          <Image
            source={{
              uri: 'https://res.cloudinary.com/dkqdwcguu/image/upload/v1754275277/joy_img_3_ony3do.jpg',
            }}
            className="w-28 h-28 rounded-full border-4 border-white shadow-md"
          />
          <Text className="text-2xl font-bold text-gray-900 mt-4">
            shahsultan islam joy
          </Text>
        </View>

        {/*------------------- Developer Info ----------------------------*/}
        <View className="px-6 mt-6 space-y-3 gap-4">
          <View className="flex-row justify-between">
            <Text className="font-bold text-red-500">Profession</Text>
            <Text className="text-gray-700">Full Stack Developer</Text>
          </View>
          <View className="flex-row justify-between"></View>
          <View className="flex-row justify-between">
            <Text className="font-bold text-red-500">Location</Text>
            <Text className="text-gray-700">Bangladesh</Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="font-bold text-red-500">Position</Text>
            <View className="flex-row items-center">
              <Switch value={true} trackColor={{ true: '#FF4D4D' }} />
              <Text className="ml-2 text-gray-700">Open</Text>
            </View>
          </View>
        </View>
      </View>

      {/*---------------- Skills Section--------------------------- */}
      <Text className="text-lg font-bold text-gray-900 px-6 mt-8 mb-4">
        Skills
      </Text>
      <View className="flex-row flex-wrap px-6 gap-3">
        {skills.map((skill, index) => (
          <View
            key={index}
            className="px-4 py-2 rounded-full shadow-sm"
            style={{ backgroundColor: `${skill.color}` }}
          >
            <Text
              style={{ color: skill.textColor }}
              className="font-semibold font-medium"
            >
              {skill.title}
            </Text>
          </View>
        ))}
      </View>

      {/* Stats Card */}
      <View className="bg-red-500 rounded-3xl p-6 mx-6 mt-10 shadow-lg">
        <View className="flex-row justify-between mb-6">
          <View>
            <Text className="text-4xl text-white font-bold">4.3</Text>
            <Text className="text-white opacity-90">Average Rating</Text>
          </View>
          <View>
            <Text className="text-4xl text-white font-bold">37</Text>
            <Text className="text-white opacity-90">Jobs Completed</Text>
          </View>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-white">Availability: Excellent</Text>
          <Text className="text-white">Service: Good</Text>
          <Text className="text-white">Quality: Good</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default DeveloperProfile;
