/**
 * 自定义的类型判断函数
 * @param data 需要判断类型的值
 * @returns 返回该值的类型
 */
export const Typeof = (data: any) => {
    var toString = Object.prototype.toString
    var dataType = toString
        .call(data)
        .replace(/\[object\s(.+)\]/, '$1')
        .toLowerCase()
    return dataType
}