# Kakeibo_web

![kakeibo_web](https://user-images.githubusercontent.com/24493250/127496373-005c6969-7b47-482c-8690-9168fb77786f.gif)

## What is this ?

クラウド家計簿  
夫婦などで家計簿を共有しつつ、月ごとに精算を行うことができる

## Architect

- React(Hooks)
- Material-ui

## Function

- [x] データの登録
- [x] データの削除
- [x] データの参照(カレンダー形式)
- [x] 月のカテゴリごとの金額の参照
- [x] 月の合計金額のリスト
- [x] ユーザごとでの精算管理
- [x] jwt による認証
- [x] テーマ・カラーの変更
- [ ] API 仕様書(swagger)の作成
- [ ] PWA 化
- [ ] 月ごとの合計金額をグラフ化して目標値との比較
- [ ] 一括精算の管理

## Usage

1. .env で REACT_APP_API_ENDPOINT=`APIのエンドポイント`を設定しデプロイする
2. API サーバを作る(追記する)
