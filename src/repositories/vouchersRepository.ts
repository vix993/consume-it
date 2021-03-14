const axios = require('axios');

export const getVouchers = () => {
    return axios.get('https://shielded-wildwood-82973.herokuapp.com/vouchers.json')
        .then(async (res: any) => {
            const response = await res.data.vouchers;
            return response
        })
        .catch(async (err: any) => {
            const error = await {error: err}
            return error
        })
}