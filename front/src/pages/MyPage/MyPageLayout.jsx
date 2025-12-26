// src/pages/MyPage/MyPageLayout.jsx
import { Outlet } from "react-router-dom";
import MyPagemenu from "./MyPagemenu"; // 파일명이 MyPagemenu.jsx라면 이대로

export default function MyPageLayout() {
  return (
    <div style={{ display: "flex", gap: "20px", width: "1200px", margin: "0 auto", padding: "20px 0" }}>
      {/* 왼쪽 고정 메뉴 */}
      <div style={{ width: "220px" }}>
        <MyPagemenu />
      </div>

      {/* 오른쪽 바뀌는 영역 */}
      <div style={{ flex: 1, border: "1px solid #eee", padding: "20px", borderRadius: "8px" }}>
        <Outlet />
      </div>
    </div>
  );
}
