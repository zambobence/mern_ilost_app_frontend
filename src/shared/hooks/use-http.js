import React, { useState } from 'react';

export default function useHttpClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(null);

  const sendRequest = async (url, method = 'GET', headers = {}, body) => {

    console.log('Within the send request hook')
    console.log(url)
    console.log(headers)
    console.log(body)

      const requestConfig = {
        method: method,
        headers: {...headers} 
      };

      if (body instanceof FormData) {
        console.log('Body is: ')
        console.log(body instanceof FormData)
        // No need to set Content-Type for FormData
        requestConfig.body = body;
        console.log(requestConfig.body)
      } else {
        console.log('It is json')
        requestConfig.headers = {...requestConfig.headers, 'Content-Type': 'application/json'};
        requestConfig.body = JSON.stringify(body);
        console.log(requestConfig)
      }
      try {
        setIsLoading(true);
        const response = await fetch(url, requestConfig);
        const responseData = await response.json();
        console.log(responseData)
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData;
    } catch (err) {
      setErrorStatus(err.message);
      console.log(err.message);
      setIsLoading(false);
    }
  };


  const clearError = () => {
    setErrorStatus(null);
  };

  return { isLoading, errorStatus, clearError, sendRequest };
}
