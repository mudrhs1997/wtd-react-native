// components/onboarding/LoginStep.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TextInput, View } from 'react-native';

interface Props {
  onEmailChange: (email: string) => void;
}

export default function LoginStep({ onEmailChange }: Props) {
  const [email, setEmail] = useState('');
  const fadeInAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeInAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 450,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeInAnim, slideAnim]);

  function handleEmailChange(text: string) {
    setEmail(text);
    onEmailChange(text);
  }

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: fadeInAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      <View style={styles.textArea}>
        <Text style={styles.title}>Ready to Get Started?</Text>
        <Text style={styles.subtitle}>
          Log in with your email{'\n'}to access anytime, anywhere.
        </Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email address"
          placeholderTextColor="#9ca3af"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={handleEmailChange}
          returnKeyType="done"
        />
      </View>

      <Text style={styles.hint}>
        You can use the app freely without logging in
      </Text>
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
  textArea: {
    alignItems: 'center',
    marginBottom: 40,
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
  form: {
    width: '100%',
    gap: 12,
  },
  input: {
    height: 52,
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    borderRadius: 14,
    paddingHorizontal: 18,
    fontSize: 15,
    color: '#111827',
    backgroundColor: '#f9fafb',
  },
  hint: {
    marginTop: 20,
    fontSize: 13,
    color: '#9ca3af',
    textAlign: 'center',
  },
});
