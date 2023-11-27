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


#Category routes
@api.route('/category', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    return jsonify([category.serialize() for category in categories]), 200


@api.route('/category', methods=['POST'])
def create_categories():
    data = request.get_json()
    category = Category(
        name=data.get('name')
    )
    db.session.add(category)
    db.session.commit()
    return jsonify(category.serialize()), 200



#Role routes
@api.route('/role', methods=['GET'])
def get_roles():
    roles = Role.query.all()
    return jsonify([role.serialize() for role in roles]), 200



@api.route('/role', methods=['POST'])
def create_roles():
    data = request.get_json()
    role = Role(
        title=data.get('title'),
        category_id=data.get('category_id')  # Add this line
    )
    db.session.add(role)
    db.session.commit()
    return jsonify(role.serialize()), 200




#Salary routes
@api.route('/salary', methods=['GET'])
def get_salaries():
    salaries = Salary.query.all()
    return jsonify([salary.serialize() for salary in salaries]), 200



@api.route('/salary', methods=['POST'])
def create_salaries():
    data = request.get_json()
    salary = Salary(
        amount=data.get('amount'),
        years_of_experience=data.get('years_of_experience'),
        city=data.get('city'),
        country=data.get('country'),
        user_id=data.get('user_id')
    )
    db.session.add(salary)
    db.session.commit()
    return jsonify(salary.serialize()), 200



