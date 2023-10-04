import axios from 'axios'

const API = 'http://localhost:3001/api/v1'

const instance = axios.create({
    baseURL: API,
    withCredentials: true, //es para establecer las cookies en axios
});

export default instance