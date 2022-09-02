import { useState } from "react";

export const useFetching = (callBack) => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetching = async (...data) => {
    try {
      setIsLoading(true)
      return await callBack(...data)
    } catch (e) {
      setError(e.message)
    } finally {
      setIsLoading(false)
    }
  }

  return [fetching, isLoading, error]
}
