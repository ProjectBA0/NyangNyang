import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PostForm.module.css";

const STORAGE_KEY = "notice_posts";

export default function PostForm() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");

  // 🔴 이메일 분리 상태
  const [emailId, setEmailId] = useState("");
  const [emailDomain, setEmailDomain] = useState("");

  const [content, setContent] = useState("");
  const [attachment, setAttachment] = useState(null);

  useEffect(() => {
    setContent(
`안녕하세요 입점관련 문의남겨주시면 확인 후에 연락드리도록 하겠습니다.
관련 자료(상세페이지 등) 파일 첨부 부탁드립니다.
감사합니다.

1) 업체명 :
2) 담당자 :
3) 연락처 :
4) 이메일 :
5) 상품군 및 상품설명 :
6) 제조원 :
7) 판매원 :
8) 수입원 :
9) 판매처링크 : 온라인 판매처 기입 생략 및 관련 자료 첨부`
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = `${emailId}@${emailDomain}`;

    const savedPosts =
      JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    const today = new Date().toISOString().slice(0, 10);

    const newPost = {
      id: Date.now(),
      title,
      writer,
      email,
      content,
      date: today,
      view: 0,
      attachmentName: attachment ? attachment.name : null,
    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([newPost, ...savedPosts])
    );

    alert("문의가 등록되었습니다.");
    navigate("/Noticeboard");
  };

  return (
    <div className={styles.container}>
      <div className={styles.notice}>
        입점 문의 공지사항입니다. <br />
        회원 인증 요청 시 확인 안내드리지 않으니 참고 부탁드립니다.
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label>제목</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className={styles.row}>
          <label>작성자</label>
          <input value={writer} onChange={(e) => setWriter(e.target.value)} required />
        </div>

        {/* 🔴 이메일 분리 */}
        <div className={styles.row}>
          <label>이메일</label>
          <div className={styles.emailLine}>
            <input
              placeholder="아이디"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              required
            />
            <span>@</span>
            <select
              value={emailDomain}
              onChange={(e) => setEmailDomain(e.target.value)}
              required
            >
              <option value="">- 이메일 선택 -</option>
              <option value="gmail.com">gmail.com</option>
              <option value="naver.com">naver.com</option>
              <option value="daum.net">daum.net</option>
              <option value="hanmail.net">hanmail.net</option>
            </select>
          </div>
        </div>

        <div className={styles.editor}>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>

        <div className={styles.row}>
          <label>파일 첨부</label>
          <input type="file" onChange={(e) => setAttachment(e.target.files[0])} />
        </div>

        <div className={styles.actions}>
          <button type="submit">등록하기</button>
          <button type="button" onClick={() => navigate(-1)}>취소</button>
        </div>
      </form>
    </div>
  );
}
