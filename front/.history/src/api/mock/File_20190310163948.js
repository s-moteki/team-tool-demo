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
        const res = [ { "@odata.etag": "\"{182AD2D8-TEST-4737-A1F5-6D103C45D849},2\"", "name": "TEST NEWS No 286.pdf", "webUrl": "http://matsubarashi-ishikai.com/info/img/9-1.pdf", "createdBy": { "user": { "email": "test.mail@sample.jp", "id": "se9cf8b4-TEST-4b80-9d20-29c9c98cd737", "displayName": "総務 社員" } }, "fileSystemInfo": { "createdDateTime": "2019-02-28T09:16:37Z", "lastModifiedDateTime": "2019-02-28T18:16:43.000Z" } }, { "@odata.etag": "\"{182AD2D8-TEST-4737-A1F5-6D103C45D849},2\"", "name": "TEST NEWS No 286.pdf", "webUrl": "http://matsubarashi-ishikai.com/info/img/9-1.pdf", "createdBy": { "user": { "email": "test.mail@sample.jp", "id": "se9cf8b4-TEST-4b80-9d20-29c9c98cd737", "displayName": "総務 社員" } }, "fileSystemInfo": { "createdDateTime": "2019-02-28T09:16:37Z", "lastModifiedDateTime": "2019-02-28T18:16:43.000Z" } }, { "@odata.etag": "\"{182AD2D8-TEST-4737-A1F5-6D103C45D849},2\"", "name": "TEST NEWS No 286.pdf", "webUrl": "http://matsubarashi-ishikai.com/info/img/9-1.pdf", "createdBy": { "user": { "email": "test.mail@sample.jp", "id": "se9cf8b4-TEST-4b80-9d20-29c9c98cd737", "displayName": "総務 社員" } }, "fileSystemInfo": { "createdDateTime": "2019-02-28T09:16:37Z", "lastModifiedDateTime": "2019-02-28T18:16:43.000Z" } }, { "@odata.etag": "\"{182AD2D8-TEST-4737-A1F5-6D103C45D849},2\"", "name": "TEST NEWS No 286.pdf", "webUrl": "http://matsubarashi-ishikai.com/info/img/9-1.pdf", "createdBy": { "user": { "email": "test.mail@sample.jp", "id": "se9cf8b4-TEST-4b80-9d20-29c9c98cd737", "displayName": "総務 社員" } }, "fileSystemInfo": { "createdDateTime": "2019-02-28T09:16:37Z", "lastModifiedDateTime": "2019-02-28T18:16:43.000Z" } }, { "@odata.etag": "\"{182AD2D8-TEST-4737-A1F5-6D103C45D849},2\"", "name": "TEST NEWS No 286.pdf", "webUrl": "http://matsubarashi-ishikai.com/info/img/9-1.pdf", "createdBy": { "user": { "email": "test.mail@sample.jp", "id": "se9cf8b4-TEST-4b80-9d20-29c9c98cd737", "displayName": "総務 社員" } }, "fileSystemInfo": { "createdDateTime": "2019-02-28T09:16:37Z", "lastModifiedDateTime": "2019-02-28T18:16:43.000Z" } }, { "@odata.etag": "\"{182AD2D8-TEST-4737-A1F5-6D103C45D849},2\"", "name": "TEST NEWS No 286.pdf", "webUrl": "http://matsubarashi-ishikai.com/info/img/9-1.pdf", "createdBy": { "user": { "email": "test.mail@sample.jp", "id": "se9cf8b4-TEST-4b80-9d20-29c9c98cd737", "displayName": "総務 社員" } }, "fileSystemInfo": { "createdDateTime": "2019-02-28T09:16:37Z", "lastModifiedDateTime": "2019-02-28T18:16:43.000Z" } }, { "@odata.etag": "\"{182AD2D8-TEST-4737-A1F5-6D103C45D849},2\"", "name": "TEST NEWS No 286.pdf", "webUrl": "http://matsubarashi-ishikai.com/info/img/9-1.pdf", "createdBy": { "user": { "email": "test.mail@sample.jp", "id": "se9cf8b4-TEST-4b80-9d20-29c9c98cd737", "displayName": "総務 社員" } }, "fileSystemInfo": { "createdDateTime": "2019-02-28T09:16:37Z", "lastModifiedDateTime": "2019-02-28T18:16:43.000Z" } }, { "@odata.etag": "\"{182AD2D8-TEST-4737-A1F5-6D103C45D849},2\"", "name": "TEST NEWS No 286.pdf", "webUrl": "http://matsubarashi-ishikai.com/info/img/9-1.pdf", "createdBy": { "user": { "email": "test.mail@sample.jp", "id": "se9cf8b4-TEST-4b80-9d20-29c9c98cd737", "displayName": "総務 社員" } }, "fileSystemInfo": { "createdDateTime": "2019-02-28T09:16:37Z", "lastModifiedDateTime": "2019-02-28T18:16:43.000Z" } }, { "@odata.etag": "\"{182AD2D8-TEST-4737-A1F5-6D103C45D849},2\"", "name": "TEST NEWS No 286.pdf", "webUrl": "http://matsubarashi-ishikai.com/info/img/9-1.pdf", "createdBy": { "user": { "email": "test.mail@sample.jp", "id": "se9cf8b4-TEST-4b80-9d20-29c9c98cd737", "displayName": "総務 社員" } }, "fileSystemInfo": { "createdDateTime": "2019-02-28T09:16:37Z", "lastModifiedDateTime": "2019-02-28T18:16:43.000Z" } }, { "@odata.etag": "\"{182AD2D8-TEST-4737-A1F5-6D103C45D849},2\"", "name": "TEST NEWS No 286.pdf", "webUrl": "http://matsubarashi-ishikai.com/info/img/9-1.pdf", "createdBy": { "user": { "email": "test.mail@sample.jp", "id": "se9cf8b4-TEST-4b80-9d20-29c9c98cd737", "displayName": "総務 社員" } }, "fileSystemInfo": { "createdDateTime": "2019-02-28T09:16:37Z", "lastModifiedDateTime": "2019-02-28T18:16:43.000Z" } }, { "@odata.etag": "\"{182AD2D8-TEST-4737-A1F5-6D103C45D849},2\"", "name": "TEST NEWS No 286.pdf", "webUrl": "http://matsubarashi-ishikai.com/info/img/9-1.pdf", "createdBy": { "user": { "email": "test.mail@sample.jp", "id": "se9cf8b4-TEST-4b80-9d20-29c9c98cd737", "displayName": "総務 社員" } }, "fileSystemInfo": { "createdDateTime": "2019-01-25T09:16:37Z", "lastModifiedDateTime": "2019-01-25T18:16:43.000Z" } } ]
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
