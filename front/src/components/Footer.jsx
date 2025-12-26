// 2025-12-24: 공통 Footer 컴포넌트 복구 및 생성
import React from 'react';

/**
 * 전역 푸터 컴포넌트
 */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-col">
          <div className="footer-title">COMPANY INFO</div>
          <div className="footer-line">—</div>
          <div className="footer-line">회사명: (주)다잇다냥 | 대표자: Nyang</div>
          <div className="footer-line">주소: 경기도 어디구 고양이로 22</div>
          <div className="footer-line">사업자등록번호: 123-45-67890</div>
        </div>

        <div className="footer-col">
          <div className="footer-title">고객센터</div>
          <div className="footer-line" style={{ fontSize: '20px', fontWeight: 'bold' }}>031-123-4560</div>
          <div className="footer-line" style={{ whiteSpace: 'nowrap' }}>
            평일 09:00 ~ 18:00 (점심 12:00 ~ 13:00) | 주말 휴무
          </div>
        </div>

        <div className="footer-col">
          <div className="footer-title">SOCIAL</div>
          <div className="social-icons">
            <div className="social-item">📸 Instagram</div>
            <div className="social-item">📺 YouTube</div>
            <div className="social-item">📝 Naver Blog</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

/* 
 * Last Updated: 2025-12-24
 * - 전역 공통 Footer 컴포넌트 복구 완료.
 */
