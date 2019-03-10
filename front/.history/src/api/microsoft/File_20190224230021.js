import MicrosoftApis from '@/api/microsoft/MicrosoftApis'
import {Client} from '@microsoft/microsoft-graph-client'

class Event {
  async getUserEvents () {
    let result = {}
    const token = MicrosoftApis.Auth.getAccessToken()
    if (token) {
      // apiクライアントの初期化
      const client = Client.init({
        authProvider: (done) => {
          done(null, token)
        }
      })

      try {
        // ドライブ最近使用したファイル取得
        const res = await client
          .api('/me/drive/recent')
          .top(5)
          .get()
        result.res = res.value
      } catch (err) {
        result.res = null
        result.err = err
      }
    } else {
      result.err = 'AccessToken Not Found'
    }
    return result
  }

  async getUserSites () {
    let result = {}
    const token = MicrosoftApis.Auth.getAccessToken()
    if (token) {
      // apiクライアントの初期化
      const client = Client.init({
        authProvider: (done) => {
          done(null, token)
        }
      })

      try {
        // ドライブ最近使用したファイル取得    .api('/me/sites/ingalls01/drives')
        const res = await client
          .api('/sites/ingalls01.sharepoint.com,69e59c8c-0e64-4068-b3b2-ba7211ddbef4,2c01c746-6d0f-49ef-91ba-342b1d9a787d/drive/root:/社内共有/社内報:/children')
          .select('downloadUrl,name,fileSystemInfo,createdBy')
          .top(5)
          .get()
        result.res = res.value
      } catch (err) {
        result.err = err
      }
    } else {
      result.err = 'AccessToken Not Found'
    }
    return result
  }
}

export default Event
