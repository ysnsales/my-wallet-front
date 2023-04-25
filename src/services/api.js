import axios from "axios";

const REACT_APP_API_URL = 'https://mywallet-api-4ozb.onrender.com';

function signIn(body) {
    const promise = axios.post(`${REACT_APP_API_URL}/sign-in`, body);
    return promise;
};

function signUp(body) {
    const promise = axios.post(`${REACT_APP_API_URL}/sign-up`, body);
    return promise;
};

function createConfig(token){
    return{
        headers: {
            Authorization: `Bearer ${token}`
        }
}
}

function getTransaction(token){
    const promise = axios.get(`${REACT_APP_API_URL}/home`, createConfig(token));
    return promise;
}

function createTransaction(token, body, type){
    const promise = axios.post(`${REACT_APP_API_URL}/transactions/${type}`, body, createConfig(token));
    return promise;
}

const api = {
    signIn,
    signUp,
    getTransaction,
    createTransaction
};

export default api;