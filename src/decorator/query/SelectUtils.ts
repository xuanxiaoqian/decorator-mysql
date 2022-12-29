

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
  private storageTransformSql: string

  private storageSqlResult: string | null

  private storagePreHandleKeys: Array<string> = []

  private storagePlaceHolderKeys: Array<RegExpExecArray> = []

  private storagePlaceHolderSymbolKeys: Array<RegExpExecArray> = []

  /**
   * 自动处理参数
   * @param sql 
   * @param resultsAlias
   */
  constructor(sql: string, resultsAlias: string | null) {
    this.storageTransformSql = sql
    this.storageSqlResult = resultsAlias

    this.handlePreHandleRegExp()

    this.handleResultsAlias()

    this.handlePlaceHolderSymbolRegExp()

    this.handlePlaceHolderRegExp()
  }

  /**
   * 获得工具类处理后的sql
   * @returns 处理后的sql 例如select user_id as userId where id = ?
   */
  getStorageTransformSql() {
    return this.storageTransformSql
  }

  /**
   * 例如 select * from user where id = &{0} and name = &{1} 那么这里就是['0','1']
   * @returns 预处理占位符的keys
   */
  getStoragePreHandleKeys() {
    return this.storagePreHandleKeys
  }

  /**
   * 例如 select * from user where id = ${0} and name = ${1} 那么这里就是['0','1']
   * @returns 占位符的keys
   */
  getStoragePlaceHolderKeys() {
    return this.storagePlaceHolderKeys
  }

  /**
   * 例如 select * from user where id = #{0} and name = #{1} 那么这里就是['0','1']
   * @returns 占位符双引号的keys
   */
  getStoragePlaceHolderSymbolKeys() {
    return this.storagePlaceHolderSymbolKeys
  }

  /**
   * 处理sql预处理符 -> &{xxx}
   */
  private handlePreHandleRegExp() {
    let temporaryRegExp
    let temporaryRegExpSql = this.storageTransformSql
    while ((temporaryRegExp = preHandleRegExp.exec(temporaryRegExpSql))) {
      const [replaceTag, matchName] = temporaryRegExp

      this.storageTransformSql = this.storageTransformSql.replace(replaceTag, '?')

      this.storagePreHandleKeys.push(matchName)
    }
  }

  /**
   * 处理占位符的正则匹配 -> ${xxx}
   */
  private handlePlaceHolderRegExp() {
    let temporaryRegExp
    while ((temporaryRegExp = placeHolderRegExp.exec(this.storageTransformSql))) {
      this.storagePlaceHolderKeys.push(temporaryRegExp)
    }
  }

  /**
   * 处理占位符的正则匹配 -> #{xxx}
   */
  private handlePlaceHolderSymbolRegExp() {
    let temporaryRegExp
    while ((temporaryRegExp = placeHolderSymbolRegExp.exec(this.storageTransformSql))) {
      this.storagePlaceHolderSymbolKeys.push(temporaryRegExp)
    }
  }

  /**
   * 处理返回值 -> select xxx from
   */
  private handleResultsAlias() {
    if (this.storageSqlResult === null) {
      return
    }

    let [, matchName] = resultsAliasRegExp.exec(this.storageTransformSql) as RegExpExecArray
    this.storageTransformSql = this.storageTransformSql.replace(matchName, this.storageSqlResult)
  }
}
