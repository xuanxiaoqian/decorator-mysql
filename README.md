# decorator-mysql

<a href="https://www.npmjs.com/package/decorator-mysql">
    <img src="https://img.shields.io/npm/v/decorator-mysql.svg">
<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg"></a>  </a>



爱用装饰器风格查询MySQL的框架一枚鸭~

<hr />

文档：<a href="http://decorator-mysql.xuanxiaoqian.com">文档网站</a>

## 安装

~~~sh
npm i decorator-mysql
~~~

  

  

## 快速开始

1. 初始化数据源

   ```ts
   import { initMysql } from "decorator-mysql";
   
   const pool = initMysql({
       host: 'localhost',
       user: 'root',
       password: '123456',
       database: 'decorator_mysql',
       port: 3306,
       connectionLimit: 10,
   });
   ```

2. 查询装饰器

   ```ts
   import { Select, SelectResults } from 'decorator-mysql'
   
   @Select('select * from user')
   selectUserById: () => SelectResults<any>
   ```

3. 使用

   ```ts
   await new xxx().selectUserById()
   ```

   

​    

## 趣味对比

​    

​    

​    



## 疑问交流

暂无