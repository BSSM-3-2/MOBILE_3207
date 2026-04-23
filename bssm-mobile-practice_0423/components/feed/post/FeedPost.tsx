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

    // 스토어에서 최신 liked 상태를 가져와 더블탭 중복 좋아요 방지
    const currentPost = posts.find(p => p.id === post.id);
    const liked = currentPost?.liked ?? post.liked;

    // 이미 좋아요한 경우 더블탭 무시 (인스타그램 동작과 동일)
    const handleDoubleTap = () => {
        if (!liked) toggleLike(post.id);
    };

    return (
        <ThemedView style={styles.feedMargin}>
            <FeedPostHeader user={user} />
            {post.images[0] && (
                <FeedImage
                    image={resolveImageSource(post.images[0])}
                    onDoubleTap={handleDoubleTap}
                />
            )}
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
