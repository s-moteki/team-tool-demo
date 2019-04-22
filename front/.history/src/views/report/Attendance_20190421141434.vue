<template>
  <div class="attendance has-text-centered">

    <!-- 勤怠報告一覧 -->
    <table class="table is-striped is-hoverable table-to-export">
      <thead>
        <tr>
          <th>日付</th>
          <th>区分</th>
          <th>開始</th>
          <th>終了</th>
          <th>備考</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in attendance" :key="data.id"
        @click="showForm = data">
          <td>{{data.day}}</td>
          <td>{{data.type}}</td>
          <td>{{data.start}}</td>
          <td>{{data.end}}</td>
          <td>{{data.remarks != '' ? '有' : '無'}}
            <i class="hidden" v-if="data.remarks != ''">{{`→${data.remarks}`}}</i>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 入力フォームモーダル -->
    <CardModal v-if="showForm" @close="showForm = null">
      <div class="inputForm" slot="body">
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">対象日時</label>
          </div>
          <div class="field-body">
            <div class="field">
              <input class="input" type="date">
            </div>
            <div class="field period">
              <input class="input" type="time">
              <p>〜</p>
              <input class="input" type="time">
            </div>
          </div>
        </div>
      </div>

      <div class="inputForm" slot="body">
        <input class="input is-harf" type="time">
        <input class="input" type="time">
        <p>報告区分</p>
        <div class="select">
          <select>
            <option>-</option>
            <option>残業</option>
            <option>早退</option>
            <option>遅刻</option>
            <option>午後休</option>
            <option>午後休</option>
          </select>
        </div>
        <p>対象時間</p>
        <input type="text">
        <p>備考</p>
        <textarea v-model="showForm.remarks" class="textarea has-fixed-size" placeholder="備考を入力します"></textarea>
      </div>
      <button id="addButton" class="button is-fullwidth" slot="footer" @click="editAttendance(showForm.id)">完了</button>
    </CardModal>

    <!-- 削除モーダル -->

    <!-- 提出ボタン -->
    <button class="button send" @click="sendMail">
      提出する<i class ="fa fa-1x fa-fw fa-file-export"/>
    </button>

    <!-- 勤怠追加ボタン -->
    <button class="button add icon" @click="showForm = true">
      <i class ="fa fa-2x fa-fw fa-plus"/>
    </button>

  </div>
</template>

<script>
import MicrosoftApis from '@/api/microsoft/MicrosoftApis'
import CardModal from '@/components/modal/CardModal.vue'
import XLSX from 'xlsx'

export default {
  name: 'Attendance',
  data () {
    return {
      attendance: [
      ],
      showForm: null,
      showDelete: null
    }
  },
  components: {
    CardModal
  },
  methods: {
    // Excelファイルをメール送信
    async sendMail () {
      const result = await MicrosoftApis.Mail.sendMail(this.createExcel())
      if (result.res) {
        alert('勤怠報告を提出しました。')
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
      // book
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
    editAttendance (id) {
      alert(id)
    }
  },
  mounted () {
    this.attendance = [
        {id:'1', day: '8 (月)', type: '早退', start: '12:00', end: '18:00', remarks: '体調不良'},
        {id:'2', day: '9 (火)', type: '残業', start: '18:00', end: '19:00', remarks: ''},
        {id:'3', day: '12(水)', type: '残業', start: '18:00', end: '23:00', remarks: ''},
        {id:'4', day: '16(木)', type: '全休', start: '--:--', end: '--:--', remarks: ''},
        {id:'5', day: '20(月)', type: '残業', start: '18:00', end: '19:00', remarks: ''},
      ]
  }
}
</script>

<style scoped lang="scss">
.period{
  margin-top: -5px;
  display: inline;
  input{

    width: 30%;
  }
  p{
    display: inline;
  }
}

.attendance{
  padding-top: 200px;
}

.inputForm{
  text-align: left;
}

.table{
  margin: 0 auto;
  min-width: 80vw;
  .hidden{
    display: none;
  }
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
  z-index: 100;
  color: #FFF;
  background-color: #42b983;
}
</style>
