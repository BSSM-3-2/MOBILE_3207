import { View } from 'react-native';
import NavigationTop from '@components/navigation/NavigationTop';
import ContentContainer from '@components/container';
import { FeedList } from '@components/feed/FeedList';
import MOCK_POSTS from '@/mock/posts';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@components/themed-view';

export default function HomeScreen() {
    return (
        <ThemedView style={{ flex: 1 }}>
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

            {/* 피드 정보 렌더링 */}
            <FeedList posts={MOCK_POSTS} />
        </ThemedView>
    );
}
