const simple_oauth2 = require('simple-oauth2');


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


const callback = function(req, res, next) {
  console.log('hit');
  console.log(req.query);
  if (!req.query || !req.query.code) {
    return next(new Error('no code given'));
  }

  const code = req.query.code;
  const tokenConfig = {
    code: code,
    redirect_uri: process.env.GITHUB_CALLBACK
  };
  
  oauth.authorizationCode.getToken(tokenConfig)
  .then((result) => {
    const token = oauth.accessToken.create(result);
    console.log('token', token)
    res.cookie('auth_token', token.token.access_token);
    res.redirect('/');
  })
  .catch((error) => {
    next(error);
  });
  
}

const auth = function(req, res, next) {
 

  res.redirect(authorizeUrl);
}


module.exports.callback = callback;
module.exports.auth = auth;