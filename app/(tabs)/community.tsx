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
    question: '내일 중요한 미팅인데 오늘 밤 야식 먹어도 될까?',
    author: '야식유혹중',
    createdAt: new Date(Date.now() - 18 * 60 * 1000),
    yesCount: 42,
    noCount: 11,
    userVote: null,
  },
  {
    id: '2',
    question: '연봉 20% 올려준다는데 지금 회사 떠나야 할까?',
    author: '이직고민',
    createdAt: new Date(Date.now() - 2 * 3600 * 1000),
    yesCount: 67,
    noCount: 34,
    userVote: null,
  },
  {
    id: '3',
    question: '6개월 사귄 사람한테 먼저 사랑한다고 말해도 될까?',
    author: '설레는중',
    createdAt: new Date(Date.now() - 5 * 3600 * 1000),
    yesCount: 198,
    noCount: 12,
    userVote: null,
  },
  {
    id: '4',
    question: '운동 3개월 했는데 몸이 전혀 안 변해. 그냥 포기할까?',
    author: '헬스포기자',
    createdAt: new Date(Date.now() - 24 * 3600 * 1000),
    yesCount: 4,
    noCount: 156,
    userVote: null,
  },
  {
    id: '5',
    question: '친구한테 빌려준 돈 50만원, 먼저 달라고 해도 될까?',
    author: '돈빌려줌',
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

        // 같은 버튼 재클릭 → 투표 취소
        if (prevVote === vote) {
          return {
            ...post,
            userVote: null,
            yesCount: vote === 'yes' ? post.yesCount - 1 : post.yesCount,
            noCount: vote === 'no' ? post.noCount - 1 : post.noCount,
          };
        }

        // 다른 버튼 클릭 또는 신규 투표
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

      {/* 헤더 */}
      <View style={styles.header}>
        <View>
          <Text style={styles.heading}>커뮤니티</Text>
          <Text style={styles.subheading}>YES or NO로 답해주세요</Text>
        </View>
        <TouchableOpacity
          style={styles.writeBtn}
          onPress={() => setIsModalVisible(true)}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* 게시물 피드 */}
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
            <Text style={styles.emptyTitle}>아직 고민이 없어요</Text>
            <Text style={styles.emptyDesc}>
              첫 번째 고민을 올려보세요!
            </Text>
          </View>
        }
      />

      {/* 고민 작성 모달 */}
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
