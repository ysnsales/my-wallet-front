import axios from "axios";

const BASE_URL = 'https://mywallet-api-4ozb.onrender.com';

function signIn(body) {
    const promise = axios.post(`${BASE_URL}/sign-in`, body);
    return promise;
};

function signUp(body) {
    const promise = axios.post(`${BASE_URL}/sign-up`, body);
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
    const promise = axios.get(`${BASE_URL}/home`, createConfig(token));
    return promise;

}

function createTransaction(token, body){
    const promise = axios.get(`${BASE_URL}/transactions`, body, createConfig(token));
    return promise;
}

const api = {
    signIn,
    signUp,
    getTransaction,
    createTransaction
};

export default api