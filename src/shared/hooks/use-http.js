import React, { useState } from 'react';

export default function useHttpClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(null);

  const sendRequest = async (url, method = 'GET', headers = {}, body) => {

      const requestConfig = {
        method: method,
        headers: {...headers} 
      };

      if (body instanceof FormData) {
        // No need to set Content-Type for FormData
        requestConfig.body = body;
      } else {
         requestConfig.headers = {...requestConfig.headers, 'Content-Type': 'application/json'};
        requestConfig.body = JSON.stringify(body);
       }
      try {
        setIsLoading(true);
        const response = await fetch(url, requestConfig);
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData;
    } catch (err) {
      setErrorStatus(err.message);
      setIsLoading(false);
    }
  };


  const clearError = () => {
    setErrorStatus(null);
  };

  return { isLoading, errorStatus, clearError, sendRequest };
}
