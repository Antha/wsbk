module.exports = function override (config, env) {
    let loaders = config.resolve
    loaders.fallback = {
        "fs": false,
        "tls": false,
        "net": false,
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "zlib": false,
        "path": false,
        "stream": false,
        "util": false,
        "crypto": require.resolve("crypto-browserify"),
        "buffer": require.resolve("buffer/")
    }
    return config
}