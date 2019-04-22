
// 引数の文字列をシリアライズ
const serialize = data => {
  const encode = window.encodeURIComponent
  let query = '?'

  for (let key in data) {
    let value = data[key]
    let type = typeof (value) === 'object' && value instanceof Array ? 'array' : typeof (value)
    switch (type) {
      case 'undefined':
        // キーに対しての値がない場合
        query += key
        break
      case 'array':
        // 配列の場合
        for (let i = 0, max = value.length; i < max; i++) {
          query += `${key}[]=${encode(value[i])}&`
        }
        query = query.substr(0, query.length - 1)
        break
      case 'object':
        // オブジェクト
        for (let i in value) {
          query += `${key}[${i}]=${encode(value[i])}&`
        }
        query = query.substr(0, query.length - 1)
        break
      default:
        query += `${key}=${encode(value)}`
        break
    }
    query += '&'
  }
  query = query.substr(0, query.length - 1)
  return query
}

export {serialize}
