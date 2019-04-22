<template>
  <section class="section is-fullheight">
    <transition name="fade-fast" mode="out-in">
      <div class="container" v-if="filterEvents">
        <div v-for="i in 3" :key="i" class="event-section">
          <p class="is-size-5">{{thisMonth + i - 1}}月</p>
          <div v-if="filterEvents.get(thisMonth + i - 2) == null">
            <p class="is-size-5 no-event">{{thisMonth + i - 1}}月の予定はございません</p>
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
          <p class="title is-4" slot="title">
            {{modalEvent.subject}}
          </p>
          <p class="is-size-5 has-text-left" slot="body">{{modalEvent.bodyPreview}}</p>
          <p class="is-size-6 location" slot="footer">
            場所 : {{!modalEvent.location.displayName ? '指定されていません': modalEvent.location.displayName}}
          </p>
        </CardModal>

      </div>
      <Loading v-else-if="showLoading"/>
    </transition>
  </section>
</template>

<script>
import MicrosoftApis from '@/api/microsoft/MicrosoftApis'
import CardModal from '@/components/modal/CardModal.vue'
import Loading from '@/components/loading/Loading.vue'

export default {
  name: 'Home',
  data () {
    return {
      events: [],
      filterEvents: null,
      showLoading: true,
      modalEvent: false,
      displayName: sessionStorage.userDisplayName,
      err: false,
    }
  },
  computed: {
    thisMonth: () => parseInt(new Date().getMonth()) + 1,
    welcomeMessage: () => `ようこそ ${sessionStorage.userDisplayName} さん`
  },
  components: {
    CardModal,
    Loading
  },
  methods: {
    parseMonthDate (str) {
      const date = new Date(str)
      return date.getMonth() + '/' + date.getDate()
    },
    parseDate (str) {
      return new Date(str).getDate()
    },
    addAndGetMonth (num) {
      return new Date().setMonth(parseInt(new Date().getMonth()) + num).getMonth()
    },
    groupBy (list, keyGetter) {
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
  async mounted () {
    try{
      this.events = await MicrosoftApis.Event.getUserEvents()
      this.filterEvents = this.groupBy(this.events.res, event => new Date(event.start.dateTime).getMonth())
    } catch (err) {
      this.$store.commit('childPage/setError', true)
      this.showLoading = false
    }
 }
}
</script>

<style scoped lang="scss">
.container{
  text-align: center;
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
  .event-section{
    padding-top: 25px;
  }
  .no-event{
    height: 70px;
    line-height: 70px;
    vertical-align:middle;
  }
}

.location{
  width: 80vw;
}

.fade-fast-enter-active, .fade-fast-leave-active {
  transition: opacity .5s;
}
.fade-fast-enter, .fade-fast-leave-to {
  opacity: 0;
}
</style>
