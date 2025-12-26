<<<<<<< HEAD
// 2025년 12월 19일 금요일: sendMessage import 경로 수정, 라우팅 병합 충돌 해결, 제품 이미지에 플레이스홀더 사용
import React, { useState } from "react";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PostForm from './components/PostForm';
import Category from './components/Category';
import { sendMessage } from "./api/port"; // Corrected import path
import './App.css'; // 기존 App.css를 유지하여 전체적인 스타일링 가능
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EventPage from "./pages/EventPage";
import MainPage from "./pages/MainPage";
import CustomerCenterPage from "./pages/CustomerCenterPage";
import { Route, Routes } from "react-router-dom";
import Chatbot from "./components/Chatbot";
=======
import React from "react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import PostForm from "./components/PostForm";
import Category from "./components/Category";
import Product from "./components/Product";

import "./App.css";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FindAccount from "./pages/FindAccount";
import CartPage from "./pages/Cart";
import OrderComplete from "./pages/OrderComplete/OrderComplete";

import MyPageLayout from "./pages/MyPage/MyPageLayout";

// 쇼핑정보
import OrderList from "./pages/MyPage/shopping/OrderList";
import ReturnCancel from "./pages/MyPage/shopping/ReturnCancel";
// 여기에 쇼핑리스트페이지 들어가야함~~~~

// 회원정보
import EditProfile from "./pages/MyPage/member/EditProfile";
import Withdraw from "./pages/MyPage/member/Withdraw";

// 기타
import MyQna from "./pages/MyPage/MyQna";
import MyReview from "./pages/MyPage/MyReview";

import Footer from './components/Footer'; // 2025-12-24: 공통 푸터 임포트
import WishlistPage from "./pages/WishlistPage"; // 2025-12-26: 찜목록 페이지 추가
import MainPage from "./pages/MainPage"; // 2025-12-24: 메인 페이지 복구
import EventPage from "./pages/EventPage"; // 2025-12-24: 이벤트 페이지 복구
import CustomerCenterPage from "./pages/CustomerCenterPage"; // 2025-12-24: 고객센터 페이지 복구
import Chatbot from "./components/Chatbot"; // 2025-12-24: 챗봇 복구
import Noticeboard from "./components/Noticeboard";
import Order from "./components/Order";
>>>>>>> 6cc517ca74e60226b9ac4d6196dea2cb9c99a954


/** ✅ 네비바가 필요한 페이지들의 공통 틀 */
function MainLayout() {
<<<<<<< HEAD
  // TODO: products 데이터는 추후 API를 통해 받아오도록 수정해야 합니다.
  const [products, setProducts] = useState([
    { id: 1, pet_type: 'dog', category: 'food', title: '튼튼 강아지 사료', price: 35000, views: 120, review_count: 12, imgUrl: '/api/images/placeholder.png' },
    { id: 2, pet_type: 'dog', category: 'toy', title: '삑삑이 공', price: 8000, views: 250, review_count: 25, imgUrl: '/api/images/placeholder.png' },
    { id: 3, pet_type: 'cat', category: 'food', title: '연어맛 고양이 캔', price: 2500, views: 300, review_count: 40, imgUrl: '/api/images/placeholder.png' },
    { id: 4, pet_type: 'cat', category: 'sand', title: '응고형 벤토나이트 모래', price: 12000, views: 180, review_count: 22, imgUrl: '/api/images/placeholder.png' },
  ]);

  return (
    <div className="MainLayout">
      <Navbar />
      <Routes>
        <Route path="/category/:pet/:sub?" element={<Category items={products} />} />
        <Route path="/form" element={<PostForm />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/customer-center" element={<CustomerCenterPage />} />
        {/* Add a default route for MainLayout if needed, e.g., for a homepage */}
        <Route path="/" element={<MainPage />} />
      </Routes>
      <Footer />
=======
  return (
    <div className="MainLayout">
      <Navbar />
      {/* ✅ 여기(Outlet)에 자식 페이지가 들어옴 */}
      <Outlet />
      <Footer /> {/* 2025-12-24: 하단 공통 푸터 배치 */}
      <Chatbot />
>>>>>>> 6cc517ca74e60226b9ac4d6196dea2cb9c99a954
    </div>
  );
}

<<<<<<< HEAD
function App() {
=======
export default function App() {
>>>>>>> 6cc517ca74e60226b9ac4d6196dea2cb9c99a954
  return (
    <div className="App">
      <Routes>
        {/* ✅ 네비바 없는 구역 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

<<<<<<< HEAD
        {/* 로그인 이후 메인 페이지 (MainLayout 포함) */}
        <Route path="/*" element={<MainLayout />} /> {/* Catch-all for MainLayout routes */}
=======
        {/* ✅ 네비바 있는 구역 */}
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<MainPage />} />

          {/* 기존 페이지들 */}
          <Route path="category/:pet/:sub?" element={<Category />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="form" element={<PostForm />} />
          <Route path="find-account" element={<FindAccount />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="order/complete" element={<OrderComplete />} />
          <Route path="/dog" element={<Category pet="dog" />} />
          <Route path="/cat" element={<Category pet="cat" />} />
          <Route path="/small" element={<Category pet="small" />} />
          <Route path="/events" element={<EventPage />} /> {/* Navbar의 /events와 매핑 */}
          <Route path="/support" element={<CustomerCenterPage />} /> {/* Navbar의 /support와 매핑 */}
          <Route path="/Noticeboard" element={<Noticeboard />} />
          <Route path="/order" element={<Order />} />

          {/* ✅ 마이페이지 */}
          <Route path="mypage" element={<MyPageLayout />}>
            <Route index element={<Navigate to="shopping/orders" replace />} />

            <Route path="shopping/orders" element={<OrderList />} />
            <Route path="shopping/returns" element={<ReturnCancel />} />
            {/* <Route path="shopping/wishlist" element={<WishList />} /> */}
            <Route path="/wishlist" element={<WishlistPage />} /> {/* 찜목록 (마이페이지) */}

            <Route path="member/edit" element={<EditProfile />} />
            <Route path="member/withdraw" element={<Withdraw />} />

            <Route path="qna" element={<MyQna />} />
            <Route path="review" element={<MyReview />} />
          </Route>

          {/* 네비바 있는 구역의 404 */}
          <Route path="*" element={<div>페이지를 찾을 수 없습니다.</div>} />
        </Route>

        {/* 전체 404 */}
        <Route path="*" element={<div>페이지를 찾을 수 없습니다.</div>} />
>>>>>>> 6cc517ca74e60226b9ac4d6196dea2cb9c99a954
      </Routes>
      <Chatbot />
    </div>
  );
}

<<<<<<< HEAD
export default App;
=======
// ==============================================================================
// [Gemini 작업 로그] - 2025.12.26
// 1. 라우팅 추가: /wishlist (찜목록/마이페이지) 경로 등록 및 컴포넌트 임포트.
// 2. 레이아웃 유지: MainLayout 내부에 배치하여 Navbar/Footer 공통 적용.
// ==============================================================================
>>>>>>> 6cc517ca74e60226b9ac4d6196dea2cb9c99a954
