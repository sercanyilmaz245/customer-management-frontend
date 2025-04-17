import {publicApi, authApi} from './index';

//register
export const register = (data) => publicApi.post('/auth/register', data);

//login
export const login = (data) => publicApi.post('/auth/login', data);

//update password
export const updatePassword = (data) => authApi.put('/auth/updatePassword', data);

//validate token
export const validateToken = (data) => authApi.get('/auth/validate');