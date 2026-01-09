import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './EventDetail.module.css';
import { fetchEventDetail, deleteEvent } from '../../api/eventApi'; // ✅ deleteEvent 추가

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchEventDetail(id);
        setPost(data);
      } catch (err) {
        console.error("이벤트 로드 에러:", err);
        alert("존재하지 않는 이벤트입니다.");
        navigate('/events');
      }
    }
    if (id) load();
  }, [id, navigate]);

  // ✅ 삭제 핸들러
  const handleDelete = async () => {
    if (!window.confirm("정말로 이 이벤트를 삭제하시겠습니까?")) return;
    try {
      await deleteEvent(id);
      alert("이벤트가 삭제되었습니다.");
      navigate('/events');
    } catch (err) {
      alert("삭제 실패: " + (err.response?.data?.msg || err.message));
    }
  };

  if (!post) return <div className={styles.loading}>로딩중이다냥...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.date}>{post.date}</div>
      </div>
      
      <div className={styles.contentWrapper}>
        <div className={styles.bannerArea}>
            <img src={`${process.env.PUBLIC_URL}${post.img_url}`} alt={post.title} className={styles.banner} />
        </div>
        
        <div className={styles.bodyContent} dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      {/* ✅ 하단 버튼 영역 (목록 + 관리자 전용 수정/삭제) */}
      <div className={styles.footer} style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button onClick={() => navigate('/events')} className={styles.listBtn}>목록으로</button>
        
        {/* ✅ 서버에서 받은 is_admin 정보로 버튼 노출 결정 */}
        {post.is_admin && (
          <>
            <button 
              onClick={() => navigate(`/events/edit/${post.id}`)} 
              className={styles.listBtn}
              style={{ backgroundColor: '#E8EEF8', color: '#556677', border: '1px solid #D5E5F3' }}
            >
              수정하기
            </button>
            <button 
              onClick={handleDelete}
              className={styles.listBtn}
              style={{ backgroundColor: '#fff', color: '#ff6b6b', border: '1px solid #ffeded' }}
            >
              삭제하기
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EventDetail;

// ==============================================================================
// [Gemini 작업 로그] - 2025.12.26
// 1. 데이터 소스 전환: 로컬 파일 -> 백엔드 API (`fetchEventDetail`) 호출 방식으로 변경.
// 2. 관리자 권한 제어: `is_admin` 정보를 확인하여 관리자용 [수정], [삭제] 버튼 노출.
// 3. 삭제 기능 구현: `deleteEvent` API 호출 로직 연결 (no-undef 에러 해결).
// ==============================================================================
