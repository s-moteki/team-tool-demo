<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
            <div class="column is-half">
              <h1 class="title">
                直近の予定
              </h1>
              <div v-for="i in 3" :key="i" v-if="filterEvents" class="event-section">
                <p>{{thisMonth + i - 1}}月</p>
                <div v-if="filterEvents.get(thisMonth + i - 2) == null">
                  <p class="subtitle is-5 no-event">{{thisMonth + i - 1}}月の予定はございません</p>
                </div>
                <div v-else class="events">
                  <button class="button is-outlined" v-for="(events, index ) in filterEvents.get(thisMonth + i - 2)"
                  :key="index">
                    {{parseDate(events.start.dateTime)}}
                  </button>
                </div>
              </div>
            </div>
           <div class="column is-half">
              <h1 class="title">
                社内更新
              </h1>
            <div class="files"
            v-for="file in files.res"
            :key="file.id">
             <div class="button is-outlined update">
              <p>{{file.name}}</p>
              <p>{{parseMonthDate(file.fileSystemInfo.createdDateTime)}}:{{file.createdby}}</p>
             </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Client } from "@microsoft/microsoft-graph-client"
import {KJUR, b64utoutf8} from "jsrsasign"
import MicrosoftApis from '@/api/microsoft/MicrosoftApis'

export default {
  name: 'Home',
  data(){
    return{
      events: [],
      files: null,
      filterEvents: null,
      displayName:sessionStorage.userDisplayName
    }
  },
  computed: {
    thisMonth: () => parseInt(new Date().getMonth()) + 1,
    welcomeMessage: () => `ようこそ ${sessionStorage.userDisplayName} さん`
  },
  async mounted() {
    this.events = await MicrosoftApis.Event.getUserEvents()
    this.files = await MicrosoftApis.File.getUserSites()
    this.filterEvents = this.groupBy(this.events.res, event => new Date(event.start.dateTime).getMonth())
  },
  methods: {
    parseMonthDate: str => {
      const date = new Date(str)
      return date.getMonth() + '月' + date.getDate() + '日'
    },
    parseDate: str => {
      return new Date(str).getDate()
    },
    groupBy: (list, keyGetter) => {
      const map = new Map()
      list.forEach((item) => {
          const key = keyGetter(item)
          const collection = map.get(key)
          if (!collection) {
              map.set(key, [item])
          } else {
              collection.push(item)
          }
      })
      return map
    }
  },
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
  button{
    border-radius: 50%;
    border-width: 2px;
    font-size: 1.2em;
    font-weight: 600;
    height: 50px;
    width: 50px;
    border-color: #42b983;
    color: #2c3e50;
    &:hover{
      color: #42b983;
    }
  }
  .welcome{
    color:#42b983;
  }
  .events .files{
    padding-bottom: 15px;
  }
}
.event-section{
  padding-top: 20px;
  padding-bottom: 10px;
}
.events{
  margin: 0 auto;
  text-align: center;
  padding-bottom: 40px;
}

.column{
  margin: 0 auto;
  text-align: center;

}
.no-event{
  height: 50px;
}

.files{
  padding-top: 10px;
  .update{
    border: solid 1.5px#42b983;
    min-width: 60%;
    display: inline-block;
    height: 100%;
  }
}
</style>
