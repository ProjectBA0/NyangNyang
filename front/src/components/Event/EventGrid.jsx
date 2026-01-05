import React from "react";
import styles from "./EventGrid.module.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // ✅ 네비게이션 훅 추가

/**
 * EventGrid Component
 * - Displays a grid of event cards with animation.
 */
export default function EventGrid({ items }) {
  const navigate = useNavigate(); // ✅

  // Animation Variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15 
      }
    }
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } }
  };

  // ✅ 클릭 핸들러
  const handleCardClick = (item) => {
    if (item.status === 'active') {
      navigate(`/events/${item.id}`);
    } else {
      alert("준비 중인 이벤트입니다!");
    }
  };

  return (
    <section className={styles.gridSection}>
      <motion.div 
        className={styles.grid}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {items.map((item) => (
          <div 
            key={item.id} 
            className={styles.itemWrapper} 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '20px',
              cursor: item.status === 'active' ? 'pointer' : 'default' // ✅ 커서 변경
            }}
            onClick={() => handleCardClick(item)} // ✅ 클릭 이벤트 연결
          >
            <motion.div 
              className={`${styles.card} ${item.status === 'preparing' ? styles.preparing : ''}`}
              variants={itemAnim}
              style={{ 
                padding: 0, // 이미지 꽉 차게 하기 위해 패딩 제거
                height: '310px', // 카드 높이 유지
                display: 'block', // 내부 flex 해제
                overflow: 'hidden'
              }}
            >
              {/* ✅ 이미지 영역: 카드 전체를 꽉 채움 */}
              {item.status === 'active' && item.img_url ? ( // ✅ imgUrl -> img_url 수정
                <img 
                  src={`${process.env.PUBLIC_URL}${item.img_url}`} // ✅ imgUrl -> img_url 수정
                  alt={item.title} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover', // 꽉 채우기
                    objectPosition: 'top', // 상단 기준 정렬 (잘림 방지)
                  }}
                />
              ) : (
                <div style={{ 
                  width: '100%', height: '100%', 
                  backgroundColor: '#f1f3f5',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#adb5bd', fontSize: '1.5rem', fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%)'
                }}>
                  COMING SOON
                </div>
              )}
            </motion.div>

            {/* ✅ 텍스트 영역: 카드 외부(아래)로 분리 */}
            <div className={styles.externalContent} style={{ paddingLeft: '10px' }}>
              <div className={styles.cardTitle} style={{ 
                fontSize: '1.6rem', // 카드 밖이므로 크기 적절히 조절
                color: '#343a40',
                marginBottom: '8px',
                zIndex: 1 // 내부 z-index 제거
              }}>
                {item.title}
              </div>
              <div className={styles.cardDate} style={{ 
                fontSize: '1.1rem',
                color: '#868e96',
                zIndex: 1
              }}>
                {item.date}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

// ==============================================================================
// [Gemini 작업 로그] - 26-01-04
// 1. 레이아웃 전면 수정:
//    - `card` 컨테이너 내부의 패딩을 제거하고 이미지가 100% 꽉 차도록 변경 (`object-fit: cover`).
//    - 상단 잘림 방지를 위해 `object-position: top` 적용.
// 2. 구성 요소 분리:
//    - 제목(`cardTitle`)과 기간(`cardDate`)을 `card` 외부 아래쪽으로 이동하여 가독성 향상.
// 3. 준비중 스타일 개선: 그라데이션 배경과 "COMING SOON" 문구로 변경.
// [추가 수정]
// 4. 상세 페이지 연결: `useNavigate`를 사용하여 카드 클릭 시 `/events/:id`로 이동.
// 5. 버그 수정: `imgUrl` -> `img_url`로 변수명 수정 (DB 모델과 일치).
// ==============================================================================

// ==============================================================================
// [Gemini 작업 로그] - 26-01-04
// 1. 레이아웃 전면 수정:
//    - `card` 컨테이너 내부의 패딩을 제거하고 이미지가 100% 꽉 차도록 변경 (`object-fit: cover`).
//    - 상단 잘림 방지를 위해 `object-position: top` 적용.
// 2. 구성 요소 분리:
//    - 제목(`cardTitle`)과 기간(`cardDate`)을 `card` 외부 아래쪽으로 이동하여 가독성 향상.
// 3. 준비중 스타일 개선: 그라데이션 배경과 "COMING SOON" 문구로 변경.
// [추가 수정]
// 4. 상세 페이지 연결: `useNavigate`를 사용하여 카드 클릭 시 `/events/:id`로 이동.
//    - 'active' 상태일 때만 이동하고 커서를 pointer로 변경.
// ==============================================================================

// ==============================================================================
// [Gemini 작업 로그] - 26-01-04
// 1. 레이아웃 전면 수정:
//    - `card` 컨테이너 내부의 패딩을 제거하고 이미지가 100% 꽉 차도록 변경 (`object-fit: cover`).
//    - 상단 잘림 방지를 위해 `object-position: top` 적용.
// 2. 구성 요소 분리:
//    - 제목(`cardTitle`)과 기간(`cardDate`)을 `card` 외부 아래쪽으로 이동하여 가독성 향상.
// 3. 준비중 스타일 개선: 그라데이션 배경과 "COMING SOON" 문구로 변경.
// ==============================================================================

// ==============================================================================
// [Gemini 작업 로그] - 26-01-04
// 1. Grid 아이템 렌더링 수정:
//    - `imgUrl`이 있는 경우 `<img>` 태그로 배너 이미지 표시.
//    - `status`가 'preparing'인 경우 회색 박스 placeholder 표시.
// 2. 스타일 보강: 인라인 스타일을 사용하여 이미지 비율 및 텍스트 레이아웃 조정.
// [추가 수정]
// 3. 이미지 상단 잘림 방지: `object-fit: contain` 및 `aspect-ratio: 16 / 7` 적용.
// ==============================================================================

// ==============================================================================
// [Gemini 작업 로그] - 26-01-04
// 1. Grid 아이템 렌더링 수정:
//    - `imgUrl`이 있는 경우 `<img>` 태그로 배너 이미지 표시.
//    - `status`가 'preparing'인 경우 회색 박스 placeholder 표시.
// 2. 스타일 보강: 인라인 스타일을 사용하여 이미지 비율 및 텍스트 레이아웃 조정.
// ==============================================================================
