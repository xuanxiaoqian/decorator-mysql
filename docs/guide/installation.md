# 极速体验

仓库地址：

```sh
git clone https://gitee.com/xuanxiaoqian/decorator-mysql

npm install

npm run dev
```

​    

​    

​    

# 手动体验

使用npm安装：

~~~sh
npm i decorator-mysql
~~~
​    

初始化数据源：

~~~ts
import { initMysql } from "decorator-mysql";

initMysql({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'decorator_mysql',
    port: 3306,
    connectionLimit: 10,
});
~~~

​    

编写查询装饰器：

~~~ts
import {  Select, SelectResults } from 'decorator-mysql'

export class AppMapping {
    @Select('select * from user where user_id = &{0}')
    selectUserById: (id: number) => SelectResults<any>
}
~~~

​    

使用：

~~~ts
import {AppMapping} from './AppMapping'

const appMapping = new AppMapping()

appMapping.selectUserById(1).then((res)=>{
    console.log(res)
})
~~~

