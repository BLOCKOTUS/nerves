const { user1 } = require('../../fixtures/keypairs');

const execute = ({method, data, socket}) => {
    socket.emit('answer', JSON.stringify({
        reason: data.reason,
        answer: {
            publicKey: user1.publicKey,
            id: 1,
        }
    }))
}

module.exports = {
    execute
}