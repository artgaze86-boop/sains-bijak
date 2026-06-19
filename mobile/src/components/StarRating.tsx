import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: number;
}

export function StarRating({ rating, maxStars = 3, size = 24 }: StarRatingProps) {
  return (
    <View style={styles.container} accessibilityLabel={`${rating} daripada ${maxStars} bintang`}>
      {Array.from({ length: maxStars }, (_, i) => (
        <Text key={i} style={{ fontSize: size, marginRight: 2 }}>
          {i < rating ? '⭐' : '☆'}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});