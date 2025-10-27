// src/api/apiHelper.js
import { fetchClient } from './fetchClient';

export const ApiHelper = {
    get: (url, params = {}) => {
        const query = new URLSearchParams(params).toString();
        return fetchClient(`${url}${query ? `?${query}` : ''}`, 'GET');
    },

    post: (url, data) => fetchClient(url, 'POST', data),

    put: (url, data) => fetchClient(url, 'PUT', data),

    del: (url) => fetchClient(url, 'DELETE'),
};
