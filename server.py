import os

from bottle import get, static_file, template, run, default_app

DEBUG = os.environ.get('DEBUG', False)


@get('/')
def index():
    return template('template/static/index.html')


@get('/about')
def about():
    return template('template/static/about.html')


@get('/app')
def app():
    return static_file('index.html', root='app')


@get('/assets/<path:path>')
def static(path):
    return static_file(path, root='assets')


if DEBUG:
    run(host='localhost', port=8081, debug=True)
else:
    app = default_app()
