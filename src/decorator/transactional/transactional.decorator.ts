import { pool } from "../../mysql"
import { CREATE_POOL } from '../constants'


/**
 * 开启事务 异常回滚
 * @param transactionKey 
 * @returns 
 */
export const Transactional = (transactionKey?: string): MethodDecorator => {
    return function (target, propertyKey, descriptor: PropertyDescriptor) {
        descriptor.value = new Proxy(Reflect.get(target, propertyKey), {
            apply: async (target, thisBinding, args) => {
                let returnValue

                const conn = await pool.getConnection()
                await conn.beginTransaction()

                try {
                    returnValue = await target.apply(thisBinding, [...args, conn])

                    await conn.commit()
                } catch (error) {
                    console.log('回滚触发 ->', error)

                    await conn.rollback()
                } finally {
                    conn.release()
                }

                return returnValue
            }
        })

    }
}


/**
 * 创建一个连接池,需配合Transactional装饰器一起使用
 * @returns 
 */
export const CreatePool = (): ParameterDecorator => {
    return function (target, propertyKey, parameterIndex) {
        Reflect.defineMetadata(CREATE_POOL, parameterIndex, Reflect.get(target, propertyKey));
    }
}