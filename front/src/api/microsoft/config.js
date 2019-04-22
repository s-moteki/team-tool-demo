
const config = {
  authEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
  redirectUri: 'http://localhost:8080/',
  appId: '81c11fd6-74c9-404d-bda1-0a5490337762',
  scopes: 'openid profile User.Read Mail.Read Calendars.Read'
}

export default config
