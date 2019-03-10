export default {
  methods: {
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
    methodAwithParam (param) {
      console.log(`self: ${param}`)
    }
  }
}
