import MicrosoftApis from '@/api/microsoft/MicrosoftApis'
import {Client} from '@microsoft/microsoft-graph-client'

class Mail {
  async sendMail () {
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
        subject: "Microsoft Graph JavaScript Sample",
        toRecipients: [
          {
            emailAddress: {
              address: "f16bc008@gmail.com"
            },
          },
        ],
        body: {
          content: "<h1>MicrosoftGraph JavaScript Sample</h1>Check out https://github.com/microsoftgraph/msgraph-sdk-javascript",
          contentType: "html",
        }
      }

      try {
        result.res = await client.api("/me/sendMail").post({ message: mail })
        result.res = true
      } catch (err) {
        result.err = err
        throw new Error('API Error sendMail')
      }
    } else {
      result.err = 'AccessToken Not Found'
    }
    return result
  }
}
export default Mail
