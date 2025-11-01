import { updateUserProfile } from '@/services/AuthService';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

type UpdateProfileFormProps = {
  closeModal: () => void;
};

const UpdateProfileForm = ({ closeModal }: UpdateProfileFormProps) => {
  const [form, setForm] = useState({
    phoneNo: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    photo: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permission Required',
            'We need access to your media library.'
          );
        }
      }
    })();
  }, []);

  const handleChange = (key: string, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [key]: value }));
  };

  const uploadToCloudinary = async (uri: string): Promise<string | null> => {
    try {
      const data = new FormData();
      const uriParts = uri.split('/');
      const fileName = uriParts[uriParts.length - 1];
      const fileType = fileName.endsWith('.png') ? 'image/png' : 'image/jpeg';

      data.append('file', {
        uri,
        name: fileName,
        type: fileType,
      } as any);

      data.append('upload_preset', 'upload_car');
      data.append('cloud_name', 'dluuillmt');

      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dluuillmt/image/upload',
        {
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const responseData = await response.json();
      return responseData.secure_url || null;
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      return null;
    }
  };

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (result.canceled || !result.assets || result.assets.length === 0)
        return;

      const asset = result.assets[0];
      const cloudUrl = await uploadToCloudinary(asset.uri);

      if (cloudUrl) {
        handleChange('photo', cloudUrl);
        Toast.show({
          type: 'success',
          text1: 'Image uploaded',
          text2: 'Image uploaded successfully to Cloudinary!',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Upload Failed',
          text2: 'Image upload failed.',
        });
      }
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    // Basic validation example:
    if (form.phoneNo && !/^\d{11}$/.test(form.phoneNo)) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Phone number must be exactly 11 digits.',
      });
      setLoading(false);
      return;
    }

    // Prepare data, omit empty strings
    const profileData: Record<string, string> = {};
    if (form.phoneNo) profileData.phoneNo = form.phoneNo;
    if (form.gender) profileData.gender = form.gender;
    if (form.dateOfBirth) profileData.dateOfBirth = form.dateOfBirth;
    if (form.address) profileData.address = form.address;
    if (form.photo) profileData.photo = form.photo;

    try {
      console.log('Submitting profile data:', profileData);

      const result = await updateUserProfile(profileData);

      if (result.success) {
        Toast.show({
          type: 'success',
          text1: 'Profile Updated',
          text2: result.message || 'Profile updated successfully!',
        });
        closeModal(); // Optional: close modal after successful update
      } else {
        console.log('API error response:', result);
        Toast.show({
          type: 'error',
          text1: 'Update Failed',
          text2:
            result.message || 'Profile update failed due to server validation.',
        });
      }
    } catch (error: any) {
      console.error('Update error:', error.response?.data || error.message);
      Toast.show({
        type: 'error',
        text1: 'Unexpected Error',
        text2:
          error.response?.data?.message ||
          error.message ||
          'Something went wrong. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white px-6 py-8">
      {/* Close Icon */}
      <View className="flex-row justify-end mb-4">
        <TouchableOpacity onPress={closeModal} className="p-2">
          <Text className="text-2xl text-gray-500">✕</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Photo */}
      <View className="items-center mb-6">
        <TouchableOpacity onPress={handlePickImage}>
          <Image
            source={{ uri: form.photo || 'https://via.placeholder.com/150' }}
            className="w-28 h-28 rounded-full border-2 border-pink-500"
          />
          <Text className="text-center mt-2 text-blue-600 underline">
            Change Photo
          </Text>
        </TouchableOpacity>
      </View>

      {/* Phone Number */}
      <Text className="text-sm text-gray-600 mb-1">Phone Number</Text>
      <View className="border px-2 rounded-md mb-4">
        <TextInput
          placeholder="1234567890"
          keyboardType="phone-pad"
          value={form.phoneNo}
          onChangeText={(value) => handleChange('phoneNo', value)}
          className="flex-1 py-2"
        />
      </View>

      {/* Date of Birth */}
      <Text className="text-sm text-gray-600 mb-1">Date of Birth</Text>
      <TextInput
        placeholder="YYYY-MM-DD"
        value={form.dateOfBirth}
        onChangeText={(value) => handleChange('dateOfBirth', value)}
        className="border rounded-md px-3 py-2 mb-4"
      />

      {/* Gender */}
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

      {/* Address */}
      <Text className="text-sm text-gray-600 mb-1">Address</Text>
      <TextInput
        placeholder="Your address"
        value={form.address}
        onChangeText={(value) => handleChange('address', value)}
        className="border rounded-md px-3 py-2 mb-6"
        multiline
      />

      {/* Submit Button */}
      <TouchableOpacity
        onPress={handleSubmit}
        className={`rounded-lg py-3 ${loading ? 'bg-pink-400' : 'bg-pink-600'}`}
        disabled={loading}
      >
        <Text className="text-center text-white font-semibold">
          {loading ? 'Updating...' : 'Update Profile'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default UpdateProfileForm;
