<<<<<<< HEAD
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ useLocation 추가
import styles from "./PostForm.module.css";
import client from "../api/client"; // ✅ API 통신을 위한 client 추가
=======
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PostForm.module.css";


import { createPost } from "../api/postApi";

import { fetchMe } from "../api/authApi";
>>>>>>> 6bde93c2e91dffc611d88090c1a083bec45f7f21

export default function PostForm() {
  const navigate = useNavigate();
  const location = useLocation();

<<<<<<< HEAD
  // ✅ 현재 작성 모드가 '이벤트'인지 확인
  const isEventMode = new URLSearchParams(location.search).get('type') === 'event';

  // 📌 입력값 상태
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [attachment, setAttachment] = useState(null);

  /**
   * 📌 게시글 등록 처리 함수
   * - 실제 백엔드 API와 연동
   */
=======
  // 게시판 타입
  const [boardType, setBoardType] = useState("FREE");

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");
  const [attachment, setAttachment] = useState(null);

  // 화면 표시용 (서버에 보내지 않음)
  const [writer, setWriter] = useState("");
  const [email, setEmail] = useState("");

  // ✅ 로그인 체크 + 내 정보 표시용
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    (async () => {
      try {

        const me = await fetchMe(); // { nickname, email }
        setWriter(me?.nickname || "");
        setEmail(me?.email || "");
      } catch (err) {
        alert("로그인 정보 확인에 실패했습니다.");

        localStorage.removeItem("accessToken");
        navigate("/login");
      }
    })();
  }, [navigate]);


  // ✅ 게시글 등록
>>>>>>> 6bde93c2e91dffc611d88090c1a083bec45f7f21
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
<<<<<<< HEAD
      alert("빈 칸을 모두 채워라냥!");
=======
      alert("제목과 내용을 입력해주세요.");
>>>>>>> 6bde93c2e91dffc611d88090c1a083bec45f7f21
      return;
    }

    try {
<<<<<<< HEAD
      const endpoint = isEventMode ? "/api/event" : "/api/board/";
      
      // ✅ 서버 전송 데이터 구성
      const payload = {
        title,
        content,
        category: isEventMode ? "이벤트" : "일반",
        // 이미지 업로드 기능은 추후 확장 예정 (현재는 텍스트 위주)
        img_url: isEventMode ? "/images/banner/event_banner1.png" : null 
      };

      await client.post(endpoint, payload);
      
      alert("등록이 완료되었다냥! ✨");
      navigate(isEventMode ? "/events" : "/support");
    } catch (err) {
      console.error("등록 실패:", err);
      alert("등록에 실패했다냥... 권한이 있는지 확인해라냥!");
=======
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);

      formData.append("boardType", boardType);

      // ❌ writer / email 안 보냄 (서버가 토큰 기준으로 결정)
      if (attachment) {
        formData.append("attachment", attachment);
      }

      await createPost(formData);

      alert("게시글이 등록되었습니다.");
      navigate("/Noticeboard");
    } catch (err) {
      alert("등록에 실패했습니다.");
      console.error(err);
>>>>>>> 6bde93c2e91dffc611d88090c1a083bec45f7f21
    }
  };

  return (
<<<<<<< HEAD
    <div className={styles.page}>
      <div className={styles.container}>
        {/* 📌 페이지 제목 */}
        <h2 className={styles.title}>{isEventMode ? "새 이벤트 등록" : "새 게시글 작성"}</h2>

        {/* 📌 게시글 작성 폼 */}
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* 📌 제목 입력 영역 */}
          <div className={styles.field}>
            <label>제목</label>
            <input
              type="text"
              placeholder="제목을 입력해라냥!" // ✅ 요청하신 말투 적용
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* 📌 내용 입력 영역 */}
          <div className={styles.field}>
            <label>내용</label>
            <textarea
              rows="10"
              placeholder="내용을 상세히 입력해라냥!" // ✅ 요청하신 말투 적용
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          {/* 📌 첨부파일 선택 영역 */}
          <div className={styles.field}>
            <label>첨부파일 (선택)</label>
            <input
              type="file"
              onChange={(e) => setAttachment(e.target.files[0])}
            />
          </div>

          {/* 📌 버튼 영역 */}
          <div className={styles.buttonArea}>
            <button type="submit" className={styles.submitButton}>
              등록하기
            </button>
            <button type="button" className={styles.cancelButton} onClick={() => navigate(-1)}>
              취소
            </button>
          </div>
        </form>
      </div>
=======
    <div className={styles.container}>
      <div className={styles.notice}>
        게시글 작성 페이지입니다.
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* 게시판 타입 */}
        <div className={styles.row}>

          <label>게시판</label>
          <select
            value={boardType}
            onChange={(e) => setBoardType(e.target.value)}
          >

            <option value="FREE">자유</option>
            <option value="QNA">Q&A</option>
            <option value="NOTICE">공지 (관리자)</option>
          </select>
        </div>

        {/* 제목 */}
        <div className={styles.row}>
          <label>제목</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>


        {/* 작성자 (표시용) */}
        <div className={styles.row}>
          <label>작성자</label>
          <input value={writer} disabled />
        </div>

        {/* 이메일 (표시용) */}
        <div className={styles.row}>
          <label>이메일</label>
          <input value={email} disabled />

        </div>

        {/* 내용 */}
        <div className={styles.editor}>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>

        {/* 파일 첨부 */}
        <div className={styles.row}>
          <label>파일 첨부</label>
          <input type="file" onChange={(e) => setAttachment(e.target.files?.[0] ?? null)} />
        </div>

        <div className={styles.actions}>
          <button type="submit">등록하기</button>
          <button type="button" onClick={() => navigate(-1)}>취소</button>
        </div>
      </form>
>>>>>>> 6bde93c2e91dffc611d88090c1a083bec45f7f21
    </div>
  );
}

// ==============================================================================
// [Gemini 작업 로그] - 26-01-04
// 1. 테마 고도화: 프로젝트 메인 컬러(#BBD2E6, #556677)를 적용한 세련된 작성 페이지 UI 구현.
// 2. UX 개선: 취소 버튼 추가 및 상세 페이지들과 일관된 레이아웃(1000px 카드) 적용.
// [추가 수정]
// 3. 기능 전환: localStorage 기반 로직을 실제 백엔드 DB API 기반으로 전면 교체.
// 4. 멀티 모드 지원: URL 파라미터를 통해 '이벤트 등록'과 '일반 게시글 작성' 분기 처리.
// 5. 고양이 테마 플레이스홀더 적용: "~해라냥!" 말투 적용.
// ==============================================================================

// ==============================================================================
// [Gemini 작업 로그] - 26-01-04
// 1. 테마 고도화: 프로젝트 메인 컬러(#BBD2E6, #556677)를 적용한 세련된 작성 페이지 UI 구현.
// 2. UX 개선: 취소 버튼 추가 및 상세 페이지들과 일관된 레이아웃(1000px 카드) 적용.
// ==============================================================================
