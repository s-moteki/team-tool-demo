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
        // ドライブ最近使用したファイル取得    .api('/me/sites/ingalls01/drives')
        const res = [ { "@odata.etag": "\"{082AD2D8-CFCF-4737-A1F5-6D103C45D849},2\"", "name": "INGALLS NEWS No 286.pdf", "webUrl": "https://ingalls01.sharepoint.com/Shared%20Documents/%E7%A4%BE%E5%86%85%E5%85%B1%E6%9C%89/%E7%A4%BE%E5%86%85%E5%A0%B1/INGALLS%20NEWS%20No%20286.pdf", "createdBy": { "user": { "email": "s_yoshida@ingalls.jp", "id": "ae9cf8b4-d04e-4b80-9d20-29c9c98cd737", "displayName": "吉田 里美" } }, "fileSystemInfo": { "createdDateTime": "2019-02-28T09:16:37Z", "lastModifiedDateTime": "2019-02-28T18:16:43.000Z" } }, { "@odata.etag": "\"{A18E1D15-E84E-4769-9A63-2A904254C936},2\"", "name": "INGALLS NEWS No 285.pdf", "webUrl": "https://ingalls01.sharepoint.com/Shared%20Documents/%E7%A4%BE%E5%86%85%E5%85%B1%E6%9C%89/%E7%A4%BE%E5%86%85%E5%A0%B1/INGALLS%20NEWS%20No%20285.pdf", "createdBy": { "user": { "email": "s_yoshida@ingalls.jp", "id": "ae9cf8b4-d04e-4b80-9d20-29c9c98cd737", "displayName": "吉田 里美" } }, "fileSystemInfo": { "createdDateTime": "2019-01-31T01:43:15Z", "lastModifiedDateTime": "2019-01-31T10:43:20.000Z" } }, { "@odata.etag": "\"{B0CA8A57-41B6-40F2-AB80-9CD1655E6C9D},2\"", "name": "INGALLS NEWS No 284.pdf", "webUrl": "https://ingalls01.sharepoint.com/Shared%20Documents/%E7%A4%BE%E5%86%85%E5%85%B1%E6%9C%89/%E7%A4%BE%E5%86%85%E5%A0%B1/INGALLS%20NEWS%20No%20284.pdf", "createdBy": { "user": { "email": "s_yoshida@ingalls.jp", "id": "ae9cf8b4-d04e-4b80-9d20-29c9c98cd737", "displayName": "吉田 里美" } }, "fileSystemInfo": { "createdDateTime": "2018-12-28T09:56:17Z", "lastModifiedDateTime": "2018-12-28T18:56:23.000Z" } }, { "@odata.etag": "\"{54B1F65C-0344-4A74-90C6-C1556573D4D0},2\"", "name": "INGALLS NEWS No 283.pdf", "webUrl": "https://ingalls01.sharepoint.com/Shared%20Documents/%E7%A4%BE%E5%86%85%E5%85%B1%E6%9C%89/%E7%A4%BE%E5%86%85%E5%A0%B1/INGALLS%20NEWS%20No%20283.pdf", "createdBy": { "user": { "email": "s_yoshida@ingalls.jp", "id": "ae9cf8b4-d04e-4b80-9d20-29c9c98cd737", "displayName": "吉田 里美" } }, "fileSystemInfo": { "createdDateTime": "2018-11-30T05:39:13Z", "lastModifiedDateTime": "2018-11-30T14:39:16.000Z" } }, { "@odata.etag": "\"{C879A261-DE22-4F39-BA8B-FD7E7685EE0D},2\"", "name": "INGALLS NEWS No 282.pdf", "webUrl": "https://ingalls01.sharepoint.com/Shared%20Documents/%E7%A4%BE%E5%86%85%E5%85%B1%E6%9C%89/%E7%A4%BE%E5%86%85%E5%A0%B1/INGALLS%20NEWS%20No%20282.pdf", "createdBy": { "user": { "email": "s_yoshida@ingalls.jp", "id": "ae9cf8b4-d04e-4b80-9d20-29c9c98cd737", "displayName": "吉田 里美" } }, "fileSystemInfo": { "createdDateTime": "2018-11-01T00:44:47Z", "lastModifiedDateTime": "2018-11-01T09:44:52.000Z" } }, { "@odata.etag": "\"{6A43A306-7904-428D-8F11-EE4260AF1437},3\"", "name": "INGALLS NEWS No 281.pdf", "webUrl": "https://ingalls01.sharepoint.com/Shared%20Documents/%E7%A4%BE%E5%86%85%E5%85%B1%E6%9C%89/%E7%A4%BE%E5%86%85%E5%A0%B1/INGALLS%20NEWS%20No%20281.pdf", "createdBy": { "user": { "email": "s_yoshida@ingalls.jp", "id": "ae9cf8b4-d04e-4b80-9d20-29c9c98cd737", "displayName": "吉田 里美" } }, "fileSystemInfo": { "createdDateTime": "2018-09-28T01:21:36Z", "lastModifiedDateTime": "2018-09-28T16:16:53.000Z" } }, { "@odata.etag": "\"{14ABEB9F-887A-4041-B891-1F0AF6D35418},2\"", "name": "INGALLS NEWS No 280.pdf", "webUrl": "https://ingalls01.sharepoint.com/Shared%20Documents/%E7%A4%BE%E5%86%85%E5%85%B1%E6%9C%89/%E7%A4%BE%E5%86%85%E5%A0%B1/INGALLS%20NEWS%20No%20280.pdf", "createdBy": { "user": { "email": "s_yoshida@ingalls.jp", "id": "ae9cf8b4-d04e-4b80-9d20-29c9c98cd737", "displayName": "吉田 里美" } }, "fileSystemInfo": { "createdDateTime": "2018-08-31T02:59:57Z", "lastModifiedDateTime": "2018-08-31T12:00:05.000Z" } }, { "@odata.etag": "\"{3DCF9CFB-A4D2-4083-8A62-654D50908C38},2\"", "name": "INGALLS NEWS No 279.pdf", "webUrl": "https://ingalls01.sharepoint.com/Shared%20Documents/%E7%A4%BE%E5%86%85%E5%85%B1%E6%9C%89/%E7%A4%BE%E5%86%85%E5%A0%B1/INGALLS%20NEWS%20No%20279.pdf", "createdBy": { "user": { "email": "s_yoshida@ingalls.jp", "id": "ae9cf8b4-d04e-4b80-9d20-29c9c98cd737", "displayName": "吉田 里美" } }, "fileSystemInfo": { "createdDateTime": "2018-08-01T01:09:41Z", "lastModifiedDateTime": "2018-08-01T10:09:14.000Z" } }, { "@odata.etag": "\"{CD788095-3DBE-4D2F-8826-F52A7E7A242E},2\"", "name": "INGALLS NEWS No 278.pdf", "webUrl": "https://ingalls01.sharepoint.com/Shared%20Documents/%E7%A4%BE%E5%86%85%E5%85%B1%E6%9C%89/%E7%A4%BE%E5%86%85%E5%A0%B1/INGALLS%20NEWS%20No%20278.pdf", "createdBy": { "user": { "email": "s_yoshida@ingalls.jp", "id": "ae9cf8b4-d04e-4b80-9d20-29c9c98cd737", "displayName": "吉田 里美" } }, "fileSystemInfo": { "createdDateTime": "2018-07-09T07:36:48Z", "lastModifiedDateTime": "2018-07-09T16:36:53.000Z" } }, { "@odata.etag": "\"{461BDFBB-FC0E-46EF-944A-6A2D0989AC61},2\"", "name": "INGALLS NEWS No 277.pdf", "webUrl": "https://ingalls01.sharepoint.com/Shared%20Documents/%E7%A4%BE%E5%86%85%E5%85%B1%E6%9C%89/%E7%A4%BE%E5%86%85%E5%A0%B1/INGALLS%20NEWS%20No%20277.pdf", "createdBy": { "user": { "email": "s_yoshida@ingalls.jp", "id": "ae9cf8b4-d04e-4b80-9d20-29c9c98cd737", "displayName": "吉田 里美" } }, "fileSystemInfo": { "createdDateTime": "2018-06-25T08:27:41Z", "lastModifiedDateTime": "2018-06-25T13:34:53.000Z" } } ]
        result.res = this.filesFilter(res)
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
