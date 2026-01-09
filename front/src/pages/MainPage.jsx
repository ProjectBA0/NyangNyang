<<<<<<< HEAD
<<<<<<< HEAD
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
=======
import React from "react";
=======
import React, { useEffect, useState } from "react";
import { Alert, Carousel, Container, Spinner } from "react-bootstrap";
import styles from "./Mainpage.module.css";
import { useNavigate } from "react-router-dom";
import { fetchMainReviews, fetchProducts } from "../api/productApi";
import { fetchNotice } from "../api/boardApi";
>>>>>>> ca0d4aed4891690f38c174feb28b7b555157aa6d

function MainPage() {
<<<<<<< HEAD
  const bestItems = Array.from({ length: 5 }, (_, i) => ({ id: i + 1, title: `BEST 상품 ${i + 1}` }));
>>>>>>> 6cc517ca74e60226b9ac4d6196dea2cb9c99a954

  return (
    <div className="main-page">
      <div className="main-page-inner">
<<<<<<< HEAD
        
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
=======
        {/* 상단 슬라이더 */}
        <section className="slider-container">
          <h2>Main Slider (1200px)</h2>
        </section>
=======

  const navigate = useNavigate();

  // 펫 타입
  const [pet, setPet] = useState(null);

  // 백에서 받아올 아이템
  const [bestItems, setBestItems] = useState([]);
  const [recommend, setRecommend] = useState([]);

  // 리뷰
  const [reviews, setReviews] = useState([]);

  // 공지사항
  const [notices, setNotices] = useState([]);

  // 로딩 에러처리
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getImageSrc = (item) => {
    const url = (item?.imgUrl ?? "").trim();
    return url ? url : `${process.env.PUBLIC_URL}/images/no-image.png`;
  };

  useEffect(() => {
    let alive = true; // 언마운트/요청 꼬임 방지 (setState 경고 방지용)

    async function load() {
      setLoading(true);
      setError("");

      try {
        const bestData = await fetchProducts({
          pet_type: pet ?? undefined, // null이면 안 보냄
          sort: "views_desc",
          limit: 8,
          page: 1,
        });
        const recommendData = await fetchProducts({
          pet_type: pet ?? undefined, // null이면 안 보냄
          sort: "review_count_desc",
          limit: 8,
          page: 1,
        })

        if (!alive) return;

        // items 안전 처리
        setBestItems(Array.isArray(bestData?.items) ? bestData.items : []);
        setRecommend(Array.isArray(recommendData?.items) ? recommendData.items : []);
      } catch (e) {
        if (!alive) return;
        setError("상품 목록을 불러오는 중 오류가 발생했습니다.");
        setBestItems([]);
        setRecommend([]);
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [pet]);


  useEffect(() => {
    (async () => {
      try {
        const data = await fetchMainReviews();
        setReviews(Array.isArray(data.reviews) ? data.reviews : []);
      } catch (e) {
        console.error("리뷰 불러오기 에러", e);
      }
    })();
  }, []);

  // useEffect(() => {async function load() {await fetchNotice();}load();},[]); 랑 같은 의미
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchNotice();
        setNotices(Array.isArray(data.items) ? data.items : []);
      } catch (e) {
        console.error("공지사항 불러오기 에러", e);
      }
    })(); // 함수를 만들자마자 바로 실행
  }, []); // 처음 한 번만 실행

  return (
    <Container className={styles.container}>
      {/* 에러 표시 */}
      {!loading && error && (
        <Alert variant="danger" className="my-3">
          {error}
        </Alert>
      )}
>>>>>>> ca0d4aed4891690f38c174feb28b7b555157aa6d

      {/* 정상 렌더 */}
      <div className={styles.main}>

        {/* 로딩 중 표시 */}
        {loading && (
          <div className="d-flex justify-content-center my-4">
            <Spinner animation="border" />
          </div>
        )}
          <div>
            {/* 상단 슬라이더 */}
            <section className={styles.slider}>
              <Carousel>
                <Carousel.Item interval={4000}>
                  <img className={styles.slider_img} src={`${process.env.PUBLIC_URL}/images/banner/banner1.jpg`} alt="banner1"></img>
                </Carousel.Item>
                <Carousel.Item interval={4000}>
                  <img className={styles.slider_img} src={`${process.env.PUBLIC_URL}/images/banner/banner2.jpg`} alt="banner2"></img>
                </Carousel.Item>
                <Carousel.Item interval={4000}>
                  <img className={styles.slider_img} src={`${process.env.PUBLIC_URL}/images/banner/banner3.jpg`} alt="banner3"></img>
                </Carousel.Item>
                <Carousel.Item interval={4000}>
                  <img className={styles.slider_img} src={`${process.env.PUBLIC_URL}/images/banner/banner4.jpg`} alt="banner4"></img>
                </Carousel.Item>
                <Carousel.Item interval={4000}>
                  <img className={styles.slider_img} src={`${process.env.PUBLIC_URL}/images/banner/banner5.jpg`} alt="banner5"></img>
                </Carousel.Item>
                <Carousel.Item interval={4000}>
                  <img className={styles.slider_img} src={`${process.env.PUBLIC_URL}/images/banner/banner6.jpg`} alt="banner6"></img>
                </Carousel.Item>
                <Carousel.Item interval={4000}>
                  <img className={styles.slider_img} src={`${process.env.PUBLIC_URL}/images/banner/banner7.jpg`} alt="banner7"></img>
                </Carousel.Item>
              </Carousel>
            </section>

            <section className={styles.categorySection}>
              <button className={`${styles.categoryBox} ${styles.dog}`} onClick={() => setPet("dog")}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/banner/dog.png`}
                  alt="강아지"
                  className={styles.categoryImg}
                />
                <p className={styles.categoryText}>강아지</p>
              </button>
              <button className={`${styles.categoryBox} ${styles.cat}`} onClick={() => setPet("cat")}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/banner/cat.png`}
                  alt="고양이"
                  className={styles.categoryImg}
                />
                <p className={styles.categoryText}>고양이</p>
              </button>
            </section>

            <section className={styles.best}>
              <h3>BEST ITEMS</h3>
              <div className={styles.bestitems}>
                {bestItems.map(item => (
                  <div key={item.id} className={styles.productCard} onClick={() => navigate(`/product/${item.id}`)}>
                    <img className={styles.productImg} src={getImageSrc(item)} alt={item.title || "상품이미지"} onError={(e) => {
                      e.currentTarget.src = `${process.env.PUBLIC_URL}/images/no-image.png`;
                    }}></img>
                    <p className={styles.productTitle}>{item.title}</p>
                    <p className={styles.productPrice}>
                      {Number(item.price || 0).toLocaleString()}원
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.best}>
              <h3>RECOMMEND ITEMS</h3>
              <div className={styles.bestitems}>
                {recommend.map((item) => (
                  <div
                    key={item.id}
                    className={styles.productCard}
                    onClick={() => navigate(`/product/${item.id}`)}
                  >
                    <img
                      className={styles.productImg}
                      src={getImageSrc(item)}
                      alt={item.title || "상품이미지"}
                      onError={(e) => {
                        e.currentTarget.src = `${process.env.PUBLIC_URL}/images/no-image.png`
                      }}
                    />
                    <p className={styles.productTitle}>{item.title}</p>
                    <p className={styles.productPrice}>
                      {Number(item.price || 0).toLocaleString()}원
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <div className={styles.revnot}>
              <div className={styles.review}>
                {reviews.map((r) => (
                  <div key={r.id} className={styles.card}>
                    <div className={styles.thumb}>
                      <img
                        src={getImageSrc(r)} alt="리뷰이미지" className={styles.revimg} />
                    </div>

                    <div className={styles.meta}>
                      <div className={styles.stars}>
                        {"⭐".repeat(r.rating)}
                        {"☆".repeat(5 - r.rating)}
                      </div>
                      <div className={styles.write}>
                        <p className={styles.title}>{r.writer || "작성자"}</p>
                        <p className={styles.date}>{r.date}</p>
                      </div>
                      <div className={styles.content}>{r.content}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.notice}>
                <h4 className={styles.noticeTitle}>공지사항</h4>
                <div className={styles.noticeList}>
                  {notices.map((n) => (
                    <div key={n.id} className={styles.notItem}>
                      <span className={styles.notTitle} onClick={() => navigate(`/NoticeDetail/${n.id}`)}>{n.title}</span>
                      <span className={styles.notDate}>{n.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
      </div>
    </Container >
  )
};

export default MainPage;
<<<<<<< HEAD

/* =========================================================================
 *  2025-12-24: 수정 및 추가 내역 (Team History)
 * -------------------------------------------------------------------------
 * - 작성자: danayang3
 * - 내용: 메인 페이지 기본 레이아웃 복구. 
 * - 상세: App.css에 정의된 전역 규격(1200px 중앙 정렬)을 사용하도록 구조화함.
 * ========================================================================= */
>>>>>>> 6cc517ca74e60226b9ac4d6196dea2cb9c99a954
=======
>>>>>>> ca0d4aed4891690f38c174feb28b7b555157aa6d
