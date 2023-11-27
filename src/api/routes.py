"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Login, Category, Role, Salary
from api.utils import generate_sitemap, APIException
from flask_cors import cross_origin, CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
# from flask_mail import Mail, Message

api = Blueprint('api', __name__)
#CORS(api) commented to debug


@api.route('/hello', methods=['POST'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/registration', methods=['POST'])
def signUp():
    username = request.json.get("username", None)
    name = request.json.get("name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    existing_user_email = User.query.filter_by(email=email).first()
    existing_user_username = User.query.filter_by(username=username).first()
    if existing_user_email is not None or existing_user_username is not None:
        return jsonify({"msg": "email or username all already registered"}), 401
    user = User(
        username=username,
        name=name,
        email=email,
        password=password,
        is_active=True
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "User added succesfully"}), 200


@api.route('/login', methods=['POST'])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        return jsonify({"msg": "Please check your email or password, something went wrong."}), 401
    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user_id": user.id})


@api.route('/resetpassword', methods=['POST'])
@jwt_required()
def reset_password():
    email = get_jwt_identity()
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"msg": "User with this email doesn't exist."}), 401

    user.password = password
    db.session.commit()

    return jsonify({"msg": "success"}), 200

@api.route('/category', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    return jsonify([category.serialize() for category in categories]), 200

@api.route('/role', methods=['GET'])
def get_roles():
    roles = Role.query.all()
    return jsonify([role.serialize() for role in roles]), 200

@api.route('/salary', methods=['POST'])
@jwt_required()
def add_salary():
    data = request.json
    user_id = get_jwt_identity()

    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    salary = Salary(
        amount=data.get('amount'),
        years_of_experience=data.get('years_of_experience'),
        city=data.get('city'),
        country=data.get('country'),
        user_id=user_id
    )

    db.session.add(salary)
    db.session.commit()

    return jsonify({'message': 'Salary added successfully'}), 201

@api.route('/salary', methods=['GET'])
@jwt_required()
def get_salaries():
    user_id = get_jwt_identity()
    salaries = Salary.query.filter_by(user_id=user_id).all()
    return jsonify([salary.serialize() for salary in salaries]), 200
