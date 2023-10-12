import axios from 'axios';

const instance = axios.create({
   baseURL: 'https://ourmoni-5fa7c-default-rtdb.firebaseio.com/',
});

instance.defaults.headers.common['Authorization'] = '';

export default instance;