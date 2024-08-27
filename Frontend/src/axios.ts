import axios from "axios";
import Cookie from 'js-cookie';

export const AxiosUsersInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v2/auth/users',
  withCredentials: true,
});

export const AxiosContentInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v2/Content/Items',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'authorization': `Bearer ${Cookie.get('Jwt')}`
  }
});

export const AxiosSearchInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v2/Content/search',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Cookie.get('Jwt')}`
  }
})