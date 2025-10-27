// src/api/fetchClient.js

const BASE_URL = 'https://www.io.pixelsoftwares.com/';

export const fetchClient = async (endpoint, method = 'GET', data = null, headers = {}, isFormData = false) => {
    try {
        const defaultHeaders = {
            apikey: `pixel`,
            ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
            ...headers,
        };

        const options = {
            method,
            headers: defaultHeaders,
        };

        if (data && method !== 'GET') {
            if (isFormData) {
                const formBody =
                    data instanceof FormData
                        ? data
                        : Object.entries(data).reduce((form, [key, value]) => {
                            form.append(key, value);
                            return form;
                        }, new FormData());
                options.body = formBody;
            } else {
                options.body = JSON.stringify(data);
            }
        }

        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        const contentType = response.headers.get('content-type');
        const responseData =
            contentType && contentType.includes('application/json')
                ? await response.json()
                : await response.text();

        if (!response.ok) {
            throw { status: response.status, message: responseData?.message || 'Request failed!' };
        }

        return responseData;
    } catch (error) {
        console.error('Fetch Error:', error);
        throw handleFetchError(error);
    }
};


const handleFetchError = (error) => {
    if (error.status) {
        return { status: error.status, message: error.message };
    } else {
        return { status: 0, message: error.message || 'Network error!' };
    }
};
