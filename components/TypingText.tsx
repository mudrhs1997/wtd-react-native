// components/TypingText.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/colors';

const HINTS = [
  '"Should I quit my job?"',
  '"What to eat for dinner?"',
  '"Should I text them first?"',
  '"Is it time for a change?"',
  '"Take the offer or not?"',
  '"Go to the gym today?"',
  '"Should I say something?"',
];

const TYPE_SPEED = 58;
const ERASE_SPEED = 28;
const PAUSE_AFTER_TYPE = 1800;
const PAUSE_AFTER_ERASE = 350;
const INITIAL_DELAY = 700;

export default function TypingText() {
  const [displayText, setDisplayText] = useState('');

  // 커서 깜빡임 — native driver 사용
  const cursorAnim = useRef(new Animated.Value(1)).current;

  // 타이핑 루프 내부 상태를 ref로 관리해 클로저 오염 방지
  const hintIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isErasingRef = useRef(false);
  const isMountedRef = useRef(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 커서 깜빡임 루프
  useEffect(() => {
    const blink = Animated.loop(
      Animated.sequence([
        Animated.timing(cursorAnim, {
          toValue: 1,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.delay(420),
        Animated.timing(cursorAnim, {
          toValue: 0,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.delay(300),
      ])
    );
    blink.start();
    return () => blink.stop();
  }, [cursorAnim]);

  // 타이핑 / 지우기 루프
  useEffect(() => {
    isMountedRef.current = true;

    function tick() {
      if (!isMountedRef.current) return;

      const currentHint = HINTS[hintIndexRef.current];

      if (!isErasingRef.current) {
        // 타이핑 단계
        charIndexRef.current += 1;
        setDisplayText(currentHint.slice(0, charIndexRef.current));

        if (charIndexRef.current >= currentHint.length) {
          // 완성 → 잠시 멈춘 후 지우기 시작
          timeoutRef.current = setTimeout(() => {
            isErasingRef.current = true;
            tick();
          }, PAUSE_AFTER_TYPE);
        } else {
          timeoutRef.current = setTimeout(tick, TYPE_SPEED);
        }
      } else {
        // 지우기 단계
        if (charIndexRef.current > 0) {
          charIndexRef.current -= 1;
          setDisplayText(currentHint.slice(0, charIndexRef.current));
          timeoutRef.current = setTimeout(tick, ERASE_SPEED);
        } else {
          // 완전히 지워짐 → 다음 힌트
          hintIndexRef.current = (hintIndexRef.current + 1) % HINTS.length;
          isErasingRef.current = false;
          timeoutRef.current = setTimeout(tick, PAUSE_AFTER_ERASE);
        }
      }
    }

    timeoutRef.current = setTimeout(tick, INITIAL_DELAY);

    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <View style={styles.row}>
      <Text style={styles.text} numberOfLines={1}>
        {displayText}
      </Text>
      <Animated.Text style={[styles.cursor, { opacity: cursorAnim }]}>
        |
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    height: 34,
  },
  text: {
    fontSize: 22,
    color: COLORS.textAccent,
    fontStyle: 'italic',
    letterSpacing: 0.3,
  },
  cursor: {
    fontSize: 24,
    color: COLORS.textAccent,
    fontWeight: '200',
    marginLeft: 2,
    lineHeight: 28,
  },
});
