import { StatusBar } from 'expo-status-bar';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AnswerDisplay from '../components/AnswerDisplay';
import ChatView, { type ChatItem } from '../components/ChatView';
import QuestionInput from '../components/QuestionInput';
import ThinkingDots from '../components/ThinkingDots';
import { askClaude, type AnswerResult } from '../services/claude';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const INPUT_CONTAINER_HEIGHT = 130;
const CENTER_BOTTOM = (SCREEN_HEIGHT - INPUT_CONTAINER_HEIGHT) / 2;

export default function HomeScreen() {
  const [inputValue, setInputValue] = useState('');
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [activeResult, setActiveResult] = useState<AnswerResult | null>(null);
  const [chatItems, setChatItems] = useState<ChatItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  const moveAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(1)).current;
  const dimAnim = useRef(new Animated.Value(0)).current;
  const blurAnim = useRef(new Animated.Value(0)).current;
  const activeQuestionRef = useRef<string | null>(null);
  const addedToHistoryRef = useRef(false);

  const showDim = inputFocused && inputValue.length > 0 && !loading;

  useEffect(() => {
    Animated.timing(dimAnim, {
      toValue: showDim ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [showDim]);

  const showBlur = loading || !!activeResult;

  useEffect(() => {
    Animated.timing(blurAnim, {
      toValue: showBlur ? 1 : 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [showBlur]);

  function handleFocusChange(focused: boolean) {
    setInputFocused(focused);
  }

  function handleChangeText(text: string) {
    setInputValue(text);
    if (error) setError(null);
  }

  function archiveCurrentIfNeeded() {
    if (activeResult && activeQuestionRef.current && !addedToHistoryRef.current) {
      setChatItems((prev) => [
        ...prev,
        {
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          question: activeQuestionRef.current!,
          answer: activeResult.answer,
          reason: activeResult.reason,
        },
      ]);
      addedToHistoryRef.current = true;
    }
  }

  function handleComplete(result: AnswerResult) {
    if (!addedToHistoryRef.current) {
      setChatItems((prev) => [
        ...prev,
        {
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          question: activeQuestionRef.current ?? '',
          answer: result.answer,
          reason: result.reason,
        },
      ]);
      addedToHistoryRef.current = true;
    }
    setActiveResult(null);
    setActiveQuestion(null);
    activeQuestionRef.current = null;
  }

  async function handleSubmit() {
    const trimmed = inputValue.trim();
    if (!trimmed || loading) return;

    archiveCurrentIfNeeded();

    if (!hasInteracted) {
      setHasInteracted(true);
      Animated.parallel([
        Animated.spring(moveAnim, {
          toValue: 1,
          tension: 48,
          friction: 9,
          useNativeDriver: false,
        }),
        Animated.timing(titleAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }

    setInputValue('');
    setActiveQuestion(trimmed);
    activeQuestionRef.current = trimmed;
    setActiveResult(null);
    addedToHistoryRef.current = false;
    setLoading(true);
    setError(null);

    try {
      const data = await askClaude(trimmed);
      setActiveResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : '오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  }

  const inputBottom = moveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [CENTER_BOTTOM, 0],
  });

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        {/* 채팅 히스토리 */}
        <ChatView items={chatItems} />

        {/* 초기 타이틀 */}
        <Animated.View
          style={[styles.titleContainer, { opacity: titleAnim }]}
          pointerEvents="none"
        >
          <Text style={styles.title}>뭐 해야 할까?</Text>
          <Text style={styles.subtitle}>질문하면 바로 답해줄게</Text>
        </Animated.View>

        {/* 답변 표시 중 배경 블러 */}
        <Animated.View
          style={[styles.blurOverlay, { opacity: blurAnim }]}
          pointerEvents="none"
        >
          <BlurView intensity={72} tint="light" style={StyleSheet.absoluteFillObject} />
          <View style={styles.blurDim} />
        </Animated.View>

        {/* 답변 애니메이션 오버레이 */}
        <AnswerDisplay result={activeResult} onComplete={handleComplete} />

        {/* 타이핑 시 그라데이션 딤 */}
        <Animated.View
          style={[styles.dimOverlay, { opacity: dimAnim }]}
          pointerEvents="none"
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.72)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0)']}
            locations={[0, 0.55, 1]}
            style={StyleSheet.absoluteFillObject}
          />
        </Animated.View>

        <ThinkingDots visible={loading} />

        {error && <Text style={styles.error}>{error}</Text>}

        {/* 하단 페이드 — 채팅이 입력창 뒤로 자연스럽게 사라지게 */}
        <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.92)', '#ffffff']}
          locations={[0, 0.45, 1]}
          style={styles.bottomFade}
          pointerEvents="none"
        />

        <Animated.View style={[styles.inputContainer, { bottom: inputBottom }]}>
          <QuestionInput
            value={inputValue}
            onChangeText={handleChangeText}
            onSubmit={handleSubmit}
            onFocusChange={handleFocusChange}
            loading={loading}
          />
        </Animated.View>
      </View>
      <StatusBar style="dark" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  titleContainer: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.27,
    left: 0,
    right: 0,
    alignItems: 'center',
    pointerEvents: 'none',
  } as const,
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#9ca3af',
    marginTop: 6,
  },
  dimOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  blurOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  blurDim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  bottomFade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 180,
  },
  inputContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },
  error: {
    position: 'absolute',
    bottom: 200,
    left: 24,
    right: 24,
    color: '#dc2626',
    fontSize: 14,
    textAlign: 'center',
    zIndex: 10,
  },
});
