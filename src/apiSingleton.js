import config     from './config';
import apiFactory from './api';

export default apiFactory({
    apiEndpoint : config.apiEndpoint
});