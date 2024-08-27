import { ENV_VARS } from '../config/envVars.js';
import axios from 'axios';

export const fetchFromTMDB = async (url) => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ENV_VARS.TMDB_API_KEY}`,
    }
  };
  const res = await axios.get(url, options);
  console.log(res);
  if (res.status !== 200) {
    throw new Error(`Failed to fetch data from TMDB ${res.statusText}`);
  }
  return res;
}