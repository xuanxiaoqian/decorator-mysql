
# @Transactional

```ts
class TransactionalService {
    @Transactional()
    async deleteUser(@CreatePool() pool?: Pool) {
        transactionalMapping.deleteUser.call(pool)
        throw new Error("error");
    }
}

describe("事务测试", () => {
    test("它应该能正确回滚", async () => {
        try {
            await transactionalService.deleteUser()
        } catch (error) {

        }
        const data = await resultMapping.testResult7()
        expect(data[0]['userId']).toEqual(1);
    });
});

```