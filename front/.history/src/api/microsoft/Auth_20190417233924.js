import {guid, serialize, deserialize} from '../util'
import {KJUR, b64utoutf8} from 'jsrsasign'

const CONFIG = {
  authEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
  redirectUri: 'http://localhost:8080/',
  // redirectUri: 'https://team-tool-demo.firebaseapp.com',
  appId: '28832344-9999-4964-8afe-782119f483e4',
  scopes: 'openid profile User.Read Mail.Read Calendars.Read Files.Read.All Sites.Read.All'
}

class Auth {
  /**
   *  アクセストークンが必要な処理はこの関数から取得する
   */
  getAccessToken () {
    // 有効期限の検証
    const now = new Date().getTime()
    const isExpired = now > parseInt(sessionStorage.tokenExpires)

    if (sessionStorage.accessToken &&
      sessionStorage.accessToken !== 'undefined' &&
       !isExpired
    ) {
      return sessionStorage.accessToken
    } else {
      sessionStorage.clear()
      return null
    }
  }

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
   * 応答トークンを検証。有効ならセッションに保存します。
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

    // idトークンの検証
    return this.validateIdToken()
  }

  /**
   * 保持しているidトークンを検証。有効の場合基本情報取得
   * 応答トークン検証後呼び出される。
   * @return {Boolean} 有効(true) 無効(false)
   */
  validateIdToken (callback) {
    // 存在しているか
    if (sessionStorage.idToken == null || sessionStorage.idToken.length <= 0 ||
    sessionStorage.idToken === undefined
    ) {
      return false
    }

    // トークンの構成
    var tokenParts = sessionStorage.idToken.split('.')
    if (tokenParts.length !== 3) {
      return false
    }

    // let header = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(tokenParts[0]))
    // データ取得
    const payload = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(tokenParts[1]))

    // 取得データの妥当性
    if (payload.nonce !== sessionStorage.authNonce) {
      sessionStorage.authNonce = ''
      return false
    }

    sessionStorage.authNonce = ''

    // アプリケーションIDの検証
    if (payload.aud !== CONFIG.appId) {
      return false
    }

    // 発行元の検証
    if (payload.iss !== 'https://login.microsoftonline.com/' + payload.tid + '/v2.0') {
      return false
    }
    const now = new Date()
    const notBefore = new Date((payload.nbf - 300) * 1000)
    const expires = new Date((payload.exp + 300) * 1000)
    if (now < notBefore || now > expires) {
      return false
    }
    // 必要情報の取得
    sessionStorage.userOid = payload.oid
    sessionStorage.userDisplayName = payload.name
    sessionStorage.userSigninName = payload.preferred_username
    sessionStorage.userDomainType =
      payload.tid === '9188040d-6c67-4c5b-b112-36a304b66dad' ? 'consumers' : 'organizations'
    sessionStorage.userEmail =
      payload.email !== undefined ? payload.email : payload.preferred_username

    return true
  }
}

export default Auth
