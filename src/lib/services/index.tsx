import axiosbase from 'axios'


export const api = axiosbase.create({
  baseURL: process.env.API_URL || 'http://localhost:3000',  // TODO: move this info to .env
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  responseType: 'json',
  xsrfHeaderName: "X-CSRF-Token",
  withCredentials: true,
})


export const fetcher = async (endPoint, options = {}) => {
  const result = await api.get(
    endPoint,
    options
  )
    .then(res => {
       if (!(res.status === 200)) throw new Error(res.statusText)
      return res.data
    })
  return result
}
