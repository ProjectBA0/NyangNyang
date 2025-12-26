// 2025-12-24: 챗봇 컴포넌트 임시 생성
import React from 'react';

function Chatbot() {
  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 10000 }}>
      <button style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
        💬
      </button>
    </div>
  );
}

export default Chatbot;
