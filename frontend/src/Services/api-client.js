import axios from 'axios';

export default axios.create({
    baseURL:'https://dokanly-server.vercel.app/api/v1'
})