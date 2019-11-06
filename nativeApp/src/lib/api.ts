import _axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { AsyncStorage } from 'react-native';
import getEnvVars from '../../environment'; // eslint-disable-line
import { StorageValuesEnum } from '../authentication/types';
import { Api } from '../../../api/src/api/v1/types/api';
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

const makeRequest = async <T = any> ({ ...rest }: AxiosRequestConfig) => {
  let headers;
  try {
    const token = await AsyncStorage.getItem(StorageValuesEnum.USER_TOKEN);
    headers = { Authorization: token };
  } catch (error) {
    headers = {};
  }
  return axios.request<T>({ headers, ...rest });
};


export const Authentication = {
  login: ({ email, password }) => axios.post('/users/login', {
    email,
    password,
    restrict: ['VOLUNTEER', 'VOLUNTEER_ADMIN', 'CB_ADMIN'],
    type: 'body',
  }),
  logOut: () => makeRequest({ method: 'GET', url: 'users/logouts' }),
  roles: () => makeRequest({ method: 'GET', url: '/users/me/roles' }),
};

export const CommunityBusinesses = {
  addVolunteer: () => { },
  editVolunteer: ({ id, ...changeset }) => makeRequest({ method: 'PUT', url: `/users/volunteers/${id}`, data: changeset }),
  deleteVolunteer: (id: number) => makeRequest({ method: 'DELETE', url: `/users/volunteers/${id}` }),
  getVolunteerActivities: () => axios.get('/volunteer-activities'),
  getVolunteers: () => makeRequest({ method: 'GET', url: '/community-businesses/me/volunteers' }),
};

export const VolunteerLogs = {
  get: (since?: Date, until?: Date) => makeRequest<Api.CommunityBusinesses.Me.VolunteerLogs.GET.Result>({
    method: 'GET',
    url: '/community-businesses/me/volunteer-logs',
    params: { since, until },
  }),
};
