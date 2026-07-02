import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const repos = [
  {
    name: 'NEURAL_NET_V4',
    version: 'v2.4.0',
    description: 'Self-optimizing node structure for high-frequency trading platforms. Su...',
    tags: ['RUST', 'WASM']
  },
  {
    name: 'CYBER_CORE_API',
    version: 'v1.0.8',
    description: 'Secure gateway infrastructure with real-time payload filtering and telemetry...',
    tags: ['NESTJS', 'TS']
  }
];

const DeveloperProfile = () => {
  return (
 
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      
      {/* HUD Header Tag */}
      <Text style={styles.hudTag}>[SULTAN_JOY]</Text>

      {/* System Status Bubble */}
      <View style={styles.statusBubble}>
        <View style={styles.statusDot} />
        <Text style={styles.statusText}>SYSTEM_ONLINE // PROTOCOL_READY</Text>
      </View>

      {/* Developer Identification */}
      <Text style={styles.developerName}>SHAHSULTAN ISLAM JOY</Text>
      <Text style={styles.developerTitle}>[FULL STACK SOFTWARE ENGINEER]</Text>

      {/* Cyber Bio */}
      <Text style={styles.bioText}>
        Architecting robust full-stack applications with modular precision. Building scalable digital
        infrastructures that bridge complex logic with seamless user experiences.
      </Text>

      {/* Interactive Actions */}
      <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
        <Text style={styles.primaryButtonText}>INITIATE COLLABORATION</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8}>
        <Text style={styles.secondaryButtonText}>DOWNLOAD_MANIFESTO</Text>
      </TouchableOpacity>

      {/* Cybernetic Profile Image Wrapper */}
      <View style={styles.imageOuterWrapper}>
        <Text style={styles.cornerBracketLeft}>[</Text>
        <View style={styles.imageInnerWrapper}>
          <Image
            source={{ uri: 'https://www.ssjoy.me/assets/ssjoy-DrrQThnw.jpg' }}
            style={styles.profileImage}
          />
          <View style={styles.imageOverlay}>
            <Text style={styles.overlayTextLeft}>AREA_ID: SIJ-2024-X</Text>
            <Text style={styles.overlayTextRight}>ENCRYPTION: AES-256</Text>
          </View>
        </View>
        <Text style={styles.cornerBracketRight}>]</Text>
      </View>

      {/* Stats Section */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>TOTAL_COMMITS</Text>
          <Text style={styles.statValue}>12,482+</Text>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: '80%' }]} />
          </View>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>ACTIVE_PROJECTS</Text>
          <Text style={styles.statValue}>14</Text>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: '65%' }]} />
          </View>
        </View>
      </View>

      <View style={styles.fullWidthStatCard}>
        <Text style={styles.statLabel}>YEARS_IN_SYSTEM</Text>
        <Text style={styles.statValue}>09</Text>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: '90%' }]} />
        </View>
      </View>

      {/* Latest Repositories */}
      <Text style={styles.sectionHeader}>LATEST_REPOS</Text>
      <Text style={styles.sectionSubtitle}>./src/repositories/active/*</Text>

      {repos.map((repo, index) => (
        <View key={index} style={styles.repoCard}>
          <View style={styles.repoHeader}>
            <View style={styles.repoTitleRow}>
              <Feather name="database" size={16} color="#8AB4F8" style={styles.repoIcon} />
              <Text style={styles.repoName}>{repo.name}</Text>
            </View>
            <Text style={styles.repoVersion}>{repo.version}</Text>
          </View>

          <Text style={styles.repoDescription}>{repo.description}</Text>

          <View style={styles.repoFooter}>
            <View style={styles.tagContainer}>
              {repo.tags.map((tag, tIndex) => (
                <View key={tIndex} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
            <Feather name="arrow-right" size={18} color="#8AB4F8" />
          </View>
        </View>
      ))}

      {/* Skill Audit Terminal Box */}
      <View style={styles.terminalContainer}>
        {/* Window Header */}
        <View style={styles.terminalHeader}>
          <View style={styles.windowControls}>
            <View style={[styles.windowDot, { backgroundColor: '#FF5F56' }]} />
            <View style={[styles.windowDot, { backgroundColor: '#FFBD2E' }]} />
            <View style={[styles.windowDot, { backgroundColor: '#27C93F' }]} />
          </View>
          <Text style={styles.terminalTitle}>SULTAN_JOY --SKILL-AUDIT</Text>
        </View>

        {/* Console Content */}
        <View style={styles.terminalBody}>
          <Text style={styles.terminalPrompt}>$ fetch system_capabilities</Text>
          
          <View style={styles.skillRow}>
            <Text style={styles.skillCategory}>INFRASTRUCTURE</Text>
            <Text style={styles.skillValues}>[TERRAFORM, K8S, AWS]</Text>
          </View>
          <View style={styles.skillLine} />

          <View style={styles.skillRow}>
            <Text style={styles.skillCategory}>BACKEND_CORE</Text>
            <Text style={styles.skillValues}>[GO, RUST, PYTHON]</Text>
          </View>
          <View style={styles.skillLine} />

          <View style={styles.skillRow}>
            <Text style={styles.skillCategory}>DISTRIBUTED_DB</Text>
            <Text style={styles.skillValues}>[POSTGRES, REDIS, KAFKA]</Text>
          </View>
          <View style={styles.skillLine} />

          <View style={styles.skillRow}>
            <Text style={styles.skillCategory}>SECURITY_PROTOCOL</Text>
            <Text style={styles.skillValues}>[OAUTH2, MTLS, JWT]</Text>
          </View>
          <View style={styles.skillLine} />

          <Text style={styles.terminalCursor}>_ |</Text>
        </View>
      </View>

    </ScrollView>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:40,
    backgroundColor: '#020813',
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 48,
  },
  hudTag: {
    fontFamily: 'monospace',
    color: '#8AB4F8',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 20,
  },
  statusBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 9999,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    marginBottom: 24,
    backgroundColor: '#070F22',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 8,
  },
  statusText: {
    fontFamily: 'monospace',
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: 'bold',
  },
  developerName: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  developerTitle: {
    fontFamily: 'monospace',
    color: '#00E5FF',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  bioText: {
    color: '#94A3B8',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 28,
  },
  primaryButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    fontFamily: 'monospace',
    color: '#020813',
    fontWeight: 'bold',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 32,
    backgroundColor: 'transparent',
  },
  secondaryButtonText: {
    fontFamily: 'monospace',
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  imageOuterWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  cornerBracketLeft: {
    fontSize: 48,
    color: '#334155',
    fontWeight: '200',
    marginRight: 10,
  },
  cornerBracketRight: {
    fontSize: 48,
    color: '#334155',
    fontWeight: '200',
    marginLeft: 10,
  },
  imageInnerWrapper: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1E293B',
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(2, 8, 19, 0.85)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderColor: '#1E293B',
  },
  overlayTextLeft: {
    fontFamily: 'monospace',
    color: '#8AB4F8',
    fontSize: 10,
    fontWeight: 'bold',
  },
  overlayTextRight: {
    fontFamily: 'monospace',
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: 'bold',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#070F22',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 8,
    padding: 16,
  },
  fullWidthStatCard: {
    backgroundColor: '#070F22',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 8,
    padding: 16,
    marginBottom: 36,
  },
  statLabel: {
    fontFamily: 'monospace',
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  statValue: {
    fontFamily: 'monospace',
    color: '#00E5FF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: '#1E293B',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#8AB4F8',
    borderRadius: 2,
  },
  sectionHeader: {
    fontFamily: 'monospace',
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 2,
  },
  sectionSubtitle: {
    fontFamily: 'monospace',
    color: '#00E5FF',
    fontSize: 11,
    marginBottom: 16,
  },
  repoCard: {
    backgroundColor: '#070F22',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  repoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  repoTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  repoIcon: {
    marginRight: 8,
  },
  repoName: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  repoVersion: {
    fontFamily: 'monospace',
    color: '#94A3B8',
    fontSize: 11,
  },
  repoDescription: {
    color: '#94A3B8',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 16,
  },
  repoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  tag: {
    backgroundColor: '#1E293B',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tagText: {
    fontFamily: 'monospace',
    color: '#8AB4F8',
    fontSize: 10,
    fontWeight: '600',
  },
  terminalContainer: {
    backgroundColor: '#020813',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 28,
  },
  terminalHeader: {
    backgroundColor: '#0F172A',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#1E293B',
  },
  windowControls: {
    flexDirection: 'row',
    gap: 6,
    marginRight: 16,
  },
  windowDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  terminalTitle: {
    fontFamily: 'monospace',
    color: '#64748B',
    fontSize: 11,
    fontWeight: 'bold',
  },
  terminalBody: {
    padding: 16,
  },
  terminalPrompt: {
    fontFamily: 'monospace',
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  skillRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skillCategory: {
    fontFamily: 'monospace',
    color: '#8AB4F8',
    fontSize: 12,
    fontWeight: 'bold',
  },
  skillValues: {
    fontFamily: 'monospace',
    color: '#FFFFFF',
    fontSize: 11,
  },
  skillLine: {
    height: 1,
    backgroundColor: '#1E293B',
    marginVertical: 10,
  },
  terminalCursor: {
    fontFamily: 'monospace',
    color: '#64748B',
    fontSize: 12,
    marginTop: 10,
  },
});

export default DeveloperProfile;
