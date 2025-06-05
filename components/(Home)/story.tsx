import { FontAwesome } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import YouTube from 'react-native-youtube-iframe';

const storiesData = [
  {
    id: 1,
    thumbnail:
      'https://images.pexels.com/photos/19929726/pexels-photo-19929726/free-photo-of-portrait-of-woman-in-jacket.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    videoId: 'SQeHEUoyj4c',
    live: true,
  },
  {
    id: 2,
    thumbnail: 'https://images.pexels.com/photos/6665048/pexels-photo-6665048.jpeg',
    videoId: 'dQw4w9WgXcQ',
  },
  {
    id: 3,
    thumbnail: 'https://img.youtube.com/vi/3JZ_D3ELwOQ/0.jpg',
    videoId: '3JZ_D3ELwOQ',
  },
];

export default function StoriesSection() {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [playing, setPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const screenWidth = Dimensions.get('window').width;
  const playerRef = useRef<any>(null); // Use `any` since YouTubeStandalonePlayer is not exported

  // Handle modal close and pause video
  const handleCloseModal = async () => {
    try {
      if (playerRef.current?.getYoutubePlayer) {
        await playerRef.current.getYoutubePlayer().pauseVideo();
      }
    } catch (err) {
      console.error('Error pausing video:', err);
      setError('Failed to pause video');
    }
    setSelectedVideoId(null);
    setPlaying(true);
    setError(null);
  };

  // Toggle play/pause
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
      console.error('Error toggling play/pause:', err);
      setError('Failed to control video playback');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Stories</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {storiesData.map((story) => (
          <TouchableOpacity
            key={story.id}
            style={styles.storyCard}
            onPress={() => {
              setSelectedVideoId(story.videoId);
              setPlaying(true);
              setIsLoading(true);
              setError(null);
            }}
          >
            <Image
              source={{ uri: story.thumbnail }}
              style={styles.thumbnail}
              resizeMode="cover"
              onError={(e) => console.log('Thumbnail error:', e.nativeEvent.error)}
            />
            {story.live && (
              <View style={styles.liveBadge}>
                <Text style={styles.liveText}>Live</Text>
              </View>
            )}
            <View style={styles.playIconContainer}>
              <View style={styles.playIconBackground}>
                <FontAwesome name="play" size={14} color="#000" />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal Video Player */}
      <Modal visible={!!selectedVideoId} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
            <FontAwesome name="close" size={24} color="#000" />
          </TouchableOpacity>

          {error && <Text style={styles.errorText}>{error}</Text>}

          {isLoading && (
            <ActivityIndicator
              size="large"
              color="#FFFFFF"
              style={styles.videoLoader}
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
                console.log('YouTube Player Error:', e);
                setError('Failed to load video');
                setIsLoading(false);
              }}
              onChangeState={(event: string) => {
                if (event === 'paused') setPlaying(false);
                if (event === 'playing') setPlaying(true);
                if (event === 'buffering') setIsLoading(true);
                if (event === 'ended') setPlaying(false);
              }}
            />
          )}

          <TouchableOpacity onPress={togglePlayPause} style={styles.playPauseButton}>
            <FontAwesome
              name={playing ? 'pause' : 'play'}
              size={24}
              color="#000"
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    margin: 8,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  scrollView: {
    marginBottom: 16,
  },
  storyCard: {
    width: 190,
    height: 210,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 12,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  liveBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  liveText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  playIconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIconBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    padding: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 12,
    borderRadius: 999,
    zIndex: 99,
  },
  playPauseButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 12,
    borderRadius: 999,
    zIndex: 99,
  },
  videoLoader: {
    position: 'absolute',
    alignSelf: 'center',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
});