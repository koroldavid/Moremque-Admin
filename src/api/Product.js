import Base from './Base.js';


export default class Product extends Base {
    list = async (params = {}) => {
        try {
            const queryParams = {
                ...params,
                offset : params.perPage * (params.page - 1),
                limit  : params.perPage
            }

            return await this.apiClient.get('/product', queryParams);
        } catch (error) {
           throw error
        }
    }

    create = async (body) => {
        try {
            return await this.apiClient.post('/product', body);
        } catch (error) {
            throw error;
        }
    }

    show = async (id) => {
        try {
            return await this.apiClient.get(`/product/${id}`);
        } catch (error) {
            throw error;
        }
    }

    update = async (body) => {
        try {
            return await this.apiClient.put(`/product/${body._id}`, {...body});
        } catch (error) {
            throw error;
        }
    }

    delete = async (id) => {
        try {
            return await this.apiClient.delete(`/product/${id}`);
        } catch (error) {
            throw error;
        }
    }
}