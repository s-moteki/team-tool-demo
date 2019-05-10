import baseURL from './baseURL'

class AttendanceBuilder {

  // 指定月、指定ユーザーの勤怠情報取得URL
  buildGetAttendance (oid, ym) {
    return `${baseURL}attendances?id=${oid}&year=${ym.slice(0, 4)}&month=${ym.slice(-2)}`
  }

  // 勤怠情報の追加
  buildPostAttendance () {
    return `${baseURL}attendances`
  }

  // 提出フラグの更新
  buildPutSubmissions () {
    return `${baseURL}updatesubmissions`
  }

  // 勤怠情報更新
  buildPutAttendance (id) {
    return `${baseURL}attendances/${id}`
  }

  // 勤怠削除
  buildDeleteAttendance (id) {
    return `${baseURL}attendances/${id}`
  }

}

export default AttendanceBuilder
