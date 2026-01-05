# back/seed.py
import os
import json
import sys
from datetime import datetime
import random
from werkzeug.security import generate_password_hash

# 현재 스크립트 위치(back/)를 sys.path에 추가하여 app.py를 찾을 수 있게 함
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import create_app
from petShop.models import db, Product, Question, User

# ✅ crawlers/data 경로
BASE_DATA_DIR = os.path.join(
    os.path.dirname(__file__),
    "data"
)

app = create_app()

with app.app_context():
    # =========================================================
    # 0️⃣ 기존 데이터 전체 삭제 (FK 고려 순서)
    # =========================================================
    db.session.query(Question).delete()
    db.session.query(Product).delete()
    db.session.query(User).delete()
    db.session.commit()
    print("🗑 기존 데이터 전체 삭제 완료")

    # =========================================================
    # 1️⃣ 계정 생성 (관리자 + 일반 유저)
    # =========================================================
    admin = User(
        user_id="admin",
        password=generate_password_hash("1234"),
        nickname="관리자",
        email="admin@example.com",
    )
    user1 = User(
        user_id="user1", password=generate_password_hash("1234"),
        nickname="고양이조아", email="user1@example.com"
    )
    user2 = User(
        user_id="user2", password=generate_password_hash("1234"),
        nickname="멍멍이조아", email="user2@example.com"
    )
    db.session.add_all([admin, user1, user2])
    db.session.flush()  # ✅ id 확보
    print("👤 사용자 계정들(admin, user1, user2) 생성 완료")

    # =========================================================
    # 2️⃣ 통합 게시판 데이터 생성 (Question 테이블)
    # =========================================================
    posts = [
        # --- 공지사항 ---
        Question(
            title="[배송공지] 설 연휴 배송 안내", category="공지사항", user_id=admin.id,
            content="""안녕하세요, 다잇다냥입니다.\n설 연휴 기간 배송 및 고객센터 운영 일정에 대해 안내해 드립니다.\n\n1. 배송 안내\n▶ 2월 12일 17시 이전 결제 : 당일 출고\n▶ 2월 12일 17시 이후 결제 : 2월 19일부터 순차 출고\n\n감사합니다.""", 
            created_date=datetime(2026, 1, 14)
        ),
        # --- 이벤트 ---
        Question(
            title="냥산타가 준비한 크리스마스 선물", category="이벤트", user_id=admin.id,
            start_date="2025.12.20", end_date="2025.12.31",
            img_url="/images/banner/event_banner1.png",
            content="""<h3>🎄 냥산타가 쏜다냥! 🎄</h3><p>우리 고양이 친구들을 위해 냥산타가 굴뚝 타고 선물을 가득 가져왔어냥!</p><br/><h4>🐟 인기 캔&간식 모음전</h4><p>우리 냥이가 환장하는 츄르, 참치캔, 동결건조 간식을 최대 50% 할인된 가격에 만나보라냥.</p><br/><h4>🏠 따뜻한 겨울 숨숨집</h4><p>추운 겨울에도 따끈하게 꿀잠 잘 수 있도록! 극세사 숨숨집과 온열 매트 특가 세일중이다냥!</p>"""
        ),
        Question(
            title="멍산타가 준비한 크리스마스 선물", category="이벤트", user_id=admin.id,
            start_date="2025.12.20", end_date="2025.12.31",
            img_url="/images/banner/event_banner2.png",
            content="""<h3>🎅 멍산타가 쏜다! 🎅</h3><p>댕댕이 친구들을 위해 멍산타가 양말 가득 선물을 담아왔어요!</p><br/><h4>🍖 인기 간식 모음전</h4><p>우리 강아지가 좋아하는 뼈다귀, 육포, 개껌을 최대 50% 할인된 가격에 만나보세요.</p><br/><h4>👕 따뜻한 겨울나기</h4><p>산책할 때 추위에 떨지 않도록! 기모 후드티와 패딩 조끼 특가 세일!</p>"""
        ),
        Question(
            title="신년맞이 전품목 세일", category="이벤트", user_id=admin.id,
            start_date="2025.12.20", end_date="2026.01.20",
            img_url="/images/banner/event_banner3.png",
            content="""<h3>🌅 2026년 새해 복 많이 받으세요!</h3><p>새해를 맞아 다잇다냥에서 전품목 감사 세일을 진행합니다.</p><br/><h4>🛍 세일 혜택</h4><ul><li>전품목 기본 <b>30% 파격 할인</b></li><li>5만원 이상 구매 시 무료배송</li><li>신년맞이 럭키박스 (선착순 100명)</li></ul><br/><p>새로운 시작, 다잇다냥과 함께 하세요!</p>"""
        ),
        Question(
            title="냥멍하라 1994", category="이벤트", user_id=admin.id,
            start_date="2025.12.20", end_date="2026.01.20",
            img_url="/images/banner/event_banner4.png",
            content="""<h3>📼 응답하라 냥멍이들! 1994 레트로 기획전</h3><p>그 시절 감성 그대로! 가격까지 <b>1994년 그때 그 가격</b>으로 되돌렸습니다!</p><br/><h4>💰 1994년 타임머신 가격</h4><ul><li>추억의 껌값으로 즐기는 '천원 삑삑이'</li><li>물가 상승 무시! 1994년 수준의 파격가 상품 대량 입고</li></ul><br/><h4>📺 90년대 감성 아이템</h4><ul><li>촌스러워서 더 귀여운 '할머니 조끼'</li><li>옛날 텔레비전 모양 스크래쳐</li></ul><br/><p>추억 여행과 함께 미친 가격을 경험해보세요!</p>"""
        ),
        # --- 고객문의 (배송) ---
        Question(title="배송 언제 오나요?", category="배송", user_id=user1.id, content="어제 주문했는데 언제 도착하는지 알고 싶어요. 빠른 배송 부탁드립니다!", created_date=datetime(2025, 12, 20)),
        Question(title="배송지 변경 가능한가요?", category="배송", user_id=user2.id, content="방금 주문을 했는데 이사 전 주소로 잘못 적었어요. 서울시 강남구... 로 변경 가능할까요?", created_date=datetime(2025, 12, 22)),
        Question(title="부분 배송 되나요?", category="배송", user_id=user1.id, content="주문한 물건 중 하나가 입고 지연이라고 알림이 왔는데, 나머지는 먼저 받을 수 있을까요?", created_date=datetime(2025, 12, 23)),
        
        # --- 고객문의 (결제) ---
        Question(title="카드 결제 취소하고 싶어요", category="결제", user_id=user2.id, content="실수로 중복 주문을 했습니다. 하나는 취소 처리 부탁드립니다.", created_date=datetime(2025, 12, 25)),
        Question(title="무통장 입금 확인 부탁드려요", category="결제", user_id=user1.id, content="오늘 오전 10시에 입금자명 '고양이조아'로 입금했습니다. 확인 부탁드려요.", created_date=datetime(2025, 12, 26)),
        Question(title="현금영수증 발급되나요?", category="결제", user_id=user2.id, content="무통장 입금으로 결제했는데 현금영수증 발급받고 싶습니다. 010-1234-5678로 신청합니다.", created_date=datetime(2025, 12, 27)),

        # --- 고객문의 (제품) ---
        Question(title="이 사료 유통기한이 어떻게 되나요?", category="제품", user_id=user1.id, content="대량 구매하려고 하는데 유통기한이 언제까지인지 궁금합니다. 넉넉한가요?", created_date=datetime(2025, 12, 28)),
        Question(title="강아지도 먹어도 되나요?", category="제품", user_id=user2.id, content="고양이 전용 츄르라고 되어있는데, 혹시 강아지에게 급여해도 문제 없는 성분인가요?", created_date=datetime(2025, 12, 29)),
        
        # --- 고객문의 (사이트이용) ---
        Question(title="회원 탈퇴는 어떻게 하나요?", category="사이트이용", user_id=user1.id, content="사이트 이용을 중단하려고 하는데 탈퇴 메뉴를 못 찾겠습니다. 어디에 있나요?", created_date=datetime(2025, 12, 30)),
        Question(title="아이디 찾기 기능이 안 돼요", category="사이트이용", user_id=user2.id, content="가입한 아이디를 잊어버려서 찾으려고 하는데, 핸드폰 인증 후에도 찾기가 안 됩니다.", created_date=datetime(2025, 12, 31)),
    ]
    
    db.session.add_all(posts)
    print("📢 통합 게시판(공지/이벤트/Q&A) 상세 데이터 복구 중...")

    # =========================================================
    # 3️⃣ JSON 파일 순회 → Product 생성
    # =========================================================
    products_to_add = []
    count = 0

    if os.path.exists(BASE_DATA_DIR):
        for root, dirs, files in os.walk(BASE_DATA_DIR):
            for filename in files:
                if not filename.endswith(".json"): continue
                file_path = os.path.join(root, filename)
                try:
                    with open(file_path, "r", encoding="utf-8") as f:
                        data = json.load(f)
                    rel_path = os.path.relpath(file_path, BASE_DATA_DIR)
                    path_parts = rel_path.split(os.sep)
                    pet_type = path_parts[0] if path_parts[0] in ("dog", "cat", "other") else "dog"
                    raw_cat = data.get("main_category", "기타")
                    category = raw_cat.split("_")[-1] if "_" in raw_cat else raw_cat
                    
                    product = Product(
                        title=data.get("re_title"),
                        content=f"브랜드: {data.get('brand','')}\n제조사: {data.get('maker','')}",
                        price=int(data.get("lprice", 0) or 0),
                        img_url=data.get("image", ""),
                        category=category,
                        sub_category=data.get("sub_category", ""),
                        pet_type=pet_type,
                        stock=100,
                        views=random.randint(100, 1000)
                    )
                    products_to_add.append(product)
                    count += 1
                except: pass

    if products_to_add:
        db.session.add_all(products_to_add)
        print(f"✅ 총 {count}개 Product 시드 중...")

    db.session.commit()
    print("🎉 모든 데이터(이벤트 + 고객센터) 복구 및 시드 작업 완료!")