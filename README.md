# Cloubo

![kakeibo_web](https://user-images.githubusercontent.com/24493250/127496373-005c6969-7b47-482c-8690-9168fb77786f.gif)

## What is this ?

クラウドで管理する家計簿  
夫婦など複数ユーザで家計簿を共有しつつ、月ごとに精算を行うことができる

## Architect

- React(Hooks/TypeScript/Redux Toolkit)
- Material-ui
- Auth0

## Function

- [x] 家計データの登録
- [x] 家計データの削除
- [x] 家計データの参照(カレンダー形式)
- [x] 月のカテゴリごとの金額の参照
- [x] 月の合計金額のリスト
- [x] ユーザの支払額表示
- [x] ユーザ間の精算額表示
- [x] ログイン機能
  - [x] ログイン・認証の作成
  - [x] Auth0 でのログイン
- [x] テーマ・カラーの変更
- [x] API 仕様書(swagger)の作成
- [ ] PWA 化
  - [x] フルスクリーン表示
  - [x] アイコン
  - [ ] オフライン起動
- [x] Redux/Typescript にリファクタ
- [x] 定期データの登録機能
- [ ] 月ごとの合計金額をグラフ化して目標値との比較
- [ ] 一括精算の管理
- [ ] テスト

## Usage

1. Auth0 で Application, API を作成する
1. swagger.xml を参考に API サーバをお好みの方法で作成する
1. Netlify でデプロイ
   <a href="https://app.netlify.com/start/deploy?repository=https://github.com/7tsuno/kakeibo_web">
   <img src="https://www.netlify.com/img/deploy/button.svg" title="Deploy to Netlify">
   </a>
