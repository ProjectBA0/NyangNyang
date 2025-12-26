// 2025-12-24: 메인 페이지 상세 레이아웃 및 섹션 복구
import React from "react";

/**
 * MainPage Component
 * - 애플리케이션의 메인 랜딩 페이지.
 */
export default function MainPage() {
  const bestItems = Array.from({ length: 5 }, (_, i) => ({ id: i + 1, title: `BEST 상품 ${i + 1}` }));
  const recItems = Array.from({ length: 10 }, (_, i) => ({ id: i + 1, title: `추천 상품 ${i + 1}` }));

  return (
    <div className="main-page">
      <div className="main-page-inner">
        
        {/* 상단 슬라이더 */}
        <section className="slider-container">
          <button className="slider-arrow">←</button>
          <div className="slider-center">
            <h2>Nyang Main Slider</h2>
            <p>신상품 및 이벤트 홍보 영역 (1200px)</p>
          </div>
          <button className="slider-arrow">→</button>
        </section>

        <div style={{ height: "30px" }} />

        {/* 카테고리 밴드 */}
        <section className="category-band">
          <div className="category-item">DOG (강아지)</div>
          <div style={{ width: "2px", backgroundColor: "#ddd", transform: "skewX(-30deg)" }} />
          <div className="category-item">CAT (고양이)</div>
        </section>

        <div style={{ height: "40px" }} />

        {/* BEST 섹션 */}
        <div className="section-label-wrap">
          <div className="section-label">BEST ITEMS</div>
        </div>
        <div style={{ height: "20px" }} />
        <section className="product-grid-container">
          {bestItems.map(item => (
            <div key={item.id} className="product-card">
              <div className="product-image-placeholder">IMG</div>
              <div style={{ padding: "10px", fontWeight: "bold" }}>{item.title}</div>
            </div>
          ))}
        </section>

        <div style={{ height: "50px" }} />

        {/* 추천 섹션 */}
        <div className="section-label-wrap">
          <div className="section-label">RECOMMENDED</div>
        </div>
        <div style={{ height: "20px" }} />
        <section className="product-grid-container">
          {recItems.map(item => (
            <div key={item.id} className="product-card">
              <div className="product-image-placeholder">IMG</div>
              <div style={{ padding: "10px", fontWeight: "bold" }}>{item.title}</div>
            </div>
          ))}
        </section>

        <div style={{ height: "60px" }} />

        {/* 하단 정보 (리뷰 + 공지) */}
        <section className="bottom-info-row">
          <div className="review-search-box">
            <div style={{ fontWeight: "bold", marginBottom: "10px" }}>실시간 리뷰 검색</div>
            <div style={{ display: "flex", gap: "10px" }}>
              <div style={{ width: "100px", height: "100px", backgroundColor: "#eee" }}>Photo</div>
              <p style={{ fontSize: "13px" }}>고객님들의 생생한 후기를 확인하세요.</p>
            </div>
          </div>
          <div className="notice-box">
            <div style={{ fontWeight: "bold", marginBottom: "10px" }}>공지사항</div>
            <ul style={{ listStyle: "none", padding: 0, fontSize: "13px" }}>
              <li>• 신규 회원 가입 이벤트 안내 (12.24)</li>
              <li>• 배송 지연 사과문 안내 (12.22)</li>
            </ul>
          </div>
        </section>

        <div style={{ height: "60px" }} />
      </div>
    </div>
  );
}

/* 
 * Last Updated: 2025-12-24
 * - 메인 페이지의 모든 상세 섹션(Slider, Category, Grid, BottomInfo) 복구 완료.
 */