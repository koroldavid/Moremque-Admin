import queryString from 'query-string';


export default class ApiClient {
    constructor({ endpoint, prefix = '' } = {}) {
        this.apiUrl = `${endpoint}${prefix}`;
    }

    async request({ url, method, params = {}, body }) {
        const query = Object.keys(params).length ? `?${queryString.stringify(params)}` : '';

        const headers = {
            'Content-Type'  : 'application/json',
            'Cache-Control' : 'no-cache',
            'pragma'        : 'no-cache'
        };

        const path= `${this.apiUrl}${url}${query}`;

        const options = {
            method,
            headers,
            withCredentials : true,
            crossDomain     : false,
            body            : method !== 'GET' ? JSON.stringify(body) : undefined
        };

        const response = await fetch(path, options);
        const json     = await response.json();

        if (json.status === 'error') throw json;
        
        return json;
    }

    async get(url, params) {
        return this.request({
            url,
            params,
            method : 'GET'
        });
    }

    async post(url, payload = {}) {
        return this.request({
            url,
            method : 'POST',
            body   : payload
        });
    }

    async put(url, payload = {}) {
        return this.request({
            url,
            method : 'PUT',
            body   : payload
        });
    }

    async delete(url, payload = {}) {
        return this.request({
            url,
            method : 'DELETE',
            body   : payload
        });
    }
}