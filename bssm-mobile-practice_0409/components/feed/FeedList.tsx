import { FlatList } from 'react-native';
import Animated, {
    useAnimatedScrollHandler,
    SharedValue,
} from 'react-native-reanimated';
import { Post } from '@type/Post';
import { SwipeableFeedPost } from './post/SwipeableFeedPost';
import { useFeedStore } from '@/store/feed-store';

// TODO: AnimatedFlatList 만들기 (실습 6-1)
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<Post>);

function FeedList({
    posts,
    onEndReached,
    scrollY,
}: {
    posts: Post[];
    onEndReached?: () => void;
    scrollY?: SharedValue<number>;
}) {
    const { removePost } = useFeedStore();

    // TODO: scrollHandler 정의 (실습 6-2)
    const scrollHandler = useAnimatedScrollHandler(event => {});

    return (
        // TODO: onScroll + scrollEventThrottle 연결 (실습 6-3)
        <AnimatedFlatList
            data={posts}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <SwipeableFeedPost post={item} onDelete={removePost} />
            )}
            showsVerticalScrollIndicator={false}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
        />
    );
}

export { FeedList };
