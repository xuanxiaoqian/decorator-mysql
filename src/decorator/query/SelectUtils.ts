

/**
 * &{xxx}预处理正则表达式
 */
export const preHandleRegExp = new RegExp(/&{(\w+)}/g)

/**
 * #{xxx}占位符正则表达式
 */
export const placeHolderSymbolRegExp = new RegExp(/\#{(\w+)}/g)

/**
 * ${xxx}占位符正则表达式
 */
export const placeHolderRegExp = new RegExp(/\${(\w+)}/g)

/**
 * select xxx from中间那一段别名正则表达式
 */
export const resultsAliasRegExp = new RegExp(/select+\s*(\S+)+\s*from/)

export default class SelectUtils {
  private transformSql: string

  private resultAlias: string | undefined

  private preHandleKeys: Array<string> = []

  private placeHolderKeys: Array<RegExpExecArray> = []

  private placeHolderSymbolKeys: Array<RegExpExecArray> = []

  /**
   * 自动处理参数
   * @param sql 
   * @param resultsAlias
   */
  constructor(sql: string, resultsAlias: string | undefined) {
    this.transformSql = sql
    this.resultAlias = resultsAlias

    this.handleSelect()
  }

  /**
   * 开始处理
   */
  private handleSelect() {

    this.handlePreHandleRegExp()

    this.handleResultsAlias()

    this.handlePlaceHolderSymbolRegExp()

    this.handlePlaceHolderRegExp()
  }

  /**
   * 获得工具类处理后的sql
   * @returns 处理后的sql 例如select user_id as userId where id = ?
   */
  getTransformSql() {
    return this.transformSql
  }

  /**
   * 例如 select * from user where id = &{0} and name = &{1} 那么这里就是['0','1']
   * @returns 预处理占位符的keys
   */
  getpreHandleKeys() {
    return this.preHandleKeys
  }

  /**
   * 例如 select * from user where id = ${0} and name = ${1} 那么这里就是['0','1']
   * @returns 占位符的keys
   */
  getPlaceHolderKeys() {
    return this.placeHolderKeys
  }

  /**
   * 例如 select * from user where id = #{0} and name = #{1} 那么这里就是['0','1']
   * @returns 占位符双引号的keys
   */
  getPlaceHolderSymbolKeys() {
    return this.placeHolderSymbolKeys
  }

  /**
   * 处理sql预处理符 -> &{xxx}
   */
  private handlePreHandleRegExp() {
    let temporaryRegExpSql = this.transformSql

    let temporaryRegExp
    while ((temporaryRegExp = preHandleRegExp.exec(temporaryRegExpSql))) {
      const [replaceTag, matchName] = temporaryRegExp

      this.transformSql = this.transformSql.replace(replaceTag, '?')

      this.preHandleKeys.push(matchName)
    }
  }

  /**
   * 处理占位符的正则匹配 -> ${xxx}
   */
  private handlePlaceHolderRegExp() {
    let temporaryRegExp
    while ((temporaryRegExp = placeHolderRegExp.exec(this.transformSql))) {
      this.placeHolderKeys.push(temporaryRegExp)
    }
  }

  /**
   * 处理占位符的正则匹配 -> #{xxx}
   */
  private handlePlaceHolderSymbolRegExp() {
    let temporaryRegExp
    while ((temporaryRegExp = placeHolderSymbolRegExp.exec(this.transformSql))) {
      this.placeHolderSymbolKeys.push(temporaryRegExp)
    }
  }

  /**
   * 处理返回值 -> select xxx from
   */
  private handleResultsAlias() {
    if (this.resultAlias === undefined) {
      return
    }

    let [, matchName] = resultsAliasRegExp.exec(this.transformSql) as RegExpExecArray
    this.transformSql = this.transformSql.replace(matchName, this.resultAlias)
  }
}
