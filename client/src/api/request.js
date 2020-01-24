import axios from 'axios'

const request = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? `/api/v1`
      : 'http://localhost:8080/api/v1',
  responseType: 'json',
})

export default request
