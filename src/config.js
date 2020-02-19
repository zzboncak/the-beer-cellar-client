let API_ENDPOINT = (process.env.NODE_ENV === 'development') ? 'http://localhost:8000/api' : 'https://secret-plateau-55760.herokuapp.com/api';

export default {
    API_ENDPOINT: API_ENDPOINT,
    LOCAL_API_ENDPOINT: 'http://localhost:8000/api',
    TOKEN_KEY: 'the-beer-cellar-key'
}