publicPath: './'
module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? '/MarsSite/'
    : '/',
 devServer: {
    port: 8080,
    https: true,
}
}