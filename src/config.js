export default {
    //isProd: process.env.REACT_APP_isProd,
    // getEndpoint() {
    //     return process.env.REACT_APP_isProd ? this.API_ENDPOINT : this.LOCAL_API_ENDPOINT
    // },
    API_ENDPOINT: process.env.REACT_APP_LOCAL_API_ENDPOINT || 'https://secret-plateau-55760.herokuapp.com/api',
    LOCAL_API_ENDPOINT: 'http://localhost:8000/api',
    TOKEN_KEY: 'the-beer-cellar-key'
}