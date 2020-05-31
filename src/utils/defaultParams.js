const getBaseParams = (perPage, sortBy, orderBy) => {
    return { perPage, sortBy, orderBy };
};

export default {
    category    : getBaseParams(10, 'createdAt', 'desc'),
    subCategory : getBaseParams(10, 'createdAt', 'desc'),
    product     : getBaseParams(10, 'createdAt', 'desc')
};
