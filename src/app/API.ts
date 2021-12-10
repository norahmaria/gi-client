import axios from 'axios'
import env from 'dotenv'

env.config()
const baseURL = process.env.APIURL || 'http://localhost:5005/'
const API = axios.create({ baseURL, withCredentials: true })

export default API