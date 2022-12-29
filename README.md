# decorator-mysql

<a href="https://www.npmjs.com/package/decorator-mysql">
    <img src="https://img.shields.io/npm/v/decorator-mysql.svg">
<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg"></a>  </a>



爱用装饰器风格查询MySQL的框架一枚鸭~

<hr />



## 安装

~~~sh
npm i decorator-mysql
~~~



使用文档晚点出,最近更新比较频繁



## 趣味对比

测试时间：2022/12/20



使用Date.now()计算Typeorm和Decorator-mysql的查询时间



typeorm示例：

```ts
await this.articleRepository.find();
```

decorator-mysq示例l： 

```ts
@Select('select * from user;')
selectUserAll: () => SelectResults<User>;
```



运行五次，每次读取五次 数值相加(等于号后面是平均值)：

typeorm：15 9 10 9 12 11 = 13.2	

decorator-mysql：12 15 12 14 13 = 13.2



decorator-mysql还需要性能优化

## 疑问交流

暂无