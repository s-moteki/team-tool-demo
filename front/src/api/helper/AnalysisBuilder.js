import baseURL from './baseURL'

class AnalysisBuilder {

  // 残業時間集計結果取得
  buildGetAnalysis (id) {
    return `${baseURL}attendance-analysis?id=${id}`
  }
}

export default AnalysisBuilder
