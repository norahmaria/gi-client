import axios from 'axios'

// TODO: Set url

const baseURL = 'https://server-gi.herokuapp.com/'
// const baseURL = process.env.REACT_APP_API_URL
// const baseURL = 'http://localhost:5005/'

const API = axios.create({ baseURL, withCredentials: true })

export default API