# Team-Tool
## 目次
- [説明](#説明)
  - [きっかけ](#きっかけ)
  - [なぜOffice365でサインインするのか](#なぜOffice365でサインインするのか)
- [システム構成](#システム構成)
- [デモページ](#デモページ)
- [使い方](#使い方)

## 説明
__現在開発中のものです__  
![デモ](https://firebasestorage.googleapis.com/v0/b/team-tool-demo.appspot.com/o/20190314_223415.GIF?alt=media&token=26f9d66d-74c0-48f6-8973-3004288034e9)

Office365のアカウントでサインインするスマートフォン向け社内ツールです。  
サインイン後、Outlookの予定表や共有フォルダの更新履歴などを確認できます。  
Office365の従来の機能に加え、投稿掲示板の機能を使用できます。  
### きっかけ
- 社内全体に情報を発信できる手段がない(全社員向けメールは禁止されている)
- 「社内ツールなどあってもいいのでは」という声
- 業務外でも目的が明確なものを作りたい
### なぜOffice365でサインインするのか
社内ツールを作成するにあたり、既に最近導入されたOffice365という強力なツールが存在しました。  
新たに社内ツール用アカウントを作成すると二重管理になり手間になると考えた結果、Office365のアカウントを使用できないかと考えました。  
また、同時に以下の問題も解決できると考えました。
- SharePoint上の共有フォルダに格納された社内報(.pdf)などが閲覧されていない
- Outlookの予定表があまり確認されていない
- メール(Outlook)以外の機能が認知されていない  
## システム構成
![構成図](https://firebasestorage.googleapis.com/v0/b/team-tool-demo.appspot.com/o/%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0%E6%A7%8B%E6%88%90%E5%9B%B3.jpg?alt=media&token=94de3896-f273-4e08-8c53-1a2093164d7d)
- Firebase
  - Hosting    フロントエンドのソースコードを配置
  - Functions  バックエンドのソースコードを配置(DBへの接続)
  - Database   投稿掲示板のデータを格納(FireStore)
- Azure
  - AZURE AD V2  認証用アクセストークンを取得
  - Office 365 API トークン検証後365のデータへアクセス
  - その他 認証許可ルールを設定(会社のアカウントのみなどに制限)
- 使用言語、フレームワークなど
  - Vue.js
  - Node.js + Express
  - bulma  


※現在はLaravel + MySQLにリプレイス中です→[backend-replace](https://github.com/s-moteki/backend-replace)
## デモページ
PC、スマートフォンどちらでも閲覧可能ですが __スマートフォンでの閲覧を推奨しています。__  
サインインの際のアカウントはこちらを使用してください。  
  
ID : tool.demo@outlook.com  
PW : team-tool-demo  
  
URL: https://team-tool-demo.firebaseapp.com  
※初回の画面遷移はリソース節約のため、読み込みが遅い可能性がございます。  

  
  
  
稼働状況(3/14時点)  
Noticeページ(社内更新)のみスタブで稼働中です。  
その他の掲示板投稿機能、予定表取得(アカウント連動)などはご利用できます。
## 使い方
鍵アイコンをタップするとサインインが開始されます。
- Homeページ
  - Outlook予定表の3ヶ月分を確認できます。
  - 日付のタップで内容の表示
- Newsページ
  - SharePoint上で共有したいフォルダの更新履歴を表示します。
  - タップするとそのファイルを別タブで開きます。
- Noticeページ
  - 投稿時間の降順で投稿の一部を表示
  - タップするとその投稿全体を表示
  - 右下部のボタンから投稿内容を書き込みがで可能です。  
    
(3/12時点)  

## Setup
Under Construction...
## Licence
Under Construction...
