import axios from "./axiosCustom";

const getAllUser = () => {
  const URL_API = "/v1/apiUser/getAllUser";

  return axios.get(URL_API);
};

const loginAPI = (email, password) => {
  const URL_API = "/v1/apiUser/login-user";
  return axios.post(URL_API, { email: email, password: password });
};
const registerAPI = (name, password, email, phone) => {
  const URL_API = "v1/apiUser/register-user";
  return axios.post(URL_API, { name, password, email, phone });
};
export { getAllUser, loginAPI, registerAPI };
