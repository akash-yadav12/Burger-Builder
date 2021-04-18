import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://brave-aileron-310307-default-rtdb.firebaseio.com/'
})

export default instance