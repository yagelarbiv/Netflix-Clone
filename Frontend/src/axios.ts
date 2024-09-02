import axios from "axios";
import Cookie from 'js-cookie';

export const AxiosUsersInstance = axios.create({
  baseURL: 'https://netflix-clone-backend-alpha.vercel.app/api/v2/auth/users',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'netflix-clone-two-eosin.vercel.app': [
      'https://netflix-clone-two-eosin.vercel.app',
      'https://netflix-clone-backend-alpha.vercel.app',
    ]
  }
});

export const AxiosContentInstance = axios.create({
  baseURL: 'https://netflix-clone-backend-alpha.vercel.app/api/v2/Content/Items',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'authorization': `Bearer ${Cookie.get('Jwt')}`,
    'netflix-clone-two-eosin.vercel.app': [
      'https://netflix-clone-content.vercel.app',
      'https://netflix-clone-backend-alpha.vercel.app',
    ]
  }
});

export const AxiosSearchInstance = axios.create({
  baseURL: 'https://netflix-clone-backend-alpha.vercel.app/api/v2/Content/search',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Cookie.get('Jwt')}`,
    'netflix-clone-two-eosin.vercel.app': [
      'https://netflix-clone-content.vercel.app',
      'https://netflix-clone-backend-alpha.vercel.app',
    ]
  }
})