// components/onboarding/AnimationStep1.tsx
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

export default function AnimationStep1() {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeInAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.06,
          duration: 950,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 950,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    return () => pulse.stop();
  }, [pulseAnim, fadeInAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeInAnim }]}>
      <Animated.View
        style={[styles.placeholderBox, { transform: [{ scale: pulseAnim }] }]}
      >
        <View style={styles.placeholderInner}>
          <Text style={styles.placeholderIcon}>▶</Text>
          <Text style={styles.placeholderLabel}>Animation coming soon</Text>
        </View>
      </Animated.View>

      <View style={styles.textArea}>
        <Text style={styles.title}>Here's How It Works</Text>
        <Text style={styles.subtitle}>
          Type your question and{'\n'}get a clear answer instantly.
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
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 48,
    backgroundColor: '#f9fafb',
  },
  placeholderInner: {
    alignItems: 'center',
    gap: 10,
  },
  placeholderIcon: {
    fontSize: 36,
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
