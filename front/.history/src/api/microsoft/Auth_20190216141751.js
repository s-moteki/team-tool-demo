import {guid, serialize, deserialize} from '../util'

const CONFIG = {
  authEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
  redirectUri: 'http://localhost:8080/',
  appId: '81c11fd6-74c9-404d-bda1-0a5490337762',
  scopes: 'openid profile User.Read Mail.Read Calendars.Read'
}

class Auth {
  /**
   * microsoftサインインぺージへのURLを生成します。
   * @return {String} URL文字列を戻します。
   */
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

  handleTokenResponse (hash) {
    // トークン初期化
    sessionStorage.removeItem('accessToken')
    sessionStorage.removeItem('idToken')

    var tokenresponse = this.parseHashParams(hash)

    if (tokenresponse.state !== sessionStorage.authState) {
      sessionStorage.removeItem('authState')
      sessionStorage.removeItem('authNonce')
      //error　遷移
      window.location.hash = '#error=Invalid+state&error_description=The+state+in+the+authorization+response+did+not+match+the+expected+value.+Please+try+signing+in+again.'
      return
    }

    sessionStorage.authState = ''
    sessionStorage.accessToken = tokenresponse.access_token

    // Convert to milliseconds
    var expiresin = (parseInt(tokenresponse.expires_in) - 300) * 1000
    var now = new Date()
    var expireDate = new Date(now.getTime() + expiresin)
    sessionStorage.tokenExpires = expireDate.getTime()

    sessionStorage.idToken = tokenresponse.id_token

    // Redirect to home page
    window.location.hash = '#'
  }
}

export default Auth
