<template>
  <div class="attendance">
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
        <tr v-for="data in attendance" :key="data.id">
          <td>{{data.day}}</td>
          <td>{{data.type}}</td>
          <td>{{data.start}}</td>
          <td>{{data.end}}</td>
          <td>{{data.remarks}}</td>
        </tr>
      </tbody>
    </table>
    <button class="button is-success" @click="sendMail">テスト</button>
  </div>
</template>

<script>
import MicrosoftApis from '@/api/microsoft/MicrosoftApis'
import XLSX from 'xlsx'

export default {
  name: 'Attendance',
  data () {
    return {
      attendance: [
        {id:'1', day: '8 (月)', type: '早退', start: '12:00', end: '18:00', remarks: '-'},
        {id:'2', day: '9', type: '残業', start: '18:00', end: '19:00', remarks: '-'},
        {id:'3', day: '12', type: '残業', start: '18:00', end: '23:00', remarks: '-'},
        {id:'4', day: '16', type: '全休', start: '--:--', end: '--:--', remarks: '-'},
        {id:'5', day: '20', type: '残業', start: '18:00', end: '19:00', remarks: '-'},
      ]
    }
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
    }
  }
}
</script>

<style scoped lang="scss">

.attendance{
  padding-top: 200px;
}

.table{
  margin: 0 auto;
  min-width: 80vw;
}

p{
  padding-top: 30vh;
  text-align: center;
}
</style>
