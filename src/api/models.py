from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()


class User(db.Model):
    __tablename__='users'
    id = db.Column(db.Integer, primary_key=True)
    username=db.Column(db.String(120), unique=True, nullable=False)
    name=db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'
    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "name": self.name,
            "email": self.email,
            " is_active ":self. is_active
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

class Category(db.Model):
    __tablename__='category'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)

    roles = db.relationship('Role', backref='category', lazy=True)

    def __repr__(self):
        return f'<Category {self.id} {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }

    
class Role(db.Model):
    __tablename__='roles'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False) # Specify the foreign key relationship

    def __repr__(self):
        return f'<Role {self.id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "category_id": self.category_id
        }


class Salary(db.Model):
    __tablename__='salary'
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    years_of_experience = db.Column(db.Integer, nullable=False)
    city = db.Column(db.String(120), nullable=False)
    country = db.Column(db.String(120), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)

    def __repr__(self):
        return f'<Salary {self.id} {self.amount}>'

    def serialize(self):
        return {
            "id": self.id,
            "amount": self.amount,
            "city" : self.city
        }