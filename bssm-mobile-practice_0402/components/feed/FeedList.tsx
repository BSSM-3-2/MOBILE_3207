import { FlatList } from 'react-native';
import { Post } from '@type/Post';
import { FeedPost } from './post/FeedPost';

function FeedList({
    posts,
    onEndReached,
}: {
    posts: Post[];
    onEndReached?: () => void;
}) {
    return (
        <FlatList
            data={posts}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <FeedPost post={item} />}
            showsVerticalScrollIndicator={false}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
        />
    );
}

export { FeedList };
