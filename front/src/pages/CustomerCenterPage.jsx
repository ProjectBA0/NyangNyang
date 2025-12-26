<<<<<<< HEAD
// 2025-12-19: CSS Grid 기반 게시판 레이아웃 재작성 (헤더/본문 정렬 오차 제거)
import React from "react";
import styles from "./CustomerCenterPage.module.css";

/**
 * CustomerCenterPage Component
 * - 게시판 정렬을 CSS Grid 시스템으로 완전히 통제하도록 재구성함.
 */
export default function CustomerCenterPage() {
  const rows = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `고객센터 문의 또는 공지사항 게시글 제목 ${i + 1}`,
    date: "2025-12-22",
  }));
=======
import React, { useState } from "react";
import styles from "./CustomerCenterPage.module.css";

/**
 * CustomerCenterPage
 * - Features:
 *   1. Top Info Bar (Hours & Phone)
 *   2. Category Tabs (Shipping, Payment, Product, Site)
 *   3. Search within active category
 *   4. Filtered Board List
 */

export default function CustomerCenterPage() {
  const [activeCategory, setActiveCategory] = useState("배송");
  const [searchQuery, setSearchQuery] = useState("");

  // Categories
  const categories = ["배송", "결제", "제품", "사이트이용"];

  // Dummy Data (Generate some posts for each category)
  // In real app, this would be fetched from API based on category
  const allPosts = Array.from({ length: 40 }, (_, i) => {
    const catIndex = i % 4; // 0:배송, 1:결제, 2:제품, 3:사이트이용
    const catName = categories[catIndex];
    return {
      id: i + 1,
      category: catName,
      title: `[${catName}] 관련 문의사항입니다. ${i + 1}`,
      date: "2025-12-26",
      author: `User${i + 1}`
    };
  });

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Filter Logic
  const getFilteredPosts = () => {
    let posts = allPosts.filter(p => p.category === activeCategory);
    
    if (searchQuery) {
      posts = posts.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    
    return posts;
  };

  const filteredPosts = getFilteredPosts();
  
  // Pagination Calculation
  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
>>>>>>> 6cc517ca74e60226b9ac4d6196dea2cb9c99a954

  return (
    <div className={styles.page}>
      <div className={styles.pageInner}>
<<<<<<< HEAD
        
        {/* 타이틀 */}
        <div className={styles.title}>고객센터</div>

        {/* 이용안내 박스 */}
        <section className={styles.infoBoxContainer}>
          <div className={styles.infoBox}>
            고객센터 이용시간<br />
            평일 09:00 ~ 18:00<br />
            1:1 채팅 및 전화 상담 안내<br />
            (간편 문의 링크 제공 예정)
          </div>
        </section>

        {/* 검색 및 카테고리 바 */}
        <div className={styles.categoryBar}>문의 카테고리 (전체 / 배송 / 환불 / 기타)</div>
        <div className={styles.searchBar}>검색어를 입력해 주세요 (키워드 검색)</div>

        {/* 게시판 영역 (Grid 적용) */}
        <section className={styles.boardContainer}>
          <div className={styles.boardHeader}>FAQ / 공지사항 게시판</div>
          
          <div className={styles.boardBody}>
            {/* 테이블 헤더 (그리드 적용) */}
            <div className={`${styles.boardGrid} ${styles.tableHead}`}>
              <div className={styles.colNo}>번호</div>
              <div className={styles.colTitle}>제목</div>
              <div className={styles.colDate}>등록일</div>
            </div>

            {/* 테이블 본문 (그리드 적용) */}
            <div className={styles.tableList}>
              {rows.map((row) => (
                <div key={row.id} className={`${styles.boardGrid} ${styles.tableRow}`}>
                  <div className={styles.colNo}>{row.id}</div>
                  <div className={styles.colTitle}>{row.title}</div>
                  <div className={styles.colDate}>{row.date}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 하단 여백 */}
        <div style={{ height: "60px" }} />
        
=======
        {/* Gap below Navbar */}
        <div className={styles.topSpacer} />

        <div className={styles.pageTitle}>고객센터</div>

        {/* 1. Top Info Bar */}
        <div className={styles.topInfoBar}>
          📞 고객센터: 031-123-4560 &nbsp; | &nbsp; 🕒 운영시간: 평일 09:00 ~ 18:00 (점심 12:00 ~ 13:00 / 주말·공휴일 휴무)
        </div>

        {/* 2. Category Tabs */}
        <div className={styles.categoryTabs}>
          {categories.map((cat) => (
            <div
              key={cat}
              className={`${styles.tabItem} ${activeCategory === cat ? styles.activeTab : ""}`}
              onClick={() => {
                setActiveCategory(cat);
                setSearchQuery(""); 
                setCurrentPage(1); // 카테고리 변경 시 1페이지로
              }}
            >
              {cat}
            </div>
          ))}
        </div>

        {/* 3. Search Bar */}
        <div className={styles.boardSearchBar}>
          <input 
            type="text" 
            className={styles.searchInput}
            placeholder={`"${activeCategory}" 관련 검색어를 입력하세요`}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // 검색어 변경 시 1페이지로
            }}
          />
          <button className={styles.searchBtn}>검색</button>
        </div>

        {/* 4. Board List */}
        <section className={styles.boardWrap}>
          <div className={styles.boardHeader}>{activeCategory} 게시판</div>

          <div className={styles.boardBody}>
            <div className={styles.boardTableHead}>
              <div style={{ width: "10%" }}>No</div>
              <div style={{ width: "15%" }}>Category</div>
              <div style={{ width: "55%" }}>Title</div>
              <div style={{ width: "20%", textAlign: "right" }}>Date</div>
            </div>

            <div className={styles.boardTableRows}>
              {currentPosts.length > 0 ? (
                currentPosts.map((r, idx) => {
                  // 전체 리스트 기준 순번 계산 (오름차순)
                  const globalIndex = startIndex + idx + 1;
                  return (
                    <div key={r.id} className={styles.boardRow}>
                      <div style={{ width: "10%" }}>{globalIndex}</div>
                      <div style={{ width: "15%", fontWeight: "bold", color: "#555" }}>{r.category}</div>
                      <div style={{ width: "55%", cursor: 'pointer' }}>{r.title}</div>
                      <div style={{ width: "20%", textAlign: "right", color: "#888" }}>{r.date}</div>
                    </div>
                  );
                })
              ) : (
                <div style={{ padding: "30px", textAlign: "center", color: "#999" }}>
                  게시글이 없습니다.
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 0 && (
              <div className={styles.pagination}>
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
          </div>
        </section>

        <div className={styles.bottomSpacer} />
>>>>>>> 6cc517ca74e60226b9ac4d6196dea2cb9c99a954
      </div>
    </div>
  );
}

<<<<<<< HEAD
/* 
 * Last Updated: 2025-12-19
 * - 게시판 헤더와 본문의 정렬 문제를 CSS Grid(boardGrid)를 사용하여 완벽히 해결함.
 */
=======

// ==============================================================================
// [Gemini 작업 로그] - 2025.12.26
// 1. UI 개편: 최상단 이용안내 바 추가, 카테고리 탭(배송/결제/제품/사이트이용) 구현.
// 2. 기능 구현: 선택된 카테고리에 따른 게시판 필터링 및 검색 기능 추가.
// 3. 순번 정정: 카테고리별 독립적인 오름차순(1, 2, 3...) 번호 부여.
// 4. 레이아웃: 중복 푸터 제거 및 하단 여백 조정.
// ==============================================================================
>>>>>>> 6cc517ca74e60226b9ac4d6196dea2cb9c99a954
