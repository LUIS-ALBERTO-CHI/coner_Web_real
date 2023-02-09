/**
 * @see https://angular.io/guide/build#proxying-to-a-backend-server
 * @see https://angular.io/guide/build#proxy-multiple-entries
 */
 const PROXY_CONFIG = [{
  context: [
      "/api/"
  ],
  target: "http://api.ligasabatinadefutbol.com.mx",
  secure: false,
  logLevel: "debug",
  changeOrigin: true
},{
  context: [
      "/media/bearleague/"
  ],
  target: "https://ligasabatinadefutbol.com.mx",
  secure: true,
  logLevel: "debug",
  changeOrigin: true
}];

module.exports = PROXY_CONFIG;
