import React, { useState } from "react";
import { loginUser } from "@/services/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import Toast from "react-native-toast-message";
import { Feather, MaterialIcons } from "@expo/vector-icons";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const result = await loginUser(data);
      if (result.success) {
        Toast.show({
          type: "success",
          text1: "Login Successful",
          text2: result.message || "You have logged in successfully!",
        });
        router.push("/home");
      } else {
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: result.message || "Invalid email or password.",
        });
      }
    } catch {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please try again later.",
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-white px-6 justify-center"
    >
      {/* Top Illustration */}
      <View className="items-center mb-6">
        <Image
          source={{
            uri: "https://res.cloudinary.com/dkqdwcguu/image/upload/v1754007752/undraw_adventure_map_hnin_2_1_lfwsve.png",
          }}
          style={{ width: 150, height: 150, resizeMode: "contain" }}
        />
      </View>

      {/* Welcome Text */}
      <Text className="text-3xl font-bold text-center text-black mb-1">
        <Text className="text-[#FF3E5B]">W</Text>elcome back
      </Text>
      <Text className="text-center text-gray-500 mb-6">
        sign in to access your account
      </Text>

      {/* Email Input */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <View className="flex-row items-center bg-[#F7F7F7] rounded-xl px-4 mb-4">
            <MaterialIcons name="email" size={20} color="#888" />
            <TextInput
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className="flex-1 py-4 px-3 text-[15px] text-black"
              placeholderTextColor="#999"
            />
          </View>
        )}
      />
      {errors.email && (
        <Text className="text-red-500 -mt-3 mb-2">{errors.email.message}</Text>
      )}

      {/* Password Input */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <View className="flex-row items-center bg-[#F7F7F7] rounded-xl px-4 mb-4">
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Feather
                name={showPassword ? "eye" : "eye-off"}
                size={20}
                color="#888"
              />
            </TouchableOpacity>
            <TextInput
              placeholder="Password"
              secureTextEntry={!showPassword}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className="flex-1 py-4 px-3 text-[15px] text-black"
              placeholderTextColor="#999"
            />
          </View>
        )}
      />
      {errors.password && (
        <Text className="text-red-500 -mt-3 mb-2">
          {errors.password.message}
        </Text>
      )}

      {/* Remember Me & Forgot Password */}
      <View className="flex-row justify-between items-center mb-4 px-1">
        <TouchableOpacity
          onPress={() => setRememberMe(!rememberMe)}
          className="flex-row items-center"
        >
          <View
            className={`w-5 h-5 rounded border-2 mr-2 ${
              rememberMe ? "bg-[#FF3E5B] border-[#FF3E5B]" : "border-gray-400"
            } items-center justify-center`}
          >
            {rememberMe && <Feather name="check" size={16} color="white" />}
          </View>
          <Text className="text-xs text-gray-500">Remember me</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/")}>
          <Text className="text-xs text-[#FF3E5B]">Forgot password ?</Text>
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        className={`bg-[#FF3E5B] rounded-xl py-4 ${
          isSubmitting ? "opacity-60" : ""
        }`}
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-center font-medium text-[16px]">
            Next ➔
          </Text>
        )}
      </TouchableOpacity>

      {/* Bottom Register */}
      <View className="mt-6 items-center">
        <Text className="text-sm text-gray-500">
          New member?{" "}
          <Text
            className="text-[#FF3E5B] font-semibold"
            onPress={() => router.push("/register")}
          >
            Register now
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginForm;
