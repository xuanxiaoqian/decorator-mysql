import { pool } from "../../mysql"
import { CURRENT_SELECT_RESULT } from "../constants"
import PlaceHandleUtils from "./PlaceHandleUtils"
import SelectUtils from "./SelectUtils"
import { Typeof } from "./utils"
import { factoryConfigType } from "./types"


/**
 * 装饰器工厂
 * @param sqlConfig  不同的装饰器额外配置
 * @returns
 */
const SqlDecoratorFactory = (factoryConfig?: factoryConfigType) => {
    return (sql: string) => {
        return function (target: any, propertyKey: PropertyKey) {
            process.nextTick(() => {
                let selectUtils: SelectUtils
                target[propertyKey] = new Proxy(new Function(), {
                    apply: async (applyTarget, thisBinding, args) => {
                        if (selectUtils === undefined) {
                            let selectResult = Reflect.getMetadata(CURRENT_SELECT_RESULT, target) as string ?? ''
                            selectUtils = new SelectUtils(sql, selectResult)
                            console.log(selectResult);

                        }

                        // 当前执行的参数
                        let currentExecuteValueList: any[] = []

                        // 处理后的sql
                        let currentExecuteSql = selectUtils.getStorageTransformSql()

                        // 没有匹配到占位符
                        if (selectUtils.getStoragePlaceHolderKeys().length === 0 && selectUtils.getStoragePlaceHolderSymbolKeys().length === 0 && selectUtils.getStoragePreHandleKeys().length === 0) {
                            currentExecuteValueList = args
                        } else {
                            const placeHandleUtils = new PlaceHandleUtils({ paramsType: Typeof(args[0]), selectUtils: selectUtils, paramsData: args, currentExecuteValueList: currentExecuteValueList, currentExecuteSql: currentExecuteSql })
                            currentExecuteValueList = placeHandleUtils.currentExecuteValueList
                            currentExecuteSql = placeHandleUtils.currentExecuteSql
                        }

                        console.log(currentExecuteSql, currentExecuteValueList)

                        const conn = pool

                        let rows: Array<any> = []
                        rows = await conn.execute(currentExecuteSql, currentExecuteValueList)

                        if (factoryConfig?.selectOne) {
                            rows[0].length > 0 ? (rows[0] = rows[0][0]) : (rows[0] = {})
                        }

                        return factoryConfig?.originResult ? rows : rows[0]
                    },
                })
            })
        }
    }
}



export const Select = SqlDecoratorFactory()
export const SelectOne = SqlDecoratorFactory({ selectOne: true })
export const SelectOrigin = SqlDecoratorFactory({ originResult: true })

export const Insert = SqlDecoratorFactory()
export const Delete = SqlDecoratorFactory()
export const Update = SqlDecoratorFactory()