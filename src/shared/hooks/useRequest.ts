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
          body:
            body instanceof FormData
              ? body
              : typeof body === 'object'
              ? JSON.stringify(body)
              : undefined,
          // You MUST leave the 'Content-Type' header empty when using FormData in fetch!!!
          // (FormData automatically sets them based on the values)
          headers:
            body instanceof FormData
              ? { ...headers }
              : {
                  // body-parser on backend needs this header to identify JSON body
                  'Content-Type': 'application/json',
                  ...headers,
                },
        })

        const responseData = await response.json()
        // Remove abort controller once we receive & parse the response
        activeHttpRequest.current = activeHttpRequest.current.filter(
          (v) => v !== abortController
        )

        // Throw error to catch for response out of 200
        if (!response.ok) {
          throw Error(responseData.message)
        }

        // if ok (200), stop spinner and return parsed data
        setIsLoading(false)

        return responseData
      } catch (err) {
        console.log(err)
        setError(err.message || 'Something went wrong.🙁 Please try again.')
        setIsLoading(false)
        throw err // -> you cannot chain .then but only catch
        // This is enough for our use case where we want to break out of try block
        // into the catch block and don't execute the rest of the lines in the try block.

        // return err -> this literally returns error object. not Promise

        // return Promise.reject(err) -> this returns rejected Promise and
        // can be chained with .then for further asynchronous tasks
      }
    },
    []
  )

  const clearError = () => {
    setError(null)
  }

  useEffect(() => {
    return () => {
      // We can ignore the warning because we do want to abort
      // all remaining components in the array when the caller component unmounts
      // eslint-disable-next-line
      activeHttpRequest.current.forEach((abortController) => {
        // abort all ongoing request on unmount
        abortController.abort()
      })
    }
  }, [])

  return { isLoading, sendRequest, error, clearError }
}
