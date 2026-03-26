import { ImageSourcePropType } from 'react-native';

type ImageType =
    | { type: 'LOCAL'; source: ImageSourcePropType }
    | { type: 'REMOTE'; url: string };

// 대댓글
interface Reply {
    id: string;
    username: string;
    text: string;
    timestamp: string;
}

// 댓글
interface Comment {
    id: string;
    username: string;
    text: string;
    timestamp: string;
    replies: Reply[];
}

interface Post {
    id: string; // 고유 식별자 → FlatList의 keyExtractor에 사용
    userId: string; // 작성자 User.id 참조
    images: ImageType[]; // 게시물 이미지 배열 (멀티 이미지 지원)
    likes: number; // 좋아요 수 (숫자)
    caption: string; // 게시물 설명 텍스트
    timestamp: string; // 업로드 시간 문자열
    comments: Comment[]; // 댓글
}

export type { Post, ImageType, Reply, Comment };
