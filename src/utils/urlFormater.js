export const injecQuery = (url, query = '') => {
    return `${url}?${query}${query ? '&' : ''}orderBy=desc&page=1&paranoid=false&perPage=10&sortBy=createdAt`;
};
