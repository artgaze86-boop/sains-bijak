import React from 'react';
import { Image, View, StyleSheet, ImageStyle, ViewStyle } from 'react-native';
import { borderRadius } from '../theme/spacing';

const API_HOST = 'http://localhost:3001';

interface TopicImageProps {
  imageUrl?: string;
  size?: number;
  style?: ImageStyle;
  containerStyle?: ViewStyle;
}

export function resolveImageUri(imageUrl?: string): string | undefined {
  if (!imageUrl) return undefined;
  if (imageUrl.startsWith('http')) return imageUrl;
  return `${API_HOST}${imageUrl}`;
}

export function TopicImage({ imageUrl, size = 72, style, containerStyle }: TopicImageProps) {
  const uri = resolveImageUri(imageUrl);

  if (!uri) {
    return (
      <View
        style={[
          styles.placeholder,
          { width: size, height: size, borderRadius: borderRadius.md },
          containerStyle,
        ]}
      />
    );
  }

  return (
    <Image
      source={{ uri }}
      style={[{ width: size, height: size, borderRadius: borderRadius.md }, style]}
      resizeMode="cover"
    />
  );
}

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: '#E8F5E9',
  },
});