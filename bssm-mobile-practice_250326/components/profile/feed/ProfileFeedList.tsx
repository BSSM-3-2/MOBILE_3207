import { Dimensions, FlatList, StyleSheet } from 'react-native';
import { ReactElement } from 'react';
import { Post } from '@type/Post';
import { Image } from 'expo-image';
import { resolveImageSource } from '@/utils/image';
import { Grid } from '@/constants/theme';

const { width } = Dimensions.get('window');
const ITEM_SIZE = width / Grid.profileColumnCount;

export default function ProfileFeedList({
    posts,
    ListHeaderComponent,
}: {
    posts: Post[];
    ListHeaderComponent?: ReactElement;
}) {
    return (
        <FlatList
            data={posts}
            keyExtractor={item => item.id}
            numColumns={Grid.profileColumnCount}
            ListHeaderComponent={ListHeaderComponent}
            renderItem={({ item }) => (
                <Image
                    style={styles.image}
                    contentFit='cover'
                    source={resolveImageSource(item.images[0])}
                />
            )}
            style={styles.list}
            contentContainerStyle={styles.container}
            columnWrapperStyle={styles.row}
        />
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
    container: {
        gap: Grid.gap,
    },
    row: {
        gap: Grid.gap,
    },
    image: {
        flex: 1,
        height: ITEM_SIZE * Grid.profileImageRatio,
    },
});
