// app/onboarding.tsx
import { router } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { markOnboardingComplete } from '../utils/onboarding';
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AnimationStep1 from '../components/onboarding/AnimationStep1';
import AnimationStep2 from '../components/onboarding/AnimationStep2';
import LoginStep from '../components/onboarding/LoginStep';
import WelcomeStep from '../components/onboarding/WelcomeStep';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface StepItem {
  id: 'welcome' | 'animation1' | 'animation2' | 'login';
}

const STEPS: StepItem[] = [
  { id: 'welcome' },
  { id: 'animation1' },
  { id: 'animation2' },
  { id: 'login' },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loginEmail, setLoginEmail] = useState('');
  const flatListRef = useRef<FlatList<StepItem>>(null);
  const insets = useSafeAreaInsets();

  const isFirstStep = currentIndex === 0;
  const isLastStep = currentIndex === STEPS.length - 1;

  const handleNext = useCallback(() => {
    const next = currentIndex + 1;
    if (next < STEPS.length) {
      flatListRef.current?.scrollToIndex({ index: next, animated: true });
      setCurrentIndex(next);
    }
  }, [currentIndex]);

  const handleSkip = useCallback(() => {
    markOnboardingComplete();
    router.replace('/');
  }, []);

  const handleComplete = useCallback(() => {
    // TODO: loginEmail이 있으면 로그인 처리 후 이동
    markOnboardingComplete();
    router.replace('/');
  }, [loginEmail]);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentIndex(viewableItems[0].index ?? 0);
      }
    }
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const renderItem = useCallback(
    ({ item }: { item: StepItem }) => {
      let content: React.ReactNode;

      switch (item.id) {
        case 'welcome':
          content = <WelcomeStep />;
          break;
        case 'animation1':
          content = <AnimationStep1 />;
          break;
        case 'animation2':
          content = <AnimationStep2 />;
          break;
        case 'login':
          content = <LoginStep onEmailChange={setLoginEmail} />;
          break;
      }

      return <View style={styles.stepWrapper}>{content}</View>;
    },
    []
  );

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* 헤더 — 건너뛰기 버튼 (2~3단계에서만 표시) */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        {!isFirstStep && !isLastStep ? (
          <Pressable style={styles.skipButton} onPress={handleSkip} hitSlop={12}>
            <Text style={styles.skipText}>건너뛰기</Text>
          </Pressable>
        ) : (
          <View style={styles.skipPlaceholder} />
        )}
      </View>

      {/* 슬라이드 영역 */}
      <FlatList
        ref={flatListRef}
        data={STEPS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        style={styles.flatList}
      />

      {/* 하단 네비게이션 */}
      <View style={[styles.bottomNav, { paddingBottom: insets.bottom + 20 }]}>
        {/* 페이지 도트 인디케이터 */}
        <View style={styles.dots}>
          {STEPS.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === currentIndex && styles.dotActive]}
            />
          ))}
        </View>

        {/* CTA 버튼 */}
        <Pressable
          style={({ pressed }) => [
            styles.ctaButton,
            pressed && styles.ctaButtonPressed,
          ]}
          onPress={isLastStep ? handleComplete : handleNext}
        >
          <Text style={styles.ctaText}>
            {isLastStep ? '시작하기' : '다음'}
          </Text>
        </Pressable>

        {/* 로그인 단계 — 나중에 로그인 링크 */}
        {isLastStep ? (
          <Pressable
            style={styles.skipLoginButton}
            onPress={handleSkip}
            hitSlop={8}
          >
            <Text style={styles.skipLoginText}>나중에 로그인하기</Text>
          </Pressable>
        ) : (
          <View style={styles.skipLoginPlaceholder} />
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 52,
    paddingHorizontal: 24,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  skipButton: {
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  skipText: {
    fontSize: 14,
    color: '#9ca3af',
    fontWeight: '500',
  },
  skipPlaceholder: {
    height: 28,
  },
  flatList: {
    flex: 1,
  },
  stepWrapper: {
    width: SCREEN_WIDTH,
    flex: 1,
  },
  bottomNav: {
    paddingHorizontal: 24,
    paddingTop: 16,
    alignItems: 'center',
    gap: 14,
  },
  dots: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#e5e7eb',
  },
  dotActive: {
    width: 22,
    borderRadius: 3,
    backgroundColor: '#111827',
  },
  ctaButton: {
    width: '100%',
    height: 54,
    backgroundColor: '#111827',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaButtonPressed: {
    opacity: 0.82,
  },
  ctaText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  skipLoginButton: {
    paddingVertical: 4,
  },
  skipLoginText: {
    fontSize: 14,
    color: '#9ca3af',
    fontWeight: '500',
  },
  skipLoginPlaceholder: {
    height: 28,
  },
});
