import MicrosoftApis from '@/api/microsoft/MicrosoftApis'
import {Client} from '@microsoft/microsoft-graph-client'

class Mail {
  async sendMail (data, date) {
    let result = {}
    const token = MicrosoftApis.Auth.getAccessToken()
    if (token) {
      // apiクライアントの初期化
      const client = Client.init({
        authProvider: (done) => {
          done(null, token)
        }
      })

      let reader = new FileReader()
      reader.onload = async ()=>{
        // 送信メール情報
        const mail = {
          subject: `${date.slice(-2)}月 勤怠報告 ${sessionStorage.userDisplayName}`,
          toRecipients: [
            {
              emailAddress: {
                address: sessionStorage.userEmail
              },
            },
          ],
          body: {
            content: `<h1>${date.slice(-2)}月 勤怠報告</h1><h2>${sessionStorage.userDisplayName}</h2>本メールはTeam-Toolによる自動送信です。`,
            contentType: "html"
          },
          Attachments: [
            {
              "@odata.type": "#Microsoft.OutlookServices.FileAttachment",
              "Name": "勤怠報告.xlsx",
              "ContentBytes": reader.result.replace(/^.*,/,'')
            }
          ]
        }
        const result = await client.api("/me/sendMail").post({ message: mail })
      }
      result.res = true
      reader.readAsDataURL(data)
    } else {
      result.res = false
      result.err = 'AccessToken Not Found'
    }
    return result
  }
}
export default Mail
