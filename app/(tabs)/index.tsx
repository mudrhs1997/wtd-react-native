// app/(tabs)/index.tsx
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  LayoutChangeEvent,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/colors';
import AnswerDisplay from '../../components/AnswerDisplay';
import ChatView, { type ChatItem } from '../../components/ChatView';
import QuestionInput from '../../components/QuestionInput';
import ThinkingDots from '../../components/ThinkingDots';
import TypingText from '../../components/TypingText';
import { askClaude, type AnswerResult } from '../../services/claude';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const TITLE_TOP = SCREEN_HEIGHT * 0.27;
const INPUT_BELOW_GAP = 24;

// title(~44px) + TypingText marginTop(16) + height(34)
const TITLE_BLOCK_ESTIMATED = 94;
// QuestionInput 래퍼 추정 높이: paddingTop(12) + inputCard(110) + gap(12) + button(58) + paddingBottom(40)
const INPUT_WRAPPER_H = 232;
// OracleTabBar 고정 높이: paddingTop(12) + pill(62) + paddingBottom(9) — safe area bottom 제외
const TAB_BAR_FIXED = 83;

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  const [inputValue, setInputValue] = useState('');
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [activeResult, setActiveResult] = useState<AnswerResult | null>(null);
  const [chatItems, setChatItems] = useState<ChatItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  // 탭바가 absolute로 떠있으므로 콘텐츠 영역 = 전체 화면 높이
  const tabBarH = TAB_BAR_FIXED + insets.bottom;

  // 초기 bottom: 타이틀 블록 바로 아래 배치
  const inputBottomInitial = Math.max(
    SCREEN_HEIGHT - INPUT_WRAPPER_H - TITLE_TOP - TITLE_BLOCK_ESTIMATED - INPUT_BELOW_GAP,
    0,
  );

  // 입력창 bottom 애니메이션 — bottom:0 이면 콘텐츠 영역 최하단(탭바 바로 위)
  const inputBottomAnim = useRef(new Animated.Value(inputBottomInitial)).current;
  const titleLayoutDoneRef = useRef(false);

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
  }, [showDim, dimAnim]);

  const showBlur = loading || !!activeResult;

  useEffect(() => {
    Animated.timing(blurAnim, {
      toValue: showBlur ? 1 : 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [showBlur, blurAnim]);

  // titleContainer 실제 높이를 측정해 입력창 bottom 위치를 정밀 보정
  function handleTitleLayout(e: LayoutChangeEvent) {
    if (titleLayoutDoneRef.current) return;
    titleLayoutDoneRef.current = true;

    const blockHeight = e.nativeEvent.layout.height;
    const refined = Math.max(
      SCREEN_HEIGHT - INPUT_WRAPPER_H - TITLE_TOP - blockHeight - INPUT_BELOW_GAP,
      0,
    );
    inputBottomAnim.setValue(refined);
  }

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
        Animated.spring(inputBottomAnim, {
          toValue: tabBarH + 20, // 절대 배치된 탭바 바로 위
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
      setError(e instanceof Error ? e.message : 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <ChatView items={chatItems} />

        <Animated.View
          style={[styles.titleContainer, { opacity: titleAnim }]}
          pointerEvents="none"
          onLayout={handleTitleLayout}
        >
          <Text style={styles.title}>What Should I Do?</Text>
          <TypingText />
        </Animated.View>

        <Animated.View
          style={[styles.blurOverlay, { opacity: blurAnim }]}
          pointerEvents="none"
        >
          <BlurView intensity={60} tint="light" style={StyleSheet.absoluteFillObject} />
          <View style={styles.blurDim} />
        </Animated.View>

        <AnswerDisplay result={activeResult} onComplete={handleComplete} />

        <Animated.View
          style={[styles.dimOverlay, { opacity: dimAnim }]}
          pointerEvents="none"
        >
          <LinearGradient
            colors={['rgba(242,243,236,0.85)', 'rgba(242,243,236,0.6)', 'rgba(242,243,236,0)']}
            locations={[0, 0.55, 1]}
            style={StyleSheet.absoluteFillObject}
          />
        </Animated.View>

        <ThinkingDots visible={loading} />

        {error && <Text style={styles.error}>{error}</Text>}


        <Animated.View
          style={[
            styles.inputContainer,
            { bottom: inputBottomAnim },
          ]}
        >
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
    backgroundColor: COLORS.bg,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  titleContainer: {
    position: 'absolute',
    top: TITLE_TOP,
    left: 0,
    right: 0,
    alignItems: 'center',
    pointerEvents: 'none',
  } as const,
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: 2,
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
    backgroundColor: 'rgba(242,243,236,0.4)',
  },
  inputContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  error: {
    position: 'absolute',
    bottom: 200,
    left: 24,
    right: 24,
    color: '#c0392b',
    fontSize: 14,
    textAlign: 'center',
    zIndex: 10,
  },
});
