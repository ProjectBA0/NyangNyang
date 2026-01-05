<<<<<<< HEAD
// 2025년 12월 19일 금요일: EventPage 컴포넌트 및 하위 컴포넌트 생성
=======
>>>>>>> 6cc517ca74e60226b9ac4d6196dea2cb9c99a954
import React from "react";
import styles from "./EventPage.module.css";
import EventBanner3D from "../components/EventBanner3D";
import EventGrid from "../components/Event/EventGrid";

/**
<<<<<<< HEAD
 * EventPage Template (sizes/gaps based on provided wireframe)
 * - DB/Flask 연동 전 와이어프레임 기반의 정적 레이아웃입니다.
 * - CSS 모듈을 사용하여 스타일을 적용합니다.
 *
 * @returns {JSX.Element} 이벤트 페이지 전체를 렌더링하는 컴포넌트
 */

/* =========================================================================
 *  레이아웃 상수 (참고용)
 *  스타일은 EventPage.module.css 파일에 정의되어 있습니다.
 * =========================================================================
 *
 * const PAGE_WIDTH = 1600;
 * const CONTENT_WIDTH = 1200;
 *
 * const LOGO_SIZE = 160;
 * const SEARCH_W = 800;
 * const SEARCH_H = 80;
 *
 * const TOP_RIGHT_W = 250;
 * const TOP_RIGHT_H = 40;
 *
 * const NAV_H = 50;
 *
 * const GAP_190 = 190;
 * const BANNER_H = 100;
 * const GAP_80 = 80;
 *
 * const GRID_W = 1200;
 * const GRID_H = 1420;
 *
 * const CARD_W = 570;
 * const CARD_H = 310;
 *
 * const GRID_GAP = 60;
 *
 * const GAP_70 = 70;
 * const FOOTER_H = 200;
 */

export default function EventPage() {
  // TODO: 추후 API를 통해 실제 이벤트 데이터를 받아오도록 수정해야 합니다.
  // 현재는 레이아웃 확인을 위한 더미 데이터입니다.
=======
 * EventPage
 * - Composed of EventBanner3D and EventGrid components.
 */

export default function EventPage() {
>>>>>>> 6cc517ca74e60226b9ac4d6196dea2cb9c99a954
  const items = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    title: `특별한 이벤트 ${i + 1}`,
    date: "2025.12.01 - 2025.12.31",
  }));

  return (
    <div className={styles.page}>
      <div className={styles.pageInner}>
<<<<<<< HEAD
<<<<<<< HEAD
        {/* ================= BANNER / TITLE ================= */}
        <Banner title="진행중 / 종료 이벤트" />

        {/* ================= GAP (배너와 그리드 사이) ================= */}
        <div style={{ height: "var(--gap-80)" }} />

        {/* ================= EVENT GRID ================= */}
        <EventGrid items={items} />

        {/* ================= GAP (그리드와 푸터 사이) ================= */}
        <div style={{ height: "var(--gap-70)" }} />

=======
        {/* Wireframe GAP_190: Navbar is above this page, so this adds spacing below Navbar */}
=======
>>>>>>> a105c6e419380fd842db4fea1fb4feedd6fb85d0
        <div className={styles.topSpacer} />
        
        {/* 3D Banner */}
        <EventBanner3D />
        
        <div style={{ height: '80px' }}></div>
        
        {/* Grid List */}
        <EventGrid items={items} />
        
        <div className={styles.bottomSpacer} />
>>>>>>> 6cc517ca74e60226b9ac4d6196dea2cb9c99a954
      </div>
    </div>
  );
}
<<<<<<< HEAD

<<<<<<< HEAD
/* =========================================================================
 *  Sub-Components (EventPage에서만 사용되는 하위 컴포넌트들)
 * ========================================================================= */

/**
 * 페이지 배너 컴포넌트
 * 페이지의 주 제목을 표시합니다.
 * @param {{ title: string }} props - 배너에 표시될 제목
 */
function Banner({ title }) {
  return (
    <section className={styles.banner} aria-label="banner">
=======
function Banner({ title }) {
  return (
    <section className={styles.banner}>
>>>>>>> 6cc517ca74e60226b9ac4d6196dea2cb9c99a954
      <div className={styles.bannerInner}>
        <div className={styles.bannerTitle}>{title}</div>
      </div>
    </section>
  );
}

<<<<<<< HEAD
/**
 * 이벤트 카드 그리드 컴포넌트
 * 이벤트 목록을 그리드 형태로 표시합니다.
 * @param {{ items: Array<{id: number, title: string}> }} props - 이벤트 객체 배열
 */
function EventGrid({ items }) {
  return (
    <section className={styles.gridSection} aria-label="event-grid">
      <div className={styles.grid}>
        {items.map((item) => (
          <div key={item.id} className={styles.card} aria-label={`event-card-${item.id}`}>
=======
// ==============================================================================
// [Gemini 작업 로그] - 2025.12.26
// 1. UI 구현: 와이어프레임(WIDTH 1600) 기반 이벤트 페이지 레이아웃 적용.
// 2. 통합: MainLayout의 공통 Navbar/Footer를 사용하도록 기존 중복 헤더 제거.
// 3. 구성: 상단 Banner 섹션 및 2열 그리드(EventGrid) 상품 배치.
// ==============================================================================
function EventGrid({ items }) {
  return (
    <section className={styles.gridSection}>
      <div className={styles.grid}>
        {items.map((item) => (
          <div key={item.id} className={styles.card}>
>>>>>>> 6cc517ca74e60226b9ac4d6196dea2cb9c99a954
            {item.title}
          </div>
        ))}
      </div>
    </section>
  );
}
<<<<<<< HEAD

/* 
 * Last Updated: 2025-12-19
 * - 이벤트 페이지 구조 최적화 및 공통 Navbar/Footer 레이아웃 통합.
 */
=======
>>>>>>> 6cc517ca74e60226b9ac4d6196dea2cb9c99a954
=======
// (하단 Grid 함수 삭제)
>>>>>>> a105c6e419380fd842db4fea1fb4feedd6fb85d0
