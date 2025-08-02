import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { registerUser } from "@/services/AuthService";
import Toast from "react-native-toast-message";

export default function RegisterScreen() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    agree: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string | boolean) => {
    setForm({ ...form, [key]: value });
  };

  const handleRegister = async () => {
    if (!form.agree)
      return Alert.alert("Terms", "You must agree to the terms.");

    if (!form.name || !form.email || !form.password) {
      return Alert.alert("Missing Fields", "All fields are required.");
    }

    setLoading(true);

    try {
      const result = await registerUser({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      if (result?.success) {
        Toast.show({
          type: "success",
          text1: result.message || "You have created an account successfully!",
        });

        router.push("/home");
      } else {
        Toast.show({
          type: "error",
          text1: result?.message || "Registration failed.",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      Toast.show({
        type: "error",
        text1: "Unexpected error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-6 pt-10">
      <View className="items-center mb-6">
        <Image
          source={{
            uri: "https://res.cloudinary.com/dkqdwcguu/image/upload/v1754007752/undraw_adventure_map_hnin_2_1_lfwsve.png",
          }}
          style={{ width: 150, height: 150, resizeMode: "contain" }}
        />
      </View>

      <Text className="text-3xl font-bold text-center mb-1">Get Started</Text>
      <Text className="text-center text-gray-500 mb-6">
        by creating a free account.
      </Text>

      {/* Full Name */}
      <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-3 mb-4 border border-gray-300">
        <Feather
          name="user"
          size={18}
          color="#888"
          style={{ marginRight: 10 }}
        />
        <TextInput
          placeholder="Full name"
          value={form.name}
          onChangeText={(val) => handleChange("name", val)}
          className="flex-1 text-gray-700"
        />
      </View>

      {/* Email */}
      <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-3 mb-4 border border-gray-300">
        <Feather
          name="mail"
          size={18}
          color="#888"
          style={{ marginRight: 10 }}
        />
        <TextInput
          placeholder="Valid email"
          value={form.email}
          onChangeText={(val) => handleChange("email", val)}
          className="flex-1 text-gray-700"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Password */}
      <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-3 mb-4 border border-gray-300">
        <Feather
          name="lock"
          size={18}
          color="#888"
          style={{ marginRight: 10 }}
        />
        <TextInput
          placeholder="Strong password"
          secureTextEntry={!showPassword}
          value={form.password}
          onChangeText={(val) => handleChange("password", val)}
          className="flex-1 text-gray-700"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Feather
            name={showPassword ? "eye" : "eye-off"}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      {/* Terms Checkbox */}
      <View className="flex-row items-center mb-6">
        <TouchableOpacity
          onPress={() => handleChange("agree", !form.agree)}
          style={{ marginRight: 8 }}
        >
          <Feather
            name={form.agree ? "check-square" : "square"}
            size={20}
            color={form.agree ? "#f43f5e" : "#aaa"}
          />
        </TouchableOpacity>
        <Text className="text-sm text-gray-700 flex-1">
          By checking the box you agree to our{" "}
          <Text className="text-pink-500 font-semibold">Terms</Text> and{" "}
          <Text className="text-pink-500 font-semibold">Conditions</Text>
        </Text>
      </View>

      {/* Register Button */}
      <TouchableOpacity
        className="bg-pink-500 py-3 rounded-xl flex-row justify-center items-center"
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Text className="text-white font-semibold text-lg mr-2">Next</Text>
            <Feather name="arrow-right" size={20} color="#fff" />
          </>
        )}
      </TouchableOpacity>

      {/* Footer */}
      <Text className="text-center text-gray-600 mt-4">
        Already a member?{" "}
        <Text
          className="text-pink-500 font-semibold"
          onPress={() => router.push("/login")}
        >
          Login in
        </Text>
      </Text>
    </SafeAreaView>
  );
}
