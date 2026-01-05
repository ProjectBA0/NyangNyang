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
import TopInfoBar from "../components/CustomerCenter/TopInfoBar";
import CategoryTabs from "../components/CustomerCenter/CategoryTabs";
import BoardSection from "../components/CustomerCenter/BoardSection";

/**
 * CustomerCenterPage
 * - Composed of TopInfoBar, CategoryTabs, and BoardSection components.
 */

export default function CustomerCenterPage() {
  const [activeCategory, setActiveCategory] = useState("배송");

  // Categories
  const categories = ["배송", "결제", "제품", "사이트이용"];

  // Dummy Data (In real app, fetch from API)
  const allPosts = Array.from({ length: 40 }, (_, i) => {
    const catIndex = i % 4;
    const catName = categories[catIndex];
    return {
      id: i + 1,
      category: catName,
      title: `[${catName}] 관련 문의사항입니다. ${i + 1}`,
      date: "2025-12-26",
      author: `User${i + 1}`
    };
  });

<<<<<<< HEAD
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

=======
>>>>>>> a105c6e419380fd842db4fea1fb4feedd6fb85d0
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

        {/* 1. Top Info Bar */}
        <TopInfoBar />

        {/* 2. Category Tabs */}
        <CategoryTabs 
          categories={categories} 
          activeCategory={activeCategory} 
          onSelect={setActiveCategory} 
        />

        {/* 3. Board Section (Search & List) */}
        <BoardSection 
          activeCategory={activeCategory} 
          allPosts={allPosts} 
        />

        <div className={styles.bottomSpacer} />
>>>>>>> 6cc517ca74e60226b9ac4d6196dea2cb9c99a954
      </div>
    </div>
  );
}
<<<<<<< HEAD

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
=======
// (하단 로그 주석 유지)
>>>>>>> a105c6e419380fd842db4fea1fb4feedd6fb85d0
