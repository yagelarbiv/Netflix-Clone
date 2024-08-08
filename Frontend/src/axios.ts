import axios from "axios";
import Cookie from 'js-cookie';

export const AxiosUsersInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v1/users',
});

export const AxiosContentInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v1/content',
  headers: {'Authorization': `Bearer ${Cookie.get('token')}`}
});