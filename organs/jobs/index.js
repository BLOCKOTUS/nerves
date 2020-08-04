
const execute = ({method, data, socket, reason}) => {

    // submit job

    // then
    socket.emit('answer', JSON.stringify({
        reason,
        answer: {
            success: true,
            data
        }
    }))
}

module.exports = {
    execute
}