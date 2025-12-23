import axios from 'axios'

const API = axios.create({
    baseURL:'http://localhost:5000/api',
    withCredentials:true,
    headers:{
        'Content-Type':'application/json'
    }
});

export const authAPI = {
    register:(data)=>API.post('/auth/register',data),
    login:(data)=> API.post('/auth/login',data),
    logout:()=>API.post('/auth/logout'),
    verifyToken:()=>API.get('/auth/me')
};

console.log("auth token in localstorage = ",localStorage.getItem('authToken'))

export default API;