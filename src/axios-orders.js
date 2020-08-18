import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://react-my-burger-e1ac8.firebaseio.com/'
})

export default axiosInstance;