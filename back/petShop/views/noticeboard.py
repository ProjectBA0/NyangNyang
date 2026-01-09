import math
from datetime import datetime
from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required, get_jwt_identity

<<<<<<< HEAD
<<<<<<< HEAD
from petShop.models import db, Question, Answer, User
=======
from petShop.models import Question, User  # ✅ User 추가 (role 확인용)
>>>>>>> 6bde93c2e91dffc611d88090c1a083bec45f7f21
=======
from petShop.models import Question, User
>>>>>>> ca0d4aed4891690f38c174feb28b7b555157aa6d

board_bp = Blueprint("board", __name__, url_prefix="/api/board")

PER_PAGE_MAX = 50
<<<<<<< HEAD
PAGE_GROUP = 10 
=======
PAGE_GROUP = 10  # 프론트 PAGE_GROUP와 맞추기

>>>>>>> 6bde93c2e91dffc611d88090c1a083bec45f7f21

def _get_user_from_identity():
    """
    ✅ auth.py에서 identity=user_id(문자열)로 토큰을 만들고 있음.
    그래서 여기서도 User.user_id로 조회해야 함.
    """
    ident = get_jwt_identity()  # 예: "admin" 또는 None
    if not ident:
        return None
    return User.query.filter_by(user_id=str(ident)).first()


def _is_admin(user: User | None) -> bool:
    return bool(user) and (user.role or "").upper() == "ADMIN"


@board_bp.route("", methods=["GET", "OPTIONS"])
@board_bp.route("/", methods=["GET", "OPTIONS"])
@cross_origin()
@jwt_required(optional=True)
def board_list():
    # preflight 처리(브라우저가 OPTIONS 먼저 보내는 경우)
    if request.method == "OPTIONS":
        return jsonify({"ok": True}), 200

<<<<<<< HEAD
<<<<<<< HEAD
    current_user_id = get_jwt_identity()
=======
    # ✅ 토큰이 있으면 user_id, 없으면 None
    user_id = get_jwt_identity()
>>>>>>> 6bde93c2e91dffc611d88090c1a083bec45f7f21
=======
    user = _get_user_from_identity()
>>>>>>> ca0d4aed4891690f38c174feb28b7b555157aa6d

    page = request.args.get("page", default=1, type=int)
    limit = request.args.get("per_page", default=10, type=int)
    category = request.args.get("category")

    page = max(page, 1)
    limit = max(1, min(limit, PER_PAGE_MAX))

<<<<<<< HEAD
    q = Question.query
    if category and category != "전체":
        q = q.filter(Question.category == category)
        
    q = q.order_by(Question.id.desc())
=======
    # ✅ 기본 쿼리
    q = Question.query
>>>>>>> 6bde93c2e91dffc611d88090c1a083bec45f7f21

    # ✅ 공지사항은 따로(/notices) 보여줄 거라서 목록에서는 제외
    q = q.filter(Question.category != "공지사항")

    # ✅ 리스트는 "보기만"이라서
    # - 비회원도 전부 보이게(공지 제외)
    # - 회원도 전부 보이게(공지 제외)
    # - 관리자도 전부 보이게(공지 제외)
    # ※ 디테일 접근 제한은 read_post에서 막는다

    # 정렬
    q = q.order_by(Question.created_date.desc())

    # 전체 개수/페이지 계산
    total = q.order_by(None).count()
    total_pages = max(1, math.ceil(total / limit))
<<<<<<< HEAD
    if page > total_pages: page = total_pages
=======

    if page > total_pages:
        page = total_pages
>>>>>>> 6bde93c2e91dffc611d88090c1a083bec45f7f21

    items = q.offset((page - 1) * limit).limit(limit).all()

    result = []
    for row in items:
<<<<<<< HEAD
        writer_id = row.user.user_id if row.user else None
        
        # ✅ 일반 사용자용: 본인 글일 때만 True
        # ✅ 관리자인 경우 모든 글에 대해 관리 권한을 갖지만, 표시(나)는 하지 않도록 분리
        is_owner = (current_user_id is not None) and (current_user_id != 'admin') and (current_user_id == writer_id)
=======
        title = getattr(row, "title", None) or getattr(row, "subject", "")
        view = getattr(row, "view_count", 0)

        date_str = row.created_date.strftime("%Y-%m-%d") if row.created_date else ""

<<<<<<< HEAD
        # writer가 row에 저장되어 있으면 그걸 쓰고, 없으면 user에서 추정
        writer = getattr(row, "writer", None) or "unknown"
        if writer == "unknown" and hasattr(row, "user") and row.user:
            writer = getattr(row.user, "nickname", "unknown")
>>>>>>> 6bde93c2e91dffc611d88090c1a083bec45f7f21

        result.append({
            "id": row.id,
            "title": row.title,
            "writer": row.user.nickname if row.user else "unknown",
            "date": row.created_date.strftime("%Y-%m-%d"),
            "category": row.category,
            "is_owner": is_owner
=======
        writer = row.user.nickname if getattr(row, "user", None) else "알수없음"

        result.append({
            "id": row.id,
            "title": title,
            "writer": writer,
            "date": date_str,
            "view": view,
            "category": row.category,
            # ✅ 비회원이면 디테일 불가(프론트에서 클릭 전에 안내 가능)
            "can_open_detail": True if user else False,
>>>>>>> ca0d4aed4891690f38c174feb28b7b555157aa6d
        })

    start_page = ((page - 1) // PAGE_GROUP) * PAGE_GROUP + 1
    end_page = min(start_page + PAGE_GROUP - 1, total_pages)

    return jsonify({
        "items": result,
        "page": page,
        "total_pages": total_pages,
        "start_page": start_page,
        "end_page": end_page,
<<<<<<< HEAD
        "is_admin": (current_user_id == 'admin') # ✅ 관리자 여부 상단에 포함
    }), 200

@board_bp.get('/<int:id>')
@jwt_required(optional=True)
def board_detail(id):
    q = Question.query.get_or_404(id)
    current_user_id = get_jwt_identity()
    writer_id = q.user.user_id if q.user else None
    
    is_admin = (current_user_id == 'admin')
    is_owner = (current_user_id is not None) and (current_user_id == writer_id)

    # 공지사항이거나 관리자이거나 작성자면 조회 가능
    if q.category == '공지사항' or is_admin or is_owner:
        return jsonify(to_dict_full(q, is_owner=is_owner, is_admin=is_admin)), 200
        
    return jsonify({"msg": "비공개 게시글입니다. 작성자만 확인할 수 있습니다."}), 403

@board_bp.put('/<int:id>')
@jwt_required()
def board_update(id):
    q = Question.query.get_or_404(id)
    current_user_id = get_jwt_identity()
    writer_id = q.user.user_id if q.user else None
    
    # ✅ 관리자 또는 본인만 수정 가능
    if current_user_id != 'admin' and current_user_id != writer_id:
        return jsonify({"msg": "수정 권한이 없습니다."}), 403
        
    data = request.get_json()
    q.title = data.get('title', q.title)
    q.content = data.get('content', q.content)
    q.modified_date = datetime.utcnow()
    db.session.commit()
    return jsonify({"msg": "게시글이 수정되었습니다."}), 200

@board_bp.delete('/<int:id>')
@jwt_required()
def board_delete(id):
    q = Question.query.get_or_404(id)
    current_user_id = get_jwt_identity()
    writer_id = q.user.user_id if q.user else None
    
    # ✅ 관리자 또는 본인만 삭제 가능
    if current_user_id != 'admin' and current_user_id != writer_id:
        return jsonify({"msg": "삭제 권한이 없습니다."}), 403
        
    db.session.delete(q)
    db.session.commit()
    return jsonify({"msg": "게시글이 삭제되었습니다.", "ok": True}), 200

@board_bp.post('')
@jwt_required()
def board_create():
    current_user_id = get_jwt_identity()
    user = User.query.filter_by(user_id=current_user_id).first()
    data = request.get_json()
    new_q = Question(
        title=data.get('title'), content=data.get('content'),
        category=data.get('category', '일반'), user_id=user.id
    )
    db.session.add(new_q)
    db.session.commit()
    return jsonify({"msg": "게시글이 등록되었습니다.", "id": new_q.id}), 201

# ✅ 답변 등록 API (Admin 전용)
@board_bp.post('/<int:id>/answer')
@jwt_required()
def create_answer(id):
    if get_jwt_identity() != 'admin':
        return jsonify({"msg": "관리자만 답변이 가능합니다."}), 403
    
    data = request.get_json()
    admin_user = User.query.filter_by(user_id='admin').first()
    new_a = Answer(
        question_id=id, user_id=admin_user.id,
        content=data.get('content'), created_date=datetime.utcnow()
    )
    db.session.add(new_a)
    db.session.commit()
    return jsonify({"msg": "답변이 등록되었습니다."}), 201

def to_dict_full(q, is_owner=False, is_admin=False):
    return {
        "id": q.id, "title": q.title, "content": q.content, "category": q.category,
        "writer": q.user.nickname if q.user else "알수없음",
        "date": q.created_date.strftime("%Y-%m-%d"),
        "img_url": q.img_url, "is_owner": is_owner,
        "is_admin": is_admin,
        "answers": [{
            "id": a.id, "content": a.content, "writer": "관리자",
            "date": a.created_date.strftime("%Y-%m-%d")
        } for a in q.answers] if hasattr(q, 'answers') else []
    }

# ==============================================================================
# [Gemini 작업 로그] - 26-01-04
# 1. 관리자 권한 강화: admin 계정은 모든 게시글 수정/삭제 가능.
# 2. 답변(Answer) 기능 구현: 관리자 전용 답변 등록 API 추가.
# 3. 데이터 통합: 게시판 상세 조회 시 답변 목록을 포함하여 반환.
# ==============================================================================
=======
        "has_prev": page > 1,
        "has_next": page < total_pages,
        "is_logged_in": bool(user),
        "is_admin": _is_admin(user),
    }), 200


@board_bp.get("/notices")
def list_notices():
    q = ((Question.query
          .filter(Question.category == "공지사항"))
         .order_by(Question.created_date.desc()))

    items = q.limit(3).all()

    return jsonify({
        "items": [
            {"id": n.id, "title": n.title, "date": n.created_date.strftime("%Y-%m-%d") if n.created_date else ""}
            for n in items
        ]
    }), 200


@board_bp.route("/<int:question_id>", methods=["GET", "OPTIONS"])
@jwt_required(optional=True)
def read_post(question_id):
    if request.method == "OPTIONS":
        return jsonify({"ok": True}), 200

    user = _get_user_from_identity()
    post = Question.query.get_or_404(question_id)

    # ✅ 공지사항은 누구나 디테일 가능
    if post.category == "공지사항":
        return jsonify({"item": post.to_dict()}), 200

    # ✅ 공지사항 아닌 글: 비회원은 디테일 불가
    if not user:
        return jsonify({"msg": "로그인이 필요합니다."}), 401

    # ✅ admin이면 전체 허용
    if _is_admin(user):
        return jsonify({"item": post.to_dict()}), 200

    # ✅ 일반 유저는 본인 글만
    if post.user_id != user.id:
        return jsonify({"msg": "권한이 없습니다."}), 403

    return jsonify({"item": post.to_dict()}), 200
>>>>>>> ca0d4aed4891690f38c174feb28b7b555157aa6d
