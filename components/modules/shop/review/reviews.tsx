import { useCreateReview } from "@/hooks/useReview";
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

    const reviewData = {
      review,
      rating,
      product: productId,
      isVerifiedPurchase: true,
    };

    mutate(reviewData, {
      onSuccess: () => {
        Alert.alert("Success", "Review submitted!");
        setReview("");
        setRating(5);
      },
      onError: (error: any) => {
        Alert.alert("Error", error?.message || "Failed to submit review");
        console.log(error.message);
      },
    });
  };

  return (
    <View className="p-5 bg-white rounded-2xl shadow-lg my-6 mx-4">
      <Text className="text-xl font-bold text-gray-900 mb-5">
        Write a Review
      </Text>

      <TextInput
        className="border border-gray-300 rounded-xl p-4 mb-5 h-28 text-gray-900 bg-gray-50"
        placeholder="Share your experience..."
        placeholderTextColor="#888"
        value={review}
        multiline
        editable={!isPending}
        onChangeText={setReview}
      />

      <Text className="mb-2 text-gray-900 font-semibold">Rating:</Text>
      <View className="flex-row mb-5">
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Text style={{ fontSize: 32, marginHorizontal: 4, color: "#FFD700" }}>
              {star <= rating ? "★" : "☆"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        className={`rounded-xl p-4 items-center ${
          isPending ? "bg-gray-400" : "bg-blue-600"
        }`}
        onPress={handleSubmit}
        disabled={isPending}
        activeOpacity={0.8}
      >
        {isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-semibold text-lg">
            Submit Review
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Reviews;