import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeProfile = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.activityButton}>
            <Text style={styles.activityButtonText}>My Activity</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconGroup}>
          <Ionicons name="notifications-outline" size={24} color="black" />
          <Ionicons name="settings-outline" size={24} color="black" />
        </View>
      </View>

      {/* Greeting */}
      <Text style={styles.greeting}>Hello, ss joy!</Text>

      {/* Announcement */}
      <View style={styles.announcementCard}>
        <View>
          <Text style={styles.announcementTitle}>Announcement</Text>
          <Text style={styles.announcementText}>
            Lorem ipsum dolor sit amet, consectetur...
          </Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="chevron-forward-outline" size={24} color="blue" />
        </TouchableOpacity>
      </View>

      {/* Recently Viewed */}
      <Text style={styles.sectionTitle}>Recently viewed</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recentScroll}>
        {[1, 2, 3, 4, 5].map((item) => (
          <Image
            key={item}
            source={{ uri: `https://i.pravatar.cc/100?img=${item + 10}` }}
            style={styles.recentAvatar}
          />
        ))}
      </ScrollView>

      {/*------------ My Orders--------------- */}
      <Text style={styles.sectionTitle}>My Orders</Text>
      <View style={styles.orderButtons}>
        <TouchableOpacity style={styles.orderButton}>
          <Text style={styles.orderButtonText}>To Pay</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.orderButton, styles.receiveButton]}>
          <View style={styles.dot} />
          <Text style={styles.orderButtonText}>To Receive</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.orderButton}>
          <Text style={styles.orderButtonText}>To Review</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  activityButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
  },
  activityButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  iconGroup: {
    flexDirection: 'row',
    gap: 16,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  announcementCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  announcementTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  announcementText: {
    fontSize: 12,
    color: '#6B7280',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  recentScroll: {
    marginBottom: 24,
  },
  recentAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  orderButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  orderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },
  receiveButton: {
    paddingRight: 12,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: '#22C55E',
    borderRadius: 4,
    marginRight: 6,
  },
  orderButtonText: {
    color: '#2563EB',
    fontWeight: '600',
  },
});

export default HomeProfile;
