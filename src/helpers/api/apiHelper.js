// src/api/apiHelper.js
import { fetchClient } from './fetchClient';

export const ApiHelper = {
    get: (url, params = {}) => {
        const query = new URLSearchParams(params).toString();
        return fetchClient(`${url}${query ? `?${query}` : ''}`, 'GET');
    },

    post: (url, data, isFormData = false) => fetchClient(url, 'POST', data, {}, isFormData),

    put: (url, data, isFormData = false) => fetchClient(url, 'PUT', data, {}, isFormData),

    del: (url) => fetchClient(url, 'DELETE'),
};
