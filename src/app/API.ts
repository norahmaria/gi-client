import axios from 'axios'

const baseURL = 'http://server-gi.herokuapp.com/'
const API = axios.create({ baseURL, withCredentials: true })

export default API