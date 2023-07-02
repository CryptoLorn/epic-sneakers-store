const baseURL = 'http://localhost:5000/'; // /api http://localhost:5000/
export const awsImgUrl = 'https://epic-sneakers.s3.amazonaws.com';

export const urls = {
    registration: '/auth/signup',
    login: '/auth/login',
    refresh: '/auth/refresh',
    logout: '/auth/logout',
    forgotPassword: '/users/password/forgot',
    users: '/users',
    baskets: '/baskets',
    sneakers: '/sneakers',
    brands: '/brands',
    types: '/types',
    orders: '/orders',
    search: '/sneakers/search/params',
    analytics: '/analytics'
}

export default baseURL;