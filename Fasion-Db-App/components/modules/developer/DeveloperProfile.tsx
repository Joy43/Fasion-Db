import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

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
    <ScrollView 
      className="flex-1 mt-10 bg-background" 
      contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 32, paddingBottom: 48 }}
    >
      {/* HUD Header Tag */}
      <Text className="font-mono text-accent text-sm font-semibold tracking-widest mb-5">[SULTAN_JOY]</Text>

      {/* System Status Bubble */}
      <View className="flex-row items-center border border-border rounded-full py-2 px-4 self-start mb-6 bg-surface">
        <View className="w-1.5 h-1.5 rounded-full bg-success mr-2" />
        <Text className="font-mono text-secondaryText text-[11px] font-bold">SYSTEM_ONLINE // PROTOCOL_READY</Text>
      </View>

      {/* Developer Identification */}
      <Text className="text-text text-2xl font-extrabold tracking-wide mb-1">SHAHSULTAN ISLAM JOY</Text>
      <Text className="font-mono text-accent text-sm font-bold tracking-wide mb-4">[FULL STACK SOFTWARE ENGINEER]</Text>

      {/* Cyber Bio */}
      <Text className="text-secondaryText text-sm leading-6 mb-7">
        Architecting robust full-stack applications with modular precision. Building scalable digital
        infrastructures that bridge complex logic with seamless user experiences.
      </Text>

      {/* Interactive Actions */}
      <TouchableOpacity className="bg-primary rounded-lg py-3.5 items-center mb-3 active:opacity-90" activeOpacity={0.8}>
        <Text className="font-mono text-surface font-bold text-xs tracking-wider">INITIATE COLLABORATION</Text>
      </TouchableOpacity>

      <TouchableOpacity className="border border-border rounded-lg py-3.5 items-center mb-8 bg-surface active:opacity-90" activeOpacity={0.8}>
        <Text className="font-mono text-text font-bold text-xs tracking-wider">DOWNLOAD_MANIFESTO</Text>
      </TouchableOpacity>

      {/* Cybernetic Profile Image Wrapper */}
      <View className="flex-row items-center justify-center mb-8">
        <Text className="text-5xl text-border font-light mr-2.5">[</Text>
        <View className="flex-1 aspect-square rounded-lg overflow-hidden border border-border relative">
          <Image
            source={{ uri: 'https://www.ssjoy.me/assets/ssjoy-DrrQThnw.jpg' }}
            className="w-full h-full"
            resizeMode="cover"
          />
          <View className="absolute bottom-0 left-0 right-0 bg-primary/85 flex-row justify-between py-2.5 px-3 border-t border-border">
            <Text className="font-mono text-accent text-[10px] font-bold">AREA_ID: SIJ-2024-X</Text>
            <Text className="font-mono text-border text-[10px] font-bold">ENCRYPTION: AES-256</Text>
          </View>
        </View>
        <Text className="text-5xl text-border font-light ml-2.5">]</Text>
      </View>

      {/* Stats Section */}
      <View className="flex-row justify-between mb-4 gap-4">
        <View className="flex-1 bg-surface border border-border rounded-lg p-4">
          <Text className="font-mono text-secondaryText text-[11px] font-semibold tracking-wider mb-2">TOTAL_COMMITS</Text>
          <Text className="font-mono text-primary text-xl font-bold mb-3">12,482+</Text>
          <View className="h-1 bg-border rounded-full overflow-hidden">
            <View className="h-full bg-accent rounded-full" style={{ width: '80%' }} />
          </View>
        </View>

        <View className="flex-1 bg-surface border border-border rounded-lg p-4">
          <Text className="font-mono text-secondaryText text-[11px] font-semibold tracking-wider mb-2">ACTIVE_PROJECTS</Text>
          <Text className="font-mono text-primary text-xl font-bold mb-3">14</Text>
          <View className="h-1 bg-border rounded-full overflow-hidden">
            <View className="h-full bg-accent rounded-full" style={{ width: '65%' }} />
          </View>
        </View>
      </View>

      <View className="bg-surface border border-border rounded-lg p-4 mb-9">
        <Text className="font-mono text-secondaryText text-[11px] font-semibold tracking-wider mb-2">YEARS_IN_SYSTEM</Text>
        <Text className="font-mono text-primary text-xl font-bold mb-3">09</Text>
        <View className="h-1 bg-border rounded-full overflow-hidden">
          <View className="h-full bg-accent rounded-full" style={{ width: '90%' }} />
        </View>
      </View>

      {/* Latest Repositories */}
      <Text className="font-mono text-text text-sm font-bold tracking-widest mb-0.5">LATEST_REPOS</Text>
      <Text className="font-mono text-accent text-[11px] mb-4">./src/repositories/active/*</Text>

      {repos.map((repo, index) => (
        <View key={index} className="bg-surface border border-border rounded-lg p-4 mb-3">
          <View className="flex-row justify-between items-center mb-2">
            <View className="flex-row items-center">
              <Feather name="database" size={16} color="#EF4444" className="mr-2" />
              <Text className="text-text font-bold text-sm">{repo.name}</Text>
            </View>
            <Text className="font-mono text-secondaryText text-[11px]">{repo.version}</Text>
          </View>

          <Text className="text-secondaryText text-xs leading-5 mb-4">{repo.description}</Text>

          <View className="flex-row justify-between items-center">
            <View className="flex-row gap-1.5">
              {repo.tags.map((tag, tIndex) => (
                <View key={tIndex} className="bg-background rounded px-2 py-0.5">
                  <Text className="font-mono text-primary text-[10px] font-semibold">{tag}</Text>
                </View>
              ))}
            </View>
            <Feather name="arrow-right" size={18} color="#EF4444" />
          </View>
        </View>
      ))}

      {/* Skill Audit Terminal Box */}
      <View className="bg-surface border border-border rounded-lg overflow-hidden mt-7">
        {/* Window Header */}
        <View className="bg-primary flex-row items-center py-2.5 px-4 border-b border-border">
          <View className="flex-row gap-1.5 mr-4">
            <View className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FF5F56' }} />
            <View className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FFBD2E' }} />
            <View className="w-2 h-2 rounded-full" style={{ backgroundColor: '#27C93F' }} />
          </View>
          <Text className="font-mono text-secondaryText text-[11px] font-bold">SULTAN_JOY --SKILL-AUDIT</Text>
        </View>

        {/* Console Content */}
        <View className="p-4">
          <Text className="font-mono text-text text-sm font-bold mb-5">$ fetch system_capabilities</Text>
          
          <View className="flex-row justify-between items-center">
            <Text className="font-mono text-accent text-xs font-bold">INFRASTRUCTURE</Text>
            <Text className="font-mono text-text text-[11px]">[TERRAFORM, K8S, AWS]</Text>
          </View>
          <View className="h-[1px] bg-border my-2.5" />

          <View className="flex-row justify-between items-center">
            <Text className="font-mono text-accent text-xs font-bold">BACKEND_CORE</Text>
            <Text className="font-mono text-text text-[11px]">[GO, RUST, PYTHON]</Text>
          </View>
          <View className="h-[1px] bg-border my-2.5" />

          <View className="flex-row justify-between items-center">
            <Text className="font-mono text-accent text-xs font-bold">DISTRIBUTED_DB</Text>
            <Text className="font-mono text-text text-[11px]">[POSTGRES, REDIS, KAFKA]</Text>
          </View>
          <View className="h-[1px] bg-border my-2.5" />

          <View className="flex-row justify-between items-center">
            <Text className="font-mono text-accent text-xs font-bold">SECURITY_PROTOCOL</Text>
            <Text className="font-mono text-text text-[11px]">[OAUTH2, MTLS, JWT]</Text>
          </View>
          <View className="h-[1px] bg-border my-2.5" />

          <Text className="font-mono text-secondaryText text-xs mt-2.5">_ |</Text>
        </View>
      </View>

    </ScrollView>
  );
};

export default DeveloperProfile;
