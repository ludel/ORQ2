const prod = {
    ASSETS_URL: 'http://51.75.27.95:8003/assets/',
    API_URL: 'http://51.75.27.95:8002/',
};

const dev = {
    ASSETS_URL: 'http://localhost:8081/assets/',
    API_URL: 'http://localhost:8080/',
};
export const config = process.env.DEBUG === 'True' ? dev : prod;
