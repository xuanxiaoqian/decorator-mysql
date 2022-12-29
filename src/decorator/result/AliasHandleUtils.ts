import { resultConfigType } from "./types"


export default class AliasHandleUtils {

  private resultObject: Object

  private resultConfig?: resultConfigType

  private transformAlias = ''

  constructor(data: Object, config?: resultConfigType) {
    this.resultObject = data
    this.resultConfig = config

    this.handleAlias()
  }

  /**
 * 获取转换后的
 * @returns 处理后的参数
 */
  getHandleAlias() {
    // 在前面加个逗号是为了保险,防止其他result拼在一起,可以多逗号但是不能少逗号,外面会统一删除多余的逗号
    return ',' + this.transformAlias
  }

  /**
   * 根据配置过滤exclude或only参数 only优先
   * @returns
   */
  private filterResult() {
    let recordKey: string = ''


    if (this.resultConfig?.only !== undefined) {
      recordKey = 'only'
    } else if (this.resultConfig?.exclude !== undefined) {
      recordKey = 'exclude'
    }

    switch (recordKey) {
      case 'only':
        const newResultObj: Object = {}

        this.resultConfig?.only?.map(v => {
          let currentData = Reflect.get(this.resultObject, v)
          Reflect.set(newResultObj, v, currentData)
        })

        this.resultObject = newResultObj
        break
      case 'exclude':
        this.resultConfig?.exclude?.map(v => {
          Reflect.deleteProperty(this.resultObject, v)
        })
        break
    }
  }

  /**
 * 根据配置的alias配置别名 xx.id as xxx
 */
  private handleAs() {
    let alias = this.resultConfig?.alias ? this.resultConfig?.alias + '.' : ''

    Object.keys(this.resultObject).map(v => {
      let curData = Reflect.get(this.resultObject, v)

      this.transformAlias += `${alias}${curData} as ${v},`
    })
  }

  /**
 * 根据配置的custom拼接参数
 */
  private handleCustom() {
    this.transformAlias += this.resultConfig?.custom ? this.resultConfig?.custom + ',' : ''
  }


  /**
 * 开始处理
 */
  private handleAlias() {
    this.filterResult()

    this.handleAs()

    this.handleCustom()
  }
}
