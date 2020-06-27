import { useEffect, useState, useCallback, useRef } from 'react'

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE'
type RequestBody = Request
type RequestHeader = {
  [header: string]: string
}

export const useRequest = () => {
  const [isLoading, setIsLoading] = useState(false)

  const [error, setError] = useState<string | null>(null)
  const activeHttpRequest = useRef<AbortController[]>([])

  // Reference: https://dev.to/webcoderkz/my-fetch-wrapper-with-async-await-and-typescript-1158
  const sendRequest = useCallback(
    // TS > 2.3 supports default generic type parameter
    async <T, B = undefined>(
      url: string,
      method: RequestMethod = 'GET',
      body: B | undefined = undefined,
      headers: RequestHeader = {}
    ): Promise<T | undefined> => {
      setIsLoading(true)
      const abortController = new AbortController()
      activeHttpRequest.current.push(abortController)

      try {
        const response = await fetch(url, {
          method,
          signal: abortController.signal,
          body: typeof body === 'object' ? JSON.stringify(body) : undefined,
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
        })
        const responseData = await response.json()
        if (!response.ok) {
          throw Error(responseData.message)
        }
        return responseData
      } catch (err) {
        console.log(err)
        setError(err.message || 'Something went wrong.🙁 Please try again.')
      }
      setIsLoading(false)
    },
    []
  )

  const clearError = () => {
    setError(null)
  }

  useEffect(() => {
    return () => {
      // We can ignore the warning because we do want to abort
      // whichever components left in the array when the caller component unmounts
      activeHttpRequest.current.forEach((abortController) => {
        abortController.abort()
      })
    }
  }, [])

  return { isLoading, sendRequest, error, clearError }
}
