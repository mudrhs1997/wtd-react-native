// app/(tabs)/community.tsx
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/colors';
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
  const [headerHeight, setHeaderHeight] = useState(0);
  const insets = useSafeAreaInsets();

  // 헤더 숨김/표시 애니메이션
  const headerTranslateY = useRef(new Animated.Value(0)).current;
  const headerVisibleRef = useRef(true);
  const scrollYRef = useRef(0);
  const headerHeightRef = useRef(0);

  function handleHeaderLayout(e: LayoutChangeEvent) {
    const h = e.nativeEvent.layout.height;
    setHeaderHeight(h);
    headerHeightRef.current = h;
  }

  function handleScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const currentY = e.nativeEvent.contentOffset.y;
    const diff = currentY - scrollYRef.current;
    scrollYRef.current = currentY;

    // 최상단 근처에선 항상 헤더 표시
    if (currentY <= 8) {
      if (!headerVisibleRef.current) {
        headerVisibleRef.current = true;
        Animated.spring(headerTranslateY, {
          toValue: 0,
          tension: 80,
          friction: 12,
          useNativeDriver: true,
        }).start();
      }
      return;
    }

    if (diff > 5 && headerVisibleRef.current) {
      // 아래로 스크롤 → 헤더 숨김
      headerVisibleRef.current = false;
      Animated.spring(headerTranslateY, {
        toValue: -headerHeightRef.current,
        tension: 80,
        friction: 12,
        useNativeDriver: true,
      }).start();
    } else if (diff < -5 && !headerVisibleRef.current) {
      // 위로 스크롤 → 헤더 복귀
      headerVisibleRef.current = true;
      Animated.spring(headerTranslateY, {
        toValue: 0,
        tension: 80,
        friction: 12,
        useNativeDriver: true,
      }).start();
    }
  }

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
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Post feed — 화면 전체 높이를 차지, 헤더 높이만큼 상단 여백 */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={[styles.list, { paddingTop: headerHeight }]}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={[styles.emptyContainer, { paddingTop: headerHeight + 60 }]}>
            <Text style={styles.emptyIcon}>💭</Text>
            <Text style={styles.emptyTitle}>No dilemmas yet</Text>
            <Text style={styles.emptyDesc}>
              Be the first to post your dilemma!
            </Text>
          </View>
        }
      />

      {/* Header — 스크롤 방향에 따라 위로 숨겨지고 다시 나타남 */}
      <Animated.View
        style={[
          styles.header,
          { paddingTop: insets.top + 12, transform: [{ translateY: headerTranslateY }] },
        ]}
        onLayout={handleHeaderLayout}
      >
        <View>
          <Text style={styles.heading}>Community</Text>
          <Text style={styles.subheading}>Answer with YES or NO</Text>
        </View>
        <TouchableOpacity
          style={styles.writeBtn}
          onPress={() => setIsModalVisible(true)}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={22} color={COLORS.bg} />
        </TouchableOpacity>
      </Animated.View>

      {/* Post compose modal */}
      <ComposeModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={handleAddPost}
      />

      {/* 상단 그라디언트 — header 위에 렌더링되어 스크롤 아이템이 자연스럽게 페이드 */}
      <LinearGradient
        colors={[
          'rgba(220,221,216,1)',
          'rgba(220,221,216,0.72)',
          'rgba(220,221,216,0.25)',
          'rgba(220,221,216,0)',
        ]}
        locations={[0, 0.42, 0.72, 1]}
        style={[styles.topFade, { height: insets.top + 48 }]}
        pointerEvents="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: 2,
  },
  subheading: {
    fontSize: 12,
    color: COLORS.textAccent,
    marginTop: 2,
    fontStyle: 'italic',
  },
  writeBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.textAccent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topFade: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
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
    color: COLORS.textPrimary,
  },
  emptyDesc: {
    fontSize: 14,
    color: COLORS.textAccent,
  },
});
