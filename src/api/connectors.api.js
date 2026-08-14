import axiosClient from './axiosClient'

export const getConnections = async () => {
  const response = await axiosClient.get('/connectors')
  return response.data.connections
}

export const disconnectConnector = async (provider) => {
  const response = await axiosClient.delete(`/connectors/${provider}`)
  return response.data
}
