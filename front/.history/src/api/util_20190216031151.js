const CRYPT_OBJ = window.crypto || window.msCrypto

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

//ランダムなGUIDを生成
function guid() {
  var buf = new Uint16Array(8);
  cryptObj.getRandomValues(buf);
  function s4(num) {
    var ret = num.toString(16);
    while (ret.length < 4) {
      ret = '0' + ret;
    }
    return ret;
  }
  return s4(buf[0]) + s4(buf[1]) + '-' + s4(buf[2]) + '-' + s4(buf[3]) + '-' +
    s4(buf[4]) + '-' + s4(buf[5]) + s4(buf[6]) + s4(buf[7]);
}

export {serialize}
