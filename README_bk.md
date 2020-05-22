# team-tool-front
## 構造  
当初はアトミックデザイを採用(真似)していたが,要件の規模と工数が釣り合わないと感じ断念。  
現在は大まかに作り、そこからコンポーネントを分割しています。  
設計方針を模索中  
#### src直下
- api/  
   ├ helper/...APIの問い合わせURLの提供クラス  
   ├ microsoft/...API Clientのラッパークラスを定義  
   ├ mock/...社内URLなどの実際に公開できないデータのレスポンスのモック  
   └ util...GUID生成やシリアライズなど
- assets/  
   ├ img/...ロゴなどの画像  
   └ styles/...scssファイル(アトミックデザインの残骸あり)
- components/  
   └ コンポーネントファイルを定義
- mixin/  
   └ ミックスイン
- router/  
    └ 遷移制御を定義
- store/  
    └ module/...ページ間で共有する情報
- views/  
    ├ home/...ホームメニューの画面  
    └ report/...報告メニューの画面  
## 今後
コンポーネントの切り分けの見直し  
sassで共通化するべきでない部分の修正
## セットアップ
※下記のみでは実際にデータを表示したりはできません
フロント部分
git clone → npm -i → npm run dev → http://localhost:8080/
