import os

from bottle import get, static_file, template, run, default_app

DEBUG = os.environ.get('DEBUG', False)


@get('/')
def index():
    return template('template/static/index.html')

@get('/about')
def about():
    return template('template/static/about.html')

@get('/app/')
def app():
    return template('template/app/index.html')


# App static files
@get('/app.js')
def app():
    return static_file('app.js', root='dist')

@get('/app.js.map')
def app():
    return static_file('app.js.map', root='dist')

@get('/app.css')
def app():
    return static_file('app.css', root='dist')

@get('/app.css.map')
def app():
    return static_file('app.css.map', root='dist')


# Favicon
@get('/favicon.ico')
def app():
    return static_file('img/icon/favicon.ico', root='assets')


# SEO static files
@get('/robots.txt')
def app():
    return static_file('seo/robots.txt', root='assets')

@get('/sitemap.xml')
def app():
    return static_file('seo/sitemap.xml', root='assets')


# Static assets
@get('/assets/<path:path>')
def static(path):
    return static_file(path, root='assets')


if DEBUG:
    run(host='localhost', port=8081, debug=True)
else:
    app = default_app()
