

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }
type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U

interface only<T> {
    // 只要哪些参数,和exclude互斥
    only?: Array<keyof T>
}

interface exclude<T> {
    // 只要哪些参数,和exclude互斥
    exclude?: Array<keyof T>
}

export type resultConfigType<T = never> = {
    // 查询别名
    alias?: string

    // 自定义的sql,拼接在select和from中间
    custom?: string
} & XOR<only<T>, exclude<T>>