<template>
  <div class="attendance">
    <table class="table is-striped is-hoverable table-to-export">
      <thead>
        <tr>
          <th>日付</th>
          <th>区分</th>
          <th>対象時間</th>
          <th>備考</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>10/9</td>
          <td>残業</td>
          <td>18:00~19:00</td>
          <td>未</td>
        </tr>
        <tr>
          <td>10/10</td>
          <td>早退</td>
          <td>18:00~19:00</td>
          <td>未</td>
        </tr>
        <tr>
          <td>10/13</td>
          <td>午後休</td>
          <td>12:00~18:00</td>
          <td>未</td>
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
    }
  },
  methods: {
    async sendMail () {
      // 予定一覧api
      alert(JSON.stringify(this.createExcel()))
      const result = await MicrosoftApis.Mail.sendMail(this.createExcel())
      if (result.res) {
        alert('勤怠報告を提出しました。')
      } else {
        alert('提出に失敗しました。')
      }
    },
    //Excel 生成
    createExcel () {

      let wopts = {
        bookType: 'xlsx',
        bookSST: false,
        type: 'binary'
      }
      let workbook = {
        SheetNames: [],
        Sheets: {}
      }

      document.querySelectorAll('table.table-to-export').forEach(function (currentValue, index) {
        // sheet_to_workbook()の実装を参考に記述
        let n = '勤怠時間報告'
        workbook.SheetNames.push(n)
        workbook.Sheets[n] = XLSX.utils.table_to_sheet(currentValue, wopts)
      })
      alert(JSON.stringify(workbook))
      const wbout = XLSX.write(workbook, wopts)

      return new Blob([this.s2ab(wbout)], {type: 'application/octet-stream'})
    },
    // バイナリデータで変換
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
