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

  return (
    <div className={styles.page}>
      <div className={styles.pageInner}>
        
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
        
      </div>
    </div>
  );
}

/* 
 * Last Updated: 2025-12-19
 * - 게시판 헤더와 본문의 정렬 문제를 CSS Grid(boardGrid)를 사용하여 완벽히 해결함.
 */
