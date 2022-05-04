<template>
  <div class="py-15">
    <v-row class="header-box" justify="center" align="center">
      <v-col class="text-center" cols="12">
        <h1>
          Port<span class="light-blue--text">folio</span>
        </h1>
        <div class="mb-8">
          <vue-typer :text="typingTextList" />
        </div>
      </v-col>
    </v-row>

    <v-row class="mt-10 mb-15" justify="center" align="center">
      <v-col class="text-center" cols="12">
        <h1>概要</h1>
      </v-col>
      <v-col class="text-center" cols="12">
        <p>
          増田健太郎のポートフォリオ情報を掲載したサイトです。<br>
          現役エンジニアとしても活動しています。
        </p>
      </v-col>
    </v-row>

    <v-row class="mt-10 mb-15" justify="center" align="center">
      <v-col class="text-center" cols="12">
        <h1>スキル</h1>
      </v-col>
      <v-col cols="12" md="4">
        <v-card
          class="py-2 text-center"
          outlined
        >
          <v-card-text>
            <h1 class="mb-3 text-2xl">Webアプリ開発</h1>
            <p>
              サーバー構築、フロントエンド、バックエンドの幅広い開発を行うことができます。
            </p>
            <div>
              <v-chip label small outlined color="light-blue">AWS</v-chip>
              <v-chip label small outlined color="light-blue">Vue.js</v-chip>
              <v-chip label small outlined color="light-blue">PHP</v-chip>
              <v-chip label small outlined color="light-blue">Python</v-chip>
              <v-chip label small outlined color="light-blue">Node.js</v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card
          class="pb-2 text-center"
          outlined
        >
          <v-card-text>
            <h2 class="my-3">ブロックチェーン開発</h2>
            <p>
              Binance Smart Chainを使用してERC20トークンを開発することができます。
            </p>
            <div>
              <v-chip label small outlined color="light-blue">BSC</v-chip>
              <v-chip label small outlined color="light-blue">Solidity</v-chip>
              <v-chip label small outlined color="light-blue">Hardhat</v-chip>
              <v-chip label small outlined color="light-blue">Metamask</v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card
          class="pb-2 text-center"
          outlined
        >
          <v-card-text>
            <h2 class="my-3">人材育成</h2>
            <p>
              プログラミングスクールの運営をしていた経験があり、講師をすることができます。
            </p>
            <div>
              <v-chip label small outlined color="light-blue">AWS</v-chip>
              <v-chip label small outlined color="light-blue">Docker</v-chip>
              <v-chip label small outlined color="light-blue">Nuxt.js</v-chip>
              <v-chip label small outlined color="light-blue">Laravel</v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-10 mb-15" justify="center" align="center">
      <v-col class="text-center" cols="12">
        <h1>職歴</h1>
      </v-col>
      <v-col
        v-for="(career, key) in careerList"
        :key="key"
        cols="12"
        md="4"
      >
        <v-card outlined height="250px">
          <v-card-title class="pb-0">
            <span class="mr-2 light-blue--text">No.{{ career.no }}</span>
          </v-card-title>
          <v-card-title class="pt-0">
            {{ career.name }}
          </v-card-title>
          <v-card-subtitle>
            <span>
              {{ `${career.startAt.getFullYear()}年${career.startAt.getMonth()}月` }}
            </span>
             -
            <span v-if="career.endAt !== null">
            {{ `${career.endAt.getFullYear()}年${career.endAt.getMonth()}月` }}
            </span>
            <span v-else class="cyan--text">
              現在
            </span>
            <span>
              （{{ career.position }}）
            </span>
          </v-card-subtitle>
          <v-card-text>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p v-html="career.descriptioin" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'IndexPage',

  setup() {
    const typingTextList = ref([
      'My portfolio.',
      'Welcome to my site.',
      'I love development.',
    ])
    const hashTagList = ref([
      'AWS',
      'Vue.js',
      'Solidity',
      'PHP',
      'Node.js',
      'Python',
      'SQL',
      'Nuxt.js',
      'Laravel',
      'Express.js',
      'DJango',
    ])
    const careerList = ref([
      {
        no: 8,
        name: '株式会社RuckPlus',
        startAt: new Date(2022, 1, 1),
        endAt: null,
        position: 'CEO',
        descriptioin: '過去の営業経験を活かしてSES事業に特化した法人を設立。役員2名・営業2名・アルバイト1名の全5名で構成。<br>10名以上のフリーランスエンジニアが稼働中。'
      },
      {
        no: 7,
        name: 'HackLab株式会社',
        startAt: new Date(2020, 7, 1),
        endAt: null,
        position: 'CEO',
        descriptioin: '世の中のサービスをdAppsで再構築することを目的とした法人を設立。<br>現在、資金を集めるためにWebアプリの受託開発を行う。'
      },
      {
        no: 6,
        name: '個人事業主',
        startAt: new Date(2020, 1, 1),
        endAt: new Date(2020, 6, 0 + 1),
        position: 'エンジニア',
        descriptioin: 'フリーランスエンジニアとして開業し、主にAWS/PHPの技術を中心とした案件に従事。<br>Ethereumなどのブロックチェーン技術の学習を行う。'
      },
      {
        no: 5,
        name: 'シアトルコンサルティング株式会社',
        startAt: new Date(2019, 3, 1),
        endAt: new Date(2019, 12, 0 + 1),
        position: 'エンジニア',
        descriptioin: '人生初転職。ブロックチェーン開発事業部 チーフエンジニアとして従事。様々なブロックチェーンの開発を経験。'
      },
      {
        no: 4,
        name: '株式会社EPARK',
        startAt: new Date(2018, 4, 1),
        endAt: new Date(2019, 2, 0 + 1),
        position: 'PM/SE',
        descriptioin: '2500万会員の認証基盤プラットフォームのプロジェクトマネージャーに抜擢。<br>AWSやPHPの知識を身につけ、要件定義から実装、保守運用まで幅広い業務に携わる。'
      },
      {
        no: 3,
        name: '株式会社EPARK',
        startAt: new Date(2016, 11, 1),
        endAt: new Date(2018, 3, 0 + 1),
        position: 'PL/SE',
        descriptioin: 'Web決済プラットフォームのプロジェクトリーダーに抜擢。<br>クレジットカードの業務フローや会計業務の知識を身につける。'
      },
      {
        no: 2,
        name: '株式会社光通信',
        startAt: new Date(2015, 4, 1),
        endAt: new Date(2016, 10, 0 + 1),
        position: 'マネージャー',
        descriptioin: '名古屋エリアの新規立ち上げを目標に、50名規模の責任者として抜擢。<br>閉店予定だった店舗を名古屋で月間新規販売台数ベスト３の店舗までに引き上げる。'
      },
      {
        no: 1,
        name: '株式会社光通信',
        startAt: new Date(2009, 4, 1),
        endAt: new Date(2015, 3, 0 + 1),
        position: '一般社員',
        descriptioin: '新卒で入社しソフトバンクショップの販売スタッフとして従事。<br>新卒１年目で関西で販売台数No1のソフトバンク心斎橋 副店長に抜擢。'
      }
    ])

    return {
      typingTextList,
      hashTagList,
      careerList,
    }
  },
})
</script>

<style scoped>
@media screen and (max-width: 600px) {
  .header-box {
    margin-top: 230px;
    margin-bottom: 230px;
  }

  .header-box h1 {
    font-size: 50px;
  }

  .header-box p {
    font-size: 16px;
  }

  .header-box .find-btn {
    margin-bottom: 200px;
  }
}

@media screen and (min-width: 600px) and (max-width: 960px) {
  .header-box {
    margin-top: 260px;
    margin-bottom: 200px;
  }

  .header-box h1 {
    font-size: 80px;
  }

  .header-box p {
    font-size: 20px;
  }

  .header-box .find-btn {
    margin-bottom: 200px;
  }
}

@media screen and (min-width: 960px) {
  .header-box {
    margin-top: 260px;
    margin-bottom: 350px;
  }

  .header-box h1 {
    font-size: 120px;
  }

  .header-box p {
    font-size: 20px;
  }

  .header-box .find-btn {
    margin-bottom: 200px;
  }
}
</style>
