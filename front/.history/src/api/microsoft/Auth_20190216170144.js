import {guid, serialize, deserialize} from '../util'
import {KJUR, b64utoutf8} from 'jsrsasign/lib/jsrsasign'

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
    // GUIDの生成
    sessionStorage.authState = guid()
    sessionStorage.authNonce = guid()

    // URLパラメータ
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

  /**
   * 応答トークンを検証し有効ならセッションに保存します。
   * @param {String} hash ハッシュパラメータ文字列
   * @return {Boolean} 有効(true) 無効(false)
   */
  validateTokenResponse (hash) {
    // トークン初期化
    sessionStorage.removeItem('accessToken')
    sessionStorage.removeItem('idToken')

    // 応答トークンの非直列化
    const tokenresponse = deserialize(hash)

    // 送信元とのパラメータ比較
    if (tokenresponse.state !== sessionStorage.authState) {
      sessionStorage.removeItem('authState')
      sessionStorage.removeItem('authNonce')
      return false
    }

    // 応答パラメータの設定
    sessionStorage.authState = ''
    sessionStorage.accessToken = tokenresponse.access_token

    const expiresin = (parseInt(tokenresponse.expires_in) - 300) * 1000
    const now = new Date()
    const expireDate = new Date(now.getTime() + expiresin)

    sessionStorage.tokenExpires = expireDate.getTime()
    sessionStorage.idToken = tokenresponse.id_token

    return true
  }

  //セッショントークンの検証
  validateIdToken (callback) {
    if (sessionStorage.idToken == null || sessionStorage.idToken.length <= 0 ||
    sessionStorage.idToken === undefined
    ) {
      //callback(false)
    }
    // JWT is in three parts seperated by '.'
    var tokenParts = sessionStorage.idToken.split('.')
    if (tokenParts.length !== 3) {
      //callback(false)
    }

    // Parse the token parts
    let header = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(tokenParts[0]))
    var payload = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(tokenParts[1]))
    // Check the nonce
    if (payload.nonce != sessionStorage.authNonce) {
      sessionStorage.authNonce = '';
      resolve(false)
    }
    sessionStorage.authNonce = '';

    // Check the audience
    if (payload.aud != appId) {
      callback(false);
    }
    // Check the issuer
    // Should be https://login.microsoftonline.com/{tenantid}/v2.0
    if (payload.iss !== 'https://login.microsoftonline.com/' + payload.tid + '/v2.0') {
      callback(false);
    }

    // Check the valid dates
    var now = new Date();
    // To allow for slight inconsistencies in system clocks, adjust by 5 minutes
    var notBefore = new Date((payload.nbf - 300) * 1000);
    var expires = new Date((payload.exp + 300) * 1000);
    if (now < notBefore || now > expires) {
      callback(false);
    }

    // Now that we've passed our checks, save the bits of data
    // we need from the token.

    sessionStorage.userDisplayName = payload.name;
    sessionStorage.userSigninName = payload.preferred_username;

    // Per the docs at:
    // https://azure.microsoft.com/en-us/documentation/articles/active-directory-v2-protocols-implicit/#send-the-sign-in-request
    // Check if this is a consumer account so we can set domain_hint properly
    sessionStorage.userDomainType =
      payload.tid === '9188040d-6c67-4c5b-b112-36a304b66dad' ? 'consumers' : 'organizations';

    callback(true);
  }
}

export default Auth
