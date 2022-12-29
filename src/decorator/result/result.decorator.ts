import { CURRENT_SELECT_RESULT, ENTITY_COLUMN } from "../constants";
import AliasHandleUtils from "./AliasHandleUtils";
import { resultConfigType } from "./types";


export const Result = <T = never>(entity: Function, config?: resultConfigType<T>): PropertyDecorator => {
    return function (target, key) {
        const entityObject = Reflect.getMetadata(ENTITY_COLUMN, entity.prototype) ?? {}

        let currentSelectResult = Reflect.getMetadata(CURRENT_SELECT_RESULT, target) as string ?? ''

        // 需要一个配置，将entityObject 里面的值配合config变为 xxx as xxx
        const aliasUtils = new AliasHandleUtils(entityObject, config)

        currentSelectResult += aliasUtils.getHandleAlias()

        // 过滤掉多余的逗号 -> ,
        currentSelectResult = currentSelectResult
            .split(',')
            .filter((v) => v)
            .join(', ')

        Reflect.defineMetadata(CURRENT_SELECT_RESULT, currentSelectResult, target)
    }
}