import { ENTITY_COLUMN } from "../constants"
import { columnMetadataType } from "./types"
import { humpToLine } from "./utils"


/**
 * column装饰器工厂
 * @param humpKey 驼峰Key
 * @returns 
 */
const columnDecoratorFactory = (isHump?: boolean) => {
    return (metadata?: columnMetadataType): PropertyDecorator => {
        return function (target, key) {
            const columns = Reflect.getMetadata(ENTITY_COLUMN, target) ?? {}

            let smallHump = isHump ? humpToLine(key) : key

            columns[key] = metadata?.name ?? smallHump

            Reflect.defineMetadata(ENTITY_COLUMN, columns, target)
        }
    }

}

/**
 * 根据配置生成数据库映射关系
 */
export const Column = columnDecoratorFactory()

/**
 * 驼峰映射 根据配置生成数据库映射关系
 */
export const HumpColumn = columnDecoratorFactory(true)
