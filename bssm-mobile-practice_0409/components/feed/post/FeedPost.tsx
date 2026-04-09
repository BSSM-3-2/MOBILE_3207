import { StyleSheet } from 'react-native';
import { Post } from '@type/Post';
import ContentContainer from '@components/container';
import { FeedPostHeader } from './FeedPostHeader';
import { FeedPostActions } from './FeedPostActions';
import { FeedPostCaption } from './FeedPostCaption';
import { ThemedView } from '@components/themed-view';
import FeedImage from '@components/feed/post/FeedImage';
import { resolveImageSource } from '@/utils/image';
import { useFeedStore } from '@/store/feed-store';

function FeedPost({ post }: { post: Post }) {
    const user = post.author;
    const { posts, toggleLike } = useFeedStore();

    if (!user) return null;

    // TODO: 최신 liked 상태 가져오기 (실습 3-6)

    // TODO: handleDoubleTap 작성 (실습 3-7)

    return (
        <ThemedView style={styles.feedMargin}>
            <FeedPostHeader user={user} />
            {/* TODO: onDoubleTap 연결 (실습 3-8) */}
            <FeedImage image={resolveImageSource(post.images[0])} />
            <ContentContainer style={{ gap: 4 }}>
                <FeedPostActions
                    postId={post.id}
                    initialLikes={post.likes}
                    initialLiked={post.liked}
                    commentCount={post.commentCount ?? post.comments.length}
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
