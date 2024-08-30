import axios from 'axios';
import qs from 'qs';

export const baseURL = process.env.baseURL || "https://ftcfke7dq3sryag5zumeerufkm0fiwvv.lambda-url.us-east-1.on.aws";

export const api = axios.create({
 baseURL: baseURL,
});

export async function getAccessToken(username, password) {
  const data = qs.stringify({
    'grant_type': '',
    'username': username,
    'password': password,
    'scope': '',
    'client_id': '',
    'client_secret': ''
 });

  const response = await api.post("/login", data)
  const newToken = response.data.access_token;

  return(newToken);
}

const username = localStorage.getItem("@App:email");
const password = localStorage.getItem("@App:password");

api.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    let originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {

      const refreshedToken = await getAccessToken(username, password);


      api.defaults.headers.Authorization = `Bearer ${refreshedToken}`;
      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);
