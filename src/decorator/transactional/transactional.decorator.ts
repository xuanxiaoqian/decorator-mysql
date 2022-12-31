import { pool } from "../../mysql"
import { CREATEPOOL } from '../constants'


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

export const CreatePool = (): ParameterDecorator => {
    return function (target, propertyKey, parameterIndex) {
        Reflect.defineMetadata(CREATEPOOL, parameterIndex, target, propertyKey);
    }
}