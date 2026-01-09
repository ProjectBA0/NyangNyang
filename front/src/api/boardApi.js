// src/api/boardApi.js
import client from "./client";

// page/perPage 파라미터는 나중에 페이지 버튼 만들 때 그대로 씀
export async function fetchBoard(page = 1, perPage = 10, category = "전체") {
  const res = await client.get("/api/board/", {
    params: { page, per_page: perPage, category },
  });
<<<<<<< HEAD
  return res.data;
}

// ✅ 상세 조회 API 추가
export async function fetchBoardDetail(id) {
  const res = await client.get(`/api/board/${id}`);
  return res.data;
}

// ✅ 삭제 API 추가
export async function deleteBoard(id) {
  const res = await client.delete(`/api/board/${id}`);
=======
}

export async function fetchNotice() {
  const res = await client.get("/api/board/notices");
>>>>>>> ca0d4aed4891690f38c174feb28b7b555157aa6d
  return res.data;
}