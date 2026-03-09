// app/_layout.tsx
import { router, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { hasCompletedOnboarding } from '../utils/onboarding';

export default function RootLayout() {
  // 첫 실행 감지 — 온보딩 미완료 시 리다이렉트
  useEffect(() => {
    hasCompletedOnboarding().then((completed) => {
      if (!completed) router.replace('/onboarding');
    });
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="onboarding"
        options={{ headerShown: false, gestureEnabled: false, animation: 'fade' }}
      />
    </Stack>
  );
}
