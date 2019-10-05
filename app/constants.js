import {config} from "./config";

export default {
    bgStyle: {
        color: {
            backgroundColor: '#020D18'
        },
        image: {
            backgroundImage: `linear-gradient(rgba(2, 13, 24, 0.9), rgba(2, 13, 24, 0.9)), url("${config.ASSETS_URL}img/banner.jpg")`,
            backgroundSize: 'contain'
        }
    },

    VO: {
        'de': 'Allemand',
        'en': 'Anglais',
        'ar': 'Arabe',
        'eu': 'Basque',
        'br': 'Breton',
        'ca': 'Catalan',
        'zh-Hans': 'Chinois',
        'zh-Hant': 'Chinois_traditionnel',
        'ko': 'Coréen',
        'co': 'Corse',
        'es': 'Espagnol',
        'eo': 'Espéranto',
        'fr': 'Français',
        'el': 'Grec',
        'he': 'Hébreu',
        'hi': 'Hindi',
        'id': 'Indonésien',
        'it': 'Italien',
        'ja': 'Japonais',
        'ku': 'Kurde',
        'la': 'Latin',
        'mn': 'Mongol',
        'nl': 'Néerlandais',
        'ne': 'Népalais',
        'oc': 'Occitan',
        'ur': 'Ourdou',
        'fa': 'Persan',
        'pl': 'Polonais',
        'pt': 'Portugais',
        'ru': 'Russe',
        'ta': 'Tamoul',
        'th': 'Thaï',
        'tr': 'Turc',
        'vi': 'Vietnamien',
    }
}
