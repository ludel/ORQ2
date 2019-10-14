const prod = {
    ASSETS_URL: 'https://onregardequoi.net//assets/',
    API_URL: 'https://api.onregardequoi.net/',
};

const dev = {
    ASSETS_URL: 'http://localhost:8081/assets/',
    API_URL: 'http://localhost:8080/',
};
export const config = process.env.DEBUG === 'True' ? dev : prod;
