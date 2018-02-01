const baseConfig = require("electrode-archetype-react-app/config/webpack/webpack.config.js");
const webpack = require('webpack');
module.exports = {
    postcss: function() {
        const plugins = baseConfig.postcss();

        return [...plugins, 
            // new plugins go here
            new webpack.DefinePlugin({
              'process.env': {
                NODE_ENV: JSON.stringify(env),
              },
            })
        ]
    }
};