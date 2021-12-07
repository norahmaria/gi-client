import axios from 'axios'

// TODO: Set url

const baseURL = ''
// const baseURL = 'http://localhost:5005/'

const API = axios.create({ baseURL, withCredentials: true })

export default API