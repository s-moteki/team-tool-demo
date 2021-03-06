export default {
  methods: {
    // グリッド用 1次元配列をnum区切りで2次元配列に
    $_mixinUtil_splitArray (array = [], splitNum = 1) {
      return array.reduce((table, item) => {
        const last = table[table.length - 1]
        if (last.length === splitNum) {
          table.push([item])
          return table
        }
        last.push(item)
        return table
      }, [[]])
    },
    // yyyy-MM-dd形式
    $_mixinUtil_parseDate_yyyy_MM_dd (str) {
      const date = new Date(str.replace(/-/g,'/'))
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    },
    // 0~6から曜日
    $_mixinUtil_parseDay (day) {
      const DAYS = ['日','月','火','水','木','金','土']
      return DAYS[parseInt(day)]
    }
  }
}
