import axios from 'axios'

const baseURL = 'http://localhost:5005'
const API = axios.create({ baseURL, withCredentials: true })

export default API