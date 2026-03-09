// components/onboarding/AnimationStep2.tsx
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

export default function AnimationStep2() {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const fadeInAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    const float = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -10,
          duration: 1400,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1400,
          useNativeDriver: true,
        }),
      ])
    );
    float.start();

    return () => float.stop();
  }, [floatAnim, fadeInAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeInAnim }]}>
      <Animated.View
        style={[
          styles.placeholderBox,
          { transform: [{ translateY: floatAnim }] },
        ]}
      >
        <View style={styles.placeholderInner}>
          <Text style={styles.placeholderIcon}>✦</Text>
          <Text style={styles.placeholderLabel}>Animation coming soon</Text>
        </View>
      </Animated.View>

      <View style={styles.textArea}>
        <Text style={styles.title}>Smarter Decisions</Text>
        <Text style={styles.subtitle}>
          Even complex situations{'\n'}broken down simply for you.
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 32,
  },
  placeholderBox: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 48,
  },
  placeholderInner: {
    alignItems: 'center',
    gap: 10,
  },
  placeholderIcon: {
    fontSize: 44,
    color: '#d1d5db',
  },
  placeholderLabel: {
    fontSize: 13,
    color: '#9ca3af',
    fontWeight: '500',
  },
  textArea: {
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -0.5,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#6b7280',
    lineHeight: 24,
    textAlign: 'center',
  },
});
