"""Module containing default config values."""


class Config(object):
    DEBUG = False
    TESTING = False
    BCRYPT_HANDLE_LONG_PASSWORDS = True
    SQLALCHEMY_DATABASE_URI = 'sqlite://:memory:'
    WEBPACK_MANIFEST_PATH = './build/manifest.json'
    LOG_FORMAT = '%(asctime)s [%(levelname)s] [%(name)-16s] %(message)s <%(module)s, \
                 %(funcName)s, %(lineno)s; %(pathname)s>'
    AUTH_LOG_FORMAT = '%(asctime)s [%(levelname)s] %(message)s'


class ProductionConfig(Config):
    pass


class DebugConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:////tmp/test.db'
    JWT_SECRET_KEY = 'debug'  # FIXME
    LOG_PATH = '/tmp'


class TestingConfig(Config):
    TESTING = True
    LOG_PATH = '/tmp'
