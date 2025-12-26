// 2025-12-24: 이벤트 페이지 상세 레이아웃 및 섹션 복구
import React from "react";
import styles from "./EventPage.module.css";

/**
 * EventPage Component
 * - 진행 중인 이벤트를 리스트 형태로 노출함.
 */
export default function EventPage() {
  const events = [
    { id: 1, title: "신규 회원 가입 혜택", desc: "지금 가입하고 할인 쿠폰 받으세요!" },
    { id: 2, title: "강아지 사료 기획전", desc: "인기 사료 최대 50% 할인" },
    { id: 3, title: "고양이 모래 특가", desc: "먼지 없는 모래 시리즈" },
    { id: 4, title: "소품몰 오픈 기념", desc: "아기자기한 장난감 무료 증정" },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.pageInner}>
        
        {/* 상단 이벤트 배너 */}
        <section className={styles.banner}>
          <div className={styles.bannerInner}>
            <h2 className={styles.bannerTitle}>NYANG EVENT</h2>
          </div>
        </section>

        <div style={{ height: "40px" }} />

        {/* 이벤트 그리드 */}
        <section className={styles.gridSection}>
          <div className={styles.grid}>
            {events.map(event => (
              <div key={event.id} className={styles.card}>
                <div style={{ textAlign: "center" }}>
                  <h3 style={{ marginBottom: "10px" }}>{event.title}</h3>
                  <p style={{ fontSize: "14px", color: "#666" }}>{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ height: "60px" }} />
      </div>
    </div>
  );
}

/* 
 * Last Updated: 2025-12-24
 * - 이벤트 페이지 배너 및 2열 그리드 레이아웃 복구 완료.
 */