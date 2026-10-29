import React, { useState, createContext, useContext } from "react";
import logoImg from "./assets/tight logo.png";
import {
  Home, PawPrint, Search, MapPin, BookOpen, Heart, MessageCircle, Share2, Plus,
  Settings, ChevronLeft, ChevronRight, ChevronDown, Sparkles, Wifi, BatteryFull,
  MoreHorizontal, Camera, X, LayoutGrid, List as ListIcon, Pencil, RotateCcw,
  Footprints, Stethoscope, Scissors, Cookie, Dumbbell, ShoppingBag, LocateFixed
} from "lucide-react";

/* ---------------------------------------------
   Fonts & default theme
--------------------------------------------- */
const FONT_HEAD = "'Jua', 'Cafe24 Ssurround', sans-serif";
const FONT_BODY = "'Pretendard', 'Noto Sans KR', sans-serif";

const DEFAULT_THEME = {
  main: "#6b5b52", sub: "#b8a79b", bg: "#f6f1eb",
  soft: "#d8a58b", sage: "#a8b7a1", white: "#ffffff",
};

const ICONS = { Footprints, Stethoscope, Scissors, Cookie, Dumbbell, ShoppingBag, PawPrint };

/* ---------------------------------------------
   Default content (검색탭 카테고리 수정 및 데이터 24개 확장)
--------------------------------------------- */
const DEFAULT_CONTENT = {
  tagline: "일상 속 친근한 연결",
  petName: "두부",
  petAvatar: "https://i.pinimg.com/736x/99/59/38/9959383ec0f61868d6933e80ec15f1b1.jpg",
  stories: [
    { id: 1, img: "https://i.pinimg.com/736x/9d/1f/14/9d1f14e8fa8d5439b8e2b805c486bfe4.jpg" },
    { id: 2, img: "https://i.pinimg.com/736x/4f/89/c9/4f89c91ee8755ceba302bcf8b89e1127.jpg" },
    { id: 3, img: "https://i.pinimg.com/1200x/bf/1d/e3/bf1de3443a7836b64eaef691fe546789.jpg" },
    { id: 4, img: "https://i.pinimg.com/736x/97/dd/bd/97ddbd79b3fc4e250884917c61d61dd0.jpg" },
    { id: 5, img: "https://i.pinimg.com/736x/28/40/03/2840034b2ea419af4ea183c8eea37e5f.jpg" },
    { id: 6, img: "https://i.pinimg.com/736x/ac/c0/78/acc078e056812cf937c3f4cf7cabfeaf.jpg" },
    { id: 7, img: "https://i.pinimg.com/736x/79/6e/95/796e95e981e632f1bb672c357b0b6077.jpg" },
  ],
  feedPosts: [
    { id: 1, handle: "@do_ber", avatar: "https://i.pinimg.com/736x/4f/89/c9/4f89c91ee8755ceba302bcf8b89e1127.jpg", photo: "https://i.pinimg.com/736x/ff/33/c6/ff33c6ee0fc2bf6496e52380a0ed0b98.jpg", caption: "오늘도 무사히 낮잠 완료 🐾 베르는 오늘도 세상 편안", likes: 128, comments: 12, hasLiked: false },
    { id: 2, handle: "@haru_and_me", avatar: "https://i.pinimg.com/1200x/bf/1d/e3/bf1de3443a7836b64eaef691fe546789.jpg", photo: "https://i.pinimg.com/736x/e3/f4/f5/e3f4f58de2f95c227bd56d133a9aea72.jpg", caption: "퇴근하고 문 열자마자 달려오는 이 표정 못 참지", likes: 241, comments: 34, hasLiked: false },
    { id: 3, handle: "@meow_life", avatar: "https://i.pinimg.com/736x/59/1b/b5/591bb59e86fe5178c2f22126230cfb0c.jpg", photo: "https://i.pinimg.com/1200x/0b/47/b5/0b47b5b182dc08b11391a1299e3dc71f.jpg", caption: "햇살 좋은 날 창가 자리 쟁탈전 ☀️", likes: 152, comments: 8, hasLiked: false },
    { id: 4, handle: "@choco_poodle", avatar: "https://i.pinimg.com/736x/28/40/03/2840034b2ea419af4ea183c8eea37e5f.jpg", photo: "https://i.pinimg.com/736x/97/dd/bd/97ddbd79b3fc4e250884917c61d61dd0.jpg", caption: "오늘따라 산책하기 싫다고 버티는 중 ㅋㅋ", likes: 302, comments: 41, hasLiked: false },
    { id: 5, handle: "@golden_boy", avatar: "https://i.pinimg.com/736x/c6/f0/6c/c6f06c9127c5fb0818b8fa271bba6299.jpg", photo: "https://i.pinimg.com/1200x/d0/e4/dc/d0e4dc68a35ed1e55ea02d3639c01efb.jpg", caption: "새로 산 장난감 5분 만에 파괴완료 🐶", likes: 89, comments: 3, hasLiked: false },
    { id: 6, handle: "@cheese_tabby", avatar: "https://i.pinimg.com/1200x/35/c0/c0/35c0c07e5befff32632101157f40bcc7.jpg", photo: "https://i.pinimg.com/1200x/8c/0f/5a/8c0f5a06724a0a6e3eef9a9c93918116.jpg", caption: "캔 따는 소리는 기가 막히게 듣고 옴", likes: 421, comments: 55, hasLiked: false },
    { id: 7, handle: "@run_corgi", avatar: "https://i.pinimg.com/1200x/2f/db/93/2fdb93c046bcfdf4e2c156cb7f6335cc.jpg", photo: "https://i.pinimg.com/736x/72/50/e2/7250e2fbded6241d9a21883c9b1a8e57.jpg", caption: "짧은 다리로 열심히 뛰는 중 🏃‍♂️", likes: 210, comments: 12, hasLiked: false },
    { id: 8, handle: "@shiba_smile", avatar: "https://i.pinimg.com/1200x/43/2b/99/432b994b640c12376498b74e0776b976.jpg", photo: "https://i.pinimg.com/736x/3b/32/40/3b3240e6d21c815ae3c74a873d2569d4.jpg", caption: "간식 줄 때만 보여주는 자본주의 미소", likes: 512, comments: 88, hasLiked: false },
  ],
  categories: [
    { id: 1, label: "산책", icon: "Footprints" },
    { id: 2, label: "병원", icon: "Stethoscope" },
    { id: 3, label: "간식", icon: "Cookie" },
    { id: 4, label: "용품", icon: "ShoppingBag" },
  ],
  communityPosts: [
    { id: 101, category: "산책", avatar: "https://i.pinimg.com/736x/79/6e/95/796e95e981e632f1bb672c357b0b6077.jpg", nickname: "dubu_nu", photo: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80", caption: "장마철 산책 대체 어떻게들 하세요? 실내 활동 추천 부탁드려요. 비오니까 애가 너무 우울해하네요 ㅠㅠ", likes: 41, comments: 17, hasLiked: false },
    { id: 102, category: "산책", avatar: "https://i.pinimg.com/736x/97/dd/bd/97ddbd79b3fc4e250884917c61d61dd0.jpg", nickname: "choco_poodle", photo: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600&q=80", caption: "한강공원 강아지 놀이터 다녀왔어요! 새로 사귄 친구들이랑 엄청 뛰어놀았습니다.", likes: 120, comments: 24, hasLiked: false },
    { id: 103, category: "산책", avatar: "https://i.pinimg.com/736x/4f/89/c9/4f89c91ee8755ceba302bcf8b89e1127.jpg", nickname: "do_ber", photo: "https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?w=600&q=80", caption: "여름엔 역시 야간 산책이죠. 선선해서 걷기 딱 좋네요.", likes: 88, comments: 12, hasLiked: false },
    { id: 104, category: "산책", avatar: "https://i.pinimg.com/1200x/bf/1d/e3/bf1de3443a7836b64eaef691fe546789.jpg", nickname: "haru_and_me", photo: "https://images.unsplash.com/photo-1537151608804-ea6f1184aca9?w=600&q=80", caption: "산책하다가 만난 길고양이한테 시선 뺏긴 하루 ㅋㅋ", likes: 215, comments: 31, hasLiked: false },
    { id: 105, category: "산책", avatar: "https://i.pinimg.com/1200x/2f/db/93/2fdb93c046bcfdf4e2c156cb7f6335cc.jpg", nickname: "run_corgi", photo: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&q=80", caption: "새로 산 하네스 개시! 색깔 완전 찰떡이지 않나요?", likes: 142, comments: 18, hasLiked: false },
    { id: 106, category: "산책", avatar: "https://i.pinimg.com/1200x/43/2b/99/432b994b640c12376498b74e0776b976.jpg", nickname: "shiba_smile", photo: "https://images.unsplash.com/photo-1544568100-847a948585b9?w=600&q=80", caption: "안 간다고 버티기 시전 중... 10분째 대치 상태입니다.", likes: 350, comments: 55, hasLiked: false },
    
    { id: 201, category: "병원", avatar: "https://i.pinimg.com/736x/ac/c0/78/acc078e056812cf937c3f4cf7cabfeaf.jpg", nickname: "nuzzle_w", photo: "https://images.unsplash.com/photo-1584815682414-7cf6b142eb3c?w=600&q=80", caption: "고양이 중성화 수술 후 회복 기간 얼마나 걸렸는지 여쭤봐도 될까요? 넥카라를 너무 불편해해서 걱정입니다.", likes: 24, comments: 9, hasLiked: false },
    { id: 202, category: "병원", avatar: "https://i.pinimg.com/736x/c6/f0/6c/c6f06c9127c5fb0818b8fa271bba6299.jpg", nickname: "golden_boy", photo: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=600&q=80", caption: "심장사상충 약 먹이는 꿀팁 공유합니다. 간식 사이에 숨겨서 주는 게 최고네요.", likes: 110, comments: 22, hasLiked: false },
    { id: 203, category: "병원", avatar: "https://i.pinimg.com/1200x/35/c0/c0/35c0c07e5befff32632101157f40bcc7.jpg", nickname: "cheese_tabby", photo: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80", caption: "종합백신 맞으러 왔는데 긴장해서 숨어있는 중 ㅠㅠ", likes: 85, comments: 14, hasLiked: false },
    { id: 204, category: "병원", avatar: "https://i.pinimg.com/1200x/18/d8/8b/18d88ba6b3e6b34f3a0a667a1e3b5ff0.jpg", nickname: "black_bean", photo: "https://images.unsplash.com/photo-1599839619722-39751411ea63?w=600&q=80", caption: "건강검진 결과 다행히 아주 건강하대요! 다이어트만 조금 하라고 하시네요 ㅎㅎ", likes: 230, comments: 40, hasLiked: false },
    { id: 205, category: "병원", avatar: "https://i.pinimg.com/736x/07/0a/4c/070a4c68083579a0f43d427e778d586d.jpg", nickname: "bichon_cloud", photo: "https://images.unsplash.com/photo-1554692928-dfa2c262d512?w=600&q=80", caption: "슬개골 탈구 의심돼서 엑스레이 찍고 왔어요. 아직 1기라 관리만 잘해주면 된대요.", likes: 95, comments: 16, hasLiked: false },
    { id: 206, category: "병원", avatar: "https://i.pinimg.com/736x/59/1b/b5/591bb59e86fe5178c2f22126230cfb0c.jpg", nickname: "meow_life", photo: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80", caption: "동물병원 고양이 친화 진료실 너무 좋네요. 대기실부터 분리되어 있어서 안심입니다.", likes: 160, comments: 25, hasLiked: false },

    { id: 301, category: "간식", avatar: "https://i.pinimg.com/736x/59/1b/b5/591bb59e86fe5178c2f22126230cfb0c.jpg", nickname: "boder_col", photo: "https://images.unsplash.com/photo-1582562124811-c09040d0a907?w=600&q=80", caption: "수제 간식 처음 만들어봤는데 애가 안 먹네요... 닭가슴살 져키 레시피 꿀팁 있으신 분?", likes: 15, comments: 5, hasLiked: false },
    { id: 302, category: "간식", avatar: "https://i.pinimg.com/736x/97/dd/bd/97ddbd79b3fc4e250884917c61d61dd0.jpg", nickname: "choco_poodle", photo: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&q=80", caption: "요즘 유행하는 동결건조 간식 사봤는데 기호성 대박이에요!", likes: 145, comments: 22, hasLiked: false },
    { id: 303, category: "간식", avatar: "https://i.pinimg.com/736x/4f/89/c9/4f89c91ee8755ceba302bcf8b89e1127.jpg", nickname: "do_ber", photo: "https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?w=600&q=80", caption: "더운 여름엔 펫밀크 얼려서 주는 게 최고죠. 아이스크림처럼 핥아먹어요.", likes: 210, comments: 33, hasLiked: false },
    { id: 304, category: "간식", avatar: "https://i.pinimg.com/1200x/bf/1d/e3/bf1de3443a7836b64eaef691fe546789.jpg", nickname: "haru_and_me", photo: "https://images.unsplash.com/photo-1537151608804-ea6f1184aca9?w=600&q=80", caption: "츄르 봉지만 바스락거려도 자다가 튀어나오는 매직", likes: 380, comments: 45, hasLiked: false },
    { id: 305, category: "간식", avatar: "https://i.pinimg.com/1200x/2f/db/93/2fdb93c046bcfdf4e2c156cb7f6335cc.jpg", nickname: "run_corgi", photo: "https://images.unsplash.com/photo-1544568100-847a948585b9?w=600&q=80", caption: "강아지 전용 멍푸치노 먹방 ☕️ 입가에 거품 묻은 거 너무 귀여워요.", likes: 195, comments: 28, hasLiked: false },
    { id: 306, category: "간식", avatar: "https://i.pinimg.com/1200x/43/2b/99/432b994b640c12376498b74e0776b976.jpg", nickname: "shiba_smile", photo: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600&q=80", caption: "다이어트 중이라 양배추 간식으로 대체했는데 생각보다 잘 먹네요?", likes: 75, comments: 10, hasLiked: false },

    { id: 401, category: "용품", avatar: "https://i.pinimg.com/1200x/18/d8/8b/18d88ba6b3e6b34f3a0a667a1e3b5ff0.jpg", nickname: "black_bean", photo: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=600&q=80", caption: "새로 산 캣타워 조립 완료! 다행히 박스보다 캣타워를 더 좋아해주네요.", likes: 250, comments: 38, hasLiked: false },
    { id: 402, category: "용품", avatar: "https://i.pinimg.com/736x/07/0a/4c/070a4c68083579a0f43d427e778d586d.jpg", nickname: "bichon_cloud", photo: "https://images.unsplash.com/photo-1554692928-dfa2c262d512?w=600&q=80", caption: "노즈워크 장난감 샀는데 5분 컷 당했습니다... 난이도 높은 거 추천 좀 해주세요.", likes: 62, comments: 15, hasLiked: false },
    { id: 403, category: "용품", avatar: "https://i.pinimg.com/736x/ac/c0/78/acc078e056812cf937c3f4cf7cabfeaf.jpg", nickname: "nuzzle_w", photo: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80", caption: "자동 급식기 쓰시는 분들 어떤 브랜드 쓰시나요? 와이파이 연결 잘 되는 걸로 찾고 있어요.", likes: 45, comments: 19, hasLiked: false },
    { id: 404, category: "용품", avatar: "https://i.pinimg.com/736x/c6/f0/6c/c6f06c9127c5fb0818b8fa271bba6299.jpg", nickname: "golden_boy", photo: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&q=80", caption: "강아지 카시트 바꿨는데 엄청 안정감 있네요. 드라이브 갈 맛 납니다.", likes: 180, comments: 26, hasLiked: false },
    { id: 405, category: "용품", avatar: "https://i.pinimg.com/1200x/35/c0/c0/35c0c07e5befff32632101157f40bcc7.jpg", nickname: "cheese_tabby", photo: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=600&q=80", caption: "먼지 없는 모래 찾다가 정착한 제품! 사막화도 덜하고 만족스럽습니다.", likes: 310, comments: 51, hasLiked: false },
    { id: 406, category: "용품", avatar: "https://i.pinimg.com/736x/59/1b/b5/591bb59e86fe5178c2f22126230cfb0c.jpg", nickname: "meow_life", photo: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=600&q=80", caption: "여름맞이 쿨매트 깔아줬더니 하루 종일 저기서만 자네요 ㅋㅋㅋ", likes: 135, comments: 17, hasLiked: false },
  ],
  spotCategories: ["산책로", "동물병원", "펫카페", "동반식당", "미용실"],
  spots: [
    { id: 1, name: "여의도 한강공원", tag: "산책로", top: "36%", left: "84%" },
    { id: 2, name: "문래 창작촌 골목", tag: "산책로", top: "62%", left: "32%" },
    { id: 3, name: "타임스퀘어 동물병원", tag: "동물병원", top: "56%", left: "44%" },
    { id: 4, name: "선유도공원", tag: "산책로", top: "10%", left: "41%" },
    { id: 5, name: "여의도공원", tag: "산책로", top: "42%", left: "67%" },
    { id: 6, name: "카페 1953 위드오드리", tag: "동반식당", top: "64%", left: "23%" },
    { id: 7, name: "러블리퍼피 당산", tag: "미용실", top: "40%", left: "36%" },
    { id: 8, name: "24시 수동물의료센터", tag: "동물병원", top: "76%", left: "53%" },
    { id: 9, name: "IFC몰 (애견동반)", tag: "산책로", top: "40%", left: "73%" },
  ],
  petAlbums: [
    {
      month: "May.",
      cover: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80",
      photos: [
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80",
        "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&q=80",
        "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=400&q=80",
        "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=400&q=80",
        "https://images.unsplash.com/photo-1529778456725-dbea72ce3c53?w=400&q=80",
        "https://images.unsplash.com/photo-1501820488136-72669149e0d4?w=400&q=80"
      ]
    },
    {
      month: "Apr.",
      cover: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=600&q=80",
      photos: [
        "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&q=80",
        "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400&q=80",
        "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=400&q=80",
        "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&q=80",
        "https://images.unsplash.com/photo-1583083527882-4bee9aba2eea?w=400&q=80",
        "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&q=80"
      ]
    },
    {
      month: "Mar.",
      cover: "https://images.unsplash.com/photo-1561948955-570b270e7c36?w=600&q=80",
      photos: [
        "https://images.unsplash.com/photo-1561948955-570b270e7c36?w=400&q=80",
        "https://images.unsplash.com/photo-1615397323282-311029c2f6d5?w=400&q=80",
        "https://images.unsplash.com/photo-1568152950566-c1bf43f4ab28?w=400&q=80",
        "https://images.unsplash.com/photo-1555685812-4b743e8362e0?w=400&q=80",
        "https://images.unsplash.com/photo-1606214174585-fd3158ddf451?w=400&q=80",
        "https://images.unsplash.com/photo-1511044568932-338cba0ad803?w=400&q=80"
      ]
    },
    {
      month: "Feb.",
      cover: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=600&q=80",
      photos: [
        "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400&q=80",
        "https://images.unsplash.com/photo-1588666324227-2cdbc983fc5e?w=400&q=80",
        "https://images.unsplash.com/photo-1577023311546-cdc07a8454d9?w=400&q=80",
        "https://images.unsplash.com/photo-1602498456745-e9503b30470b?w=400&q=80",
        "https://images.unsplash.com/photo-1627764104273-0ff7e25fb842?w=400&q=80",
        "https://images.unsplash.com/photo-1504826260979-242151ce5d24?w=400&q=80"
      ]
    }
  ]
};

/* ---------------------------------------------
   Context & Primitives
--------------------------------------------- */
const AppCtx = createContext(null);
const useApp = () => useContext(AppCtx);

function EditText({ value, onChange, style, editMode, placeholder }) {
  return (
    <span
      contentEditable={editMode} suppressContentEditableWarning
      onBlur={(e) => onChange(e.currentTarget.textContent || placeholder || "")}
      style={{ ...style, outline: editMode ? "1.5px dashed #d8a58b" : "none", outlineOffset: 3, borderRadius: 4, cursor: editMode ? "text" : "inherit", display: "inline-block", minWidth: editMode ? 10 : undefined }}
    >{value}</span>
  );
}

function EditImage({ src, onChange, style, alt, editMode, imgStyle }) {
  return (
    <div style={{ position: "relative", overflow: "hidden", ...style }}>
      <img src={src} alt={alt || ""} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", ...imgStyle }} />
      {editMode && (
        <button
          onClick={(e) => { e.stopPropagation(); const url = window.prompt("새 이미지 URL을 입력하세요", src); if (url) onChange(url); }}
          style={{ position: "absolute", bottom: 6, right: 6, width: 26, height: 26, borderRadius: "50%", background: "rgba(0,0,0,0.55)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
        ><Camera size={13} color="#fff" /></button>
      )}
    </div>
  );
}

function Logo({ size = 22, center }) {
  return (
    <div style={{ display: "flex", justifyContent: center ? "center" : "flex-start" }}>
      <img src={logoImg} alt="nuzzle" style={{ height: size * 2.3, width: "auto", display: "block" }} />
    </div>
  );
}

function StatusBar() {
  const { theme } = useApp();
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 22px 4px", fontSize: 13, fontWeight: 600, color: theme.main, fontFamily: FONT_BODY }}>
      <span>9:41</span>
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}><Wifi size={13} strokeWidth={2.5} /><BatteryFull size={15} strokeWidth={2} /></div>
    </div>
  );
}

/* ---------------------------------------------
   Screens
--------------------------------------------- */
function SplashScreen() {
  const { theme, content, setContent, setScreen, editMode } = useApp();
  return (
    <div onClick={() => !editMode && setScreen("feed")} style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, cursor: editMode ? "default" : "pointer" }}>
      <Logo size={35} center />
      <EditText value={content.tagline} editMode={editMode} onChange={(v) => setContent((c) => ({ ...c, tagline: v }))} style={{ fontFamily: FONT_BODY, fontSize: 13, color: theme.sub, marginTop: 2 }} />
      <div style={{ position: "absolute", bottom: 70, fontSize: 12, color: theme.sub, fontFamily: FONT_BODY }}>{editMode ? "" : "탭하여 시작하기"}</div>
    </div>
  );
}

function FeedScreen() {
  const { theme, content, setContent, editMode, setScreen } = useApp();
  const [viewState, setViewState] = useState('feed');
  const [newPostPhoto, setNewPostPhoto] = useState("https://i.pinimg.com/1200x/2f/db/93/2fdb93c046bcfdf4e2c156cb7f6335cc.jpg");
  const [newCaption, setNewCaption] = useState("");
  const [newStoryPhoto, setNewStoryPhoto] = useState("https://i.pinimg.com/736x/8e/4d/2c/8e4d2c81d78e77a06cc71fdfcc636440.jpg");
  const [viewingStory, setViewingStory] = useState(null); 
  const [activeCommentPost, setActiveCommentPost] = useState(null); 
  const [commentText, setCommentText] = useState("");

  const updatePost = (id, patch) => setContent((c) => ({ ...c, feedPosts: c.feedPosts.map((p) => (p.id === id ? { ...p, ...patch } : p)) }));

  const toggleLike = (post) => {
    const isLiked = post.hasLiked;
    updatePost(post.id, { hasLiked: !isLiked, likes: post.likes + (isLiked ? -1 : 1) });
  };

  const handleShare = (post) => {
    if (navigator.share) {
      navigator.share({ title: 'nuzzle', text: post.caption, url: post.photo }).catch(()=>{});
    } else { alert("공유 링크가 클립보드에 복사되었습니다."); }
  };

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    const post = content.feedPosts.find(p => p.id === activeCommentPost);
    updatePost(activeCommentPost, { comments: post.comments + 1 });
    setCommentText(""); alert("댓글이 등록되었습니다."); 
  };

  const handlePostSubmit = () => {
    if (!newCaption.trim()) return alert("내용을 입력해 주세요!");
    const newPost = { id: Date.now(), handle: "@my_pet", avatar: content.petAvatar, photo: newPostPhoto, caption: newCaption, likes: 0, comments: 0, hasLiked: false };
    setContent((c) => ({ ...c, feedPosts: [newPost, ...c.feedPosts] }));
    setNewCaption(""); setViewState('feed');
  };

  const handleStorySubmit = () => {
    setContent((c) => ({ ...c, stories: [{ id: Date.now(), img: newStoryPhoto }, ...c.stories] }));
    setViewState('feed');
  };

  const handlePhotoClick = (setter, current) => {
    const url = window.prompt("업로드할 사진의 URL을 붙여넣으세요:", current);
    if (url) setter(url);
  };

  if (viewingStory) {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "#000", display: "flex", flexDirection: "column", animation: "fadeInUp 0.2s ease" }}>
        <div style={{ padding: "20px", display: "flex", justifyContent: "flex-end", zIndex: 10 }}><button onClick={() => setViewingStory(null)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={30} color="#fff" /></button></div>
        <img src={viewingStory.img} style={{ width: "100%", flex: 1, objectFit: "contain" }} alt="story" />
      </div>
    );
  }

  if (viewState === 'post') {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%", background: theme.white }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 18px", borderBottom: `1px solid ${theme.bg}` }}>
          <button onClick={() => setViewState('feed')} style={{ background: "none", border: "none" }}><X size={24} color={theme.main} /></button>
          <span style={{ fontSize: 15, fontWeight: 700, color: theme.main }}>새 게시물</span>
          <button onClick={handlePostSubmit} style={{ background: "none", border: "none", fontWeight: 700, color: theme.soft }}>공유</button>
        </div>
        <div className="app-scroll" style={{ flex: 1, overflowY: "auto", paddingBottom: 100 }}>
          <div onClick={() => handlePhotoClick(setNewPostPhoto, newPostPhoto)} style={{ width: "100%", aspectRatio: "1/1.1", background: theme.bg, position: "relative" }}><img src={newPostPhoto} alt="업로드 이미지" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
          <div style={{ padding: "16px 18px" }}><textarea value={newCaption} onChange={(e) => setNewCaption(e.target.value)} placeholder="일상을 공유해보세요..." style={{ width: "100%", minHeight: 120, border: "none", outline: "none", resize: "none", fontSize: 14 }} /></div>
        </div>
      </div>
    );
  }

  if (viewState === 'story') {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%", background: theme.white }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 18px", borderBottom: `1px solid ${theme.bg}` }}>
          <button onClick={() => setViewState('feed')} style={{ background: "none", border: "none" }}><X size={24} color={theme.main} /></button>
          <span style={{ fontSize: 15, fontWeight: 700, color: theme.main }}>새 스토리</span>
          <button onClick={handleStorySubmit} style={{ background: "none", border: "none", fontWeight: 700, color: theme.soft }}>추가</button>
        </div>
        <div className="app-scroll" style={{ flex: 1, display: "flex", flexDirection: "column", paddingBottom: 100 }}>
          <div onClick={() => handlePhotoClick(setNewStoryPhoto, newStoryPhoto)} style={{ margin: "20px 18px", flex: 1, borderRadius: 20, background: theme.bg, position: "relative", overflow: "hidden", minHeight: 400 }}><img src={newStoryPhoto} alt="스토리 이미지" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: 92 }}>
      <div style={{ background: theme.white, display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", padding: "10px 15px 4px" }}>
        <button onClick={() => setViewState('post')} style={{ justifySelf: "start", border: "none", background: "none", cursor: "pointer", padding: 3 }}><Plus size={30} color={theme.main} /></button>
        <Logo size={18} center />
        <button onClick={() => setScreen('settings')} style={{ justifySelf: "end", border: "none", background: "none", cursor: "pointer", padding: 7 }}><Settings size={28} color={theme.main} /></button>
      </div>
      <div className="app-scroll" style={{ position: "sticky", top: -1, zIndex: 20, background: theme.white, padding: "10px 18px 16px", display: "flex", gap: 14, overflowX: "auto" }}>
        <button onClick={() => setViewState('story')} style={{ width: 50, height: 50, borderRadius: "50%", flexShrink: 0, border: `1.5px dashed ${theme.sub}`, background: theme.white, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Plus size={18} color={theme.sub} /></button>
        {content.stories.map((s) => (
          <div key={s.id} onClick={() => !editMode && setViewingStory(s)} style={{ flexShrink: 0, cursor: editMode ? "default" : "pointer", borderRadius: "50%", border: `2.5px solid ${theme.soft}`, padding: 2 }}>
            <EditImage src={s.img} editMode={editMode} onChange={(url) => setContent((c) => ({ ...c, stories: c.stories.map((st) => (st.id === s.id ? { ...st, img: url } : st)) }))} style={{ width: 42, height: 42, borderRadius: "50%" }} />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: "16px 0" }}>
        {content.feedPosts.map((p) => (
          <div key={p.id} style={{ background: theme.white, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "16px 18px 12px" }}>
              <EditImage src={p.avatar} editMode={editMode} onChange={(url) => updatePost(p.id, { avatar: url })} style={{ width: 34, height: 34, borderRadius: "50%" }} />
              <EditText value={p.handle} editMode={editMode} onChange={(v) => updatePost(p.id, { handle: v })} style={{ fontSize: 13.5, fontWeight: 700, color: theme.main, fontFamily: FONT_BODY }} />
              <MoreHorizontal size={17} color={theme.sub} style={{ marginLeft: "auto" }} />
            </div>
            <EditImage src={p.photo} editMode={editMode} onChange={(url) => updatePost(p.id, { photo: url })} style={{ width: "100%", aspectRatio: "1 / 1.1" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 18px 6px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }} onClick={() => toggleLike(p)}>
                <Heart size={21} fill={p.hasLiked ? theme.soft : "none"} color={p.hasLiked ? theme.soft : theme.sub} strokeWidth={2} />
                <span style={{ fontSize: 13, color: theme.main, fontWeight: 500 }}>{p.likes}</span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }} onClick={() => setActiveCommentPost(p.id)}>
                <MessageCircle size={21} color={theme.sub} strokeWidth={2} />
                <span style={{ fontSize: 13, color: theme.main, fontWeight: 500 }}>{p.comments}</span>
              </span>
              <Share2 size={19} color={theme.sub} strokeWidth={2} cursor="pointer" onClick={() => handleShare(p)} />
            </div>
            <div style={{ padding: "6px 18px 18px" }}><EditText value={p.caption} editMode={editMode} onChange={(v) => updatePost(p.id, { caption: v })} style={{ fontSize: 13, color: theme.main, fontFamily: FONT_BODY, lineHeight: 1.6 }} /></div>
          </div>
        ))}
      </div>
      {activeCommentPost && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} onClick={() => setActiveCommentPost(null)} />
          <div style={{ background: theme.white, borderRadius: "24px 24px 0 0", padding: "20px", position: "relative", zIndex: 51, animation: "fadeInUp 0.3s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontWeight: 700, fontFamily: FONT_BODY, color: theme.main }}>댓글 달기</span>
              <button onClick={() => setActiveCommentPost(null)} style={{ border: "none", background: "none", cursor: "pointer" }}><X size={20} color={theme.main}/></button>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <input type="text" value={commentText} onChange={e => setCommentText(e.target.value)} placeholder="댓글을 입력하세요..." style={{ flex: 1, padding: "12px 16px", borderRadius: 999, border: `1px solid ${theme.bg}`, outline: "none", fontFamily: FONT_BODY, fontSize: 14 }} />
              <button onClick={handleAddComment} style={{ background: theme.main, color: theme.white, border: "none", padding: "0 20px", borderRadius: 999, fontWeight: 700, fontFamily: FONT_BODY, cursor: "pointer" }}>등록</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProfileScreen() {
  const { theme, content, setContent, editMode, setScreen } = useApp();
  const [view, setView] = useState("grid");
  const [monthIdx, setMonthIdx] = useState(0);

  const currentAlbum = content.petAlbums[monthIdx] || content.petAlbums[0];

  const updateAlbumCover = (idx, url) => setContent(c => ({ ...c, petAlbums: c.petAlbums.map((a, i) => i === idx ? { ...a, cover: url } : a) }));
  const updateAlbumPhoto = (mIdx, pIdx, url) => setContent(c => ({ ...c, petAlbums: c.petAlbums.map((a, i) => { if (i !== mIdx) return a; const newPhotos = [...a.photos]; newPhotos[pIdx] = url; return { ...a, photos: newPhotos }; }) }));

  return (
    <div style={{ paddingBottom: 92 }}>
      <div style={{ position: "sticky", top: -1, zIndex: 20, background: theme.white, paddingBottom: 20, borderRadius: "0 0 24px 24px", boxShadow: "0 4px 16px rgba(107,91,82,0.04)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 18px 12px" }}>
          <button onClick={() => setView(view === "grid" ? "timeline" : "grid")} style={{ border: "none", background: "none", cursor: "pointer", padding: 0, display: "flex" }}>
            {view === "grid" ? <ListIcon size={25} color={theme.main} /> : <LayoutGrid size={20} color={theme.main} />}
          </button>
          <Settings size={25} color={theme.main} style={{ cursor: "pointer" }} onClick={() => setScreen('settings')} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4 }}>
          <EditImage src={content.petAvatar} editMode={editMode} onChange={(url) => setContent((c) => ({ ...c, petAvatar: url }))} style={{ width: 110, height: 110, borderRadius: "50%", border: `3px solid ${theme.white}`, boxShadow: "0 4px 16px rgba(107,91,82,0.15)" }} />
          <EditText value={content.petName} editMode={editMode} onChange={(v) => setContent((c) => ({ ...c, petName: v }))} style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: 15, color: theme.main, marginTop: 12 }} />
        </div>
        {view === "grid" && currentAlbum && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 16 }}>
            <button onClick={() => setMonthIdx((i) => Math.max(0, i - 1))} style={{ border: "none", background: "none", cursor: "pointer" }}><ChevronLeft size={16} color={theme.sub} /></button>
            <span style={{ fontSize: 13, fontWeight: 700, color: theme.main, fontFamily: FONT_BODY, width: 40, textAlign: "center" }}>{currentAlbum.month}</span>
            <button onClick={() => setMonthIdx((i) => Math.min(content.petAlbums.length - 1, i + 1))} style={{ border: "none", background: "none", cursor: "pointer" }}><ChevronRight size={16} color={theme.sub} /></button>
          </div>
        )}
      </div>

      <div style={{ padding: view === "timeline" ? "16px 14px" : "12px 3px" }}>
        {view === "grid" && currentAlbum ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 3, animation: "fadeInUp 0.2s ease" }}>
            {currentAlbum.photos.map((src, i) => (
              <EditImage key={i} src={src} editMode={editMode} onChange={(url) => updateAlbumPhoto(monthIdx, i, url)} style={{ width: "100%", aspectRatio: "1 / 1", borderRadius: 4 }} />
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16, animation: "fadeInUp 0.2s ease" }}>
            {content.petAlbums.map((t, i) => (
              <div key={i} onClick={() => { setMonthIdx(i); setView("grid"); }} style={{ background: theme.white, borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 12px rgba(107,91,82,0.03)", position: "relative", cursor: "pointer" }}>
                <EditImage src={t.cover} editMode={editMode} onChange={(url) => updateAlbumCover(i, url)} style={{ width: "100%", height: 160 }} />
                <span style={{ position: "absolute", top: 12, left: 12, background: theme.sage, color: theme.white, fontSize: 11.5, fontWeight: 700, fontFamily: FONT_BODY, padding: "4px 10px", borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>{t.month}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CategoryScreen() {
  const { theme, content, setContent, editMode } = useApp();
  const [activeCat, setActiveCat] = useState('all');
  const [isWriting, setIsWriting] = useState(false);
  const [detailPost, setDetailPost] = useState(null);
  
  const [newPhoto, setNewPhoto] = useState("https://i.pinimg.com/1200x/2f/db/93/2fdb93c046bcfdf4e2c156cb7f6335cc.jpg");
  const [newCatLabel, setNewCatLabel] = useState(content.categories[0]?.label || "산책");
  const [newCaption, setNewCaption] = useState("");
  
  const [commentText, setCommentText] = useState("");
  const [activeCommentPost, setActiveCommentPost] = useState(null);

  const updateCat = (id, label) => setContent((c) => ({ ...c, categories: c.categories.map((cat) => (cat.id === id ? { ...cat, label } : cat)) }));
  const removeCat = (id) => setContent((c) => ({ ...c, categories: c.categories.filter((cat) => cat.id !== id) }));
  
  const updatePost = (id, patch) => setContent((c) => ({ ...c, communityPosts: c.communityPosts.map((p) => (p.id === id ? { ...p, ...patch } : p)) }));
  
  const toggleLike = (post) => {
    const isLiked = post.hasLiked;
    updatePost(post.id, { hasLiked: !isLiked, likes: post.likes + (isLiked ? -1 : 1) });
    if(detailPost && detailPost.id === post.id) setDetailPost({...detailPost, hasLiked: !isLiked, likes: detailPost.likes + (isLiked ? -1 : 1)});
  };

  const handleShare = (post) => {
    if (navigator.share) navigator.share({ title: 'nuzzle', text: post.caption, url: post.photo }).catch(()=>{});
    else alert("공유 링크가 클립보드에 복사되었습니다.");
  };

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    const post = content.communityPosts.find(p => p.id === activeCommentPost);
    updatePost(activeCommentPost, { comments: post.comments + 1 });
    if(detailPost && detailPost.id === activeCommentPost) setDetailPost({...detailPost, comments: detailPost.comments + 1});
    setCommentText(""); alert("댓글이 등록되었습니다."); 
  };

  const displayCategories = [{ id: 'all', label: 'ALL', icon: 'LayoutGrid' }, ...content.categories];
  const filteredPosts = content.communityPosts.filter((p) => {
    if (activeCat === 'all') return true;
    const targetCategory = content.categories.find(c => c.id === activeCat);
    return targetCategory && p.category === targetCategory.label;
  });

  const handlePostSubmit = () => {
    if (!newCaption.trim()) return alert("내용을 입력해 주세요!");
    const newPost = { id: Date.now(), category: newCatLabel, avatar: content.petAvatar, nickname: content.petName, photo: newPhoto, caption: newCaption, likes: 0, comments: 0, hasLiked: false };
    setContent((c) => ({ ...c, communityPosts: [newPost, ...c.communityPosts] }));
    setNewCaption(""); setIsWriting(false); setActiveCat('all');
  };

  const handlePhotoClick = () => { const url = window.prompt("업로드할 사진의 URL을 붙여넣으세요:", newPhoto); if (url) setNewPhoto(url); };

  if (isWriting) {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%", background: theme.white, animation: "fadeInUp 0.3s ease" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 18px", borderBottom: `1px solid ${theme.bg}`, position: "sticky", top: 0, background: theme.white, zIndex: 10 }}>
          <button onClick={() => setIsWriting(false)} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex" }}><X size={24} color={theme.main} /></button>
          <span style={{ fontSize: 15, fontWeight: 700, color: theme.main, fontFamily: FONT_BODY }}>새 게시물</span>
          <button onClick={handlePostSubmit} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontSize: 15, fontWeight: 700, color: theme.soft, fontFamily: FONT_BODY }}>공유</button>
        </div>
        <div className="app-scroll" style={{ flex: 1, overflowY: "auto", paddingBottom: 100 }}>
          <div onClick={handlePhotoClick} style={{ width: "100%", aspectRatio: "1 / 1", background: theme.bg, position: "relative", cursor: "pointer", overflow: "hidden" }}>
            <img src={newPhoto} alt="업로드 이미지" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", bottom: 12, right: 12, width: 32, height: 32, borderRadius: "50%", background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}><Camera size={16} color="#fff" /></div>
          </div>
          <div style={{ padding: "20px 18px 12px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: theme.sub, marginBottom: 12, fontFamily: FONT_BODY }}>카테고리 선택</div>
            <div className="app-scroll" style={{ display: "flex", gap: 8, overflowX: "auto" }}>
              {content.categories.map((cat) => (
                <button key={cat.id} onClick={() => setNewCatLabel(cat.label)} style={{ flexShrink: 0, padding: "8px 16px", borderRadius: 999, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: FONT_BODY, background: newCatLabel === cat.label ? theme.main : theme.bg, color: newCatLabel === cat.label ? theme.white : theme.main, boxShadow: newCatLabel === cat.label ? "0 4px 10px rgba(107,91,82,0.2)" : "none" }}>{cat.label}</button>
              ))}
            </div>
          </div>
          <div style={{ padding: "12px 18px" }}><textarea value={newCaption} onChange={(e) => setNewCaption(e.target.value)} placeholder="반려동물과의 일상을 공유해보세요..." style={{ width: "100%", minHeight: 120, border: "none", outline: "none", resize: "none", fontSize: 14, fontFamily: FONT_BODY, color: theme.main, background: "transparent", lineHeight: 1.6 }} /></div>
        </div>
      </div>
    );
  }

  if (detailPost) {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%", background: theme.white, animation: "fadeInUp 0.2s ease" }}>
        <div style={{ display: "flex", alignItems: "center", padding: "16px 18px", borderBottom: `1px solid ${theme.bg}`, position: "sticky", top: 0, background: theme.white, zIndex: 10 }}>
          <button onClick={() => setDetailPost(null)} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex" }}>
            <ChevronLeft size={28} color={theme.main} />
          </button>
          <span style={{ flex: 1, textAlign: "center", fontSize: 16, fontWeight: 700, color: theme.main, marginRight: 28, fontFamily: FONT_BODY }}>게시물</span>
        </div>
        <div className="app-scroll" style={{ flex: 1, overflowY: "auto", paddingBottom: 100 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 18px 12px" }}>
            <EditImage src={detailPost.avatar} editMode={editMode} onChange={(url) => updatePost(detailPost.id, { avatar: url })} style={{ width: 34, height: 34, borderRadius: "50%" }} />
            <EditText value={detailPost.nickname} editMode={editMode} onChange={(v) => updatePost(detailPost.id, { nickname: v })} style={{ fontSize: 13.5, fontWeight: 700, color: theme.main, fontFamily: FONT_BODY }} />
          </div>
          <EditImage src={detailPost.photo} editMode={editMode} onChange={(url) => updatePost(detailPost.id, { photo: url })} style={{ width: "100%", aspectRatio: "1/1.1" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 18px 6px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }} onClick={() => toggleLike(detailPost)}>
              <Heart size={21} fill={detailPost.hasLiked ? theme.soft : "none"} color={detailPost.hasLiked ? theme.soft : theme.sub} strokeWidth={2} />
              <span style={{ fontSize: 13, color: theme.main, fontWeight: 500 }}>{detailPost.likes}</span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }} onClick={() => setActiveCommentPost(detailPost.id)}>
              <MessageCircle size={21} color={theme.sub} strokeWidth={2} />
              <span style={{ fontSize: 13, color: theme.main, fontWeight: 500 }}>{detailPost.comments}</span>
            </span>
            <Share2 size={19} color={theme.sub} strokeWidth={2} cursor="pointer" onClick={() => handleShare(detailPost)} />
          </div>
          <div style={{ padding: "6px 18px 24px" }}>
            <EditText value={detailPost.caption} editMode={editMode} onChange={(v) => updatePost(detailPost.id, { caption: v })} style={{ fontSize: 14, color: theme.main, fontFamily: FONT_BODY, lineHeight: 1.6 }} />
          </div>
        </div>
        {activeCommentPost && (
          <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} onClick={() => setActiveCommentPost(null)} />
            <div style={{ background: theme.white, borderRadius: "24px 24px 0 0", padding: "20px", position: "relative", zIndex: 51, animation: "fadeInUp 0.3s ease" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <span style={{ fontWeight: 700, fontFamily: FONT_BODY, color: theme.main }}>댓글 달기</span>
                <button onClick={() => setActiveCommentPost(null)} style={{ border: "none", background: "none", cursor: "pointer" }}><X size={20} color={theme.main}/></button>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <input type="text" value={commentText} onChange={e => setCommentText(e.target.value)} placeholder="댓글을 입력하세요..." style={{ flex: 1, padding: "12px 16px", borderRadius: 999, border: `1px solid ${theme.bg}`, outline: "none", fontFamily: FONT_BODY, fontSize: 14 }} />
                <button onClick={handleAddComment} style={{ background: theme.main, color: theme.white, border: "none", padding: "0 20px", borderRadius: 999, fontWeight: 700, fontFamily: FONT_BODY, cursor: "pointer" }}>등록</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
      <div style={{ background: theme.white, padding: "16px 18px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Logo size={12} />
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, background: theme.bg, borderRadius: 999, padding: "9px 16px", border: "none" }}><Search size={15} color={theme.sage} /><span style={{ fontSize: 13, color: theme.sub, fontFamily: FONT_BODY }}>검색</span></div>
        </div>
      </div>
      <div className="app-scroll" style={{ position: "sticky", top: -1, zIndex: 20, background: theme.white, padding: "4px 18px 16px", borderRadius: "0 0 24px 24px", boxShadow: "0 4px 16px rgba(107,91,82,0.06)", display: "flex", gap: 10, overflowX: "auto", scrollBehavior: "smooth" }}>
        {displayCategories.map((cat) => {
          const Icon = cat.id === 'all' ? LayoutGrid : (ICONS[cat.icon] || PawPrint);
          const isActive = activeCat === cat.id;
          return (
            <div key={cat.id} style={{ position: "relative", flexShrink: 0, textAlign: "center" }}>
              <button onClick={() => setActiveCat(cat.id)} style={{ width: 48, height: 48, borderRadius: "50%", border: "none", cursor: "pointer", background: isActive ? theme.main : theme.bg, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease", boxShadow: isActive ? "0 4px 10px rgba(107,91,82,0.2)" : "none" }}><Icon size={20} color={isActive ? theme.white : theme.sub} strokeWidth={2} /></button>
              {editMode && cat.id !== 'all' && <button onClick={() => removeCat(cat.id)} style={{ position: "absolute", top: -4, right: -4, width: 16, height: 16, borderRadius: "50%", background: theme.main, border: `1.5px solid ${theme.white}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><X size={9} color="#fff" /></button>}
              <div style={{ marginTop: 6 }}>{cat.id === 'all' ? <span style={{ display: "block", fontSize: 10.5, color: isActive ? theme.main : theme.sub, fontWeight: isActive ? 700 : 500, fontFamily: FONT_BODY }}>{cat.label}</span> : <EditText value={cat.label} editMode={editMode} onChange={(v) => updateCat(cat.id, v)} style={{ display: "block", fontSize: 10.5, color: isActive ? theme.main : theme.sub, fontWeight: isActive ? 700 : 500, fontFamily: FONT_BODY }} />}</div>
            </div>
          );
        })}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8, padding: "16px 14px" }}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((p) => {
            const postCatData = content.categories.find(c => c.label === p.category);
            const BadgeIcon = postCatData ? (ICONS[postCatData.icon] || PawPrint) : PawPrint;
            return (
              <div key={p.id} onClick={() => setDetailPost(p)} style={{ background: theme.white, borderRadius: 16, boxShadow: "0 4px 12px rgba(107,91,82,0.04)", animation: "fadeInUp 0.3s ease", overflow: "hidden", cursor: "pointer", position: "relative" }}>
                <EditImage src={p.photo} editMode={false} onChange={()=>{}} style={{ width: "100%", aspectRatio: "1 / 1" }} />
                <div style={{ position: "absolute", top: 8, right: 8, width: 24, height: 24, background: theme.soft, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(107,91,82,0.15)" }}><BadgeIcon size={12} color={theme.white} strokeWidth={2.5} /></div>
              </div>
            )
          })
        ) : (
          <div style={{ gridColumn: "1 / -1", padding: "60px 0", textAlign: "center", color: theme.sub, fontSize: 13, fontFamily: FONT_BODY }}>해당 카테고리의 게시물이 아직 없습니다. 🐶</div>
        )}
      </div>
      <div style={{ flex: 1 }}></div>
      <div style={{ position: "sticky", bottom: 85, alignSelf: "flex-end", marginRight: 18, zIndex: 50 }}><button onClick={() => setIsWriting(true)} style={{ width: 56, height: 56, borderRadius: "50%", background: theme.main, border: "none", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 16px rgba(107,91,82,0.3)", cursor: "pointer", transition: "transform 0.2s ease" }}><Pencil size={24} color={theme.white} style={{ transform: "translate(1px, -1px)" }} /></button></div>
      <div style={{ height: 92, flexShrink: 0 }}></div>
    </div>
  );
}

function MapScreen() {
  const { theme, content, setContent, editMode } = useApp();
  const [selected, setSelected] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLocation, setShowLocation] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const activeCategoryLabel = activeCategory !== null ? content.spotCategories[activeCategory] : null;

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", position: "relative" }}>
      <div style={{ background: theme.white, paddingTop: 12, paddingBottom: 16, borderRadius: 0, zIndex: 20, position: "relative", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", width: "100%" }}>
        <div style={{ marginBottom: 16 }}><Logo size={18} center /></div>
        <button onClick={() => setIsSearchOpen(!isSearchOpen)} style={{ position: "absolute", top: 12, right: 18, background: "none", border: "none", cursor: "pointer", padding: 0 }}><Search size={22} color={theme.main} strokeWidth={2.5} /></button>
        <div className="app-scroll" style={{ display: "flex", gap: 8, padding: "0 18px", overflowX: "auto", scrollBehavior: "smooth", width: "100%", boxSizing: "border-box" }}>
          {content.spotCategories.map((s, i) => {
            const isActive = activeCategory === i;
            return (
              <button key={i} onClick={() => { setActiveCategory(isActive ? null : i); setSelected(null); }} style={{ flexShrink: 0, background: isActive ? theme.main : theme.bg, border: `1px solid ${isActive ? theme.main : theme.white}`, color: isActive ? theme.white : theme.main, fontSize: 11.5, fontFamily: FONT_BODY, fontWeight: 600, padding: "8px 14px", borderRadius: 999, boxShadow: isActive ? "0 4px 10px rgba(107,91,82,0.2)" : "none", cursor: "pointer", transition: "all 0.2s ease" }}>
                <EditText value={s} editMode={editMode} onChange={(v) => setContent((c) => ({ ...c, spotCategories: c.spotCategories.map((sc, si) => (si === i ? v : sc)) }))} style={{ color: isActive ? theme.white : theme.main }} />
              </button>
            );
          })}
        </div>
      </div>
      {isSearchOpen && (
        <div style={{ position: "absolute", top: 85, left: 18, right: 18, background: "#ffffff", borderRadius: 16, padding: "20px 18px", display: "flex", alignItems: "center", zIndex: 30, boxShadow: "0 6px 16px rgba(0,0,0,0.1)", animation: "fadeInDown 0.2s ease" }}>
          <Search size={32} color={theme.sub} />
          <input type="text" placeholder="장소를 검색해보세요" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ flex: 1, border: "none", outline: "none", marginLeft: 12, fontSize: 16, fontFamily: FONT_BODY, color: theme.main, background: "transparent" }} />
          <button onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex" }}><X size={32} color={theme.sub} /></button>
        </div>
      )}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#e8e4db" }}>
        <iframe title="Yeongdeungpo Map" width="100%" height="100%" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=126.8700,37.4950,126.9450,37.5450&layer=mapnik" style={{ position: "absolute", inset: 0, filter: "grayscale(80%) sepia(30%) opacity(0.7) contrast(1.1)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 100, background: `linear-gradient(to bottom, ${theme.bg}dd, transparent)`, zIndex: 1, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 150, background: `linear-gradient(to top, ${theme.bg}f2, transparent)`, zIndex: 1, pointerEvents: "none" }} />
        {showLocation && (
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 6, pointerEvents: "none" }}>
            <div style={{ width: 14, height: 14, background: "#ff4b4b", borderRadius: "50%", border: "2px solid #fff", boxShadow: "0 2px 6px rgba(0,0,0,0.3)", position: "relative" }}><div style={{ position: "absolute", inset: -10, borderRadius: "50%", background: "rgba(255, 75, 75, 0.4)", animation: "pulse 1.5s infinite" }} /></div>
          </div>
        )}
        <div style={{ position: "absolute", inset: 0, zIndex: 5 }}>
          {content.spots.map((s) => {
            const isMatched = activeCategoryLabel === null || s.tag === activeCategoryLabel;
            const isSelected = selected?.id === s.id;
            return (
              <button key={s.id} onClick={() => setSelected(isSelected ? null : s)} style={{ position: "absolute", top: s.top, left: s.left, transform: `translate(-50%,-100%) scale(${isMatched ? 1 : 0.85})`, opacity: isMatched ? 1 : 0.3, pointerEvents: isMatched ? "auto" : "none", border: "none", background: "none", cursor: "pointer", zIndex: isSelected ? 10 : (isMatched ? 5 : 4), transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }}>
                <div style={{ width: isSelected ? 40 : 30, height: isSelected ? 40 : 30, borderRadius: "50% 50% 50% 0", transform: "rotate(-45deg)", background: isSelected ? theme.main : theme.soft, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: isSelected ? "0 6px 14px rgba(0,0,0,0.4)" : "0 4px 10px rgba(0,0,0,0.25)", transition: "all 0.3s ease" }}>
                  <MapPin size={isSelected ? 18 : 14} color={theme.white} style={{ transform: "rotate(45deg)", transition: "all 0.3s ease" }} strokeWidth={2.5} />
                </div>
              </button>
            )
          })}
        </div>
        {selected && (
          <div style={{ position: "absolute", left: 18, right: 18, bottom: 85, background: theme.white, borderRadius: 16, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, boxShadow: "0 8px 24px rgba(107,91,82,0.15)", zIndex: 10, animation: "fadeInUp 0.3s ease" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${theme.soft}20`, display: "flex", alignItems: "center", justifyContent: "center" }}><MapPin size={20} color={theme.soft} strokeWidth={2.5} /></div>
            <div style={{ flex: 1 }}>
              <EditText value={selected.name} editMode={editMode} onChange={(v) => { setContent((c) => ({ ...c, spots: c.spots.map((sp) => (sp.id === selected.id ? { ...sp, name: v } : sp)) })); setSelected((sel) => ({ ...sel, name: v })); }} style={{ fontSize: 14, fontWeight: 700, color: theme.main, fontFamily: FONT_BODY, marginBottom: 2 }} />
              <div style={{ fontSize: 11.5, color: theme.sub, fontFamily: FONT_BODY, fontWeight: 500 }}>{selected.tag}</div>
            </div>
            <button style={{ border: "none", background: theme.main, color: theme.white, padding: "8px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700, fontFamily: FONT_BODY, cursor: "pointer" }}>상세보기</button>
          </div>
        )}
        <button onClick={() => setShowLocation(!showLocation)} style={{ position: "absolute", right: 16, bottom: selected ? 185 : 85, width: 44, height: 44, borderRadius: "50%", background: showLocation ? theme.main : theme.white, border: "none", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(107,91,82,0.2)", cursor: "pointer", zIndex: 10, transition: "all 0.3s ease" }}>
          <LocateFixed size={20} color={showLocation ? theme.white : theme.main} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

function SettingsScreen() {
  const { theme, setScreen } = useApp();
  return (
    <div style={{ height: "100%", background: theme.bg, display: "flex", flexDirection: "column", animation: "fadeInUp 0.3s ease" }}>
      <div style={{ background: theme.white, padding: "16px 18px", display: "flex", alignItems: "center", position: "sticky", top: 0, zIndex: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
        <button onClick={() => setScreen("feed")} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex" }}><ChevronLeft size={28} color={theme.main} /></button>
        <span style={{ flex: 1, textAlign: "center", fontSize: 16, fontWeight: 700, color: theme.main, marginRight: 28, fontFamily: FONT_BODY }}>설정</span>
      </div>
      <div className="app-scroll" style={{ flex: 1, padding: "20px 18px" }}>
        {['프로필 편집', '계정 공개 범위', '알림 설정', '개인정보 처리방침', '버전 정보 v1.0.0', '로그아웃'].map((item, i) => (
          <div key={i} onClick={() => { if(item === '로그아웃') alert('로그아웃 되었습니다.'); }} style={{ padding: "18px 4px", borderBottom: `1px solid ${theme.soft}40`, fontSize: 15, color: item === '로그아웃' ? '#e74c3c' : theme.main, fontFamily: FONT_BODY, fontWeight: 500, cursor: "pointer" }}>{item}</div>
        ))}
      </div>
    </div>
  );
}

const TABS = [
  { id: "feed", icon: Home },
  { id: "profile", icon: PawPrint },
  { id: "category", icon: Search },
  { id: "map", icon: MapPin },
];

function BottomNav() {
  const { theme, screen, setScreen } = useApp();
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, background: "rgba(255,255,255,0.96)", backdropFilter: "blur(6px)", borderTop: "1px solid #f0ebe4", padding: "10px 16px 15px", display: "flex", justifyContent: "space-between", zIndex: 10 }}>
      {TABS.map((t) => {
        const Icon = t.icon;
        const isActive = screen === t.id;
        return (
          <button key={t.id} onClick={() => setScreen(t.id)} style={{ background: "none", border: "none", cursor: "pointer", flex: 1, display: "flex", justifyContent: "center" }}>
            <Icon size={28} color={isActive ? theme.main : theme.sub} strokeWidth={isActive ? 2.6 : 1.8} fill={isActive ? theme.main : "none"} fillOpacity={isActive ? 0.12 : 0} />
          </button>
        );
      })}
    </div>
  );
}

const SCREENS = { splash: SplashScreen, feed: FeedScreen, profile: ProfileScreen, category: CategoryScreen, map: MapScreen, settings: SettingsScreen };

function PhoneShell() {
  const { theme, screen } = useApp();
  const Screen = SCREENS[screen];
  
  // URL 주소창 끝에 ?mockup=true 가 붙어있는지 확인하는 장치입니다.
  const isMockup = new URLSearchParams(window.location.search).get("mockup") === "true";

  return (
    <div style={{ position: "relative", width: isMockup ? "100%" : "100vw", height: isMockup ? "100%" : "100dvh", background: theme.bg, overflow: "hidden" }}>
      <div className="app-scroll" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, overflowY: screen === "splash" || screen === "map" ? "hidden" : "auto" }}>
        <Screen />
      </div>
      {screen !== "splash" && screen !== "settings" && <BottomNav />}
    </div>
  );
}

export default function NuzzleApp() {
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [editMode, setEditMode] = useState(false);
  const [screen, setScreen] = useState("splash");

  const resetAll = () => {
    setTheme(DEFAULT_THEME); setContent(DEFAULT_CONTENT); setScreen("splash"); setEditMode(false);
  };

  const isMockup = new URLSearchParams(window.location.search).get("mockup") === "true";

  return (
    <AppCtx.Provider value={{ theme, setTheme, content, setContent, editMode, setEditMode, screen, setScreen, resetAll }}>
      <div style={
        isMockup 
        ? { minHeight: "100vh", background: "#efe6d8", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 12px", fontFamily: FONT_BODY }
        : { width: "100vw", height: "100dvh", margin: 0, padding: 0, fontFamily: FONT_BODY }
      }>
        <style>{`
          @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css');
          @import url('https://fonts.googleapis.com/css2?family=Jua&display=swap');
          * { box-sizing: border-box; }
          body { margin: 0; padding: 0; overflow: hidden; background-color: ${theme.bg}; }
          input[type="color"]::-webkit-color-swatch-wrapper { padding: 0; }
          input[type="color"]::-webkit-color-swatch { border: none; border-radius: 8px; }
          .app-scroll::-webkit-scrollbar { display: none; }
          .app-scroll { scrollbar-width: none; -ms-overflow-style: none; }
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes fadeInDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes pulse { 0% { transform: scale(0.6); opacity: 1; } 100% { transform: scale(1.6); opacity: 0; } }
        `}</style>

        {isMockup ? (
          <div style={{ width: 375, height: 780, background: "#1c1a19", borderRadius: 46, padding: 12, boxShadow: "0 30px 60px rgba(0,0,0,0.25)" }}>
            <div style={{ position: "relative", width: "100%", height: "100%", background: theme.bg, borderRadius: 34, overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 120, height: 26, background: "#1c1a19", borderRadius: "0 0 16px 16px", zIndex: 30 }} />
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 44, background: screen === "splash" ? theme.bg : theme.white, zIndex: 25, borderRadius: "34px 34px 0 0" }}>
                <StatusBar />
              </div>
              <div className="app-scroll" style={{ position: "absolute", top: 44, left: 0, right: 0, bottom: 0, overflowY: screen === "splash" || screen === "map" ? "hidden" : "auto" }}>
                <PhoneShell />
              </div>
            </div>
          </div>
        ) : (
          <PhoneShell />
        )}
      </div>
    </AppCtx.Provider>
  );
}