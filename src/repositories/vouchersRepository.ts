const axios = require('axios');

export const getVouchers = () => {
    return axios.get('https://shielded-wildwood-82973.herokuapp.com/vouchers.json')
        .then(async (res: any) => {
            const response = await res.data.vouchers;
            return response
        })
        .catch(async (err: any) => {
            const error = await {status: err.response.status, message: err.response.statusText}
            console.error(err.status)
            return error
        })
}