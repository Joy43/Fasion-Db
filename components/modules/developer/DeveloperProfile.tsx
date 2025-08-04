import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type TechRow = {
  language: string;
  langColor: string;
  tool: string;
  toolColor: string;
  framework: string;
  frameworkColor: string;
};

const rows: TechRow[] = [
  {
    language: "JavaScript",
    langColor: "#F7DF1E",
    tool: "JWT",
    toolColor: "#000000",
    framework: "React Native",
    frameworkColor: "#61DAFB",
  },
  {
    language: "TypeScript",
    langColor: "#3178C6",
    tool: "Redux",
    toolColor: "#764ABC",
    framework: "Next.js",
    frameworkColor: "#000000",
  },
  {
    language: "Nestjs",
    langColor: "#E34F26",
    tool: "React Router",
    toolColor: "#CA4245",
    framework: "React Native",
    frameworkColor: "#61DAFB",
  },
  {
    language: "Node.js",
    langColor: "#1572B6",
    tool: "Socket.IO",
    toolColor: "#010101",
    framework: "Electron JS",
    frameworkColor: "#47848F",
  },
];

const DeveloperProfile: React.FC = () => {
  return (
    <SafeAreaView className="flex">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} className="p-4">
        {/* Header Image */}
        <View className="items-center mb-4">
          <Image
            source={{
              uri: "https://res.cloudinary.com/dkqdwcguu/image/upload/v1754275277/joy_img_3_ony3do.jpg",
            }}
            className="w-full w-52 h-52 rounded-full mb-4"
            resizeMode="contain"
          />
          <Text className="text-2xl text-gray-700 text-center font-bold mb-2">
            Ss Joy
          </Text>
          <Text className="text-xl font-semibold text-gray-900">
            Software Engineering
          </Text>
        </View>
        <View className=" text-center m-4">
          <Text className="text-lg font-semibold text-gray-700">About Me</Text>

          {/* Description */}
          <Text className=" font-semibold text-gray-700 mb-6 px-2">
            "Shahsultan Islam Joy" from Bangladesh | Passionate about Design,
            Development, and Digital Creativity 🚀 Fluent in React, TypeScript,
            Mongoose, MongoDB, Firebase, Next.js, React Native | Dedicated to
            Crafting Intuitive Prisma Experiences
          </Text>
        </View>

        {/* Table */}
        <View className="rounded-2xl bg-white shadow-md overflow-hidden">
          {/* Header Row */}
          <View className="flex-row bg-indigo-100 py-3 px-2">
            <Text className="flex-1 text-center font-bold text-indigo-800">
              🧠 Language
            </Text>
            <Text className="flex-1 text-center font-bold text-indigo-800">
              📦 Tool
            </Text>
            <Text className="flex-1 text-center font-bold text-indigo-800">
              🏗️ Framework
            </Text>
          </View>

          {/* Data Rows */}
          {rows.map((row, index) => (
            <View
              key={index}
              className={`flex-row py-4 px-2 ${
                index % 2 === 0 ? "bg-white" : "bg-slate-50"
              }`}
            >
              <Text
                className="flex-1 text-center font-semibold text-base"
                style={{ color: row.langColor }}
              >
                {row.language}
              </Text>
              <Text
                className="flex-1 text-center font-semibold text-base"
                style={{ color: row.toolColor }}
              >
                {row.tool}
              </Text>
              <Text
                className="flex-1 text-center font-semibold text-base"
                style={{ color: row.frameworkColor }}
              >
                {row.framework}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeveloperProfile;
