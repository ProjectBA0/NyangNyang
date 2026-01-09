<<<<<<< HEAD
// 2025년 12월 19일 금요일: Navbar 컴포넌트를 EventPage의 Header 디자인으로 교체
import React from 'react';
import { Link } from 'react-router-dom';
=======
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
>>>>>>> 6cc517ca74e60226b9ac4d6196dea2cb9c99a954

<<<<<<< HEAD
/**
 * 전역 네비게이션 바 컴포넌트
 */
=======
// ✅ me 조회 API (너희 프로젝트 경로에 맞춰 import만 조정해줘)
import { fetchMe } from "../api/authApi"; // 예: "../api/postApi" 또는 "../api/authApi"

>>>>>>> ca0d4aed4891690f38c174feb28b7b555157aa6d
function Navbar() {
<<<<<<< HEAD
  const navItems = [
    { label: "강아지", path: "/category/dog" },
    { label: "고양이", path: "/category/cat" },
    { label: "소품몰", path: "/category/acc" },
    { label: "EVENT", path: "/event" },
    { label: "ABOUT", path: "/about" },
    { label: "입점문의", path: "/inquiry" },
    { label: "고객센터", path: "/customer-center" },
  ];

  return (
    <header className="header-wrap">
      {/* 최상단 행: 로고 + 검색창 + 로그인/회원가입 */}
      <div className="header-top-row">
        <Link to="/" className="logo-box" aria-label="Nyang Logo" style={{ textDecoration: 'none', color: 'inherit' }}>
          <img src="/images/logo_849.png" alt="Nyang Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </Link>

        <div className="search-area">
          <div className="search-box" aria-label="search-placeholder">
            검색
          </div>
        </div>

        <div className="top-right-box">
          <div className="top-right-inner">
            <Link to="/login" style={{ textDecoration: 'none', color: 'inherit', marginRight: '10px' }}>로그인</Link>
            / 
            <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit', marginLeft: '10px' }}>회원가입</Link>
          </div>
        </div>
      </div>

      {/* 네비게이션 바 */}
      <nav className="nav-bar" aria-label="main-nav">
        <div className="nav-inner">
          {navItems.map((item) => (
            <Link key={item.label} to={item.path} className="nav-item" style={{ textDecoration: 'none', color: 'inherit' }}>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
=======
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // ✅ 토큰 상태(초기값은 localStorage에서)
  const [token, setToken] = useState(() => localStorage.getItem("accessToken"));

  // ✅ ADMIN 여부
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const t = localStorage.getItem("accessToken");
    setToken(t);

    // 토큰 없으면 admin도 무조건 false
    if (!t) {
      setIsAdmin(false);
      return;
    }

    // 토큰 있으면 내 정보 조회해서 role 확인
    (async () => {
      try {
        const me = await fetchMe(); // ✅ { role: "ADMIN" | "USER", ... } 기대
        setIsAdmin(me?.role === "admin");
      } catch (err) {
        // 토큰이 만료/오류면 admin false 처리 (필요하면 여기서 로그아웃 처리도 가능)
        setIsAdmin(false);
      }
    })();
  }, []);

  const handleSearch = () => {
    console.log("검색어:", searchTerm);
    // navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setToken(null);
    setIsAdmin(false); // ✅ 로그아웃하면 admin도 초기화
    navigate("/login");
  };

  return (
    <header className={styles.headerWrap}>
      <div className={styles.navbar}>
        {/* ===== 상단 영역 ===== */}
        <div className={styles.topRow}>
          {/* 로고 */}
          <Link to="/" className={styles.logoBox}>
            <img
              src="/images/daitdanyang-logo.png"
              alt="대잇다냥 로고"
              className={styles.logoImage}
            />
          </Link>

          {/* 검색 */}
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <button onClick={handleSearch} className={styles.searchButton}>
              검색
            </button>
          </div>

          {/* ✅ 로그인 영역 */}
          <div className={styles.memberBox}>
            {token ? (
              <>
                <Link to="/mypage">마이페이지</Link>
                <Link to="/cart">장바구니</Link>

                {/* ✅ ADMIN 전용 버튼/링크 (원하는 곳에 배치 가능) */}
                {isAdmin && <Link to="/AdminPostForm">관리자</Link>}

                <button type="button" onClick={handleLogout}>
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link to="/login">로그인</Link>
                <Link to="/signup">회원가입</Link>
              </>
            )}
          </div>
        </div>

        {/* ===== 하단 카테고리 ===== */}
        <nav className={styles.categoryRow}>
          <ul className={styles.navbarLinks}>
            <li>
              <Link to="/category/dog">강아지</Link>
            </li>
            <li>
              <Link to="/category/cat">고양이</Link>
            </li>

            <li className={styles.divider}></li>

            <li>
              <Link to="/events">EVENT</Link>
            </li>
            <li>
              <Link to="/about">ABOUT</Link>
            </li>
            <li>
              <Link to="/Noticeboard">입점문의</Link>
            </li>
            <li>
              <Link to="/support">고객센터</Link>
            </li>

            
          </ul>
        </nav>
      </div>
>>>>>>> 6cc517ca74e60226b9ac4d6196dea2cb9c99a954
    </header>
  );
}

export default Navbar;
<<<<<<< HEAD

/* 
 * Last Updated: 2025-12-19
 * - 전역 공통 Navbar 리팩토링 및 새로운 디자인 레이아웃 적용.
 */
=======
>>>>>>> 6cc517ca74e60226b9ac4d6196dea2cb9c99a954
