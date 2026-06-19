import { TextStyle } from 'react-native';

export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
  xxxl: 36,
  display: 42,
};

export const fontWeights = {
  regular: '400' as TextStyle['fontWeight'],
  medium: '500' as TextStyle['fontWeight'],
  semibold: '600' as TextStyle['fontWeight'],
  bold: '700' as TextStyle['fontWeight'],
};

export const typography = {
  display: {
    fontSize: fontSizes.display,
    fontWeight: fontWeights.bold,
    lineHeight: 50,
  },
  h1: {
    fontSize: fontSizes.xxxl,
    fontWeight: fontWeights.bold,
    lineHeight: 44,
  },
  h2: {
    fontSize: fontSizes.xxl,
    fontWeight: fontWeights.bold,
    lineHeight: 36,
  },
  h3: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.semibold,
    lineHeight: 30,
  },
  body: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.regular,
    lineHeight: 24,
  },
  bodyLarge: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.regular,
    lineHeight: 28,
  },
  caption: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
    lineHeight: 20,
  },
  button: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semibold,
    lineHeight: 24,
  },
};

export const dyslexiaTypography = {
  display: { ...typography.display, fontSize: fontSizes.display + 4, letterSpacing: 1.5 },
  h1: { ...typography.h1, fontSize: fontSizes.xxxl + 4, letterSpacing: 1.2 },
  h2: { ...typography.h2, fontSize: fontSizes.xxl + 4, letterSpacing: 1.2 },
  h3: { ...typography.h3, fontSize: fontSizes.xl + 2, letterSpacing: 1 },
  body: { ...typography.body, fontSize: fontSizes.md + 2, letterSpacing: 0.8, lineHeight: 28 },
  bodyLarge: { ...typography.bodyLarge, fontSize: fontSizes.lg + 2, letterSpacing: 0.8, lineHeight: 32 },
  caption: { ...typography.caption, fontSize: fontSizes.sm + 2, letterSpacing: 0.5 },
  button: { ...typography.button, fontSize: fontSizes.lg + 2, letterSpacing: 1 },
};