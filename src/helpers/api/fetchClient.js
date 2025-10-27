
const BASE_URL = 'https://www.io.pixelsoftwares.com/';

export const fetchClient = async (endpoint, method = 'GET', data = null, headers = {}) => {
    try {
        const defaultHeaders = {
            'Content-Type': 'application/json',
            apikey: `pixel`,
            ...headers,
        };

        const options = {
            method,
            headers: defaultHeaders,
        };

        if (data && method !== 'GET') {
            options.body = JSON.stringify(data);
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

// 🔹 Handle all types of errors centrally
const handleFetchError = (error) => {
    if (error.status) {
        return { status: error.status, message: error.message };
    } else {
        return { status: 0, message: error.message || 'Network error!' };
    }
};
