

import SelectUtils from './SelectUtils'
import { Typeof } from './utils'

/**
 * 处理占位符的参数,此函数需要注意性能优化
 */
export default class PlaceHandleUtils {
  paramsType: string
  selectUtils: SelectUtils
  paramsData: Array<any>

  currentExecuteValueList: any[] = []

  //原sql
  pureSql: string

  // 处理后的sql
  currentExecuteSql: string

  constructor(selectUtils: SelectUtils, paramsData: Array<any>) {
    this.paramsType = Typeof(paramsData)
    this.selectUtils = selectUtils
    this.paramsData = paramsData

    this.pureSql = selectUtils.getTransformSql()
  }


  setParamsData(paramsData: Array<any>) {
    this.paramsData = paramsData
  }

  /**
   * 开始加工处理
   */
  handlePlace() {
    const selectUtils = this.selectUtils
    let args = this.paramsData
    const currentExecuteValueList: any[] = []
    let currentExecuteSql = this.pureSql

    // &{}占位符
    selectUtils.getpreHandleKeys().map((key) => {
      let currentArgs = this.paramsType == 'object' ? args[0][key] : args[+key]
      currentExecuteValueList.push(currentArgs)
    })


    // ${}占位符
    selectUtils.getPlaceHolderKeys().map(([replaceTag, matchName]) => {
      let currentArgs = this.paramsType == 'object' ? args[0][matchName] : args[+matchName]
      currentExecuteSql = currentExecuteSql.replace(replaceTag, currentArgs)
    })


    // #{}占位符
    selectUtils.getPlaceHolderSymbolKeys().map(([replaceTag, matchName]) => {
      let currentArgs = this.paramsType == 'object' ? args[0][matchName] : args[+matchName]
      currentExecuteSql = currentExecuteSql.replace(replaceTag, `'${currentArgs}'`)
    })


    // 基础类型需要重新赋值
    this.currentExecuteSql = currentExecuteSql
    this.currentExecuteValueList = currentExecuteValueList
  }
}
