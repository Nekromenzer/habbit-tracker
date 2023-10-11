import axios from 'axios'
import urlDoc from './url'

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'

console.log(baseUrl)

const handleApiCall = ({
  variant = 'user',
  urlType,
  data,
  params,
  cb = returnData => returnData,
  setLoading = state => state,
  urlParams = '',
  auth
}) => {
  const url = `${baseUrl}${urlDoc[variant][urlType]?.url}${urlParams}`
  const method = urlDoc[variant][urlType]?.type
  console.log(url)
  async function handelCall () {
    setLoading(true)
    try {
      const response = await axios({
        method,
        url,
        data,
        params,
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth
            ? `Bearer ${localStorage.getItem('userToken')}`
            : ''
        }
      })
      setLoading(false)
      return cb(response.data, response.status)
    } catch (error) {
      setLoading(false)
      cb(error, error.response?.status)
      throw error
    }
  }
  return handelCall()
}

export default handleApiCall
