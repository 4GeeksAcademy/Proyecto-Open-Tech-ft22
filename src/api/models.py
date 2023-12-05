from flask_sqlalchemy import SQLAlchemy
import cloudinary
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

    def __repr__(self):
        return f'<Salary {self.id} {self.amount}>'

    def serialize(self):
        return {
            "id": self.id,
            "category": self.category,
            "role": self.role,
            "years_of_experience": self.years_of_experience,
            "country": self.country,
            "city" : self.city,
            "amount": self.amount,
            "pdf": self.pdf,
            "pdf_optimized": self.get_optimized_url(self.public_id)
        }
    
    def get_optimized_url(self, public_id, format="auto", quality="auto"):

        url = cloudinary.utils.cloudinary_url(
            f"v1/salaries/{public_id}",
            transformation=[{'quality': quality, 'fetch_format': format}],
            secure=True  # Use HTTPS
        )

        return url[0]  # The URL is at position 0 of the returned tuple