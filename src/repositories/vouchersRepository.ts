const axios = require('axios');

export const getVouchers = () => {
    return axios.get('https://shielded-wildwood-82973.herokuapp.com/vouchers.json')
        .then(async (res: any) => {
            const response = await res.data.vouchers;
            console.log('response', res, response);
            return response
        })
        .catch(async (err: any) => {
            const error = await {error: err}
            console.error(err)
            return error
        })
}