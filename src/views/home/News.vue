<template>
  <section class="section">
    <transition name="fade-fast" mode="out-in">
      <div class="container" v-if="files">
        <!-- 社内更新ファイル一覧グリッド -->
        <div class="news-list">
          <div class="columns" v-for="(filesLow, index) in $_mixinUtil_splitArray(files.res, 3)" :key="index">
            <div class="column is-one-third files"
            v-for="file in filesLow"
            :key="file.id">
              <div class="button is-outlined update" @click="goLink(file.webUrl)">
                <p class="is-size-5">{{file.name}}</p>
                <p class="has-text-left is-size-3 update-info">
                  {{parseMonthDate(file.fileSystemInfo.lastModifiedDateTime)}}
                  <i class="is-size-6">{{file.createdBy.user.displayName}}</i>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Loading v-else-if="showLoading"/>
    </transition>
  </section>
</template>

<script>
import MockApis from '@/api/mock/MockApis'
import mixinUtil from '@/mixin/mixinUtil'
import Loading from '@/components/loading/Loading'

export default {
  name: 'News',
  mixins: [mixinUtil],
  data () {
    return {
      files: null,
      showLoading: true,
      displayName: sessionStorage.userDisplayName
    }
  },
  components: {
    Loading
  },
  methods: {
    // MM / d
    parseMonthDate (str) {
      const date = new Date(str)
      return (parseInt(date.getMonth()) + 1) + '/' + date.getDate()
    },
    // 更新ファイルリンク
    goLink (href) {
      window.open(href)
    }
  },
  async mounted () {
    try{
      // 更新ファイルapi
      this.files = await MockApis.File.getUserSites()
    } catch (err) {
      this.$store.commit('childPage/setError', true)
    }
  }
}
</script>
<style scoped lang="scss">
.container{
  .news-list{
    padding-top: 30px;
  }
  text-align: center;
}

.files{
  padding-top: 10px;
  padding-bottom: 10px;
  .update{
    border:solid 2px #42b983;
    max-width: 95%;
    min-width: 250px;
    display: inline-block;
    height: 100%;
    overflow-y: hidden;
  }
}

</style>
