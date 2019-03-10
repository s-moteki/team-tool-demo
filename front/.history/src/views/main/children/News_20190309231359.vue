<template>
  <section class="section">
    <div class="container" v-if="files">
      <h1 class="title">
        社内更新
      </h1>
      <div class="columns" v-for="(filesLow, index) in splitArray(files.res)" :key="index">
        <div class="column is-one-third files"
        v-for="file in filesLow"
        :key="file.id">
          <div class="button is-outlined update" @click="goLink(file.webUrl)">
            <p>{{file.name}}</p>
            <p>{{parseMonthDate(file.fileSystemInfo.lastModifiedDateTime)}}・{{file.createdBy.user.displayName}}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {KJUR, b64utoutf8} from "jsrsasign"
import MicrosoftApis from '@/api/microsoft/MicrosoftApis'

export default {
  name: 'News',
  data(){
    return{
      files: null,
      displayName:sessionStorage.userDisplayName
    }
  },
  computed: {
    welcomeMessage: () => `ようこそ ${sessionStorage.userDisplayName} さん`
  },
  async mounted() {
    this.files = await MicrosoftApis.File.getUserSites()
  },
  methods: {
    parseMonthDate (str) {
      const date = new Date(str)
      return (parseInt(date.getMonth()) + 1) + '/' + date.getDate()
    },
    goLink (href) {
      window.open(href)
    },
    splitArray(array){
      return array.reduce((table, item) => {
        const last = table[table.length - 1];
        if (last.length === 3) {
          table.push([item]);
          return table;
        }
        last.push(item);
        return table;
      }, [[]]);
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
    border: 2px solid #42b983;
    max-width: 95%;
    min-width: 250px;
    display: inline-block;
    height: 100%;
    overflow-y: hidden;
  }
}

</style>
