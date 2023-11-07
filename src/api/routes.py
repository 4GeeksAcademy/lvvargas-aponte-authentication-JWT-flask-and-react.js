"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token, JWTManager, get_jwt_identity
from api.models import db, User
from api.utils import generate_sitemap, APIException
import os

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/login', methods=['POST'])
def handle_login():
        email = request.json.get('email', None)
        password = request.json.get('password', None)

        user = User.query.filter_by(email=email, password=password).first()

        if email != None or password != None:
            return jsonify({"message": "Bad Username or Password"}), 401
        elif user is None:
             return jsonify({"message": "User not found"}), 401
    
        access_token = create_access_token(identity=user.id)
        return jsonify({"token": access_token, "user_id": user.id})
                       