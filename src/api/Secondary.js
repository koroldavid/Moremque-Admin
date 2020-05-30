import Base from './Base.js';


export default class Category extends Base {
    getStructure = async () => {
        try {
            return await this.apiClient.get('/categoryStuture');
        } catch (error) {
           throw error
        }
    }
}