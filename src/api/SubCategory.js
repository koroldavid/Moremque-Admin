import Base from './Base.js';


export default class SubCategory extends Base {
    list = async (params) => {
        try {
            const queryParams = {
                ...params,
                offset : params.perPage * (params.page - 1),
                limit  : params.perPage,
            }

            return await this.apiClient.get('/subCategory', queryParams);
        } catch (error) {
           throw error
        }
    }

    create = async (body) => {
        try {
            return await this.apiClient.post('/subCategory', body);
        } catch (error) {
            throw error;
        }
    }

    show = async (id) => {
        try {
            return await this.apiClient.get(`/subCategory/${id}`);
        } catch (error) {
            throw error;
        }
    }

    update = async (body) => {
        try {
            return await this.apiClient.put(`/subCategory/${body._id}`, {...body});
        } catch (error) {
            throw error;
        }
    }
}