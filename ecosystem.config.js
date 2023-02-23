module.exports = {
    apps: [
        {
            name: 'Dashboard',
            port: '3000',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs',
            host: '0.0.0.0'
        }
    ]
};
