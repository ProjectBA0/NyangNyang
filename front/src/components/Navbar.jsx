// 2025년 12월 19일 금요일: Navbar 컴포넌트를 EventPage의 Header 디자인으로 교체
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * 전역 네비게이션 바 컴포넌트
 */
function Navbar() {
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
    </header>
  );
}

export default Navbar;

/* 
 * Last Updated: 2025-12-19
 * - 전역 공통 Navbar 리팩토링 및 새로운 디자인 레이아웃 적용.
 */
