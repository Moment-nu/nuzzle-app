import React, { useState, createContext, useContext } from "react";
import logoImg from "./assets/tight logo.png";
import {
  Home,
  PawPrint,
  Search,
  MapPin,
  BookOpen,
  Heart,
  MessageCircle,
  Share2,
  Plus,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Wifi,
  BatteryFull,
  MoreHorizontal,
  Camera,
  X,
  LayoutGrid,
  List as ListIcon,
  Pencil,
  RotateCcw,
  Footprints,
  Stethoscope,
  Scissors,
  Cookie,
  Dumbbell,
  ShoppingBag,
  LocateFixed,
} from "lucide-react";

/* ---------------------------------------------
   Fonts & default theme
--------------------------------------------- */
const FONT_HEAD = "'Jua', 'Cafe24 Ssurround', sans-serif";
const FONT_BODY = "'Pretendard', 'Noto Sans KR', sans-serif";

const DEFAULT_THEME = {
  main: "#6b5b52",
  sub: "#b8a79b",
  bg: "#f6f1eb",
  soft: "#d8a58b",
  sage: "#a8b7a1",
  white: "#ffffff",
};

const ICONS = { Footprints, Stethoscope, Scissors, Cookie, Dumbbell, ShoppingBag, PawPrint };

/* ---------------------------------------------
   Default content
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
  ],
  feedPosts: [
    {
      id: 1,
      handle: "@do_ber",
      avatar: "https://i.pinimg.com/736x/4f/89/c9/4f89c91ee8755ceba302bcf8b89e1127.jpg",
      photo: "https://i.pinimg.com/736x/ff/33/c6/ff33c6ee0fc2bf6496e52380a0ed0b98.jpg",
      caption: "오늘도 무사히 낮잠 완료 🐾 베르는 오늘도 세상 편안",
      likes: 128,
      comments: 12,
    },
    {
      id: 2,
      handle: "@haru_and_me",
      avatar: "https://i.pinimg.com/1200x/bf/1d/e3/bf1de3443a7836b64eaef691fe546789.jpg",
      photo: "https://i.pinimg.com/736x/e3/f4/f5/e3f4f58de2f95c227bd56d133a9aea72.jpg",
      caption: "퇴근하고 문 열자마자 달려오는 이 표정 못 참지",
      likes: 241,
      comments: 34,
    },
  ],
  categories: [
    { id: 1, label: "산책", icon: "Footprints" },
    { id: 2, label: "병원", icon: "Stethoscope" },
    { id: 3, label: "미용", icon: "Scissors" },
    { id: 4, label: "간식", icon: "Cookie" },
    { id: 5, label: "훈련", icon: "Dumbbell" },
    { id: 6, label: "용품", icon: "ShoppingBag" },
  ],
  communityPosts: [
    {
      id: 1,
      category: "병원",
      avatar: "https://i.pinimg.com/736x/ac/c0/78/acc078e056812cf937c3f4cf7cabfeaf.jpg",
      nickname: "nuzzle_w",
      photo: "https://i.pinimg.com/1200x/3b/0c/f7/3b0cf77b32f13d0804d98599c0773c57.jpg",
      caption: "고양이 중성화 수술 후 회복 기간 얼마나 걸렸는지 여쭤봐도 될까요?",
      likes: 24,
      comments: 9,
    },
    {
      id: 2,
      category: "산책",
      avatar: "https://i.pinimg.com/736x/79/6e/95/796e95e981e632f1bb672c357b0b6077.jpg",
      nickname: "dubu_nu",
      photo: "https://i.pinimg.com/1200x/ef/76/32/ef76324894d4e20a97717f2d57926417.jpg",
      caption: "장마철 산책 대체 어떻게들 하세요? 실내 활동 추천 부탁드려요",
      likes: 41,
      comments: 17,
    },
    {
      id: 3,
      category: "간식",
      avatar: "https://i.pinimg.com/736x/59/1b/b5/591bb59e86fe5178c2f22126230cfb0c.jpg",
      nickname: "boder_col",
      photo: "https://i.pinimg.com/1200x/0b/47/b5/0b47b5b182dc08b11391a1299e3dc71f.jpg",
      caption: "수제 간식 처음 만들어봤는데 애가 안 먹네요... 레시피 추천 있으신 분?",
      likes: 15,
      comments: 5,
    },
    {
      id: 4,
      category: "미용",
      avatar: "https://i.pinimg.com/736x/28/40/03/2840034b2ea419af4ea183c8eea37e5f.jpg",
      nickname: "grooming_master",
      photo: "https://i.pinimg.com/736x/97/dd/bd/97ddbd79b3fc4e250884917c61d61dd0.jpg",
      caption: "여름맞이 곰돌이컷 완료! 너무 귀엽지 않나요? 🐻",
      likes: 56,
      comments: 12,
    }
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
    { id: 10, name: "더현대 서울", tag: "동반식당", top: "38%", left: "77%" },
    { id: 11, name: "서울마리나 펫스토랑", tag: "펫카페", top: "32%", left: "60%" },
    { id: 12, name: "멍멍당 당산점", tag: "펫카페", top: "30%", left: "35%" },
  ],
  albumMonths: ["Jan.", "Feb.", "Mar.", "Apr.", "May."],
  albumPhotos: [
    "https://i.pinimg.com/736x/c6/f0/6c/c6f06c9127c5fb0818b8fa271bba6299.jpg",
    "https://i.pinimg.com/1200x/d0/e4/dc/d0e4dc68a35ed1e55ea02d3639c01efb.jpg",
    "https://i.pinimg.com/1200x/35/c0/c0/35c0c07e5befff32632101157f40bcc7.jpg",
    "https://i.pinimg.com/1200x/8c/0f/5a/8c0f5a06724a0a6e3eef9a9c93918116.jpg",
    "https://i.pinimg.com/1200x/2f/db/93/2fdb93c046bcfdf4e2c156cb7f6335cc.jpg",
    "https://i.pinimg.com/736x/72/50/e2/7250e2fbded6241d9a21883c9b1a8e57.jpg",
    "https://i.pinimg.com/1200x/43/2b/99/432b994b640c12376498b74e0776b976.jpg",
    "https://i.pinimg.com/736x/3b/32/40/3b3240e6d21c815ae3c74a873d2569d4.jpg",
    "https://i.pinimg.com/1200x/18/d8/8b/18d88ba6b3e6b34f3a0a667a1e3b5ff0.jpg",
    "https://i.pinimg.com/1200x/32/cc/3d/32cc3d06e1a63e7c5f130bfec6aefcbf.jpg",
    "https://i.pinimg.com/736x/07/0a/4c/070a4c68083579a0f43d427e778d586d.jpg",
    "https://i.pinimg.com/736x/06/ab/23/06ab23428f95079af047112ce5f772fb.jpg",
    "https://i.pinimg.com/1200x/58/30/83/583083d769d1d562e4aa13dd3485bf4c.jpg",
    "https://i.pinimg.com/1200x/8b/03/02/8b0302799df5d6df418cd79e60fe9da7.jpg",
    "https://i.pinimg.com/1200x/3c/7a/37/3c7a37ba937842bb187d0512170c2a45.jpg",
    "https://i.pinimg.com/736x/a6/c1/ee/a6c1ee56238b5b592f7cebacb6fa3164.jpg",
    "https://i.pinimg.com/736x/8e/4d/2c/8e4d2c81d78e77a06cc71fdfcc636440.jpg",
    "https://i.pinimg.com/736x/68/6c/24/686c24487159c9626e1ad92ffa231c25.jpg",
  ],
  timelinePhotos: [
    { month: "May.", img: "https://picsum.photos/seed/nuzzle-tl-5/600/260" },
    { month: "Apr.", img: "https://picsum.photos/seed/nuzzle-tl-4/600/260" },
    { month: "Mar.", img: "https://picsum.photos/seed/nuzzle-tl-3/600/260" },
    { month: "Feb.", img: "https://picsum.photos/seed/nuzzle-tl-2/600/260" },
    { month: "Jan.", img: "https://picsum.photos/seed/nuzzle-tl-1/600/260" },
  ],
};

/* ---------------------------------------------
   Context
--------------------------------------------- */
const AppCtx = createContext(null);
const useApp = () => useContext(AppCtx);

/* ---------------------------------------------
   Editable primitives
--------------------------------------------- */
function EditText({ value, onChange, style, editMode, placeholder }) {
  return (
    <span
      contentEditable={editMode}
      suppressContentEditableWarning
      onBlur={(e) => onChange(e.currentTarget.textContent || placeholder || "")}
      style={{
        ...style,
        outline: editMode ? "1.5px dashed #d8a58b" : "none",
        outlineOffset: 3,
        borderRadius: 4,
        cursor: editMode ? "text" : "inherit",
        display: "inline-block",
        minWidth: editMode ? 10 : undefined,
      }}
    >
      {value}
    </span>
  );
}

function EditImage({ src, onChange, style, alt, editMode, imgStyle }) {
  return (
    <div style={{ position: "relative", overflow: "hidden", ...style }}>
      <img
        src={src}
        alt={alt || ""}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", ...imgStyle }}
      />
      {editMode && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            const url = window.prompt("새 이미지 URL을 입력하세요", src);
            if (url) onChange(url);
          }}
          style={{
            position: "absolute",
            bottom: 6,
            right: 6,
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: "rgba(0,0,0,0.55)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Camera size={13} color="#fff" />
        </button>
      )}
    </div>
  );
}

/* ---------------------------------------------
   Shared bits
--------------------------------------------- */
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
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <Wifi size={13} strokeWidth={2.5} />
        <BatteryFull size={15} strokeWidth={2} />
      </div>
    </div>
  );
}

/* ---------------------------------------------
   Splash screen
--------------------------------------------- */
function SplashScreen() {
  const { theme, content, setContent, setScreen } = useApp();
  const { editMode } = useApp();
  return (
    <div
      onClick={() => !editMode && setScreen("feed")}
      style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, cursor: editMode ? "default" : "pointer" }}
    >
      <Logo size={35} center />
      <EditText value={content.tagline} editMode={editMode} onChange={(v) => setContent((c) => ({ ...c, tagline: v }))} style={{ fontFamily: FONT_BODY, fontSize: 13, color: theme.sub, marginTop: 2 }} />
      <div style={{ position: "absolute", bottom: 70, fontSize: 12, color: theme.sub, fontFamily: FONT_BODY }}>{editMode ? "" : "탭하여 시작하기"}</div>
    </div>
  );
}

/* ---------------------------------------------
   Feed (홈 화면) - 게시글 및 스토리 작성 상호작용 추가
--------------------------------------------- */
function FeedScreen() {
  const { theme, content, setContent, editMode } = useApp();
  
  // 화면 상태: 'feed' (기본) | 'post' (게시글 작성) | 'story' (스토리 작성)
  const [viewState, setViewState] = useState('feed');

  // 새 게시물 상태
  const [newPostPhoto, setNewPostPhoto] = useState("https://i.pinimg.com/1200x/2f/db/93/2fdb93c046bcfdf4e2c156cb7f6335cc.jpg");
  const [newCaption, setNewCaption] = useState("");

  // 새 스토리 상태
  const [newStoryPhoto, setNewStoryPhoto] = useState("https://i.pinimg.com/736x/8e/4d/2c/8e4d2c81d78e77a06cc71fdfcc636440.jpg");

  const updatePost = (id, patch) => setContent((c) => ({ ...c, feedPosts: c.feedPosts.map((p) => (p.id === id ? { ...p, ...patch } : p)) }));

  // 게시물 업로드
  const handlePostSubmit = () => {
    if (!newCaption.trim()) {
      alert("내용을 입력해 주세요!");
      return;
    }
    const newPost = {
      id: Date.now(),
      handle: "@" + (content.petName === "두부" ? "dubu_diary" : "my_pet"), // 임의의 핸들 생성
      avatar: content.petAvatar,
      photo: newPostPhoto,
      caption: newCaption,
      likes: 0,
      comments: 0,
    };
    setContent((c) => ({ ...c, feedPosts: [newPost, ...c.feedPosts] }));
    setNewCaption("");
    setViewState('feed');
  };

  // 스토리 업로드
  const handleStorySubmit = () => {
    const newStory = {
      id: Date.now(),
      img: newStoryPhoto,
    };
    // 새 스토리를 맨 앞에 추가
    setContent((c) => ({ ...c, stories: [newStory, ...c.stories] }));
    setViewState('feed');
  };

  const handlePhotoClick = (setter, current) => {
    const url = window.prompt("업로드할 사진의 URL을 붙여넣으세요:", current);
    if (url) setter(url);
  };

  /* ==========================================
     1. 게시글 작성 화면 (Post View)
  ========================================== */
  if (viewState === 'post') {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%", background: theme.white, animation: "fadeInUp 0.3s ease" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 18px", borderBottom: `1px solid ${theme.bg}`, position: "sticky", top: 0, background: theme.white, zIndex: 10 }}>
          <button onClick={() => setViewState('feed')} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex" }}><X size={24} color={theme.main} /></button>
          <span style={{ fontSize: 15, fontWeight: 700, color: theme.main, fontFamily: FONT_BODY }}>새 게시물</span>
          <button onClick={handlePostSubmit} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontSize: 15, fontWeight: 700, color: theme.soft, fontFamily: FONT_BODY }}>공유</button>
        </div>
        <div className="app-scroll" style={{ flex: 1, overflowY: "auto", paddingBottom: 100 }}>
          <div onClick={() => handlePhotoClick(setNewPostPhoto, newPostPhoto)} style={{ width: "100%", aspectRatio: "1 / 1.1", background: theme.bg, position: "relative", cursor: "pointer", overflow: "hidden" }}>
            <img src={newPostPhoto} alt="업로드 이미지" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", bottom: 12, right: 12, width: 32, height: 32, borderRadius: "50%", background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}><Camera size={16} color="#fff" /></div>
          </div>
          <div style={{ padding: "16px 18px" }}>
            <textarea value={newCaption} onChange={(e) => setNewCaption(e.target.value)} placeholder="반려동물과의 일상을 공유해보세요..." style={{ width: "100%", minHeight: 120, border: "none", outline: "none", resize: "none", fontSize: 14, fontFamily: FONT_BODY, color: theme.main, background: "transparent", lineHeight: 1.6 }} />
          </div>
        </div>
      </div>
    );
  }

  /* ==========================================
     2. 스토리 작성 화면 (Story View)
  ========================================== */
  if (viewState === 'story') {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%", background: theme.white, animation: "fadeInUp 0.3s ease" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 18px", borderBottom: `1px solid ${theme.bg}`, position: "sticky", top: 0, background: theme.white, zIndex: 10 }}>
          <button onClick={() => setViewState('feed')} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex" }}><X size={24} color={theme.main} /></button>
          <span style={{ fontSize: 15, fontWeight: 700, color: theme.main, fontFamily: FONT_BODY }}>새 스토리</span>
          <button onClick={handleStorySubmit} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontSize: 15, fontWeight: 700, color: theme.soft, fontFamily: FONT_BODY }}>추가</button>
        </div>
        <div className="app-scroll" style={{ flex: 1, display: "flex", flexDirection: "column", paddingBottom: 100 }}>
          <div style={{ padding: "20px 18px", fontSize: 13, color: theme.sub, fontFamily: FONT_BODY, textAlign: "center" }}>24시간 동안 표시될 스토리를 추가하세요.</div>
          <div onClick={() => handlePhotoClick(setNewStoryPhoto, newStoryPhoto)} style={{ margin: "0 18px", flex: 1, borderRadius: 20, background: theme.bg, position: "relative", cursor: "pointer", overflow: "hidden", minHeight: 400 }}>
            <img src={newStoryPhoto} alt="스토리 이미지" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", bottom: 16, right: 16, width: 40, height: 40, borderRadius: "50%", background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}><Camera size={20} color="#fff" /></div>
          </div>
        </div>
      </div>
    );
  }

  /* ==========================================
     3. 기본 피드 화면 (Feed View)
  ========================================== */
  return (
    <div style={{ paddingBottom: 92 }}>
      
      {/* 상단 헤더 (좌측 + 아이콘 누르면 게시글 작성으로 이동) */}
      <div style={{ background: theme.white, display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", padding: "10px 15px 4px" }}>
        <button onClick={() => setViewState('post')} style={{ justifySelf: "start", border: "none", background: "none", cursor: "pointer", padding: 3, transition: "transform 0.1s" }}>
          <Plus size={30} color={theme.main} />
        </button>
        <Logo size={18} center />
        <button style={{ justifySelf: "end", border: "none", background: "none", cursor: "pointer", padding: 7 }}><Settings size={28} color={theme.main} /></button>
      </div>

      {/* 스토리 영역 (첫 번째 + 썸네일 누르면 스토리 작성으로 이동) */}
      <div className="app-scroll" style={{ 
        position: "sticky", top: -1, zIndex: 20, 
        background: theme.white, padding: "10px 18px 16px", 
        borderRadius: 0,
        boxShadow: "0 4px 16px rgba(107,91,82,0.04)",
        display: "flex", gap: 14, overflowX: "auto" 
      }}>
        <button 
          onClick={() => setViewState('story')}
          style={{ width: 50, height: 50, borderRadius: "50%", flexShrink: 0, border: `1.5px dashed ${theme.sub}`, background: theme.white, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
        >
          <Plus size={18} color={theme.sub} />
        </button>
        {content.stories.map((s) => (
          <EditImage key={s.id} src={s.img} editMode={editMode} onChange={(url) => setContent((c) => ({ ...c, stories: c.stories.map((st) => (st.id === s.id ? { ...st, img: url } : st)) }))} style={{ width: 50, height: 50, borderRadius: "50%", flexShrink: 0 }} />
        ))}
      </div>

      {/* 피드 게시글 영역 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: "16px 0" }}>
        {content.feedPosts.map((p) => (
          <div key={p.id} style={{ background: theme.white, borderRadius: 0, overflow: "hidden", boxShadow: "0 4px 12px rgba(107,91,82,0.03)", animation: "fadeInUp 0.3s ease" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "16px 18px 12px" }}>
              <EditImage src={p.avatar} editMode={editMode} onChange={(url) => updatePost(p.id, { avatar: url })} style={{ width: 34, height: 34, borderRadius: "50%" }} />
              <EditText value={p.handle} editMode={editMode} onChange={(v) => updatePost(p.id, { handle: v })} style={{ fontSize: 13.5, fontWeight: 700, color: theme.main, fontFamily: FONT_BODY }} />
              <MoreHorizontal size={17} color={theme.sub} style={{ marginLeft: "auto" }} />
            </div>
            
            <EditImage src={p.photo} editMode={editMode} onChange={(url) => updatePost(p.id, { photo: url })} style={{ width: "100%", aspectRatio: "1 / 1.1" }} />
            
            <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 18px 6px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><PawPrint size={19} color={theme.soft} strokeWidth={2} /><span style={{ fontSize: 12.5, color: theme.main, fontFamily: FONT_BODY, fontWeight: 500 }}>{p.likes}</span></span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><MessageCircle size={19} color={theme.sub} strokeWidth={2} /><span style={{ fontSize: 12.5, color: theme.main, fontFamily: FONT_BODY, fontWeight: 500 }}>{p.comments}</span></span>
              <Share2 size={18} color={theme.sub} strokeWidth={2} />
            </div>
            
            <div style={{ padding: "6px 18px 18px" }}>
              <EditText value={p.caption} editMode={editMode} onChange={(v) => updatePost(p.id, { caption: v })} style={{ fontSize: 13, color: theme.main, fontFamily: FONT_BODY, lineHeight: 1.6 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------
   Profile / pet album (paw tab) - 전체 블록 스크롤 고정
--------------------------------------------- */
function ProfileScreen() {
  const { theme, content, setContent, editMode } = useApp();
  const [view, setView] = useState("grid");
  const [monthIdx, setMonthIdx] = useState(0);

  return (
    <div style={{ paddingBottom: 92 }}>
      
      {/* 통일된 상단 헤더 & 프로필 영역 전체를 Sticky로 묶어 고정! */}
      <div style={{ 
        position: "sticky", top: -1, zIndex: 20, 
        background: theme.white, paddingBottom: 20, 
        borderRadius: "0 0 24px 24px", boxShadow: "0 4px 16px rgba(107,91,82,0.04)" 
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 18px 12px" }}>
          <button onClick={() => setView(view === "grid" ? "timeline" : "grid")} style={{ border: "none", background: "none", cursor: "pointer", padding: 0, display: "flex" }}>
            {view === "grid" ? <ListIcon size={25} color={theme.main} /> : <LayoutGrid size={20} color={theme.main} />}
          </button>
          <Settings size={25} color={theme.main} />
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4 }}>
          <EditImage src={content.petAvatar} editMode={editMode} onChange={(url) => setContent((c) => ({ ...c, petAvatar: url }))} style={{ width: 110, height: 110, borderRadius: "50%", border: `3px solid ${theme.white}`, boxShadow: "0 4px 16px rgba(107,91,82,0.15)" }} />
          <EditText value={content.petName} editMode={editMode} onChange={(v) => setContent((c) => ({ ...c, petName: v }))} style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: 15, color: theme.main, marginTop: 12 }} />
        </div>
        
        {view === "grid" && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 16 }}>
            <button onClick={() => setMonthIdx((i) => Math.max(0, i - 1))} style={{ border: "none", background: "none", cursor: "pointer" }}><ChevronLeft size={16} color={theme.sub} /></button>
            <span style={{ fontSize: 13, fontWeight: 700, color: theme.main, fontFamily: FONT_BODY, width: 40, textAlign: "center" }}>{content.albumMonths[monthIdx]?.replace(".", "")}</span>
            <button onClick={() => setMonthIdx((i) => Math.min(content.albumMonths.length - 1, i + 1))} style={{ border: "none", background: "none", cursor: "pointer" }}><ChevronRight size={16} color={theme.sub} /></button>
          </div>
        )}
      </div>

      <div style={{ padding: view === "timeline" ? "16px 14px" : "12px 3px" }}>
        {view === "grid" ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 3 }}>
            {content.albumPhotos.map((src, i) => (
              <EditImage key={i + monthIdx} src={src} editMode={editMode} onChange={(url) => setContent((c) => ({ ...c, albumPhotos: c.albumPhotos.map((p, pi) => (pi === i ? url : p)) }))} style={{ width: "100%", aspectRatio: "1 / 1", borderRadius: 4 }} />
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {content.timelinePhotos.map((t, i) => (
              <div key={i} style={{ background: theme.white, borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 12px rgba(107,91,82,0.03)", position: "relative" }}>
                <EditImage src={t.img} editMode={editMode} onChange={(url) => setContent((c) => ({ ...c, timelinePhotos: c.timelinePhotos.map((tp, ti) => (ti === i ? { ...tp, img: url } : tp)) }))} style={{ width: "100%", height: 160 }} />
                <span style={{ position: "absolute", top: 12, left: 12, background: theme.sage, color: theme.white, fontSize: 11.5, fontWeight: 700, fontFamily: FONT_BODY, padding: "4px 10px", borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>{t.month}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------
   Category / community search - 게시글 작성 화면 및 상호작용 추가
--------------------------------------------- */
function CategoryScreen() {
  const { theme, content, setContent, editMode } = useApp();
  const [activeCat, setActiveCat] = useState('all');
  
  // 화면 전환 상태 (false: 피드 뷰, true: 게시글 작성 뷰)
  const [isWriting, setIsWriting] = useState(false);

  // 새 게시물 작성용 임시 State
  const [newPhoto, setNewPhoto] = useState("https://i.pinimg.com/1200x/2f/db/93/2fdb93c046bcfdf4e2c156cb7f6335cc.jpg"); // 기본 플레이스홀더 이미지
  const [newCatLabel, setNewCatLabel] = useState(content.categories[0]?.label || "산책");
  const [newCaption, setNewCaption] = useState("");

  const updateCat = (id, label) => setContent((c) => ({ ...c, categories: c.categories.map((cat) => (cat.id === id ? { ...cat, label } : cat)) }));
  const removeCat = (id) => setContent((c) => ({ ...c, categories: c.categories.filter((cat) => cat.id !== id) }));
  const addCat = () => setContent((c) => ({ ...c, categories: [...c.categories, { id: Date.now(), label: "새 태그", icon: "PawPrint" }] }));
  const updatePost = (id, patch) => setContent((c) => ({ ...c, communityPosts: c.communityPosts.map((p) => (p.id === id ? { ...p, ...patch } : p)) }));

  const displayCategories = [{ id: 'all', label: 'ALL', icon: 'LayoutGrid' }, ...content.categories];
  const filteredPosts = content.communityPosts.filter((p) => {
    if (activeCat === 'all') return true;
    const targetCategory = content.categories.find(c => c.id === activeCat);
    return targetCategory && p.category === targetCategory.label;
  });

  // 게시물 업로드 핸들러
  const handlePostSubmit = () => {
    if (!newCaption.trim()) {
      alert("내용을 입력해 주세요!");
      return;
    }
    const newPost = {
      id: Date.now(),
      category: newCatLabel,
      avatar: content.petAvatar, // 내 프로필 사진
      nickname: content.petName, // 내 이름
      photo: newPhoto,
      caption: newCaption,
      likes: 0,
      comments: 0,
    };
    
    // 피드 배열 맨 앞에 새 게시물 추가
    setContent((c) => ({ ...c, communityPosts: [newPost, ...c.communityPosts] }));
    
    // 작성 상태 초기화 및 피드로 복귀
    setNewCaption("");
    setIsWriting(false);
    setActiveCat('all'); // 작성 완료 시 ALL 탭으로 이동해서 내 글 확인
  };

  // 사진 변경 핸들러 (프로토타입용 URL 프롬프트)
  const handlePhotoClick = () => {
    const url = window.prompt("업로드할 사진의 URL을 붙여넣으세요:", newPhoto);
    if (url) setNewPhoto(url);
  };

  /* ==========================================
     1. 게시글 작성 화면 (Write View)
  ========================================== */
  if (isWriting) {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%", background: theme.white, animation: "fadeInUp 0.3s ease" }}>
        
        {/* 작성 화면 상단 헤더 */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 18px", borderBottom: `1px solid ${theme.bg}`, position: "sticky", top: 0, background: theme.white, zIndex: 10 }}>
          <button onClick={() => setIsWriting(false)} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex" }}>
            <X size={24} color={theme.main} />
          </button>
          <span style={{ fontSize: 15, fontWeight: 700, color: theme.main, fontFamily: FONT_BODY }}>새 게시물</span>
          <button onClick={handlePostSubmit} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontSize: 15, fontWeight: 700, color: theme.soft, fontFamily: FONT_BODY }}>
            공유
          </button>
        </div>

        <div className="app-scroll" style={{ flex: 1, overflowY: "auto", paddingBottom: 100 }}>
          {/* 사진 업로드 영역 */}
          <div 
            onClick={handlePhotoClick}
            style={{ width: "100%", aspectRatio: "1 / 1", background: theme.bg, position: "relative", cursor: "pointer", overflow: "hidden" }}
          >
            <img src={newPhoto} alt="업로드 이미지" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.2s ease" }} onMouseEnter={(e) => e.currentTarget.style.opacity = 1} onMouseLeave={(e) => e.currentTarget.style.opacity = 0}>
              <Camera size={32} color="#fff" />
            </div>
            {/* 우측 하단 사진 변경 아이콘 가이드 */}
            <div style={{ position: "absolute", bottom: 12, right: 12, width: 32, height: 32, borderRadius: "50%", background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Camera size={16} color="#fff" />
            </div>
          </div>

          {/* 카테고리 선택 영역 */}
          <div style={{ padding: "20px 18px 12px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: theme.sub, marginBottom: 12, fontFamily: FONT_BODY }}>카테고리 선택</div>
            <div className="app-scroll" style={{ display: "flex", gap: 8, overflowX: "auto" }}>
              {content.categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setNewCatLabel(cat.label)}
                  style={{
                    flexShrink: 0, padding: "8px 16px", borderRadius: 999, border: "none", cursor: "pointer",
                    fontSize: 13, fontWeight: 600, fontFamily: FONT_BODY, transition: "all 0.2s ease",
                    background: newCatLabel === cat.label ? theme.main : theme.bg,
                    color: newCatLabel === cat.label ? theme.white : theme.main,
                    boxShadow: newCatLabel === cat.label ? "0 4px 10px rgba(107,91,82,0.2)" : "none"
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* 내용 입력 영역 */}
          <div style={{ padding: "12px 18px" }}>
            <textarea
              value={newCaption}
              onChange={(e) => setNewCaption(e.target.value)}
              placeholder="반려동물과의 일상을 공유해보세요..."
              style={{
                width: "100%", minHeight: 120, border: "none", outline: "none", resize: "none",
                fontSize: 14, fontFamily: FONT_BODY, color: theme.main, background: "transparent", lineHeight: 1.6
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  /* ==========================================
     2. 기본 커뮤니티 피드 화면 (Feed View)
  ========================================== */
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
      
      {/* 상단 검색바 */}
      <div style={{ background: theme.white, padding: "16px 18px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Logo size={12} />
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, background: theme.bg, borderRadius: 999, padding: "9px 16px", border: "none" }}>
            <Search size={15} color={theme.sage} />
            <span style={{ fontSize: 13, color: theme.sub, fontFamily: FONT_BODY }}>검색</span>
          </div>
        </div>
      </div>

      {/* 카테고리 탭 (Sticky) */}
      <div className="app-scroll" style={{ position: "sticky", top: -1, zIndex: 20, background: theme.white, padding: "4px 18px 16px", borderRadius: "0 0 24px 24px", boxShadow: "0 4px 16px rgba(107,91,82,0.06)", display: "flex", gap: 10, overflowX: "auto", scrollBehavior: "smooth" }}>
        {displayCategories.map((cat) => {
          const Icon = cat.id === 'all' ? LayoutGrid : (ICONS[cat.icon] || PawPrint);
          const isActive = activeCat === cat.id;
          return (
            <div key={cat.id} style={{ position: "relative", flexShrink: 0, textAlign: "center" }}>
              <button onClick={() => setActiveCat(cat.id)} style={{ width: 48, height: 48, borderRadius: "50%", border: "none", cursor: "pointer", background: isActive ? theme.main : theme.bg, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease", boxShadow: isActive ? "0 4px 10px rgba(107,91,82,0.2)" : "none" }}>
                <Icon size={20} color={isActive ? theme.white : theme.sub} strokeWidth={2} />
              </button>
              {editMode && cat.id !== 'all' && (
                <button onClick={() => removeCat(cat.id)} style={{ position: "absolute", top: -4, right: -4, width: 16, height: 16, borderRadius: "50%", background: theme.main, border: `1.5px solid ${theme.white}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><X size={9} color="#fff" /></button>
              )}
              <div style={{ marginTop: 6 }}>
                {cat.id === 'all' ? (
                  <span style={{ display: "block", fontSize: 10.5, color: isActive ? theme.main : theme.sub, fontWeight: isActive ? 700 : 500, fontFamily: FONT_BODY }}>{cat.label}</span>
                ) : (
                  <EditText value={cat.label} editMode={editMode} onChange={(v) => updateCat(cat.id, v)} style={{ display: "block", fontSize: 10.5, color: isActive ? theme.main : theme.sub, fontWeight: isActive ? 700 : 500, fontFamily: FONT_BODY }} />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: "16px 14px" }}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((p) => {
            const postCatData = content.categories.find(c => c.label === p.category);
            const BadgeIcon = postCatData ? (ICONS[postCatData.icon] || PawPrint) : PawPrint;

            return (
              <div key={p.id} style={{ background: theme.white, borderRadius: 20, paddingBottom: 16, boxShadow: "0 4px 12px rgba(107,91,82,0.03)", animation: "fadeInUp 0.3s ease", overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 18px 12px" }}>
                  <EditImage src={p.avatar} editMode={editMode} onChange={(url) => updatePost(p.id, { avatar: url })} style={{ width: 34, height: 34, borderRadius: "50%" }} />
                  <EditText value={p.nickname} editMode={editMode} onChange={(v) => updatePost(p.id, { nickname: v })} style={{ fontSize: 13.5, fontWeight: 700, color: theme.main, fontFamily: FONT_BODY }} />
                  <div style={{ width: 28, height: 28, background: theme.soft, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "auto", boxShadow: "0 2px 8px rgba(107,91,82,0.15)" }}>
                    <BadgeIcon size={14} color={theme.white} strokeWidth={2.5} />
                  </div>
                </div>
                <div style={{ position: "relative" }}>
                  <EditImage src={p.photo} editMode={editMode} onChange={(url) => updatePost(p.id, { photo: url })} style={{ width: "100%", height: 180 }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(107,91,82,0.85)", padding: "10px 0", display: "flex", justifyContent: "center", gap: 24 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 5, color: "#fff", fontSize: 12.5, fontFamily: FONT_BODY, fontWeight: 500 }}><Heart size={15} /> {p.likes}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 5, color: "#fff", fontSize: 12.5, fontFamily: FONT_BODY, fontWeight: 500 }}><MessageCircle size={15} /> {p.comments}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 5, color: "#fff", fontSize: 12.5, fontFamily: FONT_BODY, fontWeight: 500 }}><Share2 size={15} /></span>
                  </div>
                </div>
                <div style={{ padding: "14px 18px 0" }}>
                  <EditText value={p.caption} editMode={editMode} onChange={(v) => updatePost(p.id, { caption: v })} style={{ fontSize: 13, color: theme.main, fontFamily: FONT_BODY, lineHeight: 1.6 }} />
                </div>
              </div>
            )
          })
        ) : (
          <div style={{ padding: "60px 0", textAlign: "center", color: theme.sub, fontSize: 13, fontFamily: FONT_BODY, animation: "fadeInUp 0.3s ease" }}>해당 카테고리의 게시물이 아직 없습니다. 🐶</div>
        )}
      </div>

      <div style={{ flex: 1 }}></div>

      {/* 우측 하단 플로팅 버튼 (클릭 시 작성 화면으로 전환) */}
      <div style={{ position: "sticky", bottom: 85, alignSelf: "flex-end", marginRight: 18, zIndex: 50 }}>
        <button 
          onClick={() => setIsWriting(true)}
          style={{ width: 56, height: 56, borderRadius: "50%", background: theme.main, border: "none", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 16px rgba(107,91,82,0.3)", cursor: "pointer", transition: "transform 0.2s ease" }}
        >
          <Pencil size={24} color={theme.white} style={{ transform: "translate(1px, -1px)" }} />
        </button>
      </div>

      <div style={{ height: 92, flexShrink: 0 }}></div>
    </div>
  );
}

/* ---------------------------------------------
   Map / spot (pin tab) - 상단 헤더 직각(borderRadius: 0) 적용
--------------------------------------------- */
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
      
      {/* 상단 하얀색 박스의 borderRadius를 0으로 설정하여 직각 마감 */}
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
            <div style={{ width: 14, height: 14, background: "#ff4b4b", borderRadius: "50%", border: "2px solid #fff", boxShadow: "0 2px 6px rgba(0,0,0,0.3)", position: "relative" }}>
              <div style={{ position: "absolute", inset: -10, borderRadius: "50%", background: "rgba(255, 75, 75, 0.4)", animation: "pulse 1.5s infinite" }} />
            </div>
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

/* ---------------------------------------------
   AI Album (book tab)
--------------------------------------------- */
function AlbumScreen() {
  const { theme, content, setContent, editMode } = useApp();
  const [activeMonth, setActiveMonth] = useState(0);
  const [building, setBuilding] = useState(false);

  return (
    <div style={{ paddingBottom: 92 }}>
      <div style={{ background: theme.white, paddingBottom: 16, borderRadius: "0 0 24px 24px", boxShadow: "0 4px 16px rgba(107,91,82,0.04)", position: "relative", zIndex: 10 }}>
        <div style={{ padding: "12px 0 16px" }}><Logo size={19} center /></div>
        <div className="app-scroll" style={{ display: "flex", gap: 8, padding: "0 18px", overflowX: "auto" }}>
          {content.albumMonths.map((m, i) => (
            <button key={i} onClick={() => setActiveMonth(i)} style={{ flexShrink: 0, border: "none", cursor: "pointer", borderRadius: 999, padding: "7px 14px", fontSize: 12.5, fontFamily: FONT_BODY, fontWeight: 700, background: activeMonth === i ? theme.main : theme.bg, color: activeMonth === i ? theme.white : theme.main }}>
              <EditText value={m} editMode={editMode} onChange={(v) => setContent((c) => ({ ...c, albumMonths: c.albumMonths.map((mm, mi) => (mi === i ? v : mm)) }))} style={{}} />
            </button>
          ))}
        </div>
      </div>
      <div style={{ position: "relative", padding: "12px 3px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 3 }}>
          {content.albumPhotos.map((src, i) => (
            <EditImage key={i} src={src} editMode={editMode} onChange={(url) => setContent((c) => ({ ...c, albumPhotos: c.albumPhotos.map((p, pi) => (pi === i ? url : p)) }))} style={{ width: "100%", aspectRatio: "1 / 1", borderRadius: 4 }} />
          ))}
        </div>
        <div style={{ position: "absolute", left: "10%", right: "10%", top: "42%", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <ChevronDown size={16} color={theme.white} style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))" }} />
          <button onClick={() => { setBuilding(true); setTimeout(() => setBuilding(false), 1600); }} style={{ border: "none", cursor: "pointer", borderRadius: 999, padding: "10px 22px", background: "rgba(168,183,161,0.95)", color: theme.white, fontFamily: FONT_BODY, fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", gap: 6, boxShadow: "0 4px 14px rgba(0,0,0,0.15)" }}>
            <Sparkles size={14} /> {building ? "만드는 중..." : "AI 앨범 제작하기"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------
   Bottom nav + app shell (투명도 해결 완벽 구조)
--------------------------------------------- */
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

const SCREENS = { splash: SplashScreen, feed: FeedScreen, profile: ProfileScreen, category: CategoryScreen, map: MapScreen };

function PhoneShell() {
  const { theme, screen } = useApp();
  const Screen = SCREENS[screen];
  return (
    <div style={{ width: 375, height: 780, background: "#1c1a19", borderRadius: 46, padding: 12, boxShadow: "0 30px 60px rgba(0,0,0,0.25)" }}>
      <div style={{ position: "relative", width: "100%", height: "100%", background: theme.bg, borderRadius: 34, overflow: "hidden" }}>
        
        {/* 카메라 노치 */}
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 120, height: 26, background: "#1c1a19", borderRadius: "0 0 16px 16px", zIndex: 30 }} />
        
        {/* 상태 표시줄: 뒷배경을 하얗게 채워서 스크롤이 통과해 비치는 현상 완벽 차단! */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 44, background: screen === "splash" ? theme.bg : theme.white, zIndex: 25, borderRadius: "34px 34px 0 0" }}>
          <StatusBar />
        </div>

        {/* 스크롤 영역: StatusBar 공간을 피해서 아래부터 시작하도록 분리 */}
        <div className="app-scroll" style={{ position: "absolute", top: 44, left: 0, right: 0, bottom: 0, overflowY: screen === "splash" || screen === "map" ? "hidden" : "auto" }}>
          <Screen />
        </div>
        
        {screen !== "splash" && <BottomNav />}
      </div>
    </div>
  );
}

/* ---------------------------------------------
   Control panel (outside phone)
--------------------------------------------- */
function ControlPanel() {
  const { theme, setTheme, editMode, setEditMode, screen, setScreen, resetAll } = useApp();
  const swatches = [["main", "메인"], ["soft", "포인트"], ["sage", "서브포인트"], ["sub", "보조"], ["bg", "배경"]];

  return (
    <div style={{ width: 375, display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setScreen(t.id)} style={{ border: "none", borderRadius: 999, padding: "6px 13px", fontSize: 11.5, fontFamily: FONT_BODY, fontWeight: 700, cursor: "pointer", background: screen === t.id ? theme.main : "#e7ddcf", color: screen === t.id ? theme.white : theme.main }}>{t.id}</button>
        ))}
        <button onClick={() => setScreen("splash")} style={{ border: "none", borderRadius: 999, padding: "6px 13px", fontSize: 11.5, fontFamily: FONT_BODY, fontWeight: 700, cursor: "pointer", background: "#e7ddcf", color: theme.main }}>splash</button>
      </div>
      <div style={{ background: "#fff", borderRadius: 16, padding: 14, display: "flex", flexDirection: "column", gap: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
        <button onClick={() => setEditMode((e) => !e)} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, border: "none", borderRadius: 12, padding: "10px 0", cursor: "pointer", fontFamily: FONT_BODY, fontWeight: 700, fontSize: 13, background: editMode ? theme.soft : "#f1ece2", color: editMode ? "#fff" : theme.main }}>
          <Pencil size={14} /> {editMode ? "편집 모드 켜짐 — 텍스트/사진을 탭해보세요" : "편집 모드 켜기"}
        </button>
        <div>
          <p style={{ fontSize: 11.5, color: theme.sub, fontFamily: FONT_BODY, margin: "0 0 8px" }}>브랜드 컬러</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {swatches.map(([key, label]) => (
              <label key={key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer" }}>
                <input type="color" value={theme[key]} onChange={(e) => setTheme((t) => ({ ...t, [key]: e.target.value }))} style={{ width: 30, height: 30, border: "none", borderRadius: 8, padding: 0, background: "none", cursor: "pointer" }} />
                <span style={{ fontSize: 9.5, color: theme.main, fontFamily: FONT_BODY }}>{label}</span>
              </label>
            ))}
          </div>
        </div>
        <button onClick={resetAll} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, border: "none", background: "none", color: theme.sub, fontFamily: FONT_BODY, fontSize: 11.5, cursor: "pointer", marginTop: 2 }}>
          <RotateCcw size={12} /> 전체 초기화
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------
   Root
--------------------------------------------- */
export default function NuzzleApp() {
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [editMode, setEditMode] = useState(false);
  const [screen, setScreen] = useState("splash");

  const resetAll = () => {
    setTheme(DEFAULT_THEME);
    setContent(DEFAULT_CONTENT);
    setScreen("splash");
    setEditMode(false);
  };

  return (
    <AppCtx.Provider value={{ theme, setTheme, content, setContent, editMode, setEditMode, screen, setScreen, resetAll }}>
      <div style={{ minHeight: "100vh", background: "#efe6d8", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, padding: "32px 12px", fontFamily: FONT_BODY }}>
        <style>{`
          @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css');
          @import url('https://fonts.googleapis.com/css2?family=Jua&display=swap');
          * { box-sizing: border-box; }
          input[type="color"]::-webkit-color-swatch-wrapper { padding: 0; }
          input[type="color"]::-webkit-color-swatch { border: none; border-radius: 8px; }
          .app-scroll::-webkit-scrollbar { display: none; }
          .app-scroll { scrollbar-width: none; -ms-overflow-style: none; }
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes fadeInDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes pulse { 0% { transform: scale(0.6); opacity: 1; } 100% { transform: scale(1.6); opacity: 0; } }
        `}</style>
        <PhoneShell />
        <ControlPanel />
      </div>
    </AppCtx.Provider>
  );
}