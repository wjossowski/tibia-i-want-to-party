import axios from 'axios'

export default axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_REST_API_PORT}/api/v1`,
  responseType: 'json',
})
