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


function MainLayout() {
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
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Routes>
        {/* 로그인 / 회원가입 (네비바, 푸터 없음) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 로그인 이후 메인 페이지 (MainLayout 포함) */}
        <Route path="/*" element={<MainLayout />} /> {/* Catch-all for MainLayout routes */}
      </Routes>
      <Chatbot />
    </div>
  );
}

export default App;