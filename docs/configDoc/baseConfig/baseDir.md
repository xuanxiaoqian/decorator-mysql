数据库连接

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



使用`initMysql`进行数据库初始化，返回一个连接池。