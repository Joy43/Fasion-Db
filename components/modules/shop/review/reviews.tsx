import { useCreateReview } from "@/hooks/useReview";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";

interface ReviewsProps {
  productId: string;
}

const Reviews = ({ productId }: ReviewsProps) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);

  const { mutate, isPending } = useCreateReview();

  const handleSubmit = () => {
    if (!review.trim()) {
      Alert.alert("Please enter a review");
      return;
    }
    if (review.length < 5) {
      Alert.alert("Review must be at least 5 characters");
      return;
    }

    const reviewData = new FormData();
    reviewData.append('review', review);
    reviewData.append('rating', rating.toString());
    reviewData.append('product', productId);

    mutate(reviewData, {
      onSuccess: () => {
        Alert.alert("Success", "Review submitted!");
        setReview("");
        setRating(5);
      },
      onError: (error: any) => {
        Alert.alert("Error", error?.message || "Failed to submit review");
        console.log(error);
      },
    });
  };

  return (
    <View className="p-4 bg-white rounded-xl shadow my-6 mx-4">
      <Text className="text-lg font-bold text-black mb-4">Write a Review</Text>

      <TextInput
        className="border border-gray-300 rounded-lg p-3 mb-4 h-20 text-black"
        placeholder="Enter your review..."
        placeholderTextColor="#999"
        value={review}
        multiline
        editable={!isPending}
        onChangeText={setReview}
      />

      <Text className="mb-1 text-black font-semibold">Rating:</Text>
      <View className="border border-gray-300 rounded-lg mb-4">
        <Picker
          selectedValue={rating}
          onValueChange={(val) => setRating(val)}
          mode="dropdown"
          enabled={!isPending}
        >
          {[1, 2, 3, 4, 5].map((rate) => (
            <Picker.Item key={rate} label={`${rate}`} value={rate} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity
        className={`rounded-lg p-3 items-center ${
          isPending ? "bg-gray-400" : "bg-blue-600"
        }`}
        onPress={handleSubmit}
        disabled={isPending}
      >
        {isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-semibold">Submit Review</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Reviews;
