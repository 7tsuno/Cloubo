# Kakeibow

![kakeibo_web](https://user-images.githubusercontent.com/24493250/127496373-005c6969-7b47-482c-8690-9168fb77786f.gif)

## What is this ?

クラウドで管理する家計簿  
夫婦など複数ユーザで家計簿を共有しつつ、月ごとに精算を行うことができる

## Architect

- React(Hooks)
- Material-ui

## Function

- [x] 家計データの登録
- [x] 家計データの削除
- [x] 家計データの参照(カレンダー形式)
- [x] 月のカテゴリごとの金額の参照
- [x] 月の合計金額のリスト
- [x] ユーザの支払額表示
- [x] ユーザ間の精算額表示
- [x] ログイン機能
  - [x] Cookie で管理
  - [ ] パスワード変更
- [x] テーマ・カラーの変更
- [×] API 仕様書(swagger)の作成
- [ ] PWA 化
  - [x] フルスクリーン表示
  - [x] アイコン
  - [ ] オフライン起動
- [ ] 月ごとの合計金額をグラフ化して目標値との比較
- [ ] 一括精算の管理

## Usage

1. .env で REACT_APP_API_ENDPOINT=`APIのエンドポイント`を設定しデプロイする
2. swagger.xml を参考に API サーバを作る
