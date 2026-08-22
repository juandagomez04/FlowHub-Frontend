import axiosClient from './axiosClient'

export const login = async (credentials) => {
  const response = await axiosClient.post('/auth/login', credentials)
  return response.data
}

export const register = async (data) => {
  const response = await axiosClient.post('/auth/register', data)
  return response.data
}

export const changePassword = async (data) => {
  const response = await axiosClient.put('/auth/password', data)
  return response.data
}
