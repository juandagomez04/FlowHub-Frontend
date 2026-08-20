import axiosClient from './axiosClient'

export const getAutomations = async () => {
	const response = await axiosClient.get('/automations')
	return response.data.automations
}

export const getAutomation = async (id) => {
	const response = await axiosClient.get(`/automations/${id}`)
	return response.data.automation
}

export const createAutomation = async (data) => {
	const response = await axiosClient.post('/automations', data)
	return response.data.automation
}

export const updateAutomation = async (id, data) => {
	const response = await axiosClient.put(`/automations/${id}`, data)
	return response.data.automation
}

export const deleteAutomation = async (id) => {
	const response = await axiosClient.delete(`/automations/${id}`)
	return response.data
}

export const toggleAutomation = async (id) => {
	const response = await axiosClient.patch(`/automations/${id}/toggle`)
	return response.data.automation
}
