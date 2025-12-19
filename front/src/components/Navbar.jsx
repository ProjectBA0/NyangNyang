// 2025년 12월 19일 금요일: Navbar 컴포넌트를 EventPage의 Header 디자인으로 교체
import React from 'react';

/**
 * 전역 네비게이션 바 컴포넌트
 * - 로고, 검색창, 주 메뉴, 로그인/회원가입 링크를 포함합니다.
 * - 스타일은 App.css에 정의됩니다.
 */
function Navbar() {
  // TODO: 각 메뉴 클릭 시 실제 페이지로 이동하도록 <Link> 또는 navigate 사용 필요
  const navItems = ["강아지", "고양이", "소품몰", "EVENT", "ABOUT", "입점문의", "고객센터"];

  return (
    <header className="header-wrap">
      {/* 최상단 행: 로고 + 검색창 + 로그인/회원가입 */}
      <div className="header-top-row">
        <div className="logo-box" aria-label="logo-placeholder">
          LOGO
        </div>

        <div className="search-area">
          <div className="search-box" aria-label="search-placeholder">
            검색
          </div>
        </div>

        <div className="top-right-box">
          <div className="top-right-inner">로그인 / 회원가입</div>
        </div>
      </div>

      {/* 네비게이션 바 */}
      <nav className="nav-bar" aria-label="main-nav">
        <div className="nav-inner">
          {navItems.map((label) => (
            <div key={label} className="nav-item">
              {label}
            </div>
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
