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

        /*          .select('webUrl,name,fileSystemInfo,createdBy')
          .top(10)
 */
        // ドライブ最近使用したファイル取得    .api('/me/sites/ingalls01/drives')
        const res = await client
          .api('/sites/ingalls01.sharepoint.com/drives/root/delta')
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
