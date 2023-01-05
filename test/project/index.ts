// @ts-nocheck

import { SelectOne, SelectOneResults, SelectOrigin, SelectOriginResults, Result, Transactional, CreatePool, Delete } from "../../dist/index";
import { initMysql } from "../../dist/index";
import { Select, SelectResults } from "../../dist/index";
import { User } from './user.entity'
import { Article } from './article.entity'

export const pool = initMysql({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'decorator_mysql',
    port: 3306,
    connectionLimit: 10,
});




export class UserMapping {
    @Select('select 1+1 as count from user')
    testSelect: () => SelectResults<any>

    @Select('select * from user where user_id = &{0}')
    selectUserById1: (userId: number) => SelectResults<any>

    @Select('select * from user where user_id = #{0}')
    selectUserById2: (userId: number) => SelectResults<any>

    @Select('select * from user where user_id = ${0}')
    selectUserById3: (userId: number) => SelectResults<any>

    @Select('select * from user where user_id = ${userId}')
    selectUserById4: (user: User) => SelectResults<any>

    @Select('select * from user where user_id = 1')
    testSelectPure: () => SelectResults<any>

    @SelectOne('select * from user where user_id = 1')
    testSelectOne: () => SelectOneResults<any>

    @SelectOrigin('select * from user where user_id = 1')
    testSelectOrigin: () => SelectOriginResults<any>
}


export class ResultMapping {
    @Result(User)
    @Select('select * from user where user_id = 1')
    testResult1: () => SelectResults<User>

    @Result(User, { only: ['userId'] })
    @Select('select * from user where user_id = 1')
    testResult2: () => SelectResults<User>

    @Result(User, { exclude: ['password'] })
    @Select('select * from user where user_id = 1')
    testResult3: () => SelectResults<User>

    @Result(User, { alias: 'u' })
    @Select('select * from user u where user_id = 1')
    testResult4: () => SelectResults<User>

    @Result(User, { custom: ['1+1 as count'] })
    @Select('select * from user u where user_id = 1')
    testResult5: () => SelectResults<User>

    @Result(Article, { alias: 'a' })
    @Result(User, { alias: 'u' })
    @Select('select * from user u left join article a on u.user_id = a.user_id and u.user_id = 1')
    testResult6: () => SelectResults<User>

    @Select('select * from user')
    @Result(User)
    testResult7: () => SelectResults<User>
}

class TransactionalMapping {
    @Delete('delete from user where user_id = 1')
    deleteUser: () => DeleteResults
}



export const userMapping = new UserMapping()
export const resultMapping = new ResultMapping()
export const transactionalMapping = new TransactionalMapping()

class TransactionalService {
    @Transactional()
    async deleteUser(@CreatePool() pool?: Pool) {
        transactionalMapping.deleteUser.call(pool)
        throw new Error("error");
    }
}

export const transactionalService = new TransactionalService()