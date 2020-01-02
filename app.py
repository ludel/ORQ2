import os

from bottle import get, static_file, template, run, default_app, request, redirect

DEBUG = os.environ.get('DEBUG', False)
API = 'http://localhost:8080' if DEBUG else 'https://api.onregardequoi.net'


def slash_redirection(*args):
    return redirect(request.url + '/')


@get('/')
def index():
    return template('template/static/index.html')


@get('/about/')
@get('/about', apply=slash_redirection)
def about():
    return template('template/static/about.html')


@get('/sign-up/')
@get('/sign-up', apply=slash_redirection)
def sign_up():
    return template('template/static/signup.html', api=API)


@get('/sign-in/')
@get('/sign-in', apply=slash_redirection)
def sign_in():
    return template('template/static/signin.html', api=API)


@get('/app/')
def app():
    return template('template/app/index.html')


# App static files
@get('/app.js')
def app_js():
    return static_file('app.js', root='dist')


@get('/app.js.map')
def app_js_map():
    return static_file('app.js.map', root='dist')


@get('/app.css')
def app_css():
    return static_file('app.css', root='dist')


@get('/app.css.map')
def app_css_map():
    return static_file('app.css.map', root='dist')


# Favicon
@get('/favicon.ico')
def favicon():
    return static_file('img/icon/favicon.ico', root='assets')


# SEO static files
@get('/robots.txt')
def robots():
    return static_file('seo/robots.txt', root='assets')


@get('/sitemap.xml')
def sitemap():
    return static_file('seo/sitemap.xml', root='assets')


# Static assets
@get('/assets/<path:path>')
def static(path):
    return static_file(path, root='assets')


if DEBUG:
    run(host='localhost', port=8081, debug=True)
else:
    app = default_app()
