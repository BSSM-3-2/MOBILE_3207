import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import NavigationTop from '@components/navigation/NavigationTop';
import ContentContainer from '@components/container';
import { FeedList } from '@components/feed/FeedList';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@components/themed-view';
import { useFeedStore } from '@/store/feed-store';

export default function HomeScreen() {
    const { posts, loading, fetchFeed, loadMore } = useFeedStore();

    // TODO: scrollY 선언 (실습 6-4)

    // TODO: headerAnimatedStyle 정의 (실습 6-5)

    useEffect(() => {
        fetchFeed();
    }, []);

    return (
        <ThemedView style={{ flex: 1, overflow: 'hidden' }}>
            {/* TODO: Animated.View + headerAnimatedStyle (실습 6-6) */}
            <ContentContainer isTopElement={true}>
                <NavigationTop
                    title='MyFeed'
                    icon={'layers'}
                    rightButtons={
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: 15,
                            }}
                        >
                            <Ionicons
                                name='add-outline'
                                size={24}
                                color='#262626'
                            />
                        </View>
                    }
                />
            </ContentContainer>

            {loading && posts.length === 0 ? (
                <ActivityIndicator style={{ flex: 1 }} />
            ) : (
                // TODO: scrollY 전달 (실습 6-7)
                <FeedList posts={posts} onEndReached={loadMore} />
            )}
        </ThemedView>
    );
}
