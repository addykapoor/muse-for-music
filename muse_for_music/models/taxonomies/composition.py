
from ... import db
from .helper_classes import TreeTaxonomy, ListTaxonomy


__all__ = ['Verarbeitungstechnik', 'MusikalischeWendung']


class Verarbeitungstechnik(db.Model, TreeTaxonomy):
    """DB Model for verarbeitungstechniken."""
    __tablename__ = 'verarbeitungstechnik'

    id = db.Column(db.Integer, primary_key=True)
    parent_id = db.Column(db.Integer, db.ForeignKey('verarbeitungstechnik.id', ondelete='CASCADE'))
    name = db.Column(db.String(120))
    description = db.Column(db.Text(), nullable=True)
    children = db.relationship('Verarbeitungstechnik',
                               backref=db.backref('parent',
                                                  remote_side=[id],
                                                  lazy='joined',
                                                  join_depth=1
                                                 )
                              )


class MusikalischeWendung(db.Model, TreeTaxonomy):
    """DB Model for doc."""
    __tablename__ = 'musikalische_wendung'

    id = db.Column(db.Integer, primary_key=True)
    parent_id = db.Column(db.Integer, db.ForeignKey('musikalische_wendung.id', ondelete='CASCADE'))
    name = db.Column(db.String(120))
    description = db.Column(db.Text(), nullable=True)
    children = db.relationship('MusikalischeWendung',
                               backref=db.backref('parent',
                                                  remote_side=[id],
                                                  lazy='joined',
                                                  join_depth=1
                                                 )
                              )
