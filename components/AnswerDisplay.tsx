import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import type { AnswerResult } from '../services/claude';

type Props = {
  result: AnswerResult | null;
  onComplete?: (result: AnswerResult) => void;
};

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const START_Y = SCREEN_HEIGHT * 0.65;
const END_Y = SCREEN_HEIGHT * 0.32;
const SLIDE_UP = 56;

export default function AnswerDisplay({ result, onComplete }: Props) {
  const fanfareAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(0)).current;
  const reasonOpacity = useRef(new Animated.Value(0)).current;
  const containerOpacity = useRef(new Animated.Value(1)).current;
  const exitScale = useRef(new Animated.Value(1)).current;
  const [typingIndex, setTypingIndex] = useState(0);
  const typingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 파생 animated 값은 매 렌더마다 새 노드를 만들지 않도록 한 번만 생성
  const translateY = useMemo(
    () =>
      Animated.add(
        fanfareAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [START_Y, END_Y],
        }),
        slideUpAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -SLIDE_UP],
        })
      ),
    []
  );

  const fontSize = useMemo(
    () =>
      fanfareAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [18, 112],
      }),
    []
  );

  const answerOpacity = useMemo(
    () =>
      fanfareAnim.interpolate({
        inputRange: [0, 0.25, 1],
        outputRange: [0, 1, 1],
      }),
    []
  );

  useEffect(() => {
    if (typingRef.current) clearInterval(typingRef.current);
    if (exitTimerRef.current) clearTimeout(exitTimerRef.current);

    if (result) {
      fanfareAnim.setValue(0);
      slideUpAnim.setValue(0);
      reasonOpacity.setValue(0);
      containerOpacity.setValue(1);
      exitScale.setValue(1);
      setTypingIndex(0);

      Animated.spring(fanfareAnim, {
        toValue: 1,
        tension: 38,
        friction: 7,
        useNativeDriver: false,
      }).start(() => {
        setTimeout(() => {
          Animated.parallel([
            Animated.timing(slideUpAnim, {
              toValue: 1,
              duration: 380,
              useNativeDriver: false,
            }),
            Animated.timing(reasonOpacity, {
              toValue: 1,
              duration: 300,
              useNativeDriver: false,
            }),
          ]).start();

          let idx = 0;
          const reason = result.reason;
          typingRef.current = setInterval(() => {
            idx += 1;
            setTypingIndex(idx);
            if (idx >= reason.length) {
              clearInterval(typingRef.current!);
              exitTimerRef.current = setTimeout(() => {
                Animated.parallel([
                  Animated.timing(containerOpacity, {
                    toValue: 0,
                    duration: 450,
                    useNativeDriver: false,
                  }),
                  Animated.timing(exitScale, {
                    toValue: 0.78,
                    duration: 450,
                    useNativeDriver: false,
                  }),
                ]).start(() => {
                  onComplete?.(result);
                });
              }, 1500);
            }
          }, 55);
        }, 1000);
      });
    } else {
      fanfareAnim.setValue(0);
      slideUpAnim.setValue(0);
      reasonOpacity.setValue(0);
      containerOpacity.setValue(1);
      exitScale.setValue(1);
      setTypingIndex(0);
    }

    return () => {
      if (typingRef.current) clearInterval(typingRef.current);
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    };
  }, [result]);

  if (!result) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: containerOpacity, transform: [{ translateY }, { scale: exitScale }] },
      ]}
      pointerEvents="none"
    >
      <Animated.Text style={[styles.answer, { fontSize, opacity: answerOpacity }]}>
        {result.answer}
      </Animated.Text>
      <Animated.Text style={[styles.reason, { opacity: reasonOpacity }]}>
        {result.reason.slice(0, typingIndex)}
        <Animated.Text style={[styles.cursor, { opacity: reasonOpacity }]}>
          {typingIndex < result.reason.length ? '|' : ''}
        </Animated.Text>
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  answer: {
    fontWeight: '900',
    color: '#111827',
    textAlign: 'center',
  },
  reason: {
    fontSize: 17,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 26,
    letterSpacing: 0.2,
  },
  cursor: {
    color: '#9ca3af',
  },
});
