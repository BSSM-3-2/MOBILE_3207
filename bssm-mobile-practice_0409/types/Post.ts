import { ImageSourcePropType } from 'react-native';
import User from '@type/User';

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
    // API 응답 추가 필드 (mock 데이터에는 없을 수 있음)
    author?: User; // 작성자 정보 (API가 embed해서 반환)
    liked?: boolean; // 현재 유저의 좋아요 여부
    commentCount?: number; // 댓글 수 (replies 포함)
}

export type { Post, ImageType, Reply, Comment };
