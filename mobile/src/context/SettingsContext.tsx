import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Speech from 'expo-speech';
import { colors, highContrastColors, typography, dyslexiaTypography } from '../theme';

interface SettingsContextType {
  dyslexiaFont: boolean;
  highContrast: boolean;
  audioEnabled: boolean;
  largeText: boolean;
  themeColors: typeof colors;
  textStyles: typeof typography;
  toggleDyslexiaFont: () => void;
  toggleHighContrast: () => void;
  toggleAudio: () => void;
  toggleLargeText: () => void;
  speak: (text: string) => void;
  stopSpeaking: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const SETTINGS_KEY = 'app_settings';

interface StoredSettings {
  dyslexiaFont: boolean;
  highContrast: boolean;
  audioEnabled: boolean;
  largeText: boolean;
}

const defaultSettings: StoredSettings = {
  dyslexiaFont: false,
  highContrast: false,
  audioEnabled: true,
  largeText: false,
};

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [dyslexiaFont, setDyslexiaFont] = useState(defaultSettings.dyslexiaFont);
  const [highContrast, setHighContrast] = useState(defaultSettings.highContrast);
  const [audioEnabled, setAudioEnabled] = useState(defaultSettings.audioEnabled);
  const [largeText, setLargeText] = useState(defaultSettings.largeText);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const stored = await AsyncStorage.getItem(SETTINGS_KEY);
      if (stored) {
        const settings: StoredSettings = JSON.parse(stored);
        setDyslexiaFont(settings.dyslexiaFont);
        setHighContrast(settings.highContrast);
        setAudioEnabled(settings.audioEnabled);
        setLargeText(settings.largeText);
      }
    } catch (error) {
      console.error('Gagal memuatkan tetapan:', error);
    }
  }

  async function saveSettings(settings: StoredSettings) {
    try {
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Gagal menyimpan tetapan:', error);
    }
  }

  const getCurrentSettings = useCallback(
    (): StoredSettings => ({
      dyslexiaFont,
      highContrast,
      audioEnabled,
      largeText,
    }),
    [dyslexiaFont, highContrast, audioEnabled, largeText]
  );

  const toggleDyslexiaFont = useCallback(() => {
    setDyslexiaFont((prev) => {
      const next = !prev;
      saveSettings({ ...getCurrentSettings(), dyslexiaFont: next });
      return next;
    });
  }, [getCurrentSettings]);

  const toggleHighContrast = useCallback(() => {
    setHighContrast((prev) => {
      const next = !prev;
      saveSettings({ ...getCurrentSettings(), highContrast: next });
      return next;
    });
  }, [getCurrentSettings]);

  const toggleAudio = useCallback(() => {
    setAudioEnabled((prev) => {
      const next = !prev;
      saveSettings({ ...getCurrentSettings(), audioEnabled: next });
      return next;
    });
  }, [getCurrentSettings]);

  const toggleLargeText = useCallback(() => {
    setLargeText((prev) => {
      const next = !prev;
      saveSettings({ ...getCurrentSettings(), largeText: next });
      return next;
    });
  }, [getCurrentSettings]);

  const speak = useCallback(
    (text: string) => {
      if (audioEnabled) {
        Speech.speak(text, { language: 'ms-MY', rate: 0.9 });
      }
    },
    [audioEnabled]
  );

  const stopSpeaking = useCallback(() => {
    Speech.stop();
  }, []);

  const baseTypography = dyslexiaFont ? dyslexiaTypography : typography;
  const textStyles = largeText
    ? Object.fromEntries(
        Object.entries(baseTypography).map(([key, style]) => [
          key,
          { ...style, fontSize: (style.fontSize as number) + 4 },
        ])
      )
    : baseTypography;

  const themeColors = highContrast ? highContrastColors : colors;

  return (
    <SettingsContext.Provider
      value={{
        dyslexiaFont,
        highContrast,
        audioEnabled,
        largeText,
        themeColors,
        textStyles: textStyles as typeof typography,
        toggleDyslexiaFont,
        toggleHighContrast,
        toggleAudio,
        toggleLargeText,
        speak,
        stopSpeaking,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings mesti digunakan dalam SettingsProvider');
  }
  return context;
}