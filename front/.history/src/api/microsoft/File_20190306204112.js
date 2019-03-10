import MicrosoftApis from '@/api/microsoft/MicrosoftApis'
import {Client} from '@microsoft/microsoft-graph-client'

class File {
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
/*
.api('/sites/ingalls01.sharepoint.com,69e59c8c-0e64-4068-b3b2-ba7211ddbef4,2c01c746-6d0f-49ef-91ba-342b1d9a787d/drive/root:/社内共有/社内報:/children')
GET /me/drive/root/delta?token=latest

*/

        // ドライブ最近使用したファイル取得
        const res = await client
          .api('/sites/root/drives/root/children')
          .top(10)
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

export default File
