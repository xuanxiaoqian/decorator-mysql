import { ENTITY_COLUMN } from "../constants"
import { columnMetadataType } from "./types"
import { humpToLine } from "./utils"


/**
 * column装饰器工厂
 * @param isHump 
 * @returns 
 */
const columnDecoratorFactory = (isHump?: boolean) => {
    return (metadata?: columnMetadataType): PropertyDecorator => {
        return function (target, propertyKey) {
            const columns = Reflect.getMetadata(ENTITY_COLUMN, target) ?? {}

            let smallHump = isHump ? humpToLine(propertyKey) : propertyKey

            columns[propertyKey] = metadata?.name ?? smallHump

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
