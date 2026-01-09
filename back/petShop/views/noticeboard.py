import math
from datetime import datetime
from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required, get_jwt_identity

<<<<<<< HEAD
from petShop.models import db, Question, Answer, User
=======
from petShop.models import Question, User  # ✅ User 추가 (role 확인용)
>>>>>>> 6bde93c2e91dffc611d88090c1a083bec45f7f21

board_bp = Blueprint("board", __name__, url_prefix="/api/board")

PER_PAGE_MAX = 50
<<<<<<< HEAD
PAGE_GROUP = 10 
=======
PAGE_GROUP = 10  # 프론트 PAGE_GROUP와 맞추기

>>>>>>> 6bde93c2e91dffc611d88090c1a083bec45f7f21

@board_bp.route("", methods=["GET", "OPTIONS"])
@board_bp.route("/", methods=["GET", "OPTIONS"])
@cross_origin()
@jwt_required(optional=True)
def board_list():
    # preflight 처리(브라우저가 OPTIONS 먼저 보내는 경우)
    if request.method == "OPTIONS":
        return jsonify({"ok": True}), 200

<<<<<<< HEAD
    current_user_id = get_jwt_identity()
=======
    # ✅ 토큰이 있으면 user_id, 없으면 None
    user_id = get_jwt_identity()
>>>>>>> 6bde93c2e91dffc611d88090c1a083bec45f7f21

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

    # =========================
    # ✅ 권한 필터 (정책 2번)
    # 비회원: NOTICE만
    # 로그인:
    #   - ADMIN: 전체
    #   - USER : NOTICE + 본인글
    # =========================
    if user_id is None:
        # 비회원이면 공지만
        q = q.filter(Question.board_type == "NOTICE")
    else:
        # 로그인한 경우 role 확인
        user = User.query.get(user_id)

        # 토큰은 있는데 유저가 없으면(비정상) -> 공지만 보여주기(안전)
        if not user:
            q = q.filter(Question.board_type == "NOTICE")
        else:
            if user.role == "admin":
                # ADMIN이면 전체 (필터 없음)
                pass
            else:
                # 일반 유저면 공지 + 본인글
                q = q.filter(
                    (Question.board_type == "NOTICE") | (Question.user_id == user_id)
                )

    # 정렬은 필터 후 적용
    q = q.order_by(Question.id.desc())

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

        # created_at/create_date 등 너희 모델 필드명에 따라 달라질 수 있음
        if getattr(row, "create_date", None):
            date_str = row.create_date.strftime("%Y-%m-%d")
        elif getattr(row, "created_at", None):
            date_str = row.created_at.strftime("%Y-%m-%d")
        else:
            date_str = ""

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
        })

    start_page = ((page - 1) // PAGE_GROUP) * PAGE_GROUP + 1
    end_page = min(start_page + PAGE_GROUP - 1, total_pages)

    return jsonify({
        "items": result,
        "page": page,
        "total_pages": total_pages,
        "start_page": start_page,
        "end_page": end_page,
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