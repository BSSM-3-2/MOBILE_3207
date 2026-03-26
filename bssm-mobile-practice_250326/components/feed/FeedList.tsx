import { FlatList } from 'react-native';
import { Post } from '@type/Post';
import { FeedPost } from './post/FeedPost';

function FeedList({ posts }: { posts: Post[] }) {
    return (
        <FlatList
            data={posts}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <FeedPost post={item} />}
            style={{ flex: 1 }}
        />
    );
}

export { FeedList };
