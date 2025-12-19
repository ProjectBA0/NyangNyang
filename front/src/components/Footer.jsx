// 2025년 12월 19일 금요일: 공통 Footer 컴포넌트 생성
import React from 'react';

/**
 * 전역 푸터 컴포넌트
 * - 회사 정보, 고객센터, 소셜 미디어 링크를 포함합니다.
 * - 스타일은 App.css에 정의된 전역 클래스를 사용합니다.
 */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-col">
          <div className="footer-title">COMPANY INFO</div>
          <div className="footer-line">—</div>
          <div className="footer-line">회사명: (주)다잇단냥 | 대표자: Nyang</div>
          <div className="footer-line">주소: 경기도 어디구 고양이로 22</div>
          <div className="footer-line">사업자등록번호: 123-45-67890</div>
          <div className="footer-line">통신판매업신고: 제 2025-서울강남-0000호</div>
        </div>

        <div className="footer-col">
          <div className="footer-title">고객센터</div>
          <div className="footer-line" style={{ fontSize: '20px', fontWeight: 'bold' }}>031-123-4560</div>
          <div className="footer-line">평일 09:00 ~ 18:00 (점심시간 12:00 ~ 13:00)</div>
          <div className="footer-line">주말 및 공휴일 휴무</div>
        </div>

        <div className="footer-col">
          <div className="footer-title">SOCIAL</div>
          <div className="footer-line">Instagram</div>
          <div className="footer-line">YouTube</div>
          <div className="footer-line">Blog</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

/* 
 * Last Updated: 2025-12-19
 * - 전역 공통 Footer 컴포넌트 통합.
 */
