export default eventHandler(async (event) => {
	await requireUserSession(event)
	
	await clearUserSession(event)
	
	return {}
})