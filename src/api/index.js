import ApiClient  from './ApiClient.js';

import CategoryAPI    from './Category.js';
import SubcategoryAPI from './SubCategory.js';
import SecondaryAPI   from './Secondary.js';


export default function ({ apiEndpoint, apiPrefix } = {}) {
    if (!apiEndpoint) throw new Error('[apiEndpoint] required');

    const api = new ApiClient({ endpoint: apiEndpoint, prefix: apiPrefix });

    return {
        apiClient     : api,
        category      : new CategoryAPI({ apiClient: api }),
        subCategory   : new SubcategoryAPI({ apiClient: api }),
        secondary     : new SecondaryAPI({ apiClient: api })
    };
}