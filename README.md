## アプリについて
LINEでリマインドするタスク管理アプリです。

LINEのグループに公式ラインを登録すると、webhook経由でグループLINEに合言葉になるポケモン名(pokeAPI経由で取得)とそのグループLINEで共有できるようにURLが届きます。

そのURLにアクセスしポケモン名を入力(ローカルストレージに保存)すると利用可能になります。

詳しくは下記リンクよりご確認ください。

https://shiftb.dev/works/a36efa92-b4b1-4da3-ae12-2db4abd413da

## 主な機能

・タスク管理（登録・編集・削除、検索、日付絞り込み）

・カレンダー機能

・LINE通知（グループ通知）

・認証とアクセス制御（LINE登録、URL+合言葉による制限）

## 開発サーバーの起動
```bash
npm run dev
```
