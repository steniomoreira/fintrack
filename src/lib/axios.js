import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://fullstackclub-finance-dashboard-api.onrender.com/api',
})
