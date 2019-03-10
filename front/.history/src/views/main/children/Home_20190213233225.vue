<template>
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          {{testa}}
        </h1>
        <h2 class="subtitle">
          Primary subtitle
        </h2>
      </div>
    </div>
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          Primary title
        </h1>
        <h2 class="subtitle">
          {{test}}
        </h2>
      </div>
  </div>
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          Primary title
        </h1>
        <h2 class="subtitle">
          {{date}}
          {{token}}
        </h2>
      </div>
    </div>
  </section>

</template>

<script>
export default {
  name: 'Home',
  computed: {//算出プロパティ
    test: function() {
      return 'Test'
    },
  },
  data(){
    return{
    testa:null,
    date:null,
    token:null
    }
  },

  mounted (){
var cryptObj = window.crypto || window.msCrypto;//ない場合があるからその時は随時エラー処理する

var authEndpoint = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize';
var redirectUri = 'http://localhost:8080/';
var appId = '81c11fd6-74c9-404d-bda1-0a5490337762';
var scopes = 'openid profile User.Read Mail.Read';

function guid() {
  var buf = new Uint16Array(8);
  cryptObj.getRandomValues(buf);
  function s4(num) {
    var ret = num.toString(16);
    while (ret.length < 4) {
      ret = '0' + ret;
    }
    return ret;
  }
  return s4(buf[0]) + s4(buf[1]) + '-' + s4(buf[2]) + '-' + s4(buf[3]) + '-' +
    s4(buf[4]) + '-' + s4(buf[5]) + s4(buf[6]) + s4(buf[7]);
}

function serialize(data) {
  var key, value, type, i, max;
  var encode = window.encodeURIComponent;
  var query = '?';

  for (key in data) {
    value = data[key];
    type = typeof(value) === 'object' && value instanceof Array ? 'array' : typeof(value);
    switch (type) {
      case 'undefined':
        // キーのみ
        query += key;
        break;
      case 'array':
        // 配列
        for (i = 0, max = value.length; i < max; i++) {
          query += key + '[]';
          query += '=';
          query += encode(value[i]);
          query += '&';
        }
        query = query.substr(0, query.length - 1);
        break;
      case 'object':
        // ハッシュ
        for (i in value) {
          query += key + '[' + i + ']';
          query += '=';
          query += encode(value[i]);
          query += '&';
        }
        query = query.substr(0, query.length - 1);
        break;
      default:
        query += key;
        query += '=';
        query += encode(value);
      break;
    }
    query += '&';
  }
  query = query.substr(0, query.length - 1);
  return query;
};

function buildAuthUrl() {
  // Generate random values for state and nonce
  sessionStorage.authState = guid();
  sessionStorage.authNonce = guid();

  var authParams = {
    response_type: 'id_token token',
    client_id: appId,
    redirect_uri: redirectUri,
    scope: scopes,
    state: sessionStorage.authState,
    nonce: sessionStorage.authNonce,
    response_mode: 'fragment'
  };

  return authEndpoint + serialize(authParams);
}

function handleTokenResponse(hash) {
  // clear tokens
  sessionStorage.removeItem('accessToken');
  sessionStorage.removeItem('idToken');

  var tokenresponse = parseHashParams(hash);

  // Check that state is what we sent in sign in request
  if (tokenresponse.state != sessionStorage.authState) {
    sessionStorage.removeItem('authState');
    sessionStorage.removeItem('authNonce');
    // Report error
    window.location.hash = '#error=Invalid+state&error_description=The+state+in+the+authorization+response+did+not+match+the+expected+value.+Please+try+signing+in+again.';
    return;
  }

  sessionStorage.authState = '';
  sessionStorage.accessToken = tokenresponse.access_token;

  // Get the number of seconds the token is valid for,
  // Subract 5 minutes (300 sec) to account for differences in clock settings
  // Convert to milliseconds
  var expiresin = (parseInt(tokenresponse.expires_in) - 300) * 1000;
  var now = new Date();
  var expireDate = new Date(now.getTime() + expiresin);
  sessionStorage.tokenExpires = expireDate.getTime();

  sessionStorage.idToken = tokenresponse.id_token;

  // Redirect to home page
  window.location.hash = '#';
}


function parseHashParams(hash) {
  var params = hash.slice(1).split('&');

  var paramarray = {};
  params.forEach(function(param) {
    param = param.split('=');
    paramarray[param[0]] = param[1];
  });

  return paramarray;
}

handleTokenResponse(window.location.hash)

var isAuthenticated = (sessionStorage.accessToken != null && sessionStorage.accessToken.length > 0);

if (isAuthenticated) {
  this.date =new Date(parseInt(sessionStorage.tokenExpires));
  this.token = sessionStorage.accessToken;
}
  this.testa = buildAuthUrl()
  }
}
</script>

<style scoped lang="scss">


</style>
