// 2025-12-24: 고객센터 페이지 상세 레이아웃 및 그리드 시스템 복구
import React from "react";
import styles from "./CustomerCenterPage.module.css";

/**
 * CustomerCenterPage Component
 * - 공지사항 및 FAQ 게시판 관리.
 */
export default function CustomerCenterPage() {
  const rows = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    title: `[공지] Nyang 서비스 이용 안내 및 점검 공지사항 ${i + 1}`,
    date: "2025-12-24",
  }));

  return (
    <div className={styles.page}>
      <div className={styles.pageInner}>
        
        {/* 타이틀 */}
        <div className={styles.title}>CUSTOMER CENTER</div>

        {/* 안내 박스 */}
        <section className={styles.infoBoxContainer}>
          <div className={styles.infoBox}>
            <p>상담 가능 시간: 평일 09:00 ~ 18:00</p>
            <p style={{ fontSize: "16px", marginTop: "10px" }}>카카오톡 상담 및 1:1 문의를 이용해 주세요.</p>
          </div>
        </section>

        {/* 탭 바 */}
        <div className={styles.categoryBar}>
          전체 | 배송문의 | 환불/교환 | 상품문의 | 기타
        </div>

        {/* 검색 바 */}
        <div className={styles.searchBar}>
          궁금하신 내용을 검색해 보세요.
        </div>

        {/* 게시판 영역 */}
        <section className={styles.boardContainer}>
          <div className={styles.boardHeader}>NOTICE & FAQ</div>
          
          <div className={styles.boardBody}>
            {/* 테이블 헤더 (CSS Grid 적용) */}
            <div className={`${styles.boardGrid} ${styles.tableHead}`}>
              <div style={{ textAlign: "center" }}>번호</div>
              <div style={{ textAlign: "left", paddingLeft: "20px" }}>제목</div>
              <div style={{ textAlign: "center" }}>등록일</div>
            </div>

            {/* 테이블 리스트 (CSS Grid 적용) */}
            <div className={styles.tableList}>
              {rows.map((row) => (
                <div key={row.id} className={`${styles.boardGrid} ${styles.tableRow}`}>
                  <div style={{ textAlign: "center" }}>{row.id}</div>
                  <div style={{ textAlign: "left", paddingLeft: "20px" }}>{row.title}</div>
                  <div style={{ textAlign: "center" }}>{row.date}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div style={{ height: "80px" }} />
      </div>
    </div>
  );
}

/* 
 * Last Updated: 2025-12-24
 * - 고객센터 페이지 안내 박스 및 CSS Grid 기반 게시판 레이아웃 복구 완료.
 */