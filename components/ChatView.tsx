import React, { useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';

export type ChatItem = {
  id: string;
  question: string;
  answer: string;
  reason: string;
};

function ChatItemView({ item }: { item: ChatItem }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 380,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 60,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[styles.item, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
    >
      <View style={styles.questionRow}>
        <View style={styles.questionBubble}>
          <Text style={styles.questionText}>{item.question}</Text>
        </View>
      </View>
      <Text style={styles.answerText}>{item.answer}</Text>
      <Text style={styles.reasonText}>{item.reason}</Text>
    </Animated.View>
  );
}

type Props = {
  items: ChatItem[];
};

export default function ChatView({ items }: Props) {
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (items.length > 0) {
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 80);
    }
  }, [items.length]);

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {items.map((item) => (
        <ChatItemView key={item.id} item={item} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 160,
  },
  item: {
    marginBottom: 40,
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 14,
  },
  questionBubble: {
    backgroundColor: '#111827',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxWidth: '72%',
  },
  questionText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 22,
  },
  answerText: {
    fontSize: 44,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 8,
    letterSpacing: -1,
  },
  reasonText: {
    fontSize: 15,
    color: '#6b7280',
    lineHeight: 23,
  },
});
