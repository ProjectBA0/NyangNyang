<<<<<<< HEAD
from flask import Blueprint, jsonify, request 
from flask_jwt_extended import jwt_required, get_jwt_identity 
from petShop.models import db, Question # ✅ Question으로 변경

event_bp = Blueprint('event', __name__, url_prefix='/api/event')

@event_bp.get("")
@jwt_required(optional=True)
def get_events():
    # ✅ category='이벤트'인 게시글만 조회
    events = Question.query.filter_by(category='이벤트').order_by(Question.id.asc()).all()
    
    current_user = get_jwt_identity()
    is_admin = (current_user == 'admin')
    
    return jsonify({
        "items": [e.to_dict() for e in events],
        "is_admin": is_admin
    })

@event_bp.get("/<int:event_id>")
@jwt_required(optional=True) 
def get_event_detail(event_id):
    # ✅ Question 테이블에서 조회
    event = Question.query.get_or_404(event_id)
    
    # 관리자 여부 확인
    current_user = get_jwt_identity()
    is_admin = (current_user == 'admin')
    
    result = event.to_dict()
    result['is_admin'] = is_admin 
    
    return jsonify(result)

# ✅ 이벤트 등록 (Admin 전용)
@event_bp.post("")
@jwt_required()
def create_event():
    current_user = get_jwt_identity()
    if current_user != 'admin':
        return jsonify({"msg": "관리자만 접근 가능합니다."}), 403
        
    data = request.get_json()
    
    # ✅ 관리자 유저 객체 찾기
    from petShop.models import User
    admin_user = User.query.filter_by(user_id='admin').first()

    new_event = Question(
        title=data.get('title'),
        content=data.get('content'),
        img_url=data.get('img_url'),
        start_date=data.get('start_date'),
        end_date=data.get('end_date'),
        category='이벤트', # ✅ 카테고리 고정
        user_id=admin_user.id
    )
    db.session.add(new_event)
    db.session.commit()
    return jsonify({"msg": "이벤트가 등록되었습니다.", "id": new_event.id}), 201

# ✅ 이벤트 수정 (Admin 전용)
@event_bp.put("/<int:event_id>")
@jwt_required()
def update_event(event_id):
    current_user = get_jwt_identity()
    if current_user != 'admin':
        return jsonify({"msg": "관리자만 접근 가능합니다."}), 403
        
    event = Question.query.get_or_404(event_id)
    data = request.get_json()
    
    event.title = data.get('title', event.title)
    event.content = data.get('content', event.content)
    event.img_url = data.get('img_url', event.img_url)
    event.start_date = data.get('start_date', event.start_date)
    event.end_date = data.get('end_date', event.end_date)
    
    db.session.commit()
    return jsonify({"msg": "이벤트가 수정되었습니다."}), 200

# ✅ 이벤트 삭제 (Admin 전용)
@event_bp.delete("/<int:event_id>")
@jwt_required()
def delete_event(event_id):
    current_user = get_jwt_identity()
    if current_user != 'admin':
        return jsonify({"msg": "관리자만 접근 가능합니다."}), 403
        
    event = Question.query.get_or_404(event_id)
    db.session.delete(event)
    db.session.commit()
    return jsonify({"msg": "이벤트가 삭제되었습니다."}), 200

# [Gemini 작업 로그] - 26-01-04
# 1. 이벤트 API 생성: DB에서 이벤트 목록 및 상세 정보를 조회하는 엔드포인트 구현.
# 2. 관리자 기능 보강: POST, PUT, DELETE 메서드를 추가하여 이벤트의 생성/수정/삭제 기능 구현 (JWT 'admin' 체크).
# [추가 수정]
# 3. 테이블 통합 반영: Event 모델 대신 Question 모델(category='이벤트')을 사용하도록 전면 수정.


=======
from flask import Blueprint, jsonify, request, abort
from flask_jwt_extended import jwt_required, get_jwt_identity

from petShop.models import db, Question, User

event_bp = Blueprint("event", __name__, url_prefix="/api/event")


def _get_current_user(optional=False):
    user_id = get_jwt_identity()
    if not user_id:
        if optional:
            return None
        abort(401)

    user = User.query.get(user_id)
    if not user:
        abort(401)
    return user


def _is_admin(user: User) -> bool:
    return user and user.role == "ADMIN"


# ✅ 이벤트 목록 (비로그인도 가능)
@event_bp.get("")
@jwt_required(optional=True)
def get_events():
    user = _get_current_user(optional=True)

    events = (
        Question.query
        .filter_by(category="이벤트")
        .order_by(Question.id.asc())
        .all()
    )

    return jsonify({
        "items": [e.to_dict() for e in events],
        "is_admin": _is_admin(user),
    })


# ✅ 이벤트 상세 (비로그인도 가능)
@event_bp.get("/<int:event_id>")
@jwt_required(optional=True)
def get_event_detail(event_id):
    user = _get_current_user(optional=True)

    event = Question.query.filter_by(id=event_id, category="이벤트").first_or_404()

    result = event.to_dict()
    result["is_admin"] = _is_admin(user)
    return jsonify(result)


# ✅ 이벤트 등록 (ADMIN 전용)
@event_bp.post("")
@jwt_required()
def create_event():
    user = _get_current_user()

    if not _is_admin(user):
        return jsonify({"message": "관리자만 접근 가능합니다."}), 403

    data = request.get_json(silent=True) or {}

    title = (data.get("title") or "").strip()
    content = (data.get("content") or "").strip()

    if not title or not content:
        return jsonify({"message": "title/content는 필수입니다."}), 400

    new_event = Question(
        title=title,
        content=content,
        img_url=data.get("img_url"),
        start_date=data.get("start_date"),
        end_date=data.get("end_date"),
        category="이벤트",
        user_id=user.id,   # ✅ 하드코딩 X, 로그인한 ADMIN의 id
        writer=user.nickname,
        email=user.email,
    )

    db.session.add(new_event)
    db.session.commit()
    return jsonify({"message": "이벤트가 등록되었습니다.", "id": new_event.id}), 201


# ✅ 이벤트 수정 (ADMIN 전용)
@event_bp.put("/<int:event_id>")
@jwt_required()
def update_event(event_id):
    user = _get_current_user()

    if not _is_admin(user):
        return jsonify({"message": "관리자만 접근 가능합니다."}), 403

    event = Question.query.filter_by(id=event_id, category="이벤트").first_or_404()
    data = request.get_json(silent=True) or {}

    if "title" in data:
        event.title = (data["title"] or "").strip()
    if "content" in data:
        event.content = (data["content"] or "").strip()
    if "img_url" in data:
        event.img_url = data["img_url"]
    if "start_date" in data:
        event.start_date = data["start_date"]
    if "end_date" in data:
        event.end_date = data["end_date"]

    db.session.commit()
    return jsonify({"message": "이벤트가 수정되었습니다."}), 200


# ✅ 이벤트 삭제 (ADMIN 전용)
@event_bp.delete("/<int:event_id>")
@jwt_required()
def delete_event(event_id):
    user = _get_current_user()

    if not _is_admin(user):
        return jsonify({"message": "관리자만 접근 가능합니다."}), 403

    event = Question.query.filter_by(id=event_id, category="이벤트").first_or_404()

    db.session.delete(event)
    db.session.commit()
    return jsonify({"message": "이벤트가 삭제되었습니다."}), 200
>>>>>>> ca0d4aed4891690f38c174feb28b7b555157aa6d
