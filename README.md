# portfolio

増田健太郎のポートフォリオサイト

https://www.hacklab-place.io/

## 技術要件

- AWS Amplify
- Amazon S3
- Amazon DynamoDB
- Github
- Nuxt.js
- Vue.js
- TypeScript

## 画像種別

アップロードできる画像の種別

| 画像種別           | 推奨           | 最大サイズ |
| ------------------ | -------------- | ---------- |
| プロフィール画像   | 350px x 350px  | 100MB      |
| プロフィールバナー | 1400px x 400px | 100MB      |

## Amazon S3 Bucket

- ファイル名は「accountId + 拡張子」

```bash
portfolio (Bucket)
 └ image
    ├ profile-banner
    │  ├ account_01.png
    │  └ account_02.png
    └ profile-iamge
       ├ account_01.png
       └ account_02.png
```

## ディレクトリ構造

```bash
portfolio
 ├ amplify --- AWS Amplify
 └ src
    ├ assets
    ├ components --- Atomic Designを導入
    │  ├ atoms --- UIパーツ
    │  ├ molecules --- Atomsを組み合わせたUIパーツ
    │  └ organisms --- 複数のAtoms, Moleculesを持つUI
    ├ composable --- VueコンポジションAPIを活用してステートフルロジックをカプセル化して再利用する関数
    ├ layouts
    ├ pages --- アプリケーションのルート, APIコール, Composableインポート
    ├ plugins
    ├ static
    └ store

# Vue.js - Composable
https://vuejs.org/guide/reusability/composables.html
```

## アーキテクチャ

- Nuxt.js v2 に"Nuxt.js Composition API"を導入
- 状態管理は Vuex で行う
- Composable 内で Store（dispatch/getter）の処理を行う

![store](https://user-images.githubusercontent.com/43663858/166838832-b87e31b3-9f90-45e4-b812-b4d4e57f0106.png)

## ウォレット接続処理

- ウォレット接続後にネットワークを切り替えた場合は、自動的にブラウザをリロードする

![portfolio-01](https://user-images.githubusercontent.com/43663858/167280910-2e7772c8-891a-4c3b-8a72-4289f034d278.png)
