import {guid, serialize} from '../util'

const CONFIG = {
  authEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
  redirectUri: 'http://localhost:8080/',
  appId: '81c11fd6-74c9-404d-bda1-0a5490337762',
  scopes: 'openid profile User.Read Mail.Read Calendars.Read'
}

class Auth {
  buildAuthUrl () {
    sessionStorage.authState = guid()
    sessionStorage.authNonce = guid()

    const authParams = {
      response_type: 'id_token token',
      client_id: CONFIG.appId,
      redirect_uri: CONFIG.redirectUri,
      scope: CONFIG.scopes,
      state: sessionStorage.authState,
      nonce: sessionStorage.authNonce,
      response_mode: 'fragment'
    }
    return CONFIG.authEndpoint + serialize(authParams)
  }
}

export default Auth
