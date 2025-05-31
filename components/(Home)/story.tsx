import { FontAwesome } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import VideoPlayer, { VideoPlayerProps } from 'react-native-video-player';

// ✅ TypeScript interface for stories
interface Story {
  id: number;
  thumbnail: string;
  videoUrl: string;
  live?: boolean;
}

// ✅ JSON data declared inside the file
const storiesData: Story[] = [
  {
    id: 1,
    thumbnail: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    videoUrl: 'https://youtube.com/shorts/P25Bb50Yonw?si=NONXF7pjp9Dz5mds',
    live: true,
  },
  {
    id: 2,
    thumbnail: 'https://plus.unsplash.com/premium_photo-1695575576052-7c271876b075?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    videoUrl: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  },
  {
    id: 3,
    thumbnail: 'https://img.youtube.com/vi/3JZ_D3ELwOQ/0.jpg',
    videoUrl: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  },
];

export default function StoriesSection() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const screenWidth = Dimensions.get('window').width;
  const playerRef = useRef<VideoPlayerProps | null>(null);

  return (
    <View className="px-4 py-4">
      <Text className="text-lg font-semibold mb-3">Stories</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {storiesData.map((story) => (
          <TouchableOpacity
            key={story.id}
            className="w-48 h-52 rounded-xl overflow-hidden relative mr-3"
            onPress={() => setSelectedVideo(story.videoUrl)}
          >
            <Image
              source={{ uri: story.thumbnail }}
              className="w-full h-full rounded-xl"
              resizeMode="cover"
            />

            {story.live && (
              <View className="absolute top-2 left-2 bg-green-500 px-2 py-0.5 rounded">
                <Text className="text-white text-xs font-semibold">Live</Text>
              </View>
            )}

            <View className="absolute inset-0 justify-center items-center">
              <View className="bg-white/70 p-2 rounded-full">
                <FontAwesome name="play" size={14} color="black" />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Video Modal */}
      <Modal visible={!!selectedVideo} animationType="slide" transparent={true}>
        <View className="flex-1 justify-center items-center bg-black/90 px-4">
          <TouchableOpacity
            className="absolute top-10 right-5 z-10 bg-white/70 rounded-full p-2"
            onPress={() => setSelectedVideo(null)}
          >
            <FontAwesome name="close" size={24} color="black" />
          </TouchableOpacity>

          {selectedVideo && (
            <VideoPlayer
              ref={playerRef}
              endWithThumbnail
              thumbnail={{
                uri: storiesData.find(story => story.videoUrl === selectedVideo)?.thumbnail || '',
              }}
              video={{ uri: selectedVideo }}
              onError={(e) => console.log('Video Error:', e)}
              showDuration
              videoWidth={screenWidth - 40}
              videoHeight={screenWidth * 0.56}
            />
          )}
        </View>
      </Modal>
    </View>
  );
}
