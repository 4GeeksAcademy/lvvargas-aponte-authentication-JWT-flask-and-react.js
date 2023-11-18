"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.models import db, User
from api.utils import generate_sitemap, APIException
import os

api = Blueprint('api', __name__)


@api.route('/hello')
@jwt_required()
def handle_hello():

    email = get_jwt_identity()
    response_body = {
        "message": "Home Page of my JWT Project, " + email + " session has been authenticated!!!"
    }

    return jsonify(response_body), 200


@api.route('/private')
@jwt_required()
def handle_private():

    email = get_jwt_identity()
    response_body = {
        "message": "Only " + email + " can see this ;)"
    }

    return jsonify(response_body), 200

@api.route('/token', methods=['POST'])
def create_token():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        if existing_user.password == password:
            access_token = create_access_token(identity=email)
            return jsonify({"token": access_token, "email": email}), 200
        else:
            return jsonify({"message": "incorrect password"}), 401
    else:
        return jsonify({"message": "User not found"}), 404
           
@api.route('/signup', methods=['POST'])
def create_user():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({"message": "User with email entered already exists"}), 404
    else:
        new_user = User(email=email, password=password, is_active=True)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message":"User created successfully"}), 200

  
                       