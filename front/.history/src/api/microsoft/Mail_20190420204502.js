import MicrosoftApis from '@/api/microsoft/MicrosoftApis'
import {Client} from '@microsoft/microsoft-graph-client'

class Mail {
  async sendMail (data) {
    let result = {}
    const token = MicrosoftApis.Auth.getAccessToken()
    if (token) {
      // apiクライアントの初期化
      const client = Client.init({
        authProvider: (done) => {
          done(null, token)
        }
      })

      // 送信メール情報
      const mail = {
        subject: "10月 勤怠報告 茂木　紫皇",
        toRecipients: [
          {
            emailAddress: {
              address: "f16bc008@gmail.com"
            },
          },
        ],
        body: {
          content: "<h1>10月 勤怠報告 茂木 紫皇</h1>本メールはTeam-Toolによる自動送信です。",
          contentType: "html"
        },
        Attachments: [
          {
            "@odata.type": "#Microsoft.OutlookServices.FileAttachment",
            Name: "test",
            ContentBytes: data
          }
        ]
      }
      result.res = await client.api("/me/sendMail").post({ message: mail })

      try {
        result.res = true
      } catch (err) {
        result.err = err
        result.res = false
        throw new Error('API Error sendMail')
      }
    } else {
      result.res = false
      result.err = 'AccessToken Not Found'
    }
    return result
  }
}
export default Mail
