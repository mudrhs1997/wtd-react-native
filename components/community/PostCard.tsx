// components/community/PostCard.tsx
import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

export interface Post {
  id: string;
  question: string;
  author: string;
  createdAt: Date;
  yesCount: number;
  noCount: number;
  userVote: 'yes' | 'no' | null;
}

interface Props {
  post: Post;
  onVote: (id: string, vote: 'yes' | 'no') => void;
}

interface VoteButtonProps {
  vote: 'yes' | 'no';
  isActive: boolean;
  hasVoted: boolean;
  count: number;
  onPress: () => void;
}

function VoteButton({ vote, isActive, hasVoted, count, onPress }: VoteButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const isYes = vote === 'yes';

  function handlePressIn() {
    Animated.spring(scaleAnim, {
      toValue: 0.94,
      tension: 400,
      friction: 10,
      useNativeDriver: true,
    }).start();
  }

  function handlePressOut() {
    // Restore if no onPress after pressOut (finger slipped out)
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 250,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }

  function handlePress() {
    const willBeActive = !isActive;

    if (willBeActive) {
      // New vote or switch → strong bounce effect
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.86,
          duration: 60,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 450,
          friction: 5,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Cancel vote → smooth sink
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.94,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 200,
          friction: 9,
          useNativeDriver: true,
        }),
      ]).start();
    }

    onPress();
  }

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      style={styles.voteBtnFlex}
    >
      <Animated.View
        style={[
          styles.voteBtn,
          isActive && (isYes ? styles.voteBtnYesActive : styles.voteBtnNoActive),
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        <Text style={[styles.voteBtnText, isActive && styles.voteBtnTextActive]}>
          {isYes ? '👍' : '👎'}{'  '}{vote.toUpperCase()}
          {hasVoted ? `  ${count}` : ''}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

function formatTime(date: Date): string {
  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function PostCard({ post, onVote }: Props) {
  const total = post.yesCount + post.noCount;
  const yesRatio = total > 0 ? post.yesCount / total : 0.5;
  const hasVoted = post.userVote !== null;
  const votedYes = post.userVote === 'yes';
  const votedNo = post.userVote === 'no';

  const barAnim = useRef(new Animated.Value(hasVoted ? yesRatio : 0.5)).current;
  const revealAnim = useRef(new Animated.Value(hasVoted ? 1 : 0)).current;

  useEffect(() => {
    if (hasVoted) {
      Animated.parallel([
        Animated.spring(barAnim, {
          toValue: yesRatio,
          tension: 50,
          friction: 8,
          useNativeDriver: false,
        }),
        Animated.timing(revealAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [post.yesCount, post.noCount, hasVoted, yesRatio, barAnim, revealAnim]);

  const barYesWidth = barAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.card}>
      {/* Author info */}
      <View style={styles.meta}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{post.author[0].toUpperCase()}</Text>
        </View>
        <Text style={styles.author}>{post.author}</Text>
        <Text style={styles.time}>{formatTime(post.createdAt)}</Text>
      </View>

      {/* Question */}
      <Text style={styles.question}>{post.question}</Text>

      {/* Vote result bar (shown after voting) */}
      <Animated.View style={[styles.barSection, { opacity: revealAnim }]}>
        <View style={styles.barTrack}>
          <Animated.View style={[styles.barYes, { width: barYesWidth }]} />
        </View>
        <View style={styles.ratioRow}>
          <Text style={[styles.ratioLabel, styles.ratioYes]}>
            YES · {Math.round(yesRatio * 100)}%
          </Text>
          <Text style={styles.totalCount}>{total} voted</Text>
          <Text style={[styles.ratioLabel, styles.ratioNo]}>
            {Math.round((1 - yesRatio) * 100)}% · NO
          </Text>
        </View>
      </Animated.View>

      {/* Vote buttons */}
      <View style={styles.voteRow}>
        <VoteButton
          vote="yes"
          isActive={votedYes}
          hasVoted={hasVoted}
          count={post.yesCount}
          onPress={() => onVote(post.id, 'yes')}
        />
        <VoteButton
          vote="no"
          isActive={votedNo}
          hasVoted={hasVoted}
          count={post.noCount}
          onPress={() => onVote(post.id, 'no')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6b7280',
  },
  author: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    flex: 1,
  },
  time: {
    fontSize: 12,
    color: '#9ca3af',
  },
  question: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 26,
    letterSpacing: -0.3,
    marginBottom: 16,
  },
  barSection: {
    marginBottom: 14,
  },
  barTrack: {
    height: 6,
    backgroundColor: '#f3f4f6',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  barYes: {
    height: '100%',
    backgroundColor: '#111827',
    borderRadius: 3,
  },
  ratioRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratioLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  ratioYes: {
    color: '#111827',
    flex: 1,
  },
  ratioNo: {
    color: '#9ca3af',
    flex: 1,
    textAlign: 'right',
  },
  totalCount: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
    flex: 1,
  },
  voteRow: {
    flexDirection: 'row',
    gap: 10,
  },
  voteBtnFlex: {
    flex: 1,
  },
  voteBtn: {
    height: 44,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  voteBtnYesActive: {
    backgroundColor: '#111827',
    borderColor: '#111827',
  },
  voteBtnNoActive: {
    backgroundColor: '#6b7280',
    borderColor: '#6b7280',
  },
  voteBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  voteBtnTextActive: {
    color: '#fff',
  },
});
