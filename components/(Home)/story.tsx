import { FontAwesome } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import YouTube from "react-native-youtube-iframe";

const storiesData = [
  {
    id: 1,
    thumbnail:
      "https://images.pexels.com/photos/19929726/pexels-photo-19929726/free-photo-of-portrait-of-woman-in-jacket.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    videoId: "SQeHEUoyj4c",
    live: true,
  },
  {
    id: 2,
    thumbnail:
      "https://images.pexels.com/photos/6665048/pexels-photo-6665048.jpeg",
    videoId: "dQw4w9WgXcQ",
  },
  {
    id: 3,
    thumbnail: "https://img.youtube.com/vi/3JZ_D3ELwOQ/0.jpg",
    videoId: "3JZ_D3ELwOQ",
  },
];

export default function StoriesSection() {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [playing, setPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const screenWidth = Dimensions.get("window").width;
  const playerRef = useRef<any>(null);

  const handleCloseModal = async () => {
    try {
      if (playerRef.current?.getYoutubePlayer) {
        await playerRef.current.getYoutubePlayer().pauseVideo();
      }
    } catch (err) {
      console.error("Error pausing video:", err);
      setError("Failed to pause video");
    }
    setSelectedVideoId(null);
    setPlaying(true);
    setError(null);
  };

  const togglePlayPause = async () => {
    try {
      if (playerRef.current?.getYoutubePlayer) {
        if (playing) {
          await playerRef.current.getYoutubePlayer().pauseVideo();
        } else {
          await playerRef.current.getYoutubePlayer().playVideo();
        }
        setPlaying(!playing);
      }
    } catch (err) {
      console.error("Error toggling play/pause:", err);
      setError("Failed to control video playback");
    }
  };

  return (
    <SafeAreaView className="flex-1 py-6 m-2 ">
      <Text className="text-xl font-bold  text-gray-800 mb-3">New Stories</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-4"
      >
        {storiesData.map((story) => (
          <TouchableOpacity
            key={story.id}
            className="w-[190px] h-[210px] rounded-2xl overflow-hidden mr-3 relative shadow-md"
            onPress={() => {
              setSelectedVideoId(story.videoId);
              setPlaying(true);
              setIsLoading(true);
              setError(null);
            }}
          >
            <Image
              source={{ uri: story.thumbnail }}
              className="w-full h-full"
              resizeMode="cover"
            />
            {story.live && (
              <View className="absolute top-2 left-2 bg-emerald-500 px-2 py-1 rounded">
                <Text className="text-white text-[10px] font-bold">Live</Text>
              </View>
            )}
            <View className="absolute inset-0 justify-center items-center">
              <View className="bg-white/70 p-2.5 rounded-full">
                <FontAwesome name="play" size={14} color="#000" />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal Video Player */}
      <Modal visible={!!selectedVideoId} animationType="slide" transparent>
        <View className="flex-1 justify-center items-center bg-black/90 p-4">
          <TouchableOpacity
            onPress={handleCloseModal}
            className="absolute top-10 right-5 bg-white/70 p-3 rounded-full z-50"
          >
            <FontAwesome name="close" size={24} color="#000" />
          </TouchableOpacity>

          {error && (
            <Text className="text-red-500 text-base text-center mb-4">
              {error}
            </Text>
          )}

          {isLoading && (
            <ActivityIndicator
              size="large"
              color="#FFFFFF"
              className="absolute self-center"
            />
          )}

          {selectedVideoId && (
            <YouTube
              ref={playerRef}
              videoId={selectedVideoId}
              play={playing}
              height={(screenWidth - 40) * 0.56}
              width={screenWidth - 40}
              onReady={() => setIsLoading(false)}
              onError={(e: any) => {
                console.log("YouTube Player Error:", e);
                setError("Failed to load video");
                setIsLoading(false);
              }}
              onChangeState={(event: string) => {
                if (event === "paused") setPlaying(false);
                if (event === "playing") setPlaying(true);
                if (event === "buffering") setIsLoading(true);
                if (event === "ended") setPlaying(false);
              }}
            />
          )}

          <TouchableOpacity
            onPress={togglePlayPause}
            className="absolute bottom-5 self-center bg-white/70 p-3 rounded-full z-50"
          >
            <FontAwesome
              name={playing ? "pause" : "play"}
              size={24}
              color="#000"
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
