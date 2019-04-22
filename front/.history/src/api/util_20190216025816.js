
// 引数の文字列をシリアライズ
const serialize = data => {
  let key, value, type, i, max
  const encode = window.encodeURIComponent
  let query = '?'

  for (key in data) {
    value = data[key]
    type = typeof (value) === 'object' && value instanceof Array ? 'array' : typeof (value)
    switch (type) {
      case 'undefined':
        // キーに対しての値がない場合
        query += key
        break
      case 'array':
        // 配列の場合
        for (i = 0, max = value.length; i < max; i++) {
          query += key + '[]'
          query += '='
          query += encode(value[i])
          query += '&'
        }
        query = query.substr(0, query.length - 1)
        break
      case 'object':
        // オブジェクト
        for (i in value) {
          query += key + '[' + i + ']'
          query += '='
          query += encode(value[i])
          query += '&'
        }
        query = query.substr(0, query.length - 1)
        break
      default:
        query += key
        query += '='
        query += encode(value)
        break
    }
    query += '&'
  }
  query = query.substr(0, query.length - 1)
  return query
}

export {serialize}
