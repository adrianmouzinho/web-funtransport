import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://funtransport-api.onrender.com',
})
