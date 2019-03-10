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
}

export default Auth
