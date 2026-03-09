// app/(tabs)/community.tsx
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ComposeModal from '../../components/community/ComposeModal';
import PostCard, { type Post } from '../../components/community/PostCard';

const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    question: 'I have an important meeting tomorrow. Should I eat late-night snacks tonight?',
    author: 'LateNightCraver',
    createdAt: new Date(Date.now() - 18 * 60 * 1000),
    yesCount: 42,
    noCount: 11,
    userVote: null,
  },
  {
    id: '2',
    question: "They're offering a 20% raise. Should I leave my current company?",
    author: 'CareerDebate',
    createdAt: new Date(Date.now() - 2 * 3600 * 1000),
    yesCount: 67,
    noCount: 34,
    userVote: null,
  },
  {
    id: '3',
    question: "Is it okay to say 'I love you' first to someone I've been dating for 6 months?",
    author: 'FallingInLove',
    createdAt: new Date(Date.now() - 5 * 3600 * 1000),
    yesCount: 198,
    noCount: 12,
    userVote: null,
  },
  {
    id: '4',
    question: "Been working out for 3 months but my body hasn't changed at all. Should I just quit?",
    author: 'GymDropout',
    createdAt: new Date(Date.now() - 24 * 3600 * 1000),
    yesCount: 4,
    noCount: 156,
    userVote: null,
  },
  {
    id: '5',
    question: 'I lent a friend $500. Should I ask for it back first?',
    author: 'LentMoney',
    createdAt: new Date(Date.now() - 2 * 24 * 3600 * 1000),
    yesCount: 312,
    noCount: 18,
    userVote: null,
  },
];

export default function CommunityScreen() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const insets = useSafeAreaInsets();

  const handleVote = useCallback((postId: string, vote: 'yes' | 'no') => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;

        const prevVote = post.userVote;

        // Same button re-clicked → cancel vote
        if (prevVote === vote) {
          return {
            ...post,
            userVote: null,
            yesCount: vote === 'yes' ? post.yesCount - 1 : post.yesCount,
            noCount: vote === 'no' ? post.noCount - 1 : post.noCount,
          };
        }

        // Different button or new vote
        return {
          ...post,
          userVote: vote,
          yesCount:
            post.yesCount +
            (vote === 'yes' ? 1 : prevVote === 'yes' ? -1 : 0),
          noCount:
            post.noCount +
            (vote === 'no' ? 1 : prevVote === 'no' ? -1 : 0),
        };
      })
    );
  }, []);

  const handleAddPost = useCallback((question: string, author: string) => {
    const newPost: Post = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      question,
      author,
      createdAt: new Date(),
      yesCount: 0,
      noCount: 0,
      userVote: null,
    };
    setPosts((prev) => [newPost, ...prev]);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Post }) => (
      <PostCard post={item} onVote={handleVote} />
    ),
    [handleVote]
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.heading}>Community</Text>
          <Text style={styles.subheading}>Answer with YES or NO</Text>
        </View>
        <TouchableOpacity
          style={styles.writeBtn}
          onPress={() => setIsModalVisible(true)}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Post feed */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>💭</Text>
            <Text style={styles.emptyTitle}>No dilemmas yet</Text>
            <Text style={styles.emptyDesc}>
              Be the first to post your dilemma!
            </Text>
          </View>
        }
      />

      {/* Post compose modal */}
      <ComposeModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={handleAddPost}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#f9fafb',
  },
  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -0.8,
  },
  subheading: {
    fontSize: 13,
    color: '#9ca3af',
    marginTop: 2,
  },
  writeBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    paddingTop: 4,
    paddingBottom: 32,
  },
  separator: {
    height: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 120,
    gap: 8,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#374151',
  },
  emptyDesc: {
    fontSize: 14,
    color: '#9ca3af',
  },
});
