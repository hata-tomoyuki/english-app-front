const API_URL =
    process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_API_URL_PRODUCTION
        : process.env.REACT_APP_API_URL;

console.log("Connecting to API:", API_URL);

export default API_URL;
