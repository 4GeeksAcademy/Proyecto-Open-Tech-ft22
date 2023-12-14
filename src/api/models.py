from flask_sqlalchemy import SQLAlchemy
import cloudinary
from datetime import datetime
from datetime import datetime, timedelta
db = SQLAlchemy()

class User(db.Model):
    __tablename__='users'
    id = db.Column(db.Integer, primary_key=True)
    username=db.Column(db.String(120), unique=True, nullable=False)
    name=db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    is_active = db.Column(db.Boolean(), nullable=False)
    role = db.Column(db.Enum('USER', 'ADMIN', name='role_types'), default='USER')

    def __repr__(self):
        return f'<User {self.email}>'
    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "name": self.name,
            "email": self.email,
            " is_active ":self. is_active,
            "role": self.role
            # do not serialize the password, its a security breach
        }
    
class Login(db.Model):
    __tablename__='login'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    def __repr__(self):
        return f'<User {self.email}>'
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            " is_active ":self. is_active
            # do not serialize the password, its a security breach
        }


class Salary(db.Model):
    __tablename__='salary'
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(120), nullable=False)
    role = db.Column(db.String(120), nullable=False)
    years_of_experience = db.Column(db.Integer, nullable=False)
    country = db.Column(db.String(120), nullable=False)
    city = db.Column(db.String(120), nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    pdf = db.Column(db.String(200), default="")
    public_id = db.Column(db.String(200), default="")
    pdf_optimized = db.Column(db.String(200), default="")  # New field to store the optimized PDF URL
    is_verified = db.Column(db.Boolean(), default=False)
    is_in_history = db.Column(db.Boolean(), default=False)
    user = db.relationship('User', backref=db.backref('salaries', lazy=True))

    def __repr__(self):
        return f'<Salary {self.id} {self.amount}>'

    def serialize(self): #This is to include in JSON response when fetching items from our API
        return {
            "id": self.id,
            "category": self.category,
            "role": self.role,
            "years_of_experience": self.years_of_experience,
            "country": self.country,
            "city" : self.city,
            "amount": self.amount,
            "pdf": self.pdf,
            "pdf_optimized": self.pdf_optimized,  # Return the saved optimized URL
            "is_verified": self.is_verified,
            "is_in_history": self.is_in_history,
            "user_id": self.user_id,
            "user": {
                "name": self.user.name,
                "email": self.user.email
            }
        }
    
    def get_optimized_url(self, public_id, format="auto", quality="auto"):

        url = cloudinary.utils.cloudinary_url(
            f"v1/salaries/{public_id}",
            transformation=[{'quality': quality, 'fetch_format': format}],
            secure=True  # Use HTTPS
        )

        self.pdf_optimized = url[0]  # Save the optimized URL to the new field
        db.session.commit()  # Commit the changes to the database

        return url[0]  # The URL is at position 0 of the returned tuple
    
def get_chile_time():
    utc_now = datetime.utcnow()
    chile_offset = timedelta(hours=-3)  # Change this to -3 during daylight saving time
    chile_time = utc_now + chile_offset
    return chile_time
    
class History(db.Model):
    __tablename__='history'
    id = db.Column(db.Integer, primary_key=True)
    salary_id = db.Column(db.Integer, db.ForeignKey('salary.id'))  # New field to store the original salary ID
    role = db.Column(db.String(120), nullable=False)
    years_of_experience = db.Column(db.Integer, nullable=False)
    country = db.Column(db.String(120), nullable=False)
    city = db.Column(db.String(120), nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    is_verified = db.Column(db.Boolean(), default=False)
    created_at = db.Column(db.DateTime, default=get_chile_time)
    updated_at = db.Column(db.DateTime, default=get_chile_time, onupdate=get_chile_time)

    def __repr__(self):
        return f'<History {self.id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "salary_id": self.salary_id,
            "role": self.role,
            "years_of_experience": self.years_of_experience,
            "country": self.country,
            "city": self.city,
            "amount": self.amount,
            "user_id": self.user_id,
            "is_verified": self.is_verified,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }