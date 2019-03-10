
const CRYPT_OBJ = window.crypto || window.msCrypto

/**
 * 引数の{Obj||Array}からパスにシリアライズ
 * @param {object || Array} data 任意のオブジェクトか配列
 * @return {String} シリアライズ結果文字列を戻します
*/
const serialize = data => {
  const encode = window.encodeURIComponent
  let query = '?'

  for (let key in data) {
    let value = data[key]
    let type = typeof (value) === 'object' && value instanceof Array ? 'array' : typeof (value)
    switch (type) {
      case 'undefined':
        query += key
        break
      case 'array':
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

/**
 * ランダムなGUIDを生成。トークン検証、認証で使用
 * @return {String} ランダムなGUIDを返却
*/
const guid = () => {
  let buf = new Uint16Array(8)
  CRYPT_OBJ.getRandomValues(buf)

  const s4 = num => {
    let ret = num.toString(16)
    while (ret.length < 4) {
      ret = `0${ret}`
    }
    return ret
  }
  return `${s4(buf[0])}${s4(buf[1])}-${s4(buf[2])}-${s4(buf[3])}-${s4(buf[4])}-${s4(buf[5])}${s4(buf[6])}${s4(buf[7])}`
}

export {serialize, guid}
