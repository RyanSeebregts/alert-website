import { apiUrl } from '../constants/global.constants'
import {getAuth} from 'firebase/auth';

type methodType = "POST" | "GET"

interface propTypes {
    data?: any
    method: methodType
    endpoint: string
    token?: string
    contentType?: string
}
const baseFetch = async (props: propTypes) => {
  const auth = await getAuth();

  let user = auth.currentUser
  let token = ''
  if(user) {
    token = await user.getIdToken()
  }
  else if(props.token) {
    token = props.token
  }

  let headers:any = {
    'x-auth-token': token
  }
  if(props.contentType !== 'none') {
    if(props.contentType)
      headers["Content-Type"] = props.contentType
    else 
      headers["Content-Type"] = 'application/json'
  }

  try {
      const result = await fetch(`${apiUrl}/${props.endpoint}${props.method === "GET" && props.data ? '?' + ( new URLSearchParams( props.data ) ).toString() : ''}`, {
          method: props.method,
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers,
          body: props.data && props.method !== "GET" ? JSON.stringify(props.data) : null,
        });
      const jsonResult = await result.json()
      if(jsonResult.ok)
          return jsonResult
      else 
        throw jsonResult
  } catch(e) {
      return e
  }
}

export default baseFetch
