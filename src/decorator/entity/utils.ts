export const bigHumpRegExp = new RegExp(/([A-Z])/g)

/**
 * 将驼峰变为下划线驼峰
 * @param value 需要转换的值
 * @returns 转换后的值
 */
export const humpToLine = (value: string | undefined | symbol) => {
    if (!value) return

    value = String(value)

    value = value.replace(value[0], value[0].toLowerCase())
    let transformValue = value.replace(bigHumpRegExp, '_$1').toLowerCase()
    return transformValue
}