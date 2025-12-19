// 2025년 12월 19일 금요일: MainPage 컴포넌트 재구성 및 스타일 통합
import React from "react";

/**
 * MainPage Component
 * - 애플리케이션의 메인 랜딩 페이지입니다.
 * - 전역 Navbar는 MainLayout에서 제공되므로 여기서는 제외됩니다.
 * - 레이아웃 확인을 위한 더미 데이터를 렌더링하며, 스타일은 App.css를 사용합니다.
 *
 * @returns {JSX.Element} 메인 페이지 컴포넌트
 */
export default function MainPage() {
  // 레이아웃 확인용 더미 데이터
  const bestItems = Array.from({ length: 5 }, (_, i) => ({ id: i + 1, title: `BEST ${i + 1}` }));
  const recItems = Array.from({ length: 10 }, (_, i) => ({ id: i + 1, title: `추천 ${i + 1}` }));

  return (
    <div className="main-page">
      <div className="main-page-inner">
        
        {/* 상단 슬라이더 영역 */}
        <Slider />

        <div style={{ height: "20px" }} />

        {/* 카테고리 선택 영역 (강아지/고양이) */}
        <CategoryBand />

        <div style={{ height: "30px" }} />

        {/* BEST 상품 섹션 */}
        <SectionLabel text="BEST" />
        <div style={{ height: "20px" }} />
        <ProductGrid items={bestItems} />

        <div style={{ height: "30px" }} />

        {/* 추천 상품 섹션 */}
        <SectionLabel text="추천" />
        <div style={{ height: "20px" }} />
        <ProductGrid items={recItems} />

        <div style={{ height: "40px" }} />

        {/* 하단 정보 영역: 리뷰검색 + 공지사항 */}
        <BottomInfoRow />

        <div style={{ height: "40px" }} />

      </div>
    </div>
  );
}

/* ----------------------------- 내부 서브 컴포넌트 ----------------------------- */

/**
 * 슬라이더 컴포넌트
 */
function Slider() {
  return (
    <section className="slider-container">
      <button className="slider-arrow">←</button>
      <div className="slider-center">
        <h2>slider</h2>
        <p>슬라이드 텍스트 영역 (이미지/캐러셀 예정)</p>
      </div>
      <button className="slider-arrow">→</button>
    </section>
  );
}

/**
 * 카테고리 선택 밴드 컴포넌트
 */
function CategoryBand() {
  return (
    <section className="category-band">
      <div className="category-item">강아지</div>
      <div style={{ width: "2px", backgroundColor: "#ddd", transform: "skewX(-30deg)" }} />
      <div className="category-item">고양이</div>
    </section>
  );
}

/**
 * 섹션 제목 라벨 컴포넌트
 */
function SectionLabel({ text }) {
  return (
    <div className="section-label-wrap">
      <div className="section-label">{text}</div>
    </div>
  );
}

/**
 * 상품 그리드 컴포넌트
 */
function ProductGrid({ items }) {
  return (
    <section className="product-grid-container">
      {items.map((item) => (
        <div key={item.id} className="product-card">
          <div className="product-image-placeholder">IMG 200×200</div>
          <div style={{ padding: "10px", fontWeight: "bold" }}>{item.title}</div>
        </div>
      ))}
    </section>
  );
}

/**
 * 하단 정보 행 컴포넌트 (리뷰검색 & 공지사항)
 */
function BottomInfoRow() {
  return (
    <section className="bottom-info-row">
      {/* 리뷰 검색 영역 */}
      <div className="review-search-box">
        <div style={{ fontWeight: "bold", marginBottom: "10px" }}>리뷰검색 (700×250)</div>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <div style={{ width: "150px", height: "150px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center" }}>150×150</div>
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ width: "200px", height: "180px", border: "1px solid #ccc" }}>리뷰박스 1</div>
            <div style={{ width: "200px", height: "180px", border: "1px solid #ccc" }}>리뷰박스 2</div>
          </div>
        </div>
      </div>

      {/* 공지사항 영역 */}
      <div className="notice-box">
        <div style={{ fontWeight: "bold", marginBottom: "10px" }}>공지사항 (450×250)</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #eee", paddingBottom: "4px" }}>
              <span>공지사항 제목 {i}</span>
              <span style={{ fontSize: "12px", color: "#999" }}>2025.12.19</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 
 * Last Updated: 2025-12-19
 * - 메인 페이지 컴포넌트 구조화 및 전역 스타일 시스템 통합.
 */