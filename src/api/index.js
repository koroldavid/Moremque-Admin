import ApiClient  from './ApiClient.js';

import CategoryAPI from './Category.js';


export default function ({ apiEndpoint, apiPrefix } = {}) {
    if (!apiEndpoint) throw new Error('[apiEndpoint] required');

    const api = new ApiClient({ endpoint: apiEndpoint, prefix: apiPrefix });

    return {
        apiClient     : api,
        category      : new CategoryAPI({ apiClient: api })
    };
}