# @Select

基础示例：

```ts
import { Select, SelectResults } from 'decorator-mysql'

@Select('select * from user')
selectUserById: () => SelectResults<any>
```

装饰器参数为需要执行的SQL语句

​    

接收参数 基础类型：

```ts
@Select('select * from user where user_id = &{0} and user_name = &{1}')
selectUserById: (id: number,userName:string) => SelectResults<any>

selectUserById(1,'轩小浅')
```

​    

接收参数 对象类型：

```ts
@Select('select * from user where user_id = &{userId} and user_name = &{userName}')
selectUserById: (user:{userId:number,userName:string}) => SelectResults<any>

selectUserById({userId:1,userName:'轩小浅'})
```

​    

三种占位符 &{}、#{}、${}

1.`&{}` 预处理占位符(性能最高)

```ts
@Select('select * from user where user_id = &{0}')
selectUserById: (id: number) => SelectResults<any>

selectUserById(1)
// 解析SQL
// select * from user where user_id = ? 执行参数:[1]
```

​    

2.`#{}` 字符串占位符(性能跟下面一样)

```ts
@Select('select * from user where user_id = #{0}')
selectUserById: (id: number) => SelectResults<any>

selectUserById(1)
// 解析SQL
// select * from user where user_id = '1' 执行参数:[]
```

​    

3.`${}` 动态SQL占位符(尽量减少使用，有SQL注入风险)

```ts
@Select('select * from user where user_id = ${0}')
selectUserById: (id: number) => SelectResults<any>

selectUserById(1)
// 解析SQL
// select * from user where user_id = 1 执行参数:[]
```

