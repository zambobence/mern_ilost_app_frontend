import React, {useState} from 'react'

export default function useHttpClient() {
    const [isLoading, setIsLoading] = useState(false)
    const [errorStatus, setErrorStatus] = useState(null)

    const sendRequest = async (
        url,
        method = "GET",
        headers={"Content-Type": "application/json"},
        body
        ) => {
        const completeHeader = {"Content-Type": "application/json", ...headers}
        try {
            setIsLoading(true)
            const response = await fetch(url, {
                method,
                headers: completeHeader,
                body: JSON.stringify(body)
            })
            console.log(response)
            const responseData = await response.json()
            if (!response.ok){
                throw new Error(responseData.message)
            }

            setIsLoading(false)
            console.log(responseData)
            return responseData
        } catch(err){
            setErrorStatus(err.message)
            console.log(err.message)
            setIsLoading(false)
        }
    }

    const clearError = () => {
        setErrorStatus(null)
    }
  return {isLoading, errorStatus, clearError, sendRequest}
}
