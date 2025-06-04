import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { updateUserProfile } from '@/services/AuthService';
import { uploadToCloudinary } from '@/lib/uploadToCloudnary';


const UpdateProfileForm = () => {
  const [form, setForm] = useState({
    phoneCode: '+880',
    phone: '',
    birth: '',
    gender: '',
    address: '',
    photo: '',
  });

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handlePickImage = async () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.7,
      },
      async (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'Image pick failed');
          return;
        }

        const asset = response.assets?.[0];
        if (asset?.uri) {
          const uploadResult = await uploadToCloudinary({
            uri: asset.uri,
            type: asset.type || 'image/jpeg',
            name: asset.fileName || 'profile.jpg',
          });

          if (uploadResult) {
            setForm({ ...form, photo: uploadResult });
            Alert.alert('Image Uploaded', 'Photo uploaded successfully!');
          }
        }
      }
    );
  };

  const handleSubmit = async () => {
    const profileData = {
      phone: `${form.phoneCode}${form.phone}`,
      dateOfBirth: form.birth,
      gender: form.gender,
      address: form.address,
      photo: form.photo,
    };

    const result = await updateUserProfile(profileData);
    if (result.success) {
      Alert.alert('Success', 'Profile updated successfully');
    } else {
      Alert.alert('Error', result.message || 'Failed to update profile');
    }
  };

  return (
    <ScrollView className="flex-1 bg-white px-6 py-8">
      <View className="items-center mb-6">
        <TouchableOpacity onPress={handlePickImage}>
          <Image
            source={{
              uri: form.photo || 'https://via.placeholder.com/150',
            }}
            className="w-28 h-28 rounded-full border-2 border-pink-500"
          />
          <Text className="text-center mt-2 text-blue-600 underline">Change Photo</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-sm text-gray-600 mb-1">Phone Number</Text>
      <View className="flex-row items-center border px-2 rounded-md mb-4">
        <TextInput
          placeholder="+880"
          value={form.phoneCode}
          onChangeText={(value) => handleChange('phoneCode', value)}
          className="w-14"
        />
        <TextInput
          placeholder="1234567890"
          keyboardType="phone-pad"
          value={form.phone}
          onChangeText={(value) => handleChange('phone', value)}
          className="flex-1"
        />
      </View>

      <Text className="text-sm text-gray-600 mb-1">Date of Birth</Text>
      <TextInput
        placeholder="YYYY-MM-DD"
        value={form.birth}
        onChangeText={(value) => handleChange('birth', value)}
        className="border rounded-md px-3 py-2 mb-4"
      />

      <Text className="text-sm text-gray-600 mb-1">Gender</Text>
      <View className="border rounded-md mb-4">
        <Picker
          selectedValue={form.gender}
          onValueChange={(value) => handleChange('gender', value)}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      <Text className="text-sm text-gray-600 mb-1">Address</Text>
      <TextInput
        placeholder="Your address"
        value={form.address}
        onChangeText={(value) => handleChange('address', value)}
        className="border rounded-md px-3 py-2 mb-6"
        multiline
      />

      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-pink-600 rounded-lg py-3"
      >
        <Text className="text-center text-white font-semibold">Update Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default UpdateProfileForm;
