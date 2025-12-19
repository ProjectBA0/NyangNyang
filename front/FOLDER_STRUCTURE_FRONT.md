# Frontend Project Structure & Component Guide

본 문서는 **Nyang** 프로젝트 프론트엔드의 폴더 구조와 각 파일에 적용된 핵심 요소들을 정리한 가이드입니다. (최종 업데이트: 2025-12-19)

---

## 1. 폴더 구조 트리 (src/)

```text
front/
├── public/                 # 정적 자원 (이미지, 파비콘 등)
└── src/
    ├── api/                # API 통신 관련 로직
    ├── components/         # 전역 공통 컴포넌트
    │   ├── Navbar.jsx      # 전역 헤더 (Logo, Search, Nav)
    │   └── Footer.jsx      # 전역 푸터 (Company Info)
    ├── pages/              # 페이지 단위 컴포넌트
    │   ├── MainPage.jsx    # 메인 랜딩 페이지
    │   ├── EventPage.jsx   # 이벤트 목록 페이지
    │   └── EventPage.module.css # 이벤트 페이지 전용 스타일
    ├── App.jsx             # 메인 엔트리 및 라우팅 설정
    ├── App.css             # 전역 스타일 및 레이아웃 변수 (핵심)
    └── index.js            # React 렌더링 시작점
```

---

## 2. 파일별 상세 역할 및 적용 요소

### [ 전역 설정 및 스타일 ]
#### `src/App.css`
*   **역할**: 프로젝트 전체의 뼈대와 디자인 시스템을 관리합니다.
*   **적용 요소**:
    *   **Layout Variables**: `--page-width: 1920px`, `--content-width: 1200px` 규격 정의.
    *   **Debug System**: 모든 섹션에 고유 배경색(반투명) 및 사이즈 라벨 부여.
    *   **Section Colors**: 헤더(파랑계열), 슬라이더(청록), 카테고리(갈색), 상품(남색), 하단(올리브/자주) 등.

#### `src/App.jsx`
*   **역할**: 전체 라우팅과 공통 레이아웃(`MainLayout`)을 정의합니다.
*   **적용 요소**:
    *   `MainLayout`: 모든 페이지에 `Navbar`와 `Footer`가 자동으로 포함되도록 조립.
    *   `React Router`: `/`, `/event`, `/login`, `/signup` 경로 연결.

---

### [ 공통 컴포넌트 (src/components/) ]
#### `Navbar.jsx`
*   **역할**: 상단 고정 헤더 영역을 담당합니다.
*   **적용 요소**: 160x160 로고 박스, 800px 검색창, 7개 주요 메뉴(강아지, 고양이, EVENT 등) 포함.
*   **디버그**: 하늘색(`Cyan`) 라벨 적용.

#### `Footer.jsx`
*   **역할**: 하단 회사 정보 및 고객센터 영역을 담당합니다.
*   **적용 요소**: 
    *   **Layout**: 전체 1920px 중 중앙 1200px 영역에만 검은색 배경 적용.
    *   **Contents**: 기업 정보, CS 센터, 소셜 미디어 링크 3단 구성.

---

### [ 페이지 컴포넌트 (src/pages/) ]
#### `MainPage.jsx`
*   **역할**: 서비스의 첫 화면을 구성합니다.
*   **적용 요소**:
    *   **Sections**: Slider, CategoryBand, ProductGrid(5열), BottomInfoRow(리뷰/공지).
    *   **Style**: 전적으로 `App.css`의 클래스 시스템을 따름.

#### `EventPage.jsx` & `.module.css`
*   **역할**: 이벤트 및 프로모션 내용을 그리드 형태로 보여줍니다.
*   **적용 요소**: 
    *   **Banner**: 상단 대형 이벤트 홍보 영역.
    *   **Event Grid**: 2열 구성의 이벤트 카드 리스트.
    *   **Scoped Style**: `.module.css`를 사용하여 이벤트 페이지만의 고유 색상(주황, 인디고 등) 적용.

---

## 3. 레이아웃 검증 가이드 (Debug Tip)
화면에서 각 박스 우측 하단(또는 좌측 상단)에 표시되는 라벨을 통해 영역을 검증할 수 있습니다.
- **하늘색 라벨**: 전역 공통 요소 (Header, Footer 영역)
- **노란색 라벨**: 개별 페이지 콘텐츠 요소 (Slider, Card, Section 등)
- **색상 구분**: 인접한 섹션은 항상 다른 배경색을 가지도록 배치되어 겹침 현상을 즉시 파악 가능합니다.
