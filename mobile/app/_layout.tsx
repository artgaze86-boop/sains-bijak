import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from '../src/context/AuthContext';
import { SettingsProvider } from '../src/context/SettingsContext';
import { OfflineProvider } from '../src/context/OfflineContext';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <SettingsProvider>
          <OfflineProvider>
            <StatusBar style="auto" />
            <Stack
              screenOptions={{
                headerStyle: { backgroundColor: '#4CAF50' },
                headerTintColor: '#FFFFFF',
                headerTitleStyle: { fontWeight: 'bold' },
                animation: 'slide_from_right',
              }}
            >
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="year/[year]" options={{ title: 'Topik Tahun' }} />
              <Stack.Screen name="topic/[id]" options={{ title: 'Topik' }} />
              <Stack.Screen name="nota/[id]" options={{ title: 'Nota' }} />
              <Stack.Screen name="kuiz/[id]" options={{ title: 'Kuiz' }} />
              <Stack.Screen name="eksperimen/[id]" options={{ title: 'Eksperimen' }} />
              <Stack.Screen name="kad-imbas/[topicId]" options={{ title: 'Kad Imbas' }} />
              <Stack.Screen name="video/[topicId]" options={{ title: 'Video Pembelajaran' }} />
              <Stack.Screen name="video/play/[videoId]" options={{ title: 'Tonton Video' }} />
              <Stack.Screen name="permainan/[gameId]" options={{ title: 'Permainan' }} />
              <Stack.Screen name="kemajuan" options={{ title: 'Kemajuan Saya' }} />
              <Stack.Screen name="parent/index" options={{ title: 'Papan Ibu Bapa' }} />
              <Stack.Screen name="teacher/index" options={{ title: 'Papan Guru' }} />
            </Stack>
          </OfflineProvider>
        </SettingsProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}