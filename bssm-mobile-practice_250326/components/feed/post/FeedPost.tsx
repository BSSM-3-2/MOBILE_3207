import { StyleSheet } from 'react-native';
import { Post } from '@type/Post';
import ContentContainer from '@components/container';
import { FeedPostHeader } from './FeedPostHeader';
import { FeedPostActions } from './FeedPostActions';
import { FeedPostCaption } from './FeedPostCaption';
import { ThemedView } from '@components/themed-view';
import FeedImage from '@components/feed/post/FeedImage';
import { resolveImageSource } from '@/utils/image';
import { MOCK_USERS_MAP } from '@/mock/users';

function FeedPost({ post }: { post: Post }) {
    const user = MOCK_USERS_MAP[post.userId];

    return (
        <ThemedView style={styles.feedMargin}>
            <FeedPostHeader user={user} />
            <FeedImage image={resolveImageSource(post.images[0])} />
            <ContentContainer style={{ gap: 4 }}>
                <FeedPostActions
                    initialLikes={post.likes}
                    comments={post.comments}
                />
                <FeedPostCaption
                    username={user.username}
                    caption={post.caption}
                    timestamp={post.timestamp}
                />
            </ContentContainer>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    feedMargin: {
        marginBottom: 20,
    },
});

export { FeedPost };
