"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Login, Salary, History
from api.utils import generate_sitemap, APIException
from flask_cors import cross_origin, CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
import datetime
import cloudinary
from cloudinary.uploader import upload, destroy

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
    role = request.json.get("role", 'USER')  # Default to 'USER' if no role is provided

    existing_user_email = User.query.filter_by(email=email).first()
    existing_user_username = User.query.filter_by(username=username).first()
    if existing_user_email is not None or existing_user_username is not None:
        return jsonify({"msg": "email or username already registered"}), 401
    user = User(
        username=username,
        name=name,
        email=email,
        password=generate_password_hash(password),
        is_active=True,
        role=role
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({"success": "User added succesfully"}), 200



@api.route('/login', methods=['POST'])
def create_token():
    username = request.json.get("username") # None
    password = request.json.get("password") # None
    
    if not username:
        return jsonify({ "error": "Missing username"}), 400
    
    if not password:
        return jsonify({ "error": "Missing password"}), 400
    
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
    public_id = None  # Initialize public_pdf
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
        respA = upload(pdf, folder="salaries", allowed_formats=["pdf"])
        if respA:
            pdf = respA['secure_url']
            public_id = respA['public_id'].replace('salaries/', '')  # Remove the 'salaries/' prefix
        else:
            return jsonify({ "msg": "Error al subir el pdf"}), 400


    salary = Salary (
        category=category,
        role=role,
        amount=amount,
        years_of_experience=years_of_experience,
        city=city,
        country=country,
        user_id=user_id,
        pdf=pdf,
        public_id=public_id,  # Add the public_id to the Salary instance
        is_verified=False,
        is_in_history=False
    )

    if public_id is not None:
        salary.get_optimized_url(public_id)  # Generate and save the optimized URL

    db.session.add(salary)
    db.session.commit()
    return jsonify({"salary": salary.serialize(), "success": "Form submitted succesfully"}), 200

@api.route('/salary/<int:id>', methods=['GET'])
def get_salary_by_id(id):
    salary = Salary.query.get(id)
    if salary is None:
        raise APIException('Salary not found', status_code=404)
    
    # Now you can access the user's email with user.email
    return jsonify(salary.serialize()), 200



@api.route('/salary/<int:salary_id>/verify', methods=['PUT'])
def verify_salary(salary_id):
    salary = Salary.query.get(salary_id)
    if salary is None:
        return jsonify({"error": "Salary not found"}), 404

    data = request.get_json()
    if 'is_verified' in data:
        salary.is_verified = data['is_verified']
        db.session.commit()

        # Add a record to the history table
        history = History(
            salary_id=salary.id,
            role=salary.role,
            years_of_experience=salary.years_of_experience,
            country=salary.country,
            city=salary.city,
            amount=salary.amount,
            user_id=salary.user_id,
            is_verified=salary.is_verified
        )
        db.session.add(history)

        # Update is_in_history to True
        salary.is_in_history = True

        # Delete the salary record
        # Clear the pdf field in the Salary model
        salary.pdf = "PDF deleted after verified"
        salary.pdf_optimized = ""
        db.session.commit()

    return jsonify(salary.serialize()), 200

@api.route('/salary/<int:salary_id>/reject', methods=['PUT'])
def reject_salary(salary_id):
    salary = Salary.query.get(salary_id)
    if salary is None:
        return jsonify({"error": "Salary not found"}), 404

    salary.is_verified = False
    db.session.commit()

    # Add a record to the history table
    history = History(
        salary_id=salary.id,
        role=salary.role,
        years_of_experience=salary.years_of_experience,
        country=salary.country,
        city=salary.city,
        amount=salary.amount,
        user_id=salary.user_id,
        is_verified=False
    )
    db.session.add(history)

    # Update is_in_history to True
    salary.is_in_history = True

    # Clear the pdf field in the Salary model
    salary.pdf = "PDF deleted after rejection"
    salary.pdf_optimized = ""
    db.session.commit()

    return jsonify(salary.serialize()), 200



@api.route('/history', methods=['POST'])
def add_history():
    data = request.get_json()
    history = History(
        salary_id=data['salary_id'],
        role=data['role'],
        years_of_experience=data['years_of_experience'],
        country=data['country'],
        city=data['city'],
        amount=data['amount'],
        user_id=data['user_id'],
        is_verified=data['is_verified']
    )
    db.session.add(history)
    db.session.commit()

    return jsonify(history.serialize()), 201

@api.route('/history', methods=['GET'])
def get_history():
    history = History.query.all()
    return jsonify([item.serialize() for item in history]), 200



