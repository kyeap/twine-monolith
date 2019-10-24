import _axios from 'axios';
import qs from 'qs';
import { AsyncStorage } from 'react-native';
import getEnvVars from '../../environment'; // eslint-disable-line
import { StorageValuesEnum } from '../authentication/types';
// NB pevious file local only

// TODO: change version to v1.1 when server changes have been updated
const baseURL = `${getEnvVars().apiBaseUrl}/v1`;


export const axios = _axios.create({
  baseURL,
  paramsSerializer: (params) => qs.stringify(params, { encode: false }),
  transformResponse: (r) => {
    const res = JSON.parse(r);
    return res.result;
  },
});

type RequestConfig = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  data?: any;
}
const makeRequest = async ({ ...rest }: RequestConfig) => {
  let headers;
  try {
    const token = await AsyncStorage.getItem(StorageValuesEnum.USER_TOKEN);
    headers = { Authorization: token };
  } catch (error) {
    headers = {};
  }
  return axios.request({ headers, ...rest });
};

export const CommunityBusinesses = {
  getVolunteerActivities: () => axios.get('/volunteer-activities'),
};

export const Authentication = {
  login: ({ email, password }) => axios.post('/users/login', {
    email,
    password,
    restrict: ['VOLUNTEER', 'VOLUNTEER_ADMIN', 'CB_ADMIN'],
    type: 'body',
  }),
  roles: () => makeRequest({ method: 'GET', url: '/users/me/roles' }),
  // roles: () => axios.get('users/me/roles'),
};