<template>
<section>
  <transition name="fade-fast" mode="out-in">
    <div class="attendance has-text-centered" v-if="attendance">
      <div class="select">
        <select v-model="selectedYM" @change="changeYM">
          <option :value="this.thisMonth()">今月</option>
          <option v-for="month in yearMonths" :key="month.ym" :value="month.ym">{{`${month.ym.slice(0, 4)}-${month.ym.slice(-2)}`}}</option>
        </select>
      </div>
      <!-- 勤怠報告一覧 -->
      <table class="table is-striped"
      :class="{'is-hoverable table-to-export': !submission}">
        <thead>
          <tr>
            <th>日付</th>
            <th>区分</th>
            <th>開始</th>
            <th>終了</th>
            <th>備考</th>
            <th class="hidden">備考詳細</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in attendance" :key="data.attendance_id"
          @click="!submission? showForm = data: null"
          >
            <td>{{editDispDate(data.date)}}</td>
            <td>{{getTypeName(data.type_id).text}}</td>
            <td>{{data.start}}</td>
            <td>{{data.end}}</td>
            <td>{{data.remarks != '' ? '有' : '無'}}</td>
            <td class="hidden">{{data.remarks}}</td>
          </tr>
        </tbody>
      </table>

      <!-- 入力フォームモーダル -->
      <CardModal v-if="showForm" @close="showForm = null">
        <div class="inputForm" slot="body">
          <!-- 入力(対象日時) -->
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">対象日時</label>
            </div>
            <div class="field-body">
              <div class="field">
                <input class="input" type="date" v-model="showForm.date">
              </div>
              <div class="field period">
                <input class="input" type="time" v-model="showForm.start">
                <p>〜</p>
                <input class="input" type="time" v-model="showForm.end">
              </div>
            </div>
          </div>
          <!-- 入力(報告区分) -->
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">報告区分</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="select">
                  <select v-model="showForm.type_id">
                    <option disabled value="">選択してください</option>
                    <option v-for="option in types"
                    :key="option.value"
                    :value="option.value">
                      {{option.text}}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <!-- 入力(備考) -->
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <p>備考</p>
              </div>
              <div class="field-body">
                <div class="field">
                  <textarea v-model="showForm.remarks" class="textarea has-fixed-size" placeholder="備考を入力します"></textarea>
                </div>
              </div>
            </div>
          </div>

        </div>
        <button id="addButton" class="button is-fullwidth" slot="footer" @click="done()">完了</button>
        <i v-if="showForm.attendance_id != null" class="fas fa-trash-alt has-text-danger delete-icon" slot="footer" @click="showAlertDelete = true"></i>
      </CardModal>

      <!-- 削除モーダル -->
      <CardModal v-if="showAlertMail || showAlertDelete" @close="showAlertMail = null, showAlertDelete = null">
        <div class="input-title" slot="body">
          <p v-if="showAlertMail">提出しますか?</p>
          <p v-else>削除しますか？</p>
        </div>
        <div slot="footer" class="buttons is-centered">
          <button v-if="showAlertMail" class="button is-success" @click="sendMail(),showAlertMail = null">はい</button>
          <button v-else class="button is-success" @click="{{deleteAttendance(),showAlertDelete = null}}">はい</button>
          <button class="button is-danger" @click="showAlertMail = null, showAlertDelete = null">いいえ</button>
        </div>
      </CardModal>

      <!-- 提出ボタン -->
      <button  :disabled="submission || attendance == null || attendance.length == 0" class="button send" @click="showAlertMail = true">
        {{submission?'提出済み':'提出する'}}<i class ="fa fa-1x fa-fw fa-file-export"/>
      </button>

      <!-- 勤怠追加ボタン -->
      <button v-if="!submission" class="button add icon" @click="showForm = {attendance_id: null, date: '', type_id: '', start: '', end: '', remarks: '', user_oid: user_oid, display_name: display_name, email: email}">
        <i class ="fa fa-2x fa-fw fa-plus"/>
      </button>
    </div>
    <Loading v-else-if="showLoading"/>
  </transition>
</section>
</template>

<script>
import MicrosoftApis from '@/api/microsoft/MicrosoftApis'
import builders from '@/api/helper/builders'
import CardModal from '@/components/modal/CardModal'
import Loading from '@/components/loading/Loading'
import mixinUtil from '@/mixin/mixinUtil'
import axios from 'axios'
import XLSX from 'xlsx'

export default {
  name: 'Attendance',
  mixins: [mixinUtil],
  data () {
    return {
      showLoading: true,
      attendance: null,
      showForm: null,
      showDelete: null,
      user_oid: sessionStorage.userOid,
      display_name: sessionStorage.userDisplayName,
      email: sessionStorage.userEmail,
      yearMonths: [],
      selectedYM: null,
      submission: true,
      showAlertMail: null,
      showAlertDelete: null,
      types: [
        { text: '残業', value: 1},
        { text: '休み', value: 2},
        { text: '早退', value: 3},
        { text: '遅刻', value: 4},
        { text: '他', value: 5}
      ]
    }
  },
  components: {
    CardModal,
    Loading
  },
  methods: {
    // Excelファイルをメール送信
    async sendMail () {
      const result = await MicrosoftApis.Mail.sendMail(this.createExcel(), this.selectedYM)
      if (result.res) {
        this.updateSubmissions()
      } else {
        alert('提出に失敗しました。')
      }
    },

    //Excel バイナリ
    createExcel () {
      // options
      let wopts = {
        bookType: 'xlsx',
        bookSST: false,
        type: 'binary'
      }
      // ブック
      let workbook = {
        SheetNames: [],
        Sheets: {}
      }
      // シート追加、値取得
      document.querySelectorAll('table.table-to-export').forEach(function (currentValue, index) {
        let n = '勤怠時間報告'
        workbook.SheetNames.push(n)
        workbook.Sheets[n] = XLSX.utils.table_to_sheet(currentValue, wopts)
      })
      const wbout = XLSX.write(workbook, wopts)
      const b = new Blob([this.s2ab(wbout)], {type: 'application/octet-stream'})
      return b
    },

    // Blob用　変換
    s2ab (s) {
      let buf = new ArrayBuffer(s.length)
      let view = new Uint8Array(buf)
      for (let i = 0; i != s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF
      }
      return buf
    },

    // 勤怠記録編集
    editAttendance (id) {
      alert(id)
    },

    // 年月日→日(曜日)
    editDispDate (str) {
      const date = new Date(str.replace(/-/g,'/'))
      return `${('0' + date.getDate()).slice(-2)}(${this.$_mixinUtil_parseDay(date.getDay())})`
    },

    // 区分名
    getTypeName (id) {
      return this.types.find(type => { return type.value == id })
    },

    // 今月 月
    thisMonth () {
      const now = new Date()
      return `${now.getFullYear()}${('0' + (now.getMonth() + 1)).slice(-2)}`
    },

    // 編集可否
    isSubmission () {
      if (this.selectedYM == this.thisMonth()) {
        return this.attendance.length == 0 ? false : Boolean(this.attendance[0].submission)
      } else {
        // 不整合の防止
        return this.attendance.length == 0 ? true : Boolean(this.attendance[0].submission)
      }
    },

    // フォームの完了ボタン押下時
    done () {
      if(!this.checkForm){
        alert('日付、報告区分は必須項目です')
        return
      }
      if (this.showForm.attendance_id != null) {
        this.editAttendance()
      } else {
        this.addAttendance()
      }
    },

    // 勤怠削除
    async deleteAttendance () {
      try {
        const response = await axios.delete(builders.AttendanceBuilder.buildDeleteAttendance(this.showForm.attendance_id))
        alert('削除が完了しました')
        this.showForm = null
        this.changeYM()
      } catch(err) {
        alert('削除に失敗しました')
      }
    },

    // 勤怠情報更新
    async editAttendance () {
      try {
        const response = await axios.put(builders.AttendanceBuilder.buildPutAttendance(this.showForm.attendance_id),this.showForm)
        alert('更新が完了しました')
        this.showForm = null
        this.changeYM()
      } catch (err) {
        alert('更新に失敗しました')
      }
    },

    // 勤怠追加
    async addAttendance () {
      try {
        const response = await axios.post(builders.AttendanceBuilder.buildPostAttendance(),this.showForm)
        alert('投稿が完了しました')
        this.showForm = null
        this.changeYM()
      } catch(err) {
        alert('送信に失敗しました')
      }
    },

    // 提出フラグの更新
    async updateSubmissions () {
      try {
        const response = await axios.put(builders.AttendanceBuilder.buildPutSubmissions(), this.attendance)
        alert('勤怠報告を提出しました。')
        this.changeYM()
      } catch(err) {
        alert('提出に失敗しました。')
      }
    },

    // 選択中月日の勤怠情報の取得this.selectedYM
    async changeYM () {
      try {
        this.attendance = null
        const response = await axios.get(builders.AttendanceBuilder.buildGetAttendance(this.user_oid, this.selectedYM))
        this.attendance = response.data.attendance
        this.submission = this.isSubmission()
      } catch (err) {
        this.$store.commit('childPage/setError', true)
        this.showLoading = false
      }
    }
  },
  computed: {
    //入力フォーム　未入力チェック
    checkForm () {
      return this.showForm.date && this.showForm.type_id
    }
  },
  async mounted () {
    try {
      const response = await axios.get(builders.AttendanceBuilder.buildGetAttendance(this.user_oid, this.thisMonth()))
      this.attendance = response.data.attendance
      this.yearMonths = response.data.yearMonths.filter((yearMonth, index) => yearMonth.ym != this.thisMonth())
      this.selectedYM = this.thisMonth()
      this.submission = this.isSubmission()
    } catch (err) {
      this.$store.commit('childPage/setError', true)
      this.showLoading = false
    }
  }
}
</script>

<style scoped lang="scss">

.attendance{
  padding-top: 30px;
}
.period{
  display: inline;
  input{
    width: 41%;
  }
  p{
    display: inline;
  }
}
.buttons{
  button{
    width: 45%;
  }
}
.table{
  margin: 0 auto;
  min-width: 80vw;
  .hidden{
    display: none;
  }
}

textarea{
  width: 300px;
}

.delete-icon{
  padding-top: 20px;
  font-size: 150%;
}

.send{
  color: #2c3e50;
  font-size: 130%;
  border-width: 2px;
  margin-top: 20px;
  min-width: 40vw;
}

.add{
  border-radius: 50%;
  border-width: 2px;
  border: none;
  font-size: 0.9em;
  height: 50px;
  width: 50px;
  position: fixed;
  bottom: 40px;
  right: 10px;
  z-index: 98;
  color: #FFF;
  background-color: #42b983;
}
</style>
