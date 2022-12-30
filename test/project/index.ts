// @ts-nocheck

import { SelectOne, SelectOneResults, SelectOrigin, SelectOriginResults, Result } from "../../dist/index";
import { initMysql } from "../../dist/index";
import { Column, HumpColumn } from "../../dist/index";
import { Select, SelectResults } from "../../dist/index";

export const pool = initMysql({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'decorator_mysql',
    port: 3306,
    connectionLimit: 10,
});



export class User {

    @Column({ name: 'user_id' })
    userId: number

    @HumpColumn()
    userName: string

    @Column()
    password: string
}



export class Article {

    @HumpColumn()
    articleId: number

    @Column()
    title: string

    @HumpColumn()
    userId: string

    @Column()
    content: string
}


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

    @Result(User, { custom: '1+1 as count' })
    @Select('select * from user u where user_id = 1')
    testResult5: () => SelectResults<User>

    @Result(Article, { alias: 'a' })
    @Result(User, { alias: 'u' })
    @Select('select * from user u left join article a on u.user_id = a.user_id and u.user_id = 1')
    testResult6: () => SelectResults<User>
}