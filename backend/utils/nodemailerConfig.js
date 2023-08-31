module.exports = {
    host: 'smtp.ethereal.email',
    port: process.env.ETHERAL_PORT,
    auth: {
        user: process.env.ETHERAL_USER,
        pass: process.env.ETHERAL_PASS
    }
}