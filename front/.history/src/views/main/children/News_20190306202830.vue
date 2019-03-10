<template>
  <transition class="children" name="slide" mode="out-in" appear >
    <section class="section">
      <div class="container" v-if="files">
        <h1 class="title">
          社内更新
        </h1>
        <p>{{files}}</p>
        <!--
        <div class="files"
        v-for="file in files.res"
        :key="file.id">
        <a class="button is-outlined update" :href="file.webUrl">
          <p>{{file.name}}</p>
          <p>{{parseMonthDate(file.fileSystemInfo.createdDateTime)}}・{{file.createdBy.user.displayName}}</p>
        </a>
        </div>
        -->
      </div>
    </section>
  </transition>
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
    parseMonthDate: str => {
      const date = new Date(str)
      return date.getMonth() + '/' + date.getDate()
    }
  }
}
/**
 * list.reduce((table, item) => {
	const last = table[table.length - 1];
	if (last.length === 3) {
		table.push([item]);
		return table;
	}
	last.push(item);
	return table;
}, [[]]);
 */
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

.slide-leave-active {
  position: absolute;
}
</style>
