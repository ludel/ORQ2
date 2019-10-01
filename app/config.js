const vo = {
    'de': 'allemand',
    'en': 'anglais',
    'ar': 'arabe',
    'eu': 'basque',
    'br': 'breton',
    'ca': 'catalan',
    'zh-Hans': 'chinois',
    'zh-Hant': 'chinois_traditionnel',
    'ko': 'coréen',
    'co': 'corse',
    'es': 'espagnol',
    'eo': 'espéranto',
    'fr': 'français',
    'el': 'grec',
    'he': 'hébreu',
    'hi': 'hindi',
    'id': 'indonésien',
    'it': 'italien',
    'ja': 'japonais',
    'ku': 'kurde',
    'la': 'latin',
    'mn': 'mongol',
    'nl': 'néerlandais',
    'ne': 'népalais',
    'oc': 'occitan',
    'ur': 'ourdou',
    'fa': 'persan',
    'pl': 'polonais',
    'pt': 'portugais',
    'ru': 'russe',
    'ta': 'tamoul',
    'th': 'thaï',
    'tr': 'turc',
    'vi': 'vietnamien',
};

const prod = {
    ASSETS_URL: 'https://onregardequoi/assets/',
    API_URL: 'http://[ip-public]/',
    VO: vo
};

const dev = {
    ASSETS_URL: 'http://localhost:8081/assets/',
    API_URL: 'http://localhost:8080/',
    VO: vo
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
