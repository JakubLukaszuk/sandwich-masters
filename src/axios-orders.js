import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://sandwitch-masters-fire-base.firebaseio.com/',
})

export default instance;

