import axiosClient from './axiosClient'

export const getExecutions = async ({ automationId, status, limit = 100 } = {}) => {
	const response = await axiosClient.get('/executions', {
		params: {
			...(automationId ? { automationId } : {}),
			...(status ? { status } : {}),
			limit,
		},
	})

	return response.data.executions
}
