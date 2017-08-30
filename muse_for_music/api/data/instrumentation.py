from flask import jsonify, url_for, request
from flask_restplus import Resource, marshal
from sqlalchemy.exc import IntegrityError


from . import api

from .models import instrumentation_model

from ... import db
from ...models.data.instrumentation import Instrumentation

ns = api.namespace('instrumentation', description='TODO.')


@ns.route('/')
class InstrumentationListResource(Resource):

    @ns.marshal_list_with(instrumentation_model)
    def get(self):
        return Instrumentation.query.all()

@ns.route('/<int:id>')
class InstrumentationResource(Resource):

    @ns.marshal_with(instrumentation_model)
    def get(self, id):
        instr = Instrumentation.query.filter_by(id=id).first()
        return instr

    def put(self, id):
        pass
