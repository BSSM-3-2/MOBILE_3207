import { Post } from '@type/Post';

import macbookImage from '@/assets/images/post/macbook.jpeg';
import yorushika from '@/assets/images/post/release_jkt.jpg';
import cat from '@/assets/images/post/cat.webp';
import chicken from '@/assets/images/post/chicken.jpg';
import renecite from '@/assets/images/post/renecite.jpg';
import ba from '@/assets/images/post/ba.jpg';
import ba21 from '@/assets/images/post/ba2-1.jpg';
import ba22 from '@/assets/images/post/ba2-2.jpg';

const MOCK_POSTS: Post[] = [
    {
        id: '1',
        userId: 'b7e9a012-33c4-4d5f-8a61-df2390e4c105',
        images: [{ type: 'LOCAL', source: macbookImage }],
        likes: 834,
        caption: '맥북 프로 M5 Pro 구매했습니다~! 💻✨ #맥북 #M5Pro #내돈내산',
        timestamp: '3시간 전',
        comments: [
            {
                id: 'c1-1',
                username: 'tech.kr',
                text: '오 드디어 M5 나왔군요! 성능 어때요?',
                timestamp: '2시간 전',
                replies: [
                    {
                        id: 'r1-1-1',
                        username: 'pdh0128a',
                        text: '확실히 M3 Pro보다 체감이 달라요 🔥',
                        timestamp: '1시간 58분 전',
                    },
                    {
                        id: 'r1-1-2',
                        username: 'macbook.log',
                        text: '컴파일 속도 차이 궁금하다',
                        timestamp: '1시간 50분 전',
                    },
                ],
            },
            {
                id: 'c1-2',
                username: 'apple_fan99',
                text: '배터리 얼마나 가요? 실사용으로요',
                timestamp: '1시간 전',
                replies: [
                    {
                        id: 'r1-2-1',
                        username: 'pdh0128a',
                        text: '개발하면서 7~8시간은 거뜬해요',
                        timestamp: '55분 전',
                    },
                ],
            },
            {
                id: 'c1-3',
                username: 'dev._.log',
                text: '부럽다... 저도 슬슬 바꿔야 하는데 💸',
                timestamp: '30분 전',
                replies: [],
            },
        ],
    },
    {
        id: '2',
        userId: 'c2d84f56-77a1-4b3e-b092-1e56780f3a29',
        images: [{ type: 'LOCAL', source: yorushika }],
        likes: 3201,
        caption: '슬픔도 꿈도 전부 날려버려, 마타사부로 🎶 #요루시카 #又三郎',
        timestamp: '5시간 전',
        comments: [
            {
                id: 'c2-1',
                username: 'night._.melody',
                text: '요루시카 이 앨범 진짜 명반... 들을 때마다 새롭다',
                timestamp: '4시간 전',
                replies: [
                    {
                        id: 'r2-1-1',
                        username: 'YeoPEVA',
                        text: '맞아요 n-buna 천재임',
                        timestamp: '3시간 57분 전',
                    },
                    {
                        id: 'r2-1-2',
                        username: 'yoru.archive',
                        text: '스이도 보컬 진짜 소름',
                        timestamp: '3시간 40분 전',
                    },
                    {
                        id: 'r2-1-3',
                        username: 'night._.melody',
                        text: '@yoru.archive 又三郎 파트 특히요',
                        timestamp: '3시간 30분 전',
                    },
                ],
            },
            {
                id: 'c2-2',
                username: 'n-buna.fan',
                text: '又三郎 들으면 항상 울컥함 ㅠㅠ',
                timestamp: '3시간 전',
                replies: [
                    {
                        id: 'r2-2-1',
                        username: 'YeoPEVA',
                        text: '가사가 진짜... 번역 읽으면 더 울컥해요',
                        timestamp: '2시간 50분 전',
                    },
                ],
            },
            {
                id: 'c2-3',
                username: 'yoru_kr',
                text: '재킷 아트워크도 너무 예쁘다 🌙',
                timestamp: '2시간 전',
                replies: [],
            },
        ],
    },
    {
        id: '3',
        userId: 'd901b3e7-cc20-4f6a-a514-8b34fd021c67',
        images: [{ type: 'LOCAL', source: cat }],
        likes: 876,
        caption: '길 가다가 고양이 발견 🐾 눈 맞추면 도망가서 멀리서 찍었어요',
        timestamp: '7시간 전',
        comments: [
            {
                id: 'c3-1',
                username: 'meow._.daily',
                text: '어머 너무 귀여워 😭 품종이 뭐예요?',
                timestamp: '6시간 전',
                replies: [
                    {
                        id: 'r3-1-1',
                        username: 'cat.lover',
                        text: '코숏 같은데 확실하진 않아요 ㅎㅎ',
                        timestamp: '5시간 55분 전',
                    },
                    {
                        id: 'r3-1-2',
                        username: 'meow._.daily',
                        text: '코숏이 제일 귀엽죠 🥺',
                        timestamp: '5시간 40분 전',
                    },
                ],
            },
            {
                id: 'c3-2',
                username: 'cat_holic',
                text: '저도 고양이 키우고 싶어요 ㅠㅠ 집에서 안 된다고 해서...',
                timestamp: '5시간 전',
                replies: [
                    {
                        id: 'r3-2-1',
                        username: 'adopt._.kr',
                        text: '설득하세요!! 키우면 행복해져요',
                        timestamp: '4시간 50분 전',
                    },
                ],
            },
            {
                id: 'c3-3',
                username: 'street.cat.log',
                text: '냥이들 밥 잘 먹고 있는지... 날씨 추운데 걱정된다',
                timestamp: '4시간 전',
                replies: [],
            },
        ],
    },
    {
        id: '4',
        userId: 'e148c590-55f2-4a7d-bc83-0d67921efa34',
        images: [{ type: 'LOCAL', source: chicken }],
        likes: 134,
        caption: '오늘은 치킨이다 🍗 뭐 시킬지 고민할 필요 없는 날',
        timestamp: '12시간 전',
        comments: [
            {
                id: 'c4-1',
                username: 'hungry._.man',
                text: '저도 지금 치킨 시킬래요. 배고파',
                timestamp: '11시간 전',
                replies: [
                    {
                        id: 'r4-1-1',
                        username: 'food_fighter',
                        text: '배달비 아까우면 같이 시켜요 ㅋㅋ',
                        timestamp: '10시간 55분 전',
                    },
                    {
                        id: 'r4-1-2',
                        username: 'hungry._.man',
                        text: '배달비 때문에 포기했다... 😞',
                        timestamp: '10시간 40분 전',
                    },
                ],
            },
            {
                id: 'c4-2',
                username: 'chicken_lover',
                text: '어디 치킨이에요? 브랜드 알려주세요!',
                timestamp: '10시간 전',
                replies: [
                    {
                        id: 'r4-2-1',
                        username: 'food_fighter',
                        text: '교촌 오리지날이요! 역시 클래식이 최고',
                        timestamp: '9시간 55분 전',
                    },
                    {
                        id: 'r4-2-2',
                        username: 'bbq._.daily',
                        text: '@food_fighter 교촌은 간장이 진리죠',
                        timestamp: '9시간 30분 전',
                    },
                    {
                        id: 'r4-2-3',
                        username: 'chicken_lover',
                        text: '오 교촌!! 저도 오늘 시켜야겠다 🍗',
                        timestamp: '9시간 10분 전',
                    },
                ],
            },
            {
                id: 'c4-3',
                username: 'diet.diary',
                text: '저는 오늘부터 다이어트인데... 사진 왜 올리세요 😭',
                timestamp: '9시간 전',
                replies: [
                    {
                        id: 'r4-3-1',
                        username: 'food_fighter',
                        text: '치팅데이로 하나 ㅋㅋㅋ',
                        timestamp: '8시간 50분 전',
                    },
                    {
                        id: 'r4-3-2',
                        username: 'diet.diary',
                        text: '...내일부터 다이어트 🫠',
                        timestamp: '8시간 40분 전',
                    },
                ],
            },
        ],
    },
    {
        id: '5',
        userId: 'f36da027-89e4-4c10-9b52-7a4f305bc811',
        images: [{ type: 'LOCAL', source: renecite }],
        likes: 2109,
        caption:
            '봐도 봐도 희한하네... 괘법르네시떼역은 볼 때마다 해외 온 기분이 든다 🇫🇷',
        timestamp: '1일 전',
        comments: [
            {
                id: 'c5-1',
                username: 'busan.daily',
                text: '진짜 부산 맞아요? 완전 유럽 느낌인데',
                timestamp: '23시간 전',
                replies: [
                    {
                        id: 'r5-1-1',
                        username: 'travel.to.busan',
                        text: '부산 맞아요 ㅋㅋ 아직도 신기함',
                        timestamp: '22시간 55분 전',
                    },
                    {
                        id: 'r5-1-2',
                        username: 'busan.daily',
                        text: '다음에 꼭 가봐야겠다',
                        timestamp: '22시간 30분 전',
                    },
                ],
            },
            {
                id: 'c5-2',
                username: 'archi._.note',
                text: '이런거 설계 누가 했는지 진짜 궁금함. 건축 전공자로서 너무 매력적이다',
                timestamp: '20시간 전',
                replies: [
                    {
                        id: 'r5-2-1',
                        username: 'travel.to.busan',
                        text: '저도 궁금해요',
                        timestamp: '19시간 전',
                    },
                    {
                        id: 'r5-2-2',
                        username: 'archi._.note',
                        text: '음...',
                        timestamp: '18시간 30분 전',
                    },
                ],
            },
            {
                id: 'c5-3',
                username: 'photo.walker',
                text: '다음에 부산 가면 꼭 여기서 사진 찍어야겠다 📸',
                timestamp: '15시간 전',
                replies: [],
            },
        ],
    },
    {
        id: '6',
        userId: '04a7e261-f0b3-4d98-8c15-6e23d9a07b52',
        images: [{ type: 'LOCAL', source: ba }],
        likes: 4872,
        caption: '수상하게 일본을 덮은 한국 게임 🇰🇷 #블루아카이브 #블아',
        timestamp: '1일 전',
        comments: [
            {
                id: 'c6-1',
                username: 'sensei._.log',
                text: '블루 아카이브 일본에서 인기 진짜 장난 아님. 일본 친구가 먼저 추천해줘서 알았음',
                timestamp: '22시간 전',
                replies: [
                    {
                        id: 'r6-1-1',
                        username: 'ba.lover',
                        text: '한국 게임인데 일본 유저가 더 많다는 게 신기하죠 ㅋㅋ',
                        timestamp: '21시간 50분 전',
                    },
                    {
                        id: 'r6-1-2',
                        username: 'sensei._.log',
                        text: '스토리가 일본 감성에 맞는 듯',
                        timestamp: '21시간 30분 전',
                    },
                    {
                        id: 'r6-1-3',
                        username: 'kivotos.alert',
                        text: '시로코 최고야 그게 이유임',
                        timestamp: '21시간 전',
                    },
                ],
            },
            {
                id: 'c6-2',
                username: 'nexon.watch',
                text: '한국 모바일 게임이 일본 앱스토어 1위라니 격세지감이다',
                timestamp: '18시간 전',
                replies: [
                    {
                        id: 'r6-2-1',
                        username: 'ba.lover',
                        text: '요즘 국산 게임 위상이 달라졌죠',
                        timestamp: '17시간 50분 전',
                    },
                    {
                        id: 'r6-2-2',
                        username: 'nexon.watch',
                        text: '넥슨이 잘 키웠다 진짜',
                        timestamp: '17시간 30분 전',
                    },
                ],
            },
            {
                id: 'c6-3',
                username: 'gacha._.life',
                text: '키보토스 지켜야 함 🛡️ 선생님 힘내세요',
                timestamp: '12시간 전',
                replies: [
                    {
                        id: 'r6-3-1',
                        username: 'ba.lover',
                        text: '센세는 포기하지 않습니다 💪',
                        timestamp: '11시간 55분 전',
                    },
                ],
            },
        ],
    },
    {
        id: '7',
        userId: '04a7e261-f0b3-4d98-8c15-6e23d9a07b52',
        images: [
            { type: 'LOCAL', source: ba21 },
            { type: 'LOCAL', source: ba22 },
        ],
        likes: 3154,
        caption:
            '요시미 인형 샀다 🎉 굿즈도 같이 샀는데 다 퀄리티 좋네 😭✨ #블루아카이브 #요시미 #블아굿즈',
        timestamp: '2일 전',
        comments: [
            {
                id: 'c7-1',
                username: 'kivotos.alert',
                text: '요시미 인형 파는거 알고 있었는데 직접 보니까 퀄 미쳤다',
                timestamp: '1일 22시간 전',
                replies: [
                    {
                        id: 'r7-1-1',
                        username: 'ba.lover',
                        text: '헤일로 디테일이 진짜 장난 아니에요 🥹',
                        timestamp: '1일 21시간 전',
                    },
                    {
                        id: 'r7-1-2',
                        username: 'kivotos.alert',
                        text: '얼마였어요? 저도 지르고 싶은데...',
                        timestamp: '1일 20시간 전',
                    },
                    {
                        id: 'r7-1-3',
                        username: 'ba.lover',
                        text: '가격 좀 쎄긴 한데 후회 없어요 ㅋㅋ',
                        timestamp: '1일 19시간 전',
                    },
                ],
            },
            {
                id: 'c7-2',
                username: 'figure.log.kr',
                text: '어디서 구매하셨어요? 국내 정발인가요?',
                timestamp: '1일 18시간 전',
                replies: [
                    {
                        id: 'r7-2-1',
                        username: 'ba.lover',
                        text: '아니요 아미아미에서 직구했어요!',
                        timestamp: '1일 17시간 전',
                    },
                    {
                        id: 'r7-2-2',
                        username: 'figure.log.kr',
                        text: '아미아미 배송 얼마나 걸렸어요?',
                        timestamp: '1일 16시간 전',
                    },
                    {
                        id: 'r7-2-3',
                        username: 'ba.lover',
                        text: '2주 정도 걸렸어요. SAL로 했는데 생각보다 빠르게 왔어요 📦',
                        timestamp: '1일 15시간 전',
                    },
                ],
            },
            {
                id: 'c7-3',
                username: 'sensei._.log',
                text: '굿즈 구성이 뭐뭐 들어있어요? 두 번째 사진 더 보고 싶다 👀',
                timestamp: '1일 10시간 전',
                replies: [
                    {
                        id: 'r7-3-1',
                        username: 'ba.lover',
                        text: '아크릴 스탠드랑 클리어파일, 키링 들어있어요 🎀',
                        timestamp: '1일 9시간 전',
                    },
                ],
            },
        ],
    },
];

export default MOCK_POSTS;
