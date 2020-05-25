import Base from './Base.js';


export default class Category extends Base {
    list = async (params) => {
        try {
            return await this.apiClient.get('/category', params);
        } catch (error) {
           throw error
        }
    }

    create = async ({item: body}) => {
        try {
            return await this.apiClient.post('/category', body);
        } catch (error) {
            throw error;
        }
    }

    show = async (id) => {
        try {
            return await this.apiClient.get(`/category/${id}`);
        } catch (error) {
            throw error;
        }
    }

    edit = async (body) => {
        try {
            return await this.apiClient.put(`/category/${body._id}`, {...body});
        } catch (error) {
            throw error;
        }
    }

    delete = async (id) => {
        try {
            return await this.apiClient.delete(`/category/${id}`);
        } catch (error) {
            throw error;
        }
    }
}