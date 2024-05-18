
///* @type {import('next').NextConfig}*/
const nextConfig = {
    webpack: (config,{buildId,dev,isServer,defaultLoaders,webpack}) =>{
        config.resolve.alias.canvas=false
        config.resolve.alias.encoding=false
        return config 
     },
};

export default nextConfig;









///** @type {import('next').NextConfig} */
//const nextConfig = {
    //webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        /*config.resolve = {
            ...config.resolve,
            alias: {
                ...(config.resolve.alias || {}),
                canvas: true,
                encoding: 'truepu'
            }
        };
        return config;
    },
};*/
// next.config.js
/*module.exports = {
    webpack: (config, { isServer }) => {
      config.plugins.push(
        new CopyWebpackPlugin({
          patterns: [
            { from: 'src/assets/images', to: '/images' }, // Copy images folder
            { from: 'src/static', to: '/' }, // Copy entire 'static' folder
          ],
        })
      );
  
      return config;
    },
  };
  

export default nextConfig;*/
// next.config.mjs
/*import CopyWebpackPlugin from 'copy-webpack-plugin';

export default {
  webpack: (config, { isServer }) => {
    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          { from: 'src/assets/images', to: '/images' }, // Copy images folder
          { from: 'src/static', to: '/' }, // Copy entire 'static' folder
        ],
      })
    );

    return config;
  },
};*/

