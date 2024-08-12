import axios from "axios";
import Cookie from 'js-cookie';

export const AxiosUsersInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v1/users',
});

export const AxiosContentInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v1/content',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'authorization': `Bearer ${Cookie.get('JWT-Netflix')}`
  }
});

export const AxiosSearchInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v1/search',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Cookie.get('JWT-Netflix')}`
  }
})