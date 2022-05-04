# portfolio

増田健太郎のポートフォリオサイト

 https://www.hacklab-place.io/

## 技術要件

- AWS Amplify
- Amazon S3
- Github
- Nuxt.js
- Vue.js
- TypeScript

## ディレクトリ構造

```bash
portfolio
 ├ amplify --- AWS Amplify
 └ src
    ├ assets
    ├ components --- Atomic Designを導入
       ├ atoms --- UIパーツ
       ├ molecules --- Atomsを組み合わせたUIパーツ
       └ organisms --- 複数のAtoms, Moleculesを持つUI
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

- Nuxt.js v2に"Nuxt.js Composition API"を導入
- 状態管理はVuexで行う
- Composable内でStore（dispatch/getter）の処理を行う

![store](https://user-images.githubusercontent.com/43663858/166838832-b87e31b3-9f90-45e4-b812-b4d4e57f0106.png)
