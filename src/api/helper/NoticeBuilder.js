import baseURL from './baseURL'

class NoticeBuilder {

  // お知らせ一覧取得URL
  buildGetNotice () {
    return `${baseURL}notices`
  }

  // 登録時URL
  buildPostNotice () {
    return `${baseURL}notices`
  }

  // 削除時URL
  buildDeleteNotice (id) {
    return `${baseURL}notices/${id}`
  }

  // 更新URL
  buildPutNotice (id) {
    return `${baseURL}notices/${id}`
  }
}

export default NoticeBuilder
