import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS, cross_origin
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager, create_access_token
from flask_mail import Mail, Message
from api.models import User

# Load environment variables
app = Flask(__name__)
app.config['FLASK_APP_KEY'] = os.environ.get('FLASK_APP_KEY') #this was after the heroku thing
app.config['BASENAME'] = os.environ.get('BASENAME')

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app.url_map.strict_slashes = False

# database configuration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

mail_settings = {
    "MAIL_SERVER": 'smtp.gmail.com',
    "MAIL_PORT": 465,
    "MAIL_USE_TLS": False,
    "MAIL_USE_SSL": True,
    "MAIL_USERNAME": 'teest4geeks12@gmail.com',
    "MAIL_PASSWORD": 'ahyz rgmy igtb yclg'
}

app.config.update(mail_settings)
mail = Mail(app)

app.config["JWT_SECRET_KEY"] = "super-secret"
jwt = JWTManager(app)
# Allow CORS requests to this API
CORS(app, supports_credentials=True)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with an "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

@app.route('/api/sendemail', methods=['POST'])
def send_email():
    email = request.json.get("email", None)
    print(email, app.config.get("MAIL_USERNAME"))

    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"msg": "User with this email doesn't exist."}), 401

    token = create_access_token(identity=user.email)
    link = "https://fuzzy-eureka-gwq77j979pfvrvr-3000.app.github.dev/set_newpassword?token=" + token

    message = Message(
        subject="Worst Movies Website - Reset your Password",
        sender=app.config.get("MAIL_USERNAME"),
        recipients=[email],
        html="<img src='https://i.postimg.cc/RVH9yJfR/movie-resized-logo.png' height='200' /><br><br>This is an automatic message from the Worst Movies Website registration system.<br><br><br> We received a request to reset the password for the Worst Movies Website account associated with this email address. If you made this request, please follow the instructions below. <br><br> Click the following link to reset your password:<br><a href='" + link + "'> Reset Password </a> <br><br> If you did not make this request, please ignore this email. <br><br> Regards, <br> Worst Movies Website help"
    )

    mail.send(message)

    return jsonify({"msg": "success"}), 200

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
