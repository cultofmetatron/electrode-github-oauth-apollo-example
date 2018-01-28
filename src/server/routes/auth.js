const simple_oauth2 = require('simple-oauth2');

const callback = function(req, res, next) {
  console.log('hit');
  

  res.redirect('/');
}

const auth = function(req, res, next) {
  const credentials = {
    client: {
      id: process.env.GITHUB_CLIENT_ID,
      secret: process.env.GIRHUB_SECRET
    },
    auth: {
      tokenHost: 'https://github.com',
      tokenPath: '/login/oauth/access_token',
      authorizePath: '/login/oauth/authorize'
    }
  };

  const oauth = simple_oauth2.create(credentials);

  const authorizeUrl = oauth.authorizationCode.authorizeURL({
    redirect_uri: process.env.GITHUB_CALLBACK,
    scope: 'user,public_repo,repo'
  });

  res.redirect(authorizeUrl);
}


module.exports.callback = callback;
module.exports.auth = auth;