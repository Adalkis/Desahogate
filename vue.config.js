module.exports = {
    chainWebpack: (config) => {
        // Remove prefetch plugin and that's it!
        config.plugins.delete('prefetch') 
    }
}