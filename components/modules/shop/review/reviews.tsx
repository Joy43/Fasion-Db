
import { useCreateReview } from '@/hooks/useReview';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface ReviewsProps {
  productId: string;
}

const Reviews = ({ productId }: ReviewsProps) => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);

  const { mutate, isPending } = useCreateReview();

  const handleSubmit = () => {
    if (!review.trim()) {
      Alert.alert('Please enter a review');
      return;
    }

    const formData = new FormData();
    formData.append('review', review);
    formData.append('rating', rating.toString());
    formData.append('product', productId);

    mutate(formData, {
      onSuccess: () => {
        Alert.alert('Success', 'Review submitted!');
        setReview('');
        setRating(5);
      },
      onError: (error: any) => {
        Alert.alert('Error', error.message || 'Failed to submit review');
      },
    });
  };

  return (
    <View className="p-4 bg-white rounded-xl shadow my-6 mx-4">
      <Text className="text-lg font-bold text-black mb-4">Write a Review</Text>

      <TextInput
        className="border border-gray-300 rounded p-2 mb-4 h-20 text-black"
        placeholder="Enter your review"
        placeholderTextColor="#999"
        value={review}
        multiline
        onChangeText={setReview}
      />

      <Text className="mb-1 text-black font-semibold">Rating:</Text>
      <View className="border border-gray-300 rounded mb-4">
        <Picker selectedValue={rating} onValueChange={(val) => setRating(val)} mode="dropdown">
          {[1, 2, 3, 4, 5].map((rate) => (
            <Picker.Item key={rate} label={`${rate}`} value={rate} />
          ))}
        </Picker>
      </View>
{/* -------------------- product---------------- */}
      <TouchableOpacity
        className="bg-blue-600 rounded p-3 items-center"
        onPress={handleSubmit}
        disabled={isPending}
      >
        <Text className="text-white font-semibold">
          {isPending ? 'Submitting...' : 'Submit Review'}
        </Text>
      </TouchableOpacity>
      
    </View>
  );
};

export default Reviews;
