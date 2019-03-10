<template>
  <transition class="children" name="slide" mode="out-in" appear >
    <section class="section">
      <div class="container">
        <h1 class="title">
          直近の予定
        </h1>
        <div v-for="i in 3" :key="i" v-if="filterEvents" class="event-section">
          <p class="month">{{thisMonth + i - 1}}月</p>
          <div v-if="filterEvents.get(thisMonth + i - 2) == null">
            <p class="subtitle is-5 no-event">{{thisMonth + i - 1}}月の予定はございません</p>
          </div>
          <div v-else class="events">
            <button class="button is-outlined"
              v-for="(event, index ) in filterEvents.get(thisMonth + i - 2)"
            :key="index"
            @click="modalEvent = event"
            >
              {{parseDate(event.start.dateTime)}}
            </button>
          </div>
        </div>
        <CardModal v-if="modalEvent" @close="modalEvent = false">
          <p class="title is-3" slot="title">
            {{modalEvent.subject}}
          </p>
          <p slot="body">
            {{modalEvent}}
          </p>
        </CardModal>
      </div>
    </section>
  </transition>
</template>

<script>
import { Client } from "@microsoft/microsoft-graph-client"
import {KJUR, b64utoutf8} from "jsrsasign"
import MicrosoftApis from '@/api/microsoft/MicrosoftApis'
import CardModal from '@/components/modal/CardModal.vue'

export default {
  name: 'Home',
  data(){
    return{
      events: [],
      files: null,
      filterEvents: null,
      modalEvent: false,
      displayName:sessionStorage.userDisplayName
    }
  },
  computed: {
    thisMonth: () => parseInt(new Date().getMonth()) + 1,
    welcomeMessage: () => `ようこそ ${sessionStorage.userDisplayName} さん`
  },
  components:{
    CardModal
  },
  async mounted() {
    this.events = await MicrosoftApis.Event.getUserEvents()
    this.files = await MicrosoftApis.File.getUserSites()
    this.filterEvents = this.groupBy(this.events.res, event => new Date(event.start.dateTime).getMonth())
  },
  methods: {
    parseMonthDate: str => {
      const date = new Date(str)
      return date.getMonth() + '/' + date.getDate()
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
  margin: 0 auto;
  text-align: center;
  .title{
    padding-top: 5px;
  }
  .month{
    font-size: 130%;
  }
  button{
    margin: 2px;
    border-radius: 10%;
    border-width: 2px;
    font-size: 1.5em;
    font-weight: 600;
    height: 70px;
    width: 70px;
    border-color: #42b983;
    color: #2c3e50;
    &:hover{
      color: #42b983;
    }
  }
  .welcome{
    color:#42b983;
  }
}

.event-section{
  padding-top: 30px;
}

.no-event{
  height: 50px;
}

.slide-leave-active {
  position: absolute;
}
</style>
