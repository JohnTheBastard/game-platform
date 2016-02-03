const port = process.env.OPENSHIFT_NODEJS_PORT || process.env.OPENSHIFT_INTERNAL_PORT || process.env.PORT;
const hostname = process.env.OPENSHIFT_APP_DNS || process.env.HOST;
const hostURI = hostname + ":" + port;

module.exports = {
  "server": {
    "protocol": process.env.NODE_ENV!=="production"?"http":"https",
    "host": hostURI,
    "state": false
  },
  twitter: {
    key: process.env.TWITTER_CONSUMER_KEY,
    secret: process.env.TWITTER_CONSUMER_SECRET,
    callback: '/twitter'
  }
};
