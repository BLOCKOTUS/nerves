const { user1 } = require('../../fixtures/keypairs');

const identity = require('../../../organs/identity/fabric/identity/javascript');

// Should create a Job
const post = async (data) => {
    const transaction = await identity.create(data);

    return transaction ? {success: true} : {sucess: false}
}

// Should return a Job
const get = (data) => {
    return new Promise((resolve, reject) => {
        resolve({
            data: {
                publicKey: user1.publicKey,
                id: 1,
            },
            success: true,
        })
    })
}

module.exports = {
    get,
    post
}