

/**
 * 过滤字符串的多余逗号
 * @param value 
 */
export const filterComma = (value: string) => {
    return value.split(',')
        .filter((v) => v)
        .join(', ')
}