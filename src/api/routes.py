"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Login, Salary
from api.utils import generate_sitemap, APIException
from flask_cors import cross_origin, CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
import datetime
import cloudinary
from cloudinary.uploader import upload

# from flask_mail import Mail, Message

api = Blueprint('api', __name__)
CORS(api)

cloudinary.config(
    cloud_name = os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key = os.getenv('CLOUDINARY_CLOUD_API_KEY'),
    api_secret = os.getenv('CLOUDINARY_CLOUD_API_SECRET'),
    secure=True
)


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
        password=generate_password_hash(password),
        is_active=True
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({"success": "User added succesfully"}), 200



@api.route('/login', methods=['POST'])
def create_token():
    username = request.json.get("username") # None
    password = request.json.get("password") # None
    
    if not username:
        return jsonify({ "error": "Username es obligatorio"}), 400
    
    if not password:
        return jsonify({ "error": "Password es obligatorio"}), 400
    
    userFound = User.query.filter_by(username=username).first()
    
    if not userFound:
        return jsonify({ "error": "username/password son incorrectos!!"}), 401
    
    if not check_password_hash(userFound.password, password):
        return jsonify({ "error": "username/password son incorrectos!!"}), 401
    
    expires = datetime.timedelta(days=3)
    access_token = create_access_token(identity=userFound.id, expires_delta=expires)
    
    return jsonify({"token": access_token, "user": userFound.serialize(), "success": "User logged in succesfully"}), 200



#Salary routes
@api.route('/salary', methods=['GET'])
def get_salaries():
    salaries = Salary.query.all()
    return jsonify([salary.serialize() for salary in salaries]), 200



@api.route('/salary', methods=['POST'])
def create_salaries():
    pdf = None
    category = ""
    role = ""
    amount = ""
    years_of_experience = ""
    city = ""
    country = ""
    user_id = ""


    if not 'category' in request.form:
        return jsonify({ "msg": "Category is required"}), 400 
    
    if not 'role' in request.form:
        return jsonify({ "msg": "Role is required"}), 400 
    
    if not 'amount' in request.form:
        return jsonify({ "msg": "Amount is required"}), 400 
    
    if not 'years_of_experience' in request.form:
        return jsonify({ "msg": "Years of experience is required"}), 400 
    
    if not 'city' in request.form:
        return jsonify({ "msg": "City is required"}), 400 
    
    if not 'country' in request.form:
        return jsonify({ "msg": "Country is required"}), 400 
    
    category = request.form['category']
    role = request.form['role']
    amount = request.form['amount']
    years_of_experience = request.form['years_of_experience']
    city = request.form['city']
    country = request.form['country']
    user_id = request.form['user_id']


    if 'pdf' in request.files:
        pdf = request.files['pdf']


    respA = None
    if pdf is not None:
        respA = upload(pdf, folder="salaries")
        if respA:
            pdf = respA['secure_url']
        else:
            return jsonify({ "msg": "Error al subir el pdf"}), 400


    salary = Salary(
        category=category,
        role=role,
        amount=amount,
        years_of_experience=years_of_experience,
        city=city,
        country=country,
        user_id=user_id,
        pdf=pdf
    )
    db.session.add(salary)
    db.session.commit()
    return jsonify({"salary": salary.serialize(), "success": "Form submitted succesfully"}), 200


