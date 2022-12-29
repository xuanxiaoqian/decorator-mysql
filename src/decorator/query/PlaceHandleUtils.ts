

import SelectUtils from './SelectUtils'

export default class PlaceHandleUtils {
  paramsType: string
  selectUtils: SelectUtils
  paramsData: Array<any>

  currentExecuteValueList: any[]

  // 处理后的sql
  currentExecuteSql: string

  constructor(attribute: { paramsType: string; selectUtils: SelectUtils; paramsData: Array<any>; currentExecuteValueList: any[]; currentExecuteSql: string }) {
    this.paramsType = attribute.paramsType
    this.selectUtils = attribute.selectUtils
    this.paramsData = attribute.paramsData
    this.currentExecuteValueList = attribute.currentExecuteValueList
    this.currentExecuteSql = attribute.currentExecuteSql

    this.handlePlace()
  }

  /**
   * 开始加工处理
   */
  handlePlace() {
    const selectUtils = this.selectUtils
    let args = this.paramsData
    const currentExecuteValueList = this.currentExecuteValueList
    let currentExecuteSql = this.currentExecuteSql

    // &{}占位符
    if (selectUtils.getStoragePreHandleKeys().length > 0) {
      selectUtils.getStoragePreHandleKeys().map((key) => {
        let currentArgs = this.paramsType == 'object' ? args[0][key] : args[+key]
        currentExecuteValueList.push(currentArgs)
      })
    }

    // ${}占位符
    if (selectUtils.getStoragePlaceHolderKeys().length > 0) {
      selectUtils.getStoragePlaceHolderKeys().map(([replaceTag, matchName]) => {
        let currentArgs = this.paramsType == 'object' ? args[0][matchName] : args[+matchName]
        currentExecuteSql = currentExecuteSql.replace(replaceTag, currentArgs)
      })
    }

    // #{}占位符
    if (selectUtils.getStoragePlaceHolderSymbolKeys().length > 0) {
      selectUtils.getStoragePlaceHolderSymbolKeys().map(([replaceTag, matchName]) => {
        let currentArgs = this.paramsType == 'object' ? args[0][matchName] : args[+matchName]
        currentExecuteSql = currentExecuteSql.replace(replaceTag, `'${currentArgs}'`)
      })
    }

    // 基础类型需要重新赋值
    this.currentExecuteSql = currentExecuteSql
  }
}
