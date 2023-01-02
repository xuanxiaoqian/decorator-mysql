import { CURRENT_SELECT_RESULT, ENTITY_COLUMN } from "../constants";
import AliasHandleUtils from "./AliasHandleUtils";
import { resultConfigType } from "./types";
import { filterComma } from "./utils";


export const Result = <T extends new (...args: any[]) => any, K extends keyof InstanceType<T>>(entity: T, config?: resultConfigType<K>): PropertyDecorator => {
    return function (target, propertyKey) {

        // 此依赖严重依赖Select装饰器,因为Select装饰器会查询定义一个函数,如果result比select先执行就会导致Reflect.get(target, propertyKey)获取的是undefined
        process.nextTick(() => {
            const entityObject = Reflect.getMetadata(ENTITY_COLUMN, entity.prototype) ?? {}

            let currentSelectResult = Reflect.getMetadata(CURRENT_SELECT_RESULT, Reflect.get(target, propertyKey)) as string ?? ''

            const aliasUtils = new AliasHandleUtils(entityObject, config as any)

            currentSelectResult += aliasUtils.getHandleAlias()


            // 过滤掉多余的逗号 -> ,
            currentSelectResult = filterComma(currentSelectResult)

            Reflect.defineMetadata(CURRENT_SELECT_RESULT, currentSelectResult, Reflect.get(target, propertyKey))
        })

    }
}