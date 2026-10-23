let projects = [];
let activeStatus = "all";
let activePlatform = "all";
let activeGenre = "all";
let showAllProjects = false;

// 프로젝트 목록을 불러오지 못할 때 쓰는 예비 데이터입니다. scripts/build-site-files.mjs가
// projects.generated.json에서 자동으로 채우므로 직접 고치지 마세요.
// BEGIN fallback projects
const fallbackProjects = [
  {
    "title": "사쿠라장의 애완 그녀",
    "href": "/projects/sakurasou-no-pet-na-kanojo/",
    "image": "/assets/images/sakurasou-no-pet-na-kanojo/2026-10-18-title-ko.webp",
    "imageAlt": "사쿠라장의 애완 그녀 한글 타이틀 화면",
    "imageFit": "cover",
    "platform": "PSP",
    "genre": "어드벤처",
    "subgenre": "연애",
    "type": "한국어 패치",
    "status": "public",
    "statusLabel": "베타 공개",
    "stage": 6,
    "version": "v0.9.0",
    "updated": "2026-10-19",
    "download": "https://github.com/ievy3/ievy3.github.io/releases/download/spk-v0.9.0/Noctil_Patchworks_Offline_Sakurasou_v0.9.0.zip",
    "releaseUrl": "https://github.com/ievy3/ievy3.github.io/releases/tag/spk-v0.9.0",
    "releasePublishedAt": "2026-10-18T15:08:35Z",
    "totalDownloads": 231,
    "description": "가모시다 하지메의 라이트 노벨이 원작인 PSP 학원 러브코미디 어드벤처",
    "keywords": [
      "사쿠라장의 애완 그녀",
      "사쿠라장",
      "애완 그녀",
      "sakurasou",
      "pet na kanojo",
      "さくら荘のペットな彼女",
      "시이나 마시로",
      "러브코미디"
    ],
    "verification": [
      "PPSSPP",
      "PSP-1000"
    ],
    "latestWorklog": {
      "date": "2026-10-18",
      "title": "화면 검수·실기 확인과 v0.9.0 공개",
      "href": "/projects/sakurasou-no-pet-na-kanojo/updates/2026-10-18.html"
    }
  },
  {
    "title": "크로노아 히어로즈: 전설의 스타 메달",
    "href": "/projects/klonoa-heroes/",
    "image": "/assets/images/klonoa-heroes/2026-10-15-title-ko.webp",
    "imageAlt": "크로노아 히어로즈 한글 타이틀 화면",
    "imageFit": "cover",
    "platform": "GBA",
    "genre": "RPG",
    "subgenre": "액션",
    "type": "한국어 패치",
    "status": "public",
    "statusLabel": "베타 공개",
    "stage": 6,
    "version": "v1.0.1",
    "updated": "2026-10-17",
    "download": "https://github.com/ievy3/ievy3.github.io/releases/download/kh-v1.0.1/KlonoaHeroes_KO_v1.0.1.zip",
    "releaseUrl": "https://github.com/ievy3/ievy3.github.io/releases/tag/kh-v1.0.1",
    "releasePublishedAt": "2026-10-17T00:25:56Z",
    "totalDownloads": 538,
    "description": "『바람의 크로노아』 시리즈의 캐릭터들이 등장하는 남코의 GBA 액션 RPG",
    "keywords": [
      "크로노아 히어로즈",
      "크로노아",
      "바람의 크로노아",
      "klonoa heroes",
      "klonoa",
      "クロノアヒーローズ",
      "전설의 스타 메달",
      "namco",
      "남코"
    ],
    "verification": [
      "mGBA"
    ],
    "latestWorklog": {
      "date": "2026-10-17",
      "title": "v1.0.1 수정판",
      "href": "/projects/klonoa-heroes/updates/2026-10-17.html"
    }
  },
  {
    "title": "무쌍 오로치 2 스페셜",
    "href": "/projects/musou-orochi2-special/",
    "image": "/assets/images/musou-orochi2-special/2026-10-15-title.webp",
    "imageAlt": "무쌍 오로치 2 스페셜 타이틀 화면",
    "imageFit": "cover",
    "platform": "PSP",
    "genre": "액션",
    "subgenre": "무쌍",
    "type": "한국어 패치",
    "status": "public",
    "statusLabel": "베타 공개",
    "stage": 6,
    "version": "v0.9.0",
    "updated": "2026-10-15",
    "download": "https://github.com/ievy3/ievy3.github.io/releases/download/orochi2-v0.9.0/Noctil_Patchworks_Offline_Orochi2_v0.9.0.zip",
    "releaseUrl": "https://github.com/ievy3/ievy3.github.io/releases/tag/orochi2-v0.9.0",
    "releasePublishedAt": "2026-10-14T23:09:03Z",
    "totalDownloads": 580,
    "description": "삼국지·전국 무장과 신화 속 영웅이 함께 싸우는 코에이 테크모의 PSP 무쌍 액션",
    "keywords": [
      "무쌍 오로치",
      "무쌍 오로치 2",
      "무쌍 orochi",
      "musou orochi",
      "warriors orochi",
      "無双OROCHI2",
      "코에이",
      "액션"
    ],
    "verification": [
      "PPSSPP",
      "PSP-1000"
    ],
    "latestWorklog": {
      "date": "2026-10-15",
      "title": "화면 결함 수정과 v0.9.0 공개",
      "href": "/projects/musou-orochi2-special/updates/2026-10-15.html"
    }
  },
  {
    "title": "Shadow of Memories",
    "href": "/projects/shadow-of-memories/",
    "image": "/assets/images/shadow-of-memories/2026-10-12-title-ko.webp",
    "imageAlt": "Shadow of Memories 한글 부제가 들어간 타이틀 화면",
    "imageFit": "cover",
    "platform": "PSP",
    "genre": "어드벤처",
    "subgenre": "미스터리",
    "type": "한국어 패치",
    "status": "public",
    "statusLabel": "베타 공개",
    "stage": 6,
    "version": "v0.9.1",
    "updated": "2026-10-14",
    "download": "https://github.com/ievy3/ievy3.github.io/releases/download/som-v0.9.1/Noctil_Patchworks_Offline_SoM_v0.9.1.zip",
    "releaseUrl": "https://github.com/ievy3/ievy3.github.io/releases/tag/som-v0.9.1",
    "releasePublishedAt": "2026-10-14T11:50:48Z",
    "totalDownloads": 601,
    "description": "살해당한 주인공이 시간을 거슬러 자신의 죽음을 막으려 하는 시간 여행 어드벤처",
    "keywords": [
      "섀도우 오브 메모리즈",
      "쉐도우 오브 메모리즈",
      "shadow of memories",
      "shadow of destiny",
      "konami",
      "어드벤처"
    ],
    "verification": [
      "PPSSPP",
      "PSP-1000"
    ],
    "latestWorklog": {
      "date": "2026-10-14",
      "title": "공개 뒤 번역 다듬기와 v0.9.1 공개",
      "href": "/projects/shadow-of-memories/updates/2026-10-14.html"
    }
  },
  {
    "title": "듀라라라!! 3way standoff -alley-",
    "href": "/projects/durarara-3way-standoff-alley/",
    "image": "/assets/images/durarara-3way-standoff-alley/2026-10-12-title-ko.webp",
    "imageAlt": "듀라라라!! 3way standoff -alley- 한글 타이틀 화면",
    "imageFit": "cover",
    "platform": "PSP",
    "genre": "어드벤처",
    "subgenre": "노벨",
    "type": "한국어 패치",
    "status": "public",
    "statusLabel": "베타 공개",
    "stage": 6,
    "version": "v0.9.0",
    "updated": "2026-10-13",
    "download": "https://github.com/ievy3/ievy3.github.io/releases/download/dura-v0.9.0/Noctil_Patchworks_Offline_Durarara_v0.9.0.zip",
    "releaseUrl": "https://github.com/ievy3/ievy3.github.io/releases/tag/dura-v0.9.0",
    "releasePublishedAt": "2026-10-12T15:30:13Z",
    "totalDownloads": 442,
    "description": "이케부쿠로로 전학 온 주인공의 시점에서 펼쳐지는 『듀라라라!!』 PSP 어드벤처 게임",
    "keywords": [
      "듀라라라",
      "듀라라라!!",
      "durarara",
      "デュラララ",
      "3way standoff",
      "나리타 료우고",
      "어드벤처",
      "alley",
      "앨리"
    ],
    "verification": [
      "PPSSPP",
      "PSP-1000"
    ],
    "latestWorklog": {
      "date": "2026-10-13",
      "title": "v0.9.0 첫 공개",
      "href": "/projects/durarara-3way-standoff-alley/updates/2026-10-13.html"
    }
  },
  {
    "title": "Never 7: The End of Infinity",
    "href": "/projects/never7/",
    "image": "/assets/images/never7/title-screen.webp",
    "imageAlt": "Never 7: The End of Infinity PSP 타이틀 화면",
    "imageFit": "cover",
    "platform": "PSP",
    "genre": "어드벤처",
    "subgenre": "연애",
    "type": "한국어 패치",
    "status": "public",
    "statusLabel": "베타 공개",
    "stage": 6,
    "version": "v0.9.0",
    "updated": "2026-10-11",
    "download": "https://github.com/ievy3/ievy3.github.io/releases/download/never7-v0.9.0/Noctil_Patchworks_Offline_Never7_v0.9.0.zip",
    "releaseUrl": "https://github.com/ievy3/ievy3.github.io/releases/tag/never7-v0.9.0",
    "releasePublishedAt": "2026-10-11T00:19:13Z",
    "totalDownloads": 550,
    "description": "섬에서 보내는 합숙의 날들과 반복되는 시간의 수수께끼를 그린 인피니티 시리즈 첫 작품",
    "keywords": [
      "네버7",
      "네버 세븐",
      "never7",
      "never 7",
      "infinity",
      "인피니티",
      "kid",
      "어드벤처"
    ],
    "verification": [
      "PPSSPP",
      "PSP-1000"
    ],
    "latestWorklog": {
      "date": "2026-10-11",
      "title": "소개 영상 한글화와 v0.9.0 공개 준비",
      "href": "/projects/never7/updates/2026-10-11.html"
    }
  },
  {
    "title": "바케모노가타리 포터블",
    "href": "/projects/bakemonogatari-portable/",
    "image": "/assets/images/bakemonogatari-portable/title-screen.webp",
    "imageAlt": "바케모노가타리 포터블 PSP 타이틀 화면",
    "imageFit": "cover",
    "platform": "PSP",
    "genre": "어드벤처",
    "subgenre": "노벨",
    "type": "한국어 패치",
    "status": "development",
    "statusLabel": "작업 중",
    "stage": 3,
    "version": "첫 공개 전",
    "updated": "2026-10-10",
    "totalDownloads": 0,
    "description": "니시오 이신의 소설 『바케모노가타리』를 바탕으로 한 PSP 어드벤처 게임",
    "keywords": [
      "바케모노가타리",
      "괴물이야기",
      "bakemonogatari",
      "化物語",
      "monogatari",
      "모노가타리",
      "어드벤처"
    ],
    "verification": [],
    "latestWorklog": {
      "date": "2026-10-10",
      "title": "첫 장 문체 확정과 본격 번역 시작",
      "href": "/projects/bakemonogatari-portable/updates/2026-10-10.html"
    }
  },
  {
    "title": "Magical Vacation",
    "href": "/projects/magical-vacation/",
    "image": "/assets/images/magical-vacation/2026-10-09-title-ko.webp",
    "imageAlt": "매지컬 베케이션 한글 타이틀 화면",
    "imageFit": "cover",
    "platform": "GBA",
    "genre": "RPG",
    "type": "한국어 패치",
    "status": "public",
    "statusLabel": "베타 공개",
    "stage": 6,
    "version": "v0.9.0",
    "updated": "2026-10-10",
    "download": "https://github.com/ievy3/ievy3.github.io/releases/download/mv-v0.9.0/MagicalVacation_KrPatcher_v0.9.0.zip",
    "releaseUrl": "https://github.com/ievy3/ievy3.github.io/releases/tag/mv-v0.9.0",
    "releasePublishedAt": "2026-10-10T02:48:17Z",
    "totalDownloads": 579,
    "description": "마법 학교 학생들의 모험을 그린 브라우니 브라운의 GBA RPG",
    "keywords": [
      "매지컬 베케이션",
      "매지컬 바케이션",
      "magical vacation",
      "マジカルバケーション",
      "brownie brown",
      "rpg"
    ],
    "verification": [
      "mGBA"
    ],
    "latestWorklog": {
      "date": "2026-10-10",
      "title": "타이틀 로고 완성과 v0.9.0 첫 공개",
      "href": "/projects/magical-vacation/updates/2026-10-10.html"
    }
  },
  {
    "title": "내 여동생이 이렇게 귀여울 리가 없어, 포터블이 계속될 리가 없어",
    "href": "/projects/oreimo-portable-tsuzuku/",
    "image": "/assets/images/oreimo-portable-tsuzuku/2026-10-06-title.webp",
    "imageAlt": "내 여동생이 이렇게 귀여울 리가 없어, 포터블이 계속될 리가 없어 한글 타이틀 화면",
    "imageFit": "cover",
    "platform": "PSP",
    "genre": "어드벤처",
    "subgenre": "연애",
    "type": "한국어 패치",
    "status": "public",
    "statusLabel": "베타 공개",
    "stage": 6,
    "version": "v1.0.0",
    "updated": "2026-10-09",
    "download": "https://github.com/ievy3/ievy3.github.io/releases/download/oreimo2-v1.0.0/OreImoDisc2KrPatcher.zip",
    "releaseUrl": "https://github.com/ievy3/ievy3.github.io/releases/tag/oreimo2-v1.0.0",
    "releasePublishedAt": "2026-10-09T01:10:57Z",
    "totalDownloads": 411,
    "description": "전작의 이야기를 이어가는 PSP용 연애 어드벤처 게임",
    "keywords": [
      "내 여동생이 이렇게 귀여울 리가 없어",
      "포터블이 계속될 리가 없어",
      "俺の妹がこんなに可愛いわけがない",
      "oreimo",
      "oreimo portable",
      "adventure",
      "bandai namco"
    ],
    "verification": [
      "PPSSPP",
      "PSP-1000"
    ],
    "latestWorklog": {
      "date": "2026-10-06",
      "title": "전 대본 한국어화 완료와 UI·이미지 통합",
      "href": "/projects/oreimo-portable-tsuzuku/updates/2026-10-06.html"
    }
  },
  {
    "title": "사키 아치가편 포터블",
    "href": "/projects/saki-achiga-portable/",
    "image": "/assets/images/saki-achiga-portable/2026-10-09-title.webp",
    "imageAlt": "사키 아치가편 포터블 한글 타이틀 화면",
    "imageFit": "cover",
    "platform": "PSP",
    "genre": "테이블",
    "subgenre": "마작",
    "type": "한국어 패치",
    "status": "public",
    "statusLabel": "베타 공개",
    "stage": 6,
    "version": "v0.9.0-rc7",
    "updated": "2026-10-09",
    "download": "https://github.com/ievy3/ievy3.github.io/releases/download/sakiA-v0.9.0/Saki_Achiga_Korean_Patch_v0.9.0-rc7.zip",
    "releaseUrl": "https://github.com/ievy3/ievy3.github.io/releases/tag/sakiA-v0.9.0",
    "releasePublishedAt": "2026-10-09T00:16:57Z",
    "totalDownloads": 242,
    "description": "아치가 여학원의 소녀들이 전국 무대를 향해 나아가는 이야기를 바탕으로 한 대전 마작 게임",
    "keywords": [
      "사키 아치가편 포터블",
      "사키 아치가편",
      "사키 -Saki- 아치가편",
      "episode of side-A",
      "Saki Achiga-hen episode of side-A Portable",
      "saki achiga portable",
      "mahjong",
      "alchemist"
    ],
    "verification": [
      "PPSSPP",
      "PSP-1000"
    ],
    "latestWorklog": {
      "date": "2026-10-06",
      "title": "첫 통합 빌드와 이미지 한글화 전수 정비",
      "href": "/projects/saki-achiga-portable/updates/2026-10-06.html"
    }
  },
  {
    "title": "탐정 진구지 사부로: 재와 다이아몬드",
    "href": "/projects/jinguji-ashes-and-diamonds/",
    "image": "/assets/images/jinguji-ashes-and-diamonds/2026-10-05-title.webp",
    "imageAlt": "탐정 진구지 사부로 재와 다이아몬드 한글 타이틀 화면",
    "imageFit": "cover",
    "platform": "PSP",
    "genre": "어드벤처",
    "subgenre": "추리",
    "type": "한국어 패치",
    "status": "public",
    "statusLabel": "베타 공개",
    "stage": 6,
    "version": "v0.9.0",
    "updated": "2026-10-09",
    "download": "https://github.com/ievy3/ievy3.github.io/releases/download/JingujiAD-v0.9.0/TJS_HaiToDiamond_Korean_Patcher_v0.9.0.zip",
    "releaseUrl": "https://github.com/ievy3/ievy3.github.io/releases/tag/JingujiAD-v0.9.0",
    "releasePublishedAt": "2026-10-09T03:02:35Z",
    "totalDownloads": 852,
    "description": "가부키초를 무대로 여러 의뢰와 인물의 이해관계가 교차하는 하드보일드 추리 어드벤처",
    "keywords": [
      "탐정 진구지 사부로",
      "재와 다이아몬드",
      "灰とダイヤモンド",
      "jinguji saburo",
      "ashes and diamonds",
      "adventure",
      "workjam",
      "arc system works"
    ],
    "verification": [
      "PPSSPP",
      "PSP-1000"
    ],
    "latestWorklog": {
      "date": "2026-10-05",
      "title": "플레이 리셋 수정과 배포 전 화면 정비",
      "href": "/projects/jinguji-ashes-and-diamonds/updates/2026-10-05.html"
    }
  },
  {
    "title": "사키 포터블",
    "href": "/projects/saki-portable/",
    "image": "/assets/images/saki-portable/2026-10-05-title.webp",
    "imageAlt": "사키 포터블 한글 타이틀 화면",
    "imageFit": "cover",
    "platform": "PSP",
    "genre": "테이블",
    "subgenre": "마작",
    "type": "한국어 패치",
    "status": "public",
    "statusLabel": "베타 공개",
    "stage": 6,
    "version": "v0.9.5",
    "updated": "2026-10-06",
    "download": "https://github.com/ievy3/ievy3.github.io/releases/download/sakiP-v0.9.5/Saki_Portable_Korean_Patch_v0.9.5.zip",
    "releaseUrl": "https://github.com/ievy3/ievy3.github.io/releases/tag/sakiP-v0.9.5",
    "releasePublishedAt": "2026-10-05T15:07:34Z",
    "totalDownloads": 463,
    "description": "TV 애니메이션을 바탕으로 캐릭터별 능력과 스토리를 재현한 대전 마작 게임",
    "keywords": [
      "사키 포터블",
      "사키",
      "咲-Saki- Portable",
      "saki portable",
      "mahjong",
      "alchemist"
    ],
    "verification": [
      "PPSSPP",
      "PSP-1000"
    ],
    "latestWorklog": {
      "date": "2026-10-06",
      "title": "v0.9.5 첫 프리릴리즈 공개",
      "href": "/projects/saki-portable/updates/2026-10-06.html"
    }
  },
  {
    "title": "Hexyz Force",
    "href": "/projects/hexyz-force/",
    "image": "/assets/images/hexyz-force/worklog-2026-09-13/01-title-screen.webp",
    "imageAlt": "엑시즈 포스 한글 타이틀 화면",
    "imageFit": "cover",
    "platform": "PSP",
    "genre": "RPG",
    "subgenre": "던전 탐험",
    "type": "한국어 패치",
    "status": "public",
    "statusLabel": "베타 공개",
    "stage": 6,
    "version": "v0.9.3-beta.1",
    "updated": "2026-10-06",
    "download": "https://github.com/ievy3/ievy3.github.io/releases/download/hexyz-v0.9.3/Noctil_Patchworks_Offline_v0.9.3-beta.1.zip",
    "releaseUrl": "https://github.com/ievy3/ievy3.github.io/releases/tag/hexyz-v0.9.3",
    "releasePublishedAt": "2026-10-06T02:04:52Z",
    "totalDownloads": 1778,
    "description": "두 주인공의 시점으로 세계의 창조와 파괴를 그리는 던전 탐험형 JRPG",
    "keywords": [
      "엑시즈 포스",
      "hexyz",
      "rpg",
      "atlus"
    ],
    "verification": [
      "PPSSPP",
      "PSP-1000"
    ],
    "latestWorklog": {
      "date": "2026-09-14",
      "title": "두 판본 오프라인 패처 완성과 공개 검수판 배포",
      "href": "/projects/hexyz-force/updates/2026-09-14.html"
    }
  },
  {
    "title": "환상수호전 이어지는 백 년의 시간",
    "href": "/projects/genso-suikoden-100-years/",
    "image": "/assets/images/genso-suikoden-100-years/2026-10-03-title.webp",
    "imageAlt": "환상수호전 이어지는 백 년의 시간 한글 타이틀 화면",
    "imageFit": "cover",
    "platform": "PSP",
    "genre": "RPG",
    "type": "한국어 패치",
    "status": "public",
    "statusLabel": "베타 공개",
    "stage": 6,
    "version": "v0.9.0",
    "updated": "2026-10-03",
    "download": "https://github.com/ievy3/ievy3.github.io/releases/download/SuikodenTHT-v0.9.0/Noctil_Patchworks_Offline_SuikodenTHT_v0.9.0.zip",
    "releaseUrl": "https://github.com/ievy3/ievy3.github.io/releases/tag/SuikodenTHT-v0.9.0",
    "releasePublishedAt": "2026-10-03T07:27:19Z",
    "totalDownloads": 829,
    "description": "요구하는 것은 질서인가, 자유인가. 시간을 넘어 방어되는 새로운 백만 세계의 이야기.",
    "keywords": [
      "환상수호전 이어지는 백 년의 시간",
      "환상수호전 이어지는 백년의 시간",
      "환상수호전",
      "gensosuikoden",
      "genso suikoden",
      "tsumugareshi hyakunen no toki",
      "suikoden",
      "jrpg",
      "konami"
    ],
    "verification": [
      "PPSSPP",
      "PSP-1000"
    ],
    "latestWorklog": {
      "date": "2026-10-02",
      "title": "전체 한국어 빌드 검증과 세이브·표시 호환성 정리",
      "href": "/projects/genso-suikoden-100-years/updates/2026-10-02.html"
    }
  },
  {
    "title": "Generation of Chaos 6",
    "href": "/projects/generation-of-chaos-6/",
    "image": "/assets/images/generation-of-chaos-6/2026-10-02-title.webp",
    "imageAlt": "Generation of Chaos 6 한글 타이틀 화면",
    "imageFit": "cover",
    "platform": "PSP",
    "genre": "SRPG",
    "subgenre": "전략",
    "type": "한국어 패치",
    "status": "public",
    "statusLabel": "베타 공개",
    "stage": 6,
    "version": "v0.9.0",
    "updated": "2026-10-03",
    "download": "https://github.com/ievy3/ievy3.github.io/releases/download/GOC6-v0.9.0/Noctil_Patchworks_Offline_GOC6_v0.9.0.zip",
    "releaseUrl": "https://github.com/ievy3/ievy3.github.io/releases/tag/GOC6-v0.9.0",
    "releasePublishedAt": "2026-10-03T07:45:14Z",
    "totalDownloads": 650,
    "description": "대륙 제패를 목표로 내정·부대 운용·전투를 병행하는 판타지 전략 RPG",
    "keywords": [
      "제네레이션 오브 카오스 6",
      "제네레이션오브카오스6",
      "generation of chaos 6",
      "goc6",
      "srpg",
      "sting",
      "idea factory"
    ],
    "verification": [
      "PPSSPP",
      "PSP-1000"
    ],
    "latestWorklog": {
      "date": "2026-10-02",
      "title": "인스톨 데이터 부팅 문제를 해결하고 v0.9.0 배포 후보를 준비",
      "href": "/projects/generation-of-chaos-6/updates/2026-10-02.html"
    }
  },
  {
    "title": "Summon Night 5",
    "href": "/projects/summon-night-5/",
    "image": "/assets/images/summon-night-5/2026-09-28-title.webp",
    "imageAlt": "Summon Night 5 v0.7.0 베타 한글 타이틀 화면",
    "imageFit": "cover",
    "platform": "PSP",
    "genre": "SRPG",
    "type": "한국어 패치",
    "status": "public",
    "statusLabel": "베타 공개",
    "stage": 6,
    "version": "v0.9.0",
    "updated": "2026-10-02",
    "download": "https://github.com/ievy3/ievy3.github.io/releases/download/SN5-v0.9.0/Noctil_Patchworks_Offline_SN5_v0.9.0.zip",
    "releaseUrl": "https://github.com/ievy3/ievy3.github.io/releases/tag/SN5-v0.9.0",
    "releasePublishedAt": "2026-10-01T15:02:39Z",
    "totalDownloads": 1114,
    "description": "소환술과 파트너 시스템을 중심으로 전개되는 판타지 전략 RPG",
    "keywords": [
      "서몬 나이트 5",
      "서몬나이트5",
      "summon night 5",
      "summonnight",
      "srpg",
      "felistella"
    ],
    "verification": [
      "PPSSPP",
      "PS Vita"
    ],
    "latestWorklog": {
      "date": "2026-10-01",
      "title": "스토리 윤문을 확대하고 v0.9.0 배포 후보 확정",
      "href": "/projects/summon-night-5/updates/2026-10-01.html"
    }
  },
  {
    "title": "Sol Trigger",
    "href": "/projects/sol-trigger/",
    "image": "/assets/images/sol-trigger/2026-10-01-title.webp",
    "imageAlt": "Sol Trigger 한글 타이틀 화면",
    "imageFit": "cover",
    "platform": "PSP",
    "genre": "RPG",
    "type": "한국어 패치",
    "status": "public",
    "statusLabel": "베타 공개",
    "stage": 6,
    "version": "v0.9.3",
    "updated": "2026-10-01",
    "download": "https://github.com/ievy3/ievy3.github.io/releases/download/soltrigger-v0.9.3/Noctil_Patchworks_Offline_SolTrigger_v0.9.3.zip",
    "releaseUrl": "https://github.com/ievy3/ievy3.github.io/releases/tag/soltrigger-v0.9.3",
    "releasePublishedAt": "2026-10-01T13:51:21Z",
    "totalDownloads": 1218,
    "description": "에너지 ‘솔’을 둘러싼 지배와 저항의 이야기를 그린 스토리 중심 JRPG",
    "keywords": [
      "솔 트리거",
      "솔트리거",
      "sol trigger",
      "jrpg",
      "imageepoch"
    ],
    "verification": [
      "PPSSPP",
      "PS Vita"
    ],
    "latestWorklog": {
      "date": "2026-10-01",
      "title": "공개 제보 4건을 수정하고 v0.9.3 배포 후보까지 정리",
      "href": "/projects/sol-trigger/updates/2026-10-01.html"
    }
  },
  {
    "title": "Gungnir",
    "href": "/projects/gungnir/",
    "image": "/assets/images/gungnir/latest-2026-09-23-title.webp",
    "imageAlt": "궁그닐 v0.9.0 공개 검수판 한글 타이틀 화면",
    "imageFit": "cover",
    "platform": "PSP",
    "genre": "SRPG",
    "subgenre": "전술",
    "type": "한국어 패치",
    "status": "public",
    "statusLabel": "베타 공개",
    "stage": 6,
    "version": "v0.9.0",
    "updated": "2026-09-23",
    "download": "https://github.com/ievy3/ievy3.github.io/releases/download/gungnir-v0.9.0/Noctil_Patchworks_Gungnir_Offline_v0.9.0.exe",
    "releaseUrl": "https://github.com/ievy3/ievy3.github.io/releases/tag/gungnir-v0.9.0",
    "releasePublishedAt": "2026-09-22T20:02:45Z",
    "totalDownloads": 1140,
    "description": "신화의 창 ‘궁그닐’을 손에 넣은 소년과 반란군의 전쟁을 그린 전술 RPG",
    "keywords": [
      "궁그닐",
      "gungnir",
      "srpg",
      "atlus"
    ],
    "verification": [
      "PPSSPP"
    ],
    "latestWorklog": {
      "date": "2026-09-22",
      "title": "튜토리얼·메뉴·챕터 이미지 개선",
      "href": "/projects/gungnir/updates/2026-09-22.html"
    }
  },
  {
    "title": "마블 얼티밋 얼라이언스",
    "slug": "marvel-ultimate-alliance",
    "image": "/assets/images/marvel-ultimate-alliance/official-cover.webp",
    "imageAlt": "마블 얼티밋 얼라이언스 국내판 PSP 패키지",
    "platform": "PSP",
    "genre": "RPG",
    "subgenre": "액션",
    "status": "planned",
    "statusLabel": "작업 예정",
    "updated": ""
  },
  {
    "title": "일상 (우주인)",
    "slug": "nichijou-uchuujin",
    "image": "/assets/images/nichijou-uchuujin/official-cover.webp",
    "imageAlt": "일상 (우주인) 일본판 PSP 패키지",
    "platform": "PSP",
    "genre": "어드벤처",
    "subgenre": "코미디",
    "status": "planned",
    "statusLabel": "작업 예정",
    "updated": ""
  }
];
// END fallback projects

const grid = document.querySelector("#project-grid");
const emptyState = document.querySelector("#empty-state");
const resultCount = document.querySelector("#result-count");
const searchInput = document.querySelector("#project-search");
const searchBox = document.querySelector(".search-box");
const statusButtons = [...document.querySelectorAll("[data-status-filter]")];
const platformFilters = document.querySelector("#platform-filters");
const genreFilters = document.querySelector("#genre-filters");
const moreWrap = document.querySelector("#archive-more");
const moreButton = document.querySelector("#archive-more-button");
const popularList = document.querySelector("#popular-list");
const plannedSection = document.querySelector("#planned");
const plannedList = document.querySelector("#planned-list");
let plannedProjects = [];

// 대문 "한글 패치는 이렇게 만들어집니다"의 여섯 단계와 같은 순서입니다.
const PATCH_STAGES = ["게임 분석", "번역 준비", "대사 번역", "화면 한글화", "실행 검수", "패치 배포"];

// 장르는 이 다섯 가지 큰 분류로만 묶고, 마작·추리·연애 같은 세부 장르는 subgenre에 둡니다.
const GENRES = ["RPG", "SRPG", "액션", "어드벤처", "테이블"];
const GENRE_NAMES = { RPG: "롤플레잉", SRPG: "시뮬레이션 RPG", 액션: "액션", 어드벤처: "어드벤처", 테이블: "테이블 게임" };

// 카드의 기종·장르·세부 장르를 누르면 그 조건으로 목록을 거릅니다.
function genreMarkup(project) {
  const genre = project.genre || "RPG";
  const sub = project.subgenre
    ? `<i aria-hidden="true">·</i><button class="kicker-tag project-subgenre" type="button" data-pick-search="${project.subgenre}" title="${project.subgenre} 프로젝트만 보기">${project.subgenre}</button>`
    : "";
  return `<button class="kicker-tag" type="button" data-pick-genre="${genre}" title="${GENRE_NAMES[genre] || genre} 프로젝트만 보기">${genre}</button>${sub}`;
}

function pickFromCard(event) {
  const tag = event.target.closest(".kicker-tag");
  if (!tag) return;
  const pick = (container, value) => container?.querySelector(`[data-facet="${CSS.escape(value)}"]`)?.click();
  event.stopPropagation();
  if (tag.dataset.pickPlatform) pick(platformFilters, tag.dataset.pickPlatform);
  if (tag.dataset.pickGenre) pick(genreFilters, tag.dataset.pickGenre);
  if (tag.dataset.pickSearch && searchInput) {
    searchInput.value = tag.dataset.pickSearch;
    render();
  }
  document.querySelector(".archive-controls")?.scrollIntoView({ block: "center", behavior: "smooth" });
}

function stageMarkup(stage) {
  if (!Number.isInteger(stage) || stage < 1 || stage > PATCH_STAGES.length) return "";
  const name = PATCH_STAGES[stage - 1];
  const dots = PATCH_STAGES.map((_, index) => `<b class="${index < stage ? "is-done" : ""}"></b>`).join("");
  return `<a class="project-stage" href="#patch-workflow" title="제작 단계 ${stage}/${PATCH_STAGES.length} · ${name}" aria-label="제작 단계 ${stage}단계: ${name}"><span class="stage-dots" aria-hidden="true">${dots}</span>${stage}단계 · ${name}</a>`;
}

function formatDate(date) {
  return date ? date.replaceAll("-", ".") : "—";
}

function normalized(value) {
  return value.toLocaleLowerCase("ko").replace(/\s+/g, "");
}

// 인기 패치: 모든 공개 버전의 GitHub 누적 다운로드 수가 많은 순서로 세 개를 보여 줍니다.
function downloadsOf(project) {
  return project.totalDownloads ?? project.downloadCount ?? 0;
}

function renderPopular() {
  if (!popularList) return;
  const popular = projects
    .filter(project => project.status === "public" && downloadsOf(project) > 0)
    .sort((a, b) => downloadsOf(b) - downloadsOf(a) || a.title.localeCompare(b.title, "ko"))
    .slice(0, 3);

  popularList.replaceChildren(...popular.map((project, index) => {
    const link = document.createElement("a");
    link.className = "latest-update-card popular-card";
    link.href = project.href;
    link.innerHTML = `
      <span class="popular-rank" aria-label="${index + 1}위">${index + 1}</span>
      <span class="latest-update-copy">
        <strong>${project.title}</strong>
        <span>${project.platform} · ${GENRE_NAMES[project.genre] || project.genre} · 다운로드 ${downloadsOf(project).toLocaleString("ko-KR")}회</span>
      </span>
      <span class="latest-update-arrow" aria-hidden="true">→</span>`;
    return link;
  }));
}

// 작업 예정: 아직 페이지가 없으므로 링크 없이 표지와 기본 정보만 보여 줍니다.
function renderPlanned() {
  if (!plannedSection || !plannedList) return;
  plannedSection.hidden = plannedProjects.length === 0;
  plannedList.replaceChildren(...plannedProjects.map(project => {
    const item = document.createElement("li");
    item.className = "planned-item";
    item.innerHTML = `
      <span class="planned-cover">${project.image ? `<img src="${project.image}" alt="${project.imageAlt || project.title}" loading="lazy">` : `<b aria-hidden="true">${project.platform}</b>`}</span>
      <strong>${project.title}</strong>
      <small>${project.platform} · ${GENRE_NAMES[project.genre] || project.genre}${project.subgenre ? ` · ${project.subgenre}` : ""}</small>
      ${project.note ? `<p>${project.note}</p>` : ""}`;
    return item;
  }));
}

function card(project) {
  const article = document.createElement("article");
  article.className = "project-card";

  const cardImage = project.image;
  const verificationMarkup = (project.verification || []).length
    ? `<div class="project-verify" aria-label="확인된 실행 환경">
        <span class="project-verify-label">검증 환경</span>
        ${project.verification.map(environment => `<span class="verify-badge">${environment} ✓</span>`).join("")}
      </div>`
    : "";
  let displayDescription = project.description || "";
  if (project.version && displayDescription.startsWith(project.version)) {
    displayDescription = displayDescription.slice(project.version.length).trim();
    displayDescription = displayDescription.replace(/^(?:베타\s+)?(?:배포본\s+확정|공개)\s*·\s*/, "");
  }

  article.innerHTML = `
    <a class="project-cover" style="--card-image:url('${cardImage}')" href="${project.href}" aria-label="${project.title} 프로젝트 보기">
      <img src="${cardImage}" alt="${project.imageAlt}" loading="lazy" style="object-fit:${project.imageFit || "cover"}"${cardImage.startsWith("http") ? ' referrerpolicy="no-referrer"' : ""}>
    </a>
    <div class="project-info">
      <span class="project-kicker"><button class="kicker-tag" type="button" data-pick-platform="${project.platform}" title="${project.platform} 프로젝트만 보기">${project.platform}</button><i aria-hidden="true">·</i>${genreMarkup(project)}${stageMarkup(project.stage)}</span>
      <div class="project-title-row">
        <h3><a href="${project.href}">${project.title}</a></h3>
        <span class="version-pill">${project.version}</span>
      </div>
      <p class="project-desc">${displayDescription}</p>
      ${verificationMarkup}
      <div class="project-foot">
        <div>
          <span class="project-state ${project.status}"><i></i>${project.status === "public" ? "공개" : project.statusLabel}</span>
          <time class="project-date" datetime="${project.updated}">업데이트 ${formatDate(project.updated)}</time>
        </div>
        <div class="project-actions">
          <a class="card-button secondary" href="${project.href}">프로젝트 보기</a>
          ${project.download ? (project.downloadMode === "release-page" && project.releaseUrl ? `<a class="card-button download" href="${project.releaseUrl}">배포 파일 보기 ↗</a>` : `<a class="card-button download" href="${project.download}" download>패치 다운로드 ↓</a>`) : ""}
        </div>
      </div>
    </div>`;
  // Clamped card text remains readable in full on hover.
  article.querySelector(".project-title-row h3 a").title = project.title;
  article.querySelector(".project-desc").title = displayDescription;
  return article;
}

function render() {
  const query = normalized(searchInput?.value.trim() || "");
  const filtered = projects
    .filter(project => {
      const haystack = normalized([
        project.title,
        project.platform,
        project.genre,
        GENRE_NAMES[project.genre] || "",
        project.subgenre || "",
        project.statusLabel,
        ...(project.keywords || [])
      ].join(" "));

      return (activeStatus === "all" || project.status === activeStatus)
        && (activePlatform === "all" || project.platform === activePlatform)
        && (activeGenre === "all" || project.genre === activeGenre)
        && (!query || haystack.includes(query));
    })
    .sort((a, b) => {
      const statusOrder = { public: 0, development: 1 };
      const statusDelta = (statusOrder[a.status] ?? 9) - (statusOrder[b.status] ?? 9);
      return statusDelta || b.updated.localeCompare(a.updated) || a.title.localeCompare(b.title, "ko");
    });

  // 필터·검색을 쓰지 않을 때는 처음 세 줄(1열 화면은 6개)만 보여 주고 나머지는 「더 보기」로 펼칩니다.
  const filtering = Boolean(query) || activeStatus !== "all" || activePlatform !== "all" || activeGenre !== "all";
  const limit = collapsedLimit();
  const collapsible = !filtering && filtered.length > limit;
  const visible = collapsible && !showAllProjects ? filtered.slice(0, limit) : filtered;

  grid.replaceChildren(...visible.map(card));
  emptyState.hidden = filtered.length !== 0;
  if (moreWrap && moreButton) {
    moreWrap.hidden = !collapsible;
    moreButton.textContent = showAllProjects ? "접기" : `더 보기 (+${filtered.length - limit})`;
    moreButton.setAttribute("aria-expanded", String(showAllProjects));
  }
  resultCount.innerHTML = filtered.length === projects.length
    ? `전체 <strong>${projects.length}</strong>개 프로젝트`
    : `전체 ${projects.length}개 중 <strong>${filtered.length}</strong>개 표시`;
}

function collapsedLimit() {
  const columns = getComputedStyle(grid).gridTemplateColumns.split(" ").filter(Boolean).length || 1;
  return columns === 1 ? 6 : columns * 3;
}

// 기종·장르 선택지를 데이터에서 만듭니다. 항목이 하나뿐이면 숨깁니다.
// dropdown이면 버튼 하나만 보이고, 누르면 선택지가 세로로 펼쳐집니다.
function buildFacet(container, { key, allLabel, order, label = value => value, onSelect, dropdown = false }) {
  if (!container) return;
  const counts = projects.reduce((map, project) => map.set(project[key], (map.get(project[key]) || 0) + 1), new Map());
  if (counts.size < 2) { container.hidden = true; return; }
  const values = [...counts.keys()].sort((a, b) => order(a, b, counts));
  const entries = [["all", allLabel, projects.length], ...values.map(value => [value, label(value), counts.get(value)])];

  let toggle, menu, toggleText;
  const setOpen = open => {
    if (!menu) return;
    menu.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
  };

  const buttons = entries.map(([value, text, count]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.facet = value;
    if (dropdown) {
      button.className = "facet-option";
      button.setAttribute("role", "option");
      button.innerHTML = `<span>${text}</span><small>${count}</small>`;
    } else {
      button.className = "status-filter";
      button.textContent = text;
    }
    button.addEventListener("click", () => {
      buttons.forEach(other => {
        const active = other === button;
        other.classList.toggle("is-active", active);
        other.setAttribute(dropdown ? "aria-selected" : "aria-pressed", String(active));
      });
      if (dropdown) {
        toggleText.textContent = text;
        toggle.classList.toggle("is-active", value !== "all");
        setOpen(false);
      }
      onSelect(value);
      render();
    });
    const active = value === "all";
    button.classList.toggle("is-active", active);
    button.setAttribute(dropdown ? "aria-selected" : "aria-pressed", String(active));
    return button;
  });

  const slot = container.querySelector(".facet-buttons");
  if (!dropdown) {
    slot.replaceChildren(...buttons);
  } else {
    const wrap = document.createElement("div");
    wrap.className = "facet-dropdown";
    toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "status-filter facet-toggle";
    toggle.setAttribute("aria-haspopup", "listbox");
    toggle.setAttribute("aria-expanded", "false");
    toggle.innerHTML = `<span>${allLabel}</span><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5"/></svg>`;
    toggleText = toggle.querySelector("span");
    menu = document.createElement("div");
    menu.className = "facet-menu";
    menu.setAttribute("role", "listbox");
    menu.setAttribute("aria-labelledby", container.getAttribute("aria-labelledby") || "");
    menu.hidden = true;
    menu.append(...buttons);
    wrap.append(toggle, menu);
    slot.replaceChildren(wrap);

    toggle.addEventListener("click", () => {
      const open = menu.hidden;
      setOpen(open);
      if (open) (buttons.find(button => button.classList.contains("is-active")) || buttons[0]).focus();
    });
    document.addEventListener("click", event => { if (!wrap.contains(event.target)) setOpen(false); });
    wrap.addEventListener("keydown", event => {
      if (event.key === "Escape" && !menu.hidden) { setOpen(false); toggle.focus(); return; }
      if (menu.hidden || !["ArrowDown", "ArrowUp"].includes(event.key)) return;
      event.preventDefault();
      const index = buttons.indexOf(document.activeElement);
      const next = event.key === "ArrowDown" ? Math.min(buttons.length - 1, index + 1) : Math.max(0, index - 1);
      buttons[next].focus();
    });
  }
  container.hidden = false;
}

function buildFacets() {
  buildFacet(platformFilters, {
    key: "platform",
    allLabel: "모든 기종",
    order: (a, b, counts) => counts.get(b) - counts.get(a),
    onSelect: value => { activePlatform = value; },
    dropdown: true
  });
  buildFacet(genreFilters, {
    key: "genre",
    allLabel: "모든 장르",
    order: (a, b) => (GENRES.indexOf(a) + 1 || 99) - (GENRES.indexOf(b) + 1 || 99),
    label: value => GENRE_NAMES[value] || value,
    onSelect: value => { activeGenre = value; },
    dropdown: true
  });
}

function setStatus(status) {
  activeStatus = status;
  statusButtons.forEach(button => {
    const active = button.dataset.statusFilter === status;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  render();
}

async function loadProjects() {
  try {
    const response = await fetch("/assets/data/projects.generated.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`project index HTTP ${response.status}`);
    const payload = await response.json();
    if (!Array.isArray(payload.projects) || payload.projects.length === 0) {
      throw new Error("project index is empty");
    }
    return payload.projects;
  } catch (error) {
    console.warn("Generated project index unavailable; using fallback data.", error);
    return fallbackProjects;
  }
}

async function init() {
  const loaded = await loadProjects();
  projects = loaded.filter(project => project.status !== "planned");
  plannedProjects = loaded.filter(project => project.status === "planned");

  const platformCounts = projects.reduce((counts, project) => counts.set(project.platform, (counts.get(project.platform) || 0) + 1), new Map());
  const platformLabel = [...platformCounts.keys()].sort((a, b) => platformCounts.get(b) - platformCounts.get(a)).join(" · ");
  const heroSummary = document.querySelector("#hero-summary");
  if (heroSummary) heroSummary.textContent = `${projects.length} Projects · ${platformLabel}`;
  if (searchBox) searchBox.hidden = projects.length < 6;

  statusButtons.forEach(button => {
    const status = button.dataset.statusFilter;
    if (status !== "all") button.hidden = !projects.some(project => project.status === status);
  });

  renderPopular();
  renderPlanned();

  statusButtons.forEach(button => {
    button.addEventListener("click", () => setStatus(button.dataset.statusFilter));
  });
  searchInput?.addEventListener("input", render);
  grid.addEventListener("click", pickFromCard);
  buildFacets();
  moreButton?.addEventListener("click", () => {
    showAllProjects = !showAllProjects;
    render();
    if (!showAllProjects) document.querySelector("#patches")?.scrollIntoView({ block: "start" });
  });
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(render, 150);
  });

  setStatus("all");
}

init();
