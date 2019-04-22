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

      // FileReaderでBase64にエンコード
      let reader = new FileReader()
      reader.onload = async ()=>{
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
              "Name": "test.xlsx",
              "ContentBytes": reader.result.replace(/^.*,/,'') // 不要部分の置き換え
            }
          ]
        }
        result.res = await client.api("/me/sendMail").post({ message: mail })
      }

      result.res = true

    } else {
      result.res = false
      result.err = 'AccessToken Not Found'
    }
    return result
  }
}
export default Mail
