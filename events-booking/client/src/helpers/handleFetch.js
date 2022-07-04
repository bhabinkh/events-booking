
const handleFetch = async (requestBody, token = null) => {
    try {
        const response = await fetch('http://localhost:5005/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                Authorization: token ? `Bearer ${token}` : ''
            }
        })
        const data = await response.json()
        return data
    } catch (err) {
        console.log(err)
        throw err
    }
}

export default handleFetch
