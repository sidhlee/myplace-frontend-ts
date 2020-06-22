# MERN App - MyPlace Run3

Frontend application built with TypeScript

## Debugging Notes

### Fetch calls return 304 & .env variables return undefined

- You need to restart the development server after changing .env file.

### Get request to the right server address fails with no response

- Is `Access-Control-Allow-Origin` header is set on the server?

```bash
Access to fetch at 'http://localhost:5000/api/users' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the requests mode to 'no-cors' to fetch the resource with CORS disabled.
```
