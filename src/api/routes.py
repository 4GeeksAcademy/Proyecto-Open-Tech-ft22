"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Login, Salary
from api.utils import generate_sitemap, APIException
from flask_cors import cross_origin, CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
# from flask_mail import Mail, Message

api = Blueprint('api', __name__)
CORS(api)


@api.route('/hello', methods=['POST'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200



@api.route('/register', methods=['POST'])
def signUp():
    username = request.json.get("username", None)
    name = request.json.get("name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    existing_user_email = User.query.filter_by(email=email).first()
    existing_user_username = User.query.filter_by(username=username).first()
    if existing_user_email is not None or existing_user_username is not None:
        return jsonify({"msg": "email or username already registered"}), 401
    user = User(
        username=username,
        name=name,
        email=email,
        password=password,
        is_active=True
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({"success": "User added succesfully"}), 200



@api.route('/login', methods=['POST'])
def create_token():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(username=username, password=password).first()
    if user is None:
        return jsonify({"msg": "Please check your username or password, something went wrong."}), 401
    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user": user.serialize(), "success": "User logged in succesfully"}), 200



#Salary routes
@api.route('/salary', methods=['GET'])
def get_salaries():
    salaries = Salary.query.all()
    return jsonify([salary.serialize() for salary in salaries]), 200



@api.route('/salary', methods=['POST'])
def create_salaries():
    print(data)
    try:
        data = request.get_json()
        """salary = Salary(
            category=data.get('category'),
            role=data.get('role'),
            amount=data.get('amount'),
            years_of_experience=data.get('years_of_experience'),
            city=data.get('city'),
            country=data.get('country'),
            user_id=data.get('user_id')
        )
        db.session.add(salary)
        db.session.commit()
        return jsonify(data), 200"""
    except Exception as e:
        return str(e), 500

