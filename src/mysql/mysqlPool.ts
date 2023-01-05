import mysql, { Pool, PoolOptions } from 'mysql2/promise'

export { Pool } from 'mysql2/promise'

export let pool: Pool

/**
 * 初始化mysql链接以及连接池
 * @param mysqlConfig 链接MySQL参数
 */
export const initMysql = (mysqlConfig: PoolOptions) => {
    pool = mysql.createPool(mysqlConfig)

    pool.getConnection()

    return pool
}
