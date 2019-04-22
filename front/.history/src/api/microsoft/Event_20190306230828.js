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
        // 上位10件カレンダーイベント取得
        const res = await client
          .api('/me/events')
          .top(20)
          .select('subject,start,end,createdDateTime,bodyPreview')
          .get()

        result.res = this.eventsFilter(res.value)
        result.res.sort((a, b) => {
          return new Date(a.start.dateTime).getTime() - new Date(b.start.dateTime).getTime()
        })
      } catch (err) {
        result.res = null
        result.err = err
      }
    } else {
      result.err = 'AccessToken Not Found'
    }
    return result
  }

  /**
   *  @desc タイムゾーンの変換、今日以降のデータ選択
   *  @param フィルタリング対象の配列を引数に受け取ります
   *  @return フィルタリング後、タイムゾーン置き換え後の配列を戻します
   */
  eventsFilter (events) {
    const now = new Date()
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)
    let filterResult = []
    for (let i = 0; i < events.length; i++) {
      let dt = new Date(events[i].start.dateTime)
      dt.setHours(dt.getHours() + 9)
      if (now.getTime() > dt.getTime()) {
        continue
      } else {
        events[i].start.dateTime = dt
        filterResult.push(events[i])
      }
    }
    return filterResult
  }
}
export default Event
