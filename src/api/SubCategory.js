import Base from './Base.js';


export default class SubCategory extends Base {
    list = async (params) => {
        try {
            return await this.apiClient.get('/subCategory', params);
        } catch (error) {
           throw error
        }
    }

    create = async ({item: body}) => {
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

    edit = async (body) => {
        try {
            return await this.apiClient.put(`/subCategory/${body._id}`, {...body});
        } catch (error) {
            throw error;
        }
    }

    delete = async (id) => {
        try {
            return await this.apiClient.delete(`/subCategory/${id}`);
        } catch (error) {
            throw error;
        }
    }
}