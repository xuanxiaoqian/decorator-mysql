import { pool } from "../../mysql"
import { CURRENT_SELECT_RESULT } from "../constants"
import PlaceHandleUtils from "./PlaceHandleUtils"
import SelectUtils from "./SelectUtils"
import { factoryConfigType } from "./types"


/**
 * 装饰器工厂
 * @param sqlConfig  不同的装饰器额外配置
 * @returns
 */
const SqlDecoratorFactory = (factoryConfig?: factoryConfigType) => {
    return (sql: string): PropertyDecorator => {
        return function (target, propertyKey) {

            let selectUtils: SelectUtils

            let placeHandleUtils: PlaceHandleUtils

            // 处理好的SQL
            let currentExecuteSql: string

            // 当前执行的参数
            let currentExecuteValueList: any[] = []

            // 是否纯sql,不携带任何参数
            let isPureSql: boolean = false

            // 是否使用的是@Select装饰器 而不是@SelectOne和@SelectOrigin
            let isPureSelect: boolean = false

            Reflect.set(target, propertyKey, new Proxy(new Function(), {
                apply: async (applyTarget, thisBinding, args) => {
                    if (selectUtils === undefined) {
                        let selectResult = Reflect.getMetadata(CURRENT_SELECT_RESULT, Reflect.get(target, propertyKey))
                        selectUtils = new SelectUtils(sql, selectResult)
                        currentExecuteSql = selectUtils.getTransformSql()

                        if (selectUtils.getPlaceHolderKeys().length === 0 && selectUtils.getPlaceHolderSymbolKeys().length === 0 && selectUtils.getpreHandleKeys().length === 0) {
                            isPureSql = true
                        } else {
                            placeHandleUtils = new PlaceHandleUtils(selectUtils, args)
                        }

                        if (!factoryConfig?.selectOne && !factoryConfig?.originResult) {
                            isPureSelect = true
                        }

                    }


                    // 纯sql
                    if (isPureSql) {
                        currentExecuteValueList = args
                    } else {
                        placeHandleUtils.setParamsData(args)
                        placeHandleUtils.handlePlace()

                        currentExecuteValueList = placeHandleUtils.currentExecuteValueList
                        currentExecuteSql = placeHandleUtils.currentExecuteSql
                    }

                    console.log(currentExecuteSql, currentExecuteValueList)

                    const conn = thisBinding?.config?.port !== undefined ? thisBinding : pool

                    let rows = await conn.execute(currentExecuteSql, currentExecuteValueList) as Array<any>


                    if (isPureSelect) {
                        return rows[0]
                    }

                    if (factoryConfig?.selectOne) {
                        return rows[0].length > 0 ? rows[0][0] : {}
                    }

                    if (factoryConfig?.originResult) {
                        return rows
                    }

                },

            }))


        }
    }
}



export const Select = SqlDecoratorFactory()
export const SelectOne = SqlDecoratorFactory({ selectOne: true })
export const SelectOrigin = SqlDecoratorFactory({ originResult: true })

export const Insert = SqlDecoratorFactory()
export const Delete = SqlDecoratorFactory()
export const Update = SqlDecoratorFactory()