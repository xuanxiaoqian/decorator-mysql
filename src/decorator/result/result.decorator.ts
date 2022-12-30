import { CURRENT_SELECT_RESULT, ENTITY_COLUMN } from "../constants";
import AliasHandleUtils from "./AliasHandleUtils";
import { resultConfigType } from "./types";


export const Result = <T extends new (...args: any[]) => any, K extends keyof InstanceType<T>>(entity: T, config?: resultConfigType<K>): PropertyDecorator => {
    return function (target, propertyKey) {
        const entityObject = Reflect.getMetadata(ENTITY_COLUMN, entity.prototype) ?? {}

        let currentSelectResult = Reflect.getMetadata(CURRENT_SELECT_RESULT, Reflect.get(target, propertyKey)) as string ?? ''

        const aliasUtils = new AliasHandleUtils(entityObject, config as any)

        currentSelectResult += aliasUtils.getHandleAlias()


        // 过滤掉多余的逗号 -> ,
        currentSelectResult = currentSelectResult
            .split(',')
            .filter((v) => v)
            .join(', ')

        Reflect.defineMetadata(CURRENT_SELECT_RESULT, currentSelectResult, Reflect.get(target, propertyKey))
    }
}