import { UserMapping, pool, ResultMapping } from '../project/index'
const userMapping = new UserMapping()
const resultMapping = new ResultMapping()

describe("链接SQL", () => {
    test("它应该能正常链接MySQL并且能够执行SQL", async () => {
        const data = await userMapping.testSelect()
        expect(data[0]['count']).toEqual(2);
    });
});

describe("查询占位符", () => {
    test("它应该能正确的使用?占位符,并且将参数传进去", async () => {
        const data = await userMapping.selectUserById1(1)
        expect(data[0]['user_id']).toEqual(1);
    });

    test("它应该能正确的使用#占位符,并且将参数传进去", async () => {
        const data = await userMapping.selectUserById2(1)
        expect(data[0]['user_id']).toEqual(1);
    });

    test("它应该能正确的使用$占位符,并且将参数传进去", async () => {
        const data = await userMapping.selectUserById3(1)
        expect(data[0]['user_id']).toEqual(1);
    });

    test("它应该能运行两次的参数都是正确的,而不是第一次参数写死的", async () => {
        const data = await userMapping.selectUserById3(1)
        const data2 = await userMapping.selectUserById3(1)
        expect(data[0]['user_id']).toEqual(1);
        expect(data2[0]['user_id']).toEqual(1);
    });

    test("它应该能正确的解析对象参数", async () => {
        const data = await userMapping.selectUserById4({ userId: 1, userName: '轩小浅', password: '123' })
        expect(data[0]['user_id']).toEqual(1);
    });
});

describe("不同的查询装饰器", () => {
    test("它应该能正确返回一个数组对象", async () => {
        const data = await userMapping.testSelectPure()
        expect(data[0]['user_id']).toEqual(1);
    });

    test("它应该能正确返回一个对象", async () => {
        const data = await userMapping.testSelectOne()
        expect(data['user_id']).toEqual(1);
    });

    test("它应该能正确返回一个原始查询", async () => {
        const data = await userMapping.testSelectOrigin()
        expect(data.length).toEqual(2);
    });
});

describe("result测试", () => {
    test("它应该能正确的映射", async () => {
        const data = await resultMapping.testResult1()
        expect(data[0]['userId']).toEqual(1);
    });

    test("它应该能正确的only", async () => {
        const data = await resultMapping.testResult2()
        expect(data[0]['userName']).toEqual(undefined);
        expect(data[0]['userId']).toEqual(1);
    });

    test("它应该能正确的exclude", async () => {
        const data = await resultMapping.testResult3()
        expect(data[0]['password']).toEqual(undefined);
        expect(data[0]['userId']).toEqual(1);
    });

    test("它应该能正确的alias", async () => {
        const data = await resultMapping.testResult4()
        expect(data[0]['userId']).toEqual(1);
    });

    test("它应该能正确的custom", async () => {
        const data = await resultMapping.testResult5()
        expect(data[0]['count']).toEqual(2);
    });

    test("它应该能正确的多表查询", async () => {
        const data = await resultMapping.testResult6()
        expect(data[0]['articleId']).toEqual(1);
        expect(data[0]['userName']).toEqual('root');
    });
});

describe("关闭链接", () => {
    test("它应该能关闭链接", async () => {
        pool.end().then()
    });
});
