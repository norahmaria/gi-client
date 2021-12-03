import axios from 'axios'

// TODO: Set url
const baseURL = 'https://server-gi.herokuapp.com/'
// const baseURL = 'http://localhost:5005/'
const API = axios.create({ baseURL, withCredentials: true })

export default API