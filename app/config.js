const prod = {
    ASSETS_URL: 'http://localhost:8081/assets/',
    API_URL: 'http://localhost:8080/',
};

const dev = {
    ASSETS_URL: 'http://localhost:8081/assets/',
    API_URL: 'http://localhost:8080/',
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
