import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { COLORS } from '../constants/colors';

type Props = {
  visible: boolean;
};

function Dot({ delay }: { delay: number }) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(anim, {
          toValue: -8,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(600),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  return (
    <Animated.View style={[styles.dot, { transform: [{ translateY: anim }] }]} />
  );
}

export default function ThinkingDots({ visible }: Props) {
  if (!visible) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      <Dot delay={0} />
      <Dot delay={150} />
      <Dot delay={300} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '45%',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.textAccent,
  },
});
