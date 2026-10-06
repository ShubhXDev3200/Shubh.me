const typegpu = require('unplugin-typegpu/webpack').default

module.exports = {
    async rewrites() {
        return [{ source: '/admin', destination: '/admin/index.html' }]
    },
    webpack(config) {
        config.plugins.push(typegpu({}))
        return config
    },
}