import axios from 'axios'

const baseURL = 'https://server-gi.herokuapp.com/'
const API = axios.create({ baseURL, withCredentials: true })

export default API