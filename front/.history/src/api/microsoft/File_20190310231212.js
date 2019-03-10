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
        // ドライブ最近使用したファイル取得
        const res = await client
          .api('/sites/ SharePoint URL PATH')
          .select('webUrl,name,fileSystemInfo,createdBy')
          .top(10)
          .get()
        result.res = this.filesFilter(res.value)
      } catch (err) {
        result.err = err
      }
    } else {
      result.err = 'AccessToken Not Found'
    }
    return result
  }

  /**
   *  @desc タイムゾーンの変換
   *  @param 対象の配列を引数に受け取ります
   *  @return タイムゾーン置き換え後の配列を戻します
   */
  filesFilter (files) {
    const now = new Date()
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)
    let filterResult = []
    for (let i = 0; i < files.length; i++) {
      let dt = new Date(files[i].fileSystemInfo.lastModifiedDateTime)
      dt.setHours(dt.getHours() + 9)
      files[i].fileSystemInfo.lastModifiedDateTime = dt
      filterResult.push(files[i])
    }
    return filterResult
  }
}

export default File
