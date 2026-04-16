import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { Post } from '@type/Post';
import { Image } from 'expo-image';
import { resolveImageSource } from '@/utils/image';
import { Grid } from '@/constants/theme';
import { ReactElement } from 'react';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const ITEM_SIZE = width / Grid.profileColumnCount;

export default function ProfileFeedList({
    posts,
    header,
}: {
    posts: Post[];
    header?: ReactElement;
}) {
    return (
        <FlatList
            data={posts}
            keyExtractor={item => item.id}
            numColumns={Grid.profileColumnCount}
            ListHeaderComponent={header}
            renderItem={({ item }) =>
                item.images[0] ? (
                    <Image
                        style={styles.image}
                        contentFit={'cover'}
                        source={resolveImageSource(item.images[0])}
                    />
                ) : (
                    <View style={[styles.image, styles.textOnly]}>
                        <Ionicons
                            name='document-text-outline'
                            size={24}
                            color='#aaa'
                        />
                    </View>
                )
            }
            showsVerticalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    image: {
        height: ITEM_SIZE * Grid.profileImageRatio,
        width: ITEM_SIZE - Grid.gap,
        marginRight: 1.5 * Grid.gap,
        marginBottom: 1.5 * Grid.gap,
    },
    textOnly: {
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
