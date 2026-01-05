import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Customer.module.css";
import { fetchBoard } from "../../api/boardApi"; // ✅ API import

export default function BoardSection({ activeCategory }) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const ITEMS_PER_PAGE = 10;

  // ✅ 카테고리나 페이지가 바뀔 때마다 API 호출
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        // API에 category 파라미터 전달 (boardApi.js 수정 필요)
        const data = await fetchBoard(currentPage, ITEMS_PER_PAGE, activeCategory);
        setPosts(data.items);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error("게시판 로드 실패:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [activeCategory, currentPage]);


  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // ✅ 게시글 클릭 핸들러
  const handleRowClick = (id) => {
    // 상세 페이지로 이동 (거기서 권한 없으면 403 에러 처리)
    navigate(`/Noticeboard/${id}`);
  };

  // ✅ 로그인 여부 확인
  const isLoggedIn = !!localStorage.getItem("accessToken");

  return (
    <>
      {/* Search Bar */}
      <div className={styles.boardSearchBar}>
        <input 
          type="text" 
          className={styles.searchInput}
          placeholder={`"${activeCategory}" 관련 검색어를 입력하세요`}
          disabled
        />
        <button className={styles.searchBtn}>검색</button>
      </div>

      {/* Board List */}
      <section className={styles.boardWrap}>
        <div className={styles.boardHeader} style={{display:'none'}}>{activeCategory} 게시판</div>

        <div className={styles.boardBody}>
          <div className={styles.boardTableRows}>
            {loading ? (
              <div style={{ padding: "50px", textAlign: "center" }}>로딩중...</div>
            ) : posts.length > 0 ? (
              posts.map((r, idx) => ( // ✅ idx 파라미터 활용
                <div 
                  key={r.id} 
                  className={styles.boardRow} 
                  onClick={() => handleRowClick(r.id)} 
                  style={{ cursor: "pointer" }}
                >
                  {/* ✅ DB ID 대신 순차 번호(No.) 표시 */}
                  <div className={styles.rowNo}>
                    {(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}
                  </div>
                  <div className={styles.rowCategory}>{activeCategory === '전체' ? r.category : activeCategory}</div>
                  <div className={styles.rowTitle}>
                    {r.title}
                    {/* 비밀글 표시 (공지사항 아닐 때) */}
                    {activeCategory !== '공지사항' && r.category !== '공지사항' && (
                      <span style={{ fontSize: '0.8em', color: '#aaa', marginLeft: '5px' }}>🔒</span>
                    )}
                  </div>
                  <div className={styles.rowWriter}>
                    {r.writer}
                    {/* ✅ 일반 사용자 본인 글일 때만 (나) 표시. 관리자는 표시 안함 */}
                    {r.is_owner && <span style={{ fontWeight: 'bold', color: '#007bff', marginLeft: '4px' }}>(나)</span>}
                  </div>
                  <div className={styles.rowDate}>{r.date}</div>
                </div>
              ))
            ) : (
              <div style={{ padding: "50px", textAlign: "center", color: "#999", fontSize: "1.1rem" }}>
                게시글이 없습니다.
              </div>
            )}
          </div>

          {/* ✅ 하단 영역 (페이지네이션 + 글쓰기 버튼) */}
          <div className={styles.boardFooter}>
            {/* Pagination Controls */}
            {totalPages > 0 && (
              <div className={styles.pagination} style={{ margin: 0 }}>
                <button 
                  className={styles.pageBtn} 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    className={`${styles.pageBtn} ${currentPage === page ? styles.activePageBtn : ""}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}
                <button 
                  className={styles.pageBtn} 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </button>
              </div>
            )}

            {/* ✅ 글쓰기 버튼 (로그인 시 우측 끝에 배치) */}
            {isLoggedIn && (
              <button className={styles.writeBtn} onClick={() => navigate('/write')}>
                글쓰기
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}


// ==============================================================================
// [Gemini 작업 로그] - 26-01-04
// 1. API 연동: `fetchBoard`를 호출하여 백엔드 DB 데이터를 가져오도록 변경.
// 2. 카테고리 필터링: `activeCategory`가 바뀔 때마다 서버에 요청.
// 3. 보안/권한 UI: 공지사항이 아닌 글에는 자물쇠(🔒) 아이콘 표시 및 클릭 시 상세 이동.
// ==============================================================================
