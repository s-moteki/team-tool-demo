<template>
  <section class="section">
    <div class="container" v-if="files">
      <h1 class="title">
        社内更新
      </h1>
      <div class="columns" v-for="(filesLow, index) in $_mixinUtil_splitArray(files.res, 3)" :key="index">
        <div class="column is-one-third files"
        v-for="file in filesLow"
        :key="file.id">
          <div class="button is-outlined update" @click="goLink(file.webUrl)">
            <p class="title is-5">{{file.name}}</p>
            <p class="has-text-left">
              <i class="is-size-4">{{parseMonthDate(file.fileSystemInfo.lastModifiedDateTime)}}</i>
              <i>{{file.createdBy.user.displayName}}</i>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import MockApis from '@/api/mock/MockApis'
import mixinUtil from '@/mixin/mixinUtil'

export default {
  name: 'News',
  mixins: [mixinUtil],
  data () {
    return {
      files: null,
      displayName: sessionStorage.userDisplayName
    }
  },
  computed: {
    welcomeMessage: () => `ようこそ ${sessionStorage.userDisplayName} さん`
  },
  async mounted () {
    this.files = await MockApis.File.getUserSites()
  },
  methods: {
    parseMonthDate (str) {
      const date = new Date(str)
      return (parseInt(date.getMonth()) + 1) + '/' + date.getDate()
    },
    goLink (href) {
      window.open(href)
    }
  }
}
</script>
<style scoped lang="scss">
.container{
  margin: 0 auto;
  text-align: center;
  .title{
    padding-top: 5px;
  }
}

.files{
  padding-top: 10px;
  padding-bottom: 10px;
  .update{
    background-color: #42b983;
    max-width: 95%;
    min-width: 250px;
    display: inline-block;
    height: 100%;
    overflow-y: hidden;
    p{
      color:#ffffff;
    }
  }
}

</style>
