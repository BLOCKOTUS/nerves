const { user1 } = require('../../fixtures/keypairs');

const execute = ({method, data, socket, reason}) => {
    socket.emit('answer', JSON.stringify({
        reason,
        answer: {
            publicKey: user1.publicKey,
            id: 1,
        }
    }))
}

module.exports = {
    execute
}