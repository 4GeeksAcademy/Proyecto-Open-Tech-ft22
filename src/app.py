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
CORS(app, resources={r"/*": {"origins": "*"}})


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

# Handle CORS for the specific route
@app.route('/api/admin/user', methods=['POST', 'OPTIONS'])
def admin_user_route():
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS preflight request successful"}), 200

    # Your route logic goes here
    # ...

    response = jsonify({"message": "Your response message"})
    
    # Add the necessary CORS headers
    response.headers.add('Access-Control-Allow-Origin', 'https://vigilant-space-enigma-6jr7jq96pw73x4rg-3000.app.github.dev')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    return response


@app.route('/api/salary', methods=['POST', 'OPTIONS'])
def handle_salary():
    if request.method == 'OPTIONS':
        # Pre-flight request. Reply successfully:
        return jsonify(success=True), 200
    elif request.method == 'POST':
        # Handle POST request
        ...




# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)

