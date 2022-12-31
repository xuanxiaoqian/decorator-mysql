# 发展历程
`decorator-mysql`在正式版之前经历了多次颠覆性更改,在实际项目使用中不断完善

## 1.0版本
那时候叫`fast-mysql`

```ts
export class LoginMapping {
    @Sql('select * from user where id = #{id}')
    findUser(id: number): any {}
}
```

当时是这样的，非常不规范，id没使用不高亮，一个空函数放在这里不知道干什么的

## 1.2版本

改名为`decorator-mysql`



改进后非常规范，用起来也非常舒服，但是返回值非常混乱，不知道数据库的字段是什么样的，只能自动将参数变为下划线驼峰进行as查询

~~~ts
@Result(['userId','userName','password']) // 数组
@Select('select * from user')
findUser:(user:User) => SelectOriginResults<User>	
~~~




## 1.3版本
最终抛弃`1.2版本`的返回值简便包裹，实体类字段使用装饰器进行标识

```ts
import { Column, HumpColumn } from 'decorator-mysql'

export class User {

    @Column({ name: 'user_id' })
    userId: number

    @HumpColumn()
    userName: string

    @Column()
    password: string
}
```

